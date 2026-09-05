import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice, oldPriceOf, priceOf, type Product } from "@/lib/products";
import { estimateDelivery } from "@/lib/shipping";

export function ProductCard({
  product,
  enableVariantImage = false,
  readOnly = false,
}: {
  product: Product;
  /** Se true, cliccando una variante la foto principale mostra l'immagine di quella variante.
   *  Va passato true solo nella pagina Catalogo, non nella Home/Index. */
  enableVariantImage?: boolean;
  /** Se true, nasconde il pulsante "Aggiungi" e la selezione varianti per l'acquisto:
   *  la card diventa solo di consultazione, con un link alla scheda prodotto. */
  readOnly?: boolean;
}) {
  const { add, setOpen } = useCart();
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [imageMode, setImageMode] = useState<"gallery" | "variant">("gallery");

  if (product.soon) {
    return (
      <article className="surface-card flex min-h-[320px] flex-col items-center justify-center gap-2 border-dashed p-8 text-center opacity-70">
        <span className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
          In arrivo
        </span>
        <h3 className="mt-2 text-lg">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.tagline}</p>
      </article>
    );
  }

  const variants = product.variants ?? [];
  const selectedVariant = variants.find((v) => v.id === variantId);
  // La galleria è: foto principale + tutte le foto extra (NON legate a nessuna variante).
  const gallery = [product.image, ...(product.gallery ?? [])];

  const displayImage =
    enableVariantImage && imageMode === "variant" && selectedVariant?.image
      ? selectedVariant.image
      : gallery[galleryIndex] ?? product.image;

  // Le frecce scorrono SOLO la galleria. Se ero su una variante, cliccando una freccia
  // si esce dalla variante e si riparte dall'inizio del flusso galleria normale.
  const goGallery = (dir: 1 | -1) => {
    if (imageMode === "variant") {
      setImageMode("gallery");
      setGalleryIndex(0);
      return;
    }
    setGalleryIndex((i) => (i + dir + gallery.length) % gallery.length);
  };

  const selectVariant = (id: string) => {
    setVariantId(id);
    if (enableVariantImage) setImageMode("variant");
  };

  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden">
      <div className="group/image relative aspect-square overflow-hidden rounded-t-2xl bg-secondary">
        <Link
          to="/prodotto/$slug"
          params={{ slug: product.slug }}
          className="absolute inset-0 block"
        >
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            width={900}
            height={900}
            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
            {product.badge}
          </span>
        )}

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto precedente"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goGallery(-1);
              }}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-100 transition-opacity duration-200 hover:bg-black/70 md:opacity-0 md:group-hover/image:opacity-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Foto successiva"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goGallery(1);
              }}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-100 transition-opacity duration-200 hover:bg-black/70 md:opacity-0 md:group-hover/image:opacity-100"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-1 text-lg">
          <Link to="/prodotto/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>

        {!readOnly && product.variants && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground">{product.variantLabel ?? "Variante"}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => selectVariant(v.id)}
                  aria-pressed={variantId === v.id}
                  className={
                    variantId === v.id
                      ? "btn-base btn-primary !px-3 !py-1 !text-xs"
                      : "btn-base btn-outline !px-3 !py-1 !text-xs"
                  }
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex flex-col">
            {oldPriceOf(product, variantId) !== undefined && (
              <span className="text-xs font-semibold text-primary line-through">
                {formatPrice(oldPriceOf(product, variantId)!)}
              </span>
            )}
            <span className="font-display text-xl">
              {formatPrice(priceOf(product, variantId))}
            </span>
          </div>
          {readOnly ? (
            <Link
              to="/prodotto/$slug"
              params={{ slug: product.slug }}
              className="btn-base btn-outline"
            >
              Scopri
            </Link>
          ) : (
            <button
              className="btn-base btn-primary"
              onClick={() => {
                add(product.slug, 1, variantId);
                setOpen(true);
                toast.success(`${product.name} aggiunto al carrello`);
              }}
            >
              Aggiungi
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
