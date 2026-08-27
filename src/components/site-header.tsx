import { Link } from "@tanstack/react-router";
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  User,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { products, formatPrice } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/pit-store-logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/catalogo", label: "Catalogo" },
  { to: "/contatti", label: "Contatti" },
] as const;

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  const catalog = useMemo(() => products.filter((p) => !p.soon), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalog.slice(0, 6);
    return catalog.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query, catalog]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <button
        aria-label="Chiudi ricerca"
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-24 w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca un prodotto…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button onClick={onClose} aria-label="Chiudi">
            <X className="size-4" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {!query.trim() && (
            <p className="px-3 pb-1 pt-2 text-xs uppercase tracking-widest text-muted-foreground">
              Prodotti
            </p>
          )}
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Nessun prodotto trovato.
            </p>
          ) : (
            results.map((p) => (
              <Link
                key={p.slug}
                to="/prodotto/$slug"
                params={{ slug: p.slug }}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl p-2 text-sm hover:bg-secondary"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-md object-cover"
                />
                <span className="flex-1">
                  <span className="block">{p.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {formatPrice(p.price)}
                  </span>
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

type AccountView = "checking" | "loggedIn" | "success" | "email" | "code";

/**
 * Contenuto mostrato quando l'utente è già autenticato, sia perché aveva
 * già una sessione attiva (view="loggedIn"), sia subito dopo aver
 * completato l'accesso via codice email (view="success").
 */
function LoggedInPanel({
  email,
  justSignedIn,
  onClose,
  onSignOut,
}: {
  email: string | null;
  justSignedIn: boolean;
  onClose: () => void;
  onSignOut: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-2 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="size-6" />
      </span>
      <div>
        <p className="text-sm font-semibold">
          {justSignedIn ? "Accesso effettuato" : "Hai già effettuato l'accesso"}
        </p>
        {email && (
          <p className="mt-1 text-xs text-muted-foreground">
            Connesso come <span className="text-foreground">{email}</span>
          </p>
        )}
      </div>
      <div className="mt-2 flex w-full flex-col gap-2">
        <button onClick={onClose} className="btn-base btn-primary w-full">
          Continua
        </button>
        <button
          onClick={onSignOut}
          className="flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:underline"
        >
          <LogOut className="size-3.5" />
          Esci dall'account
        </button>
      </div>
    </div>
  );
}

function AccountDropdown({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<AccountView>("checking");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Al primo render, controlla se esiste già una sessione valida:
  // se sì, salta il form e mostra subito "Hai già effettuato l'accesso".
  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      if (data.user) {
        setUserEmail(data.user.email ?? null);
        setView("loggedIn");
      } else {
        setView("email");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Non è stato possibile disconnettersi. Riprova.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
    } catch (err) {
      console.error(err);
      toast.error("Accesso con Google non riuscito. Riprova.");
    }
  };

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true },
      });
      if (error) throw error;
      toast.success("Ti abbiamo inviato un codice via email.");
      setView("code");
    } catch (err) {
      console.error(err);
      toast.error("Non è stato possibile inviare il codice. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: code.trim(),
        type: "email",
      });
      if (error) throw error;
      toast.success("Accesso effettuato.");
      setUserEmail(data.user?.email ?? email.trim());
      setView("success");
    } catch (err) {
      console.error(err);
      toast.error("Codice non valido o scaduto. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Cattura i click fuori dal dropdown per chiuderlo, senza scurire/sfocare il sito */}
      <button
        aria-label="Chiudi"
        className="fixed inset-0 z-[90] bg-transparent"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-24 z-[100] w-[92vw] max-w-sm -translate-x-1/2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:absolute md:inset-x-auto md:left-auto md:right-0 md:top-full md:mt-2 md:w-80 md:max-w-none md:translate-x-0">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">
            {view === "loggedIn" || view === "success" ? "Il tuo account" : "Accedi o crea account"}
          </h2>
          <button onClick={onClose} aria-label="Chiudi">
            <X className="size-4" />
          </button>
        </div>

        {(view === "loggedIn" || view === "success") && (
          <div className="mt-4">
            <LoggedInPanel
              email={userEmail}
              justSignedIn={view === "success"}
              onClose={onClose}
              onSignOut={handleSignOut}
            />
          </div>
        )}

        {(view === "email" || view === "code") && (
          <>
            <button
              onClick={signInWithGoogle}
              className="btn-base btn-outline mt-4 flex w-full items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="size-4">
                <path
                  fill="#4285F4"
                  d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.8z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.88-3c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.92H1.3v3.09C3.26 21.3 7.3 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.31 14.33A7.2 7.2 0 0 1 4.9 12c0-.81.14-1.6.4-2.33V6.58H1.3A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.3 5.42l4.01-3.09z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.3 0 3.26 2.7 1.3 6.58l4.01 3.09C6.25 6.85 8.89 4.75 12 4.75z"
                />
              </svg>
              Continua con Google
            </button>

            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              oppure
              <div className="h-px flex-1 bg-border" />
            </div>

            {view === "email" ? (
              <form onSubmit={sendCode} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="field-input flex-1"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Invia codice di accesso"
                  className="btn-base btn-primary !px-3"
                >
                  <Send className="size-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={verifyCode} className="flex flex-col gap-3">
                <p className="text-xs text-muted-foreground">
                  Codice inviato a <span className="text-foreground">{email}</span>
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Codice a 6 cifre"
                    className="field-input flex-1 tracking-widest"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    aria-label="Verifica codice"
                    className="btn-base btn-primary !px-3"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setView("email");
                    setCode("");
                  }}
                  className="flex items-center gap-1 text-left text-xs text-muted-foreground hover:text-foreground hover:underline"
                >
                  <ArrowLeft className="size-3.5" />
                  Usa un'altra email
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
}

function MobileMenuDrawer({ onClose }: { onClose: () => void }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="animate-in fade-in fixed inset-0 z-[100] flex flex-col bg-background duration-300 md:hidden">
      {/* Bagliore decorativo in alto, coerente con lo stile "glow" del sito */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative flex items-center justify-between border-b border-border/60 px-6 py-5">
        <Link to="/" onClick={onClose} className="flex items-center gap-3">
          <img src={logo} alt="PiT Store" className="h-12 w-12 object-contain" />
          <span className="font-display text-xl">
            PiT Store<span className="text-primary">.</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          aria-label="Chiudi menu"
          className="rounded-full border border-border p-2.5 transition-colors hover:bg-secondary"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="relative flex flex-1 flex-col justify-center px-6">
        {nav.map((n, i) => (
          <Link
            key={n.to}
            to={n.to}
            onClick={onClose}
            activeProps={{ className: "text-primary" }}
            inactiveProps={{ className: "text-foreground" }}
            activeOptions={{ exact: n.to === "/" }}
            className="group flex items-center justify-between border-b border-border/40 py-6 transition-colors first:border-t"
          >
            <span className="flex items-baseline gap-4">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <span className="font-display text-4xl leading-none">{n.label}</span>
            </span>
            <ArrowUpRight className="size-6 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </nav>

      <div className="relative border-t border-border/60 px-6 py-6 text-center">
        <a
          href="mailto:pitstorechat@gmail.com"
          className="text-sm text-primary hover:underline"
        >
          pitstorechat@gmail.com
        </a>
        <p className="mt-1 text-xs text-muted-foreground">
          Lampade da comodino disegnate con cura, per le tue serate.
        </p>
      </div>
    </div>,
    document.body,
  );
}

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background">
      <div className="container-page flex h-24 items-center justify-between md:h-28">
        <Link to="/" className="flex items-center" aria-label="PiT Store">
          <img
            src={logo}
            alt="PiT Store"
            className="h-16 w-16 object-contain md:h-20 md:w-20"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
              className="transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Cerca"
            onClick={() => setSearchOpen(true)}
            className="rounded-full border border-border p-2 transition-colors hover:bg-secondary"
          >
            <Search className="size-4" />
          </button>

          <div className="relative">
            <button
              aria-label="Accedi"
              onClick={() => setAccountOpen((v) => !v)}
              className="rounded-full border border-border p-2 transition-colors hover:bg-secondary"
            >
              <User className="size-4" />
            </button>
            {accountOpen && <AccountDropdown onClose={() => setAccountOpen(false)} />}
          </div>

          <button
            aria-label="Apri carrello"
            onClick={() => setOpen(true)}
            className="relative rounded-full border border-border p-2 transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMobile((v) => !v)}
            className="rounded-full border border-border p-2 md:hidden"
          >
            {mobile ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobile && <MobileMenuDrawer onClose={() => setMobile(false)} />}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
