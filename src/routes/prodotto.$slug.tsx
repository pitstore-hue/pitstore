import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { findProduct, formatPrice, oldPriceOf, priceOf, type Product } from "@/lib/products";
import { estimateDelivery } from "@/lib/shipping";

export const Route = createFileRoute("/prodotto/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product || product.soon) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Prodotto non trovato — PitStore" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — PitStore` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — PitStore` },
        { property: "og:description", content: product.tagline },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { add, setOpen } = useCart();
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);
  const [qty, setQty] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [imageMode, setImageMode] = useState<"gallery" | "variant">("gallery");

  const variants = product.variants ?? [];
  const selectedVariant = variants.find((v) => v.id === variantId);
  // Galleria = foto principale + foto extra, NON legate a nessuna variante.
  const gallery = [product.image, ...(product.gallery ?? [])];

  const displayImage =
    imageMode === "variant" && selectedVariant?.image
      ? selectedVariant.image
      : gallery[galleryIndex] ?? product.image;

  // Le frecce scorrono SOLO la galleria. Se ero su una variante, la prima freccia
  // cliccata esce dalla variante e riparte dall'inizio del flusso galleria.
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
    setImageMode("variant");
    // Solo su mobile: riporta lo schermo all'inizio della pagina quando si cambia
    // variante, e solo nella pagina di dettaglio prodotto (non nelle card del catalogo).
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const addToCart = () => {
    add(product.slug, qty, variantId);
    setOpen(true);
    toast.success(`${product.name} aggiunto al carrello`);
  };

  return (
    <div className="container-page py-12">
      {/* Il blocco foto+testo occupa il 92% della larghezza disponibile, centrato,
          con l'8% restante diviso equamente come margine a sinistra e a destra. */}
      <div className="mx-auto w-[90%]">
        <div className="grid gap-10 md:grid-cols-[40fr_60fr]">
          <div>
            {/* Il link "Torna al catalogo" vive nella stessa colonna della foto:
                resta sempre sopra di essa, qualunque sia la larghezza della colonna. */}
            <Link
              to="/catalogo"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4 stroke-2" />
              Torna al catalogo
            </Link>

            <div className="group/image relative aspect-square overflow-hidden rounded-3xl bg-secondary">
              <img
                src={displayImage}
                alt={product.name}
                width={900}
                height={900}
                className="size-full object-cover"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Foto precedente"
                    onClick={() => goGallery(-1)}
                    className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-100 transition-opacity duration-200 hover:bg-black/70 md:opacity-0 md:group-hover/image:opacity-100"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Foto successiva"
                    onClick={() => goGallery(1)}
                    className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-100 transition-opacity duration-200 hover:bg-black/70 md:opacity-0 md:group-hover/image:opacity-100"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">{product.category}</p>
            <h1 className="mt-3 text-4xl">{product.name}</h1>
            <p className="mt-2 text-muted-foreground">{product.tagline}</p>
            {oldPriceOf(product, variantId) !== undefined && (
              <p className="mt-6 text-lg font-semibold text-primary line-through">
                {formatPrice(oldPriceOf(product, variantId)!)}
              </p>
            )}
            <p className={oldPriceOf(product, variantId) !== undefined ? "font-display text-3xl" : "mt-6 font-display text-3xl"}>
              {formatPrice(priceOf(product, variantId))}
            </p>
            {product.deliveryDays && (
              <p className="mt-2 text-sm font-bold uppercase tracking-wide text-primary">
              Consegna: {estimateDelivery(product.deliveryDays.min, product.deliveryDays.max)}
              </p>
            )}

            {product.variants && (
              <div className="mt-6">
                <p className="text-sm">{product.variantLabel ?? "Variante"}</p>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => selectVariant(v.id)}
                      aria-pressed={variantId === v.id}
                      className={`rounded-xl border p-3 text-left text-sm transition-colors ${
                        variantId === v.id ? "border-primary bg-secondary" : "border-border"
                      }`}
                    >
                      <span className="block font-semibold">{v.label}</span>
                      <span className="block text-xs text-muted-foreground">
                        {formatPrice(v.price)}
                      </span>
                      {v.note && (
                        <span className="mt-1 block text-[11px] text-primary">{v.note}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Quantità</span>
              <div className="flex items-center gap-3 rounded-xl border border-border px-3 py-2">
                <button aria-label="Diminuisci" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span className="w-6 text-center text-sm">{qty}</span>
                <button aria-label="Aumenta" onClick={() => setQty((q) => Math.min(99, q + 1))}>
                  +
                </button>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {product.specs.map((s: string) => (
                <li key={s} className="flex gap-2 text-muted-foreground">
                  <span className="text-primary">•</span>
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="btn-base btn-primary" onClick={addToCart}>
                Aggiungi al carrello
              </button>
              <Link
                to="/checkout"
                className="btn-base btn-outline"
                onClick={() => add(product.slug, qty, variantId)}
              >
                Compra ora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
