import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Props<T> = {
  id: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  options: T[];
  loading?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  getOptionLabel: (opt: T) => string;
  getOptionKey: (opt: T) => string;
  onSelect: (opt: T) => void;
  emptyMessage?: string;
};

// Deve combaciare con le classi Tailwind usate sul menu qui sotto
// (max-h-64 = 16rem = 256px, p-1 = 4px di padding per lato).
const MENU_MAX_HEIGHT = 256;
const MENU_PADDING = 8;
const ROW_HEIGHT = 36; // altezza approssimativa di una riga di opzione
// Il menu passa "sopra" solo se sotto lo spazio non basta E sopra ce n'è
// chiaramente di più (con un margine), altrimenti resta sempre "sotto".
// Questo evita che il menu salti da un lato all'altro per pochi pixel.
const FLIP_MARGIN = 24;

function estimateMenuHeight(count: number, loading?: boolean) {
  if (loading || count === 0) return 40 + MENU_PADDING;
  return Math.min(MENU_MAX_HEIGHT, count * ROW_HEIGHT + MENU_PADDING);
}

/**
 * Campo con menu di suggerimenti che:
 * - si apre al click/focus
 * - mostra il menu sopra o sotto il campo a seconda dello spazio disponibile
 *   nello schermo (non cambia dimensione, cambia solo lato)
 * - il NUMERO di opzioni mostrate si riduce man mano che l'utente scrive
 *   (il filtro arriva già fatto tramite la prop `options`)
 */
export function AutocompleteField<T>({
  id,
  label,
  value,
  onChangeText,
  options,
  loading,
  disabled,
  error,
  placeholder,
  getOptionLabel,
  getOptionKey,
  onSelect,
  emptyMessage = "Nessun risultato",
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [dropDirection, setDropDirection] = useState<"below" | "above">("below");
  const wrapRef = useRef<HTMLDivElement>(null);

  // chiudi cliccando fuori
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Decide se aprire sopra o sotto in base allo spazio libero nello schermo.
  // Usa una stima dell'altezza basata sul contenuto attuale (non l'altezza
  // "vecchia" letta dal render precedente), così il calcolo è sempre
  // coerente con quello che sta per essere mostrato.
  const recalcDirection = useCallback(() => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const estimatedHeight = estimateMenuHeight(options.length, loading);
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < estimatedHeight && spaceAbove > spaceBelow + FLIP_MARGIN) {
      setDropDirection("above");
    } else {
      setDropDirection("below");
    }
  }, [options.length, loading]);

  useLayoutEffect(() => {
    if (!open) return;
    recalcDirection();
  }, [open, recalcDirection]);

  // Mentre il menu è aperto, ricalcola anche se la finestra viene
  // ridimensionata o se la pagina scorre (es. tastiera mobile, resize,
  // cambio di layout responsive) — prima non succedeva mai.
  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", recalcDirection);
    window.addEventListener("scroll", recalcDirection, true);
    return () => {
      window.removeEventListener("resize", recalcDirection);
      window.removeEventListener("scroll", recalcDirection, true);
    };
  }, [open, recalcDirection]);

  return (
    <div ref={wrapRef} className="relative">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        id={id}
        autoComplete="off"
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChangeText(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="field-input mt-1"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}

      {open && !disabled && (
        <div
          className={`absolute z-30 max-h-64 w-full overflow-y-auto rounded-xl border border-border bg-card p-1 shadow-[var(--shadow-card)] ${
            dropDirection === "below" ? "top-full mt-1" : "bottom-full mb-1"
          }`}
        >
          {loading && (
            <p className="px-3 py-2 text-xs text-muted-foreground">Ricerca…</p>
          )}
          {!loading && options.length === 0 && (
            <p className="px-3 py-2 text-xs text-muted-foreground">{emptyMessage}</p>
          )}
          {!loading &&
            options.map((opt) => (
              <button
                key={getOptionKey(opt)}
                type="button"
                onClick={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary"
              >
                {getOptionLabel(opt)}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
