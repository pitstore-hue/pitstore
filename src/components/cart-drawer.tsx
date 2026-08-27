import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, items, subtotal, shipping, total, setQty, remove } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Chiudi"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg">Il tuo carrello</h2>
          <button onClick={() => setOpen(false)} aria-label="Chiudi carrello">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Il carrello è vuoto.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ key, product, qty, variant, unitPrice }) => (
                <li key={key} className="flex gap-4">
                  <img
                    src={variant?.image || product.image}
                    alt={product.name}
                    loading="lazy"
                    width={80}
                    height={80}
                    className="size-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{product.name}</p>
                    {variant && (
                      <p className="text-xs text-muted-foreground">
                        {product.variantLabel ?? "Variante"}: {variant.label}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">{formatPrice(unitPrice)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        aria-label="Diminuisci"
                        className="rounded-md border border-border p-1"
                        onClick={() => setQty(key, qty - 1)}
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{qty}</span>
                      <button
                        aria-label="Aumenta"
                        className="rounded-md border border-border p-1"
                        onClick={() => setQty(key, qty + 1)}
                      >
                        <Plus className="size-3" />
                      </button>
                      <button
                        aria-label="Rimuovi"
                        className="ml-auto text-muted-foreground hover:text-destructive"
                        onClick={() => remove(key)}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3 border-t border-border px-5 py-5">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotale</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Spedizione</span>
            <span>{shipping === 0 ? "Gratuita" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between font-display text-lg">
            <span>Totale</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            className={`btn-base btn-primary w-full ${items.length === 0 ? "pointer-events-none opacity-50" : ""}`}
          >
            Vai al checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
