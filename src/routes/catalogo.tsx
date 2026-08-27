import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catalogo — Notte" },
      {
        name: "description",
        content:
          "Il catalogo Notte: proiettore USB effetto cielo stellato, cornici luminose Dragon Ball e altri prodotti.",
      },
      { property: "og:title", content: "Catalogo — Notte" },
      {
        property: "og:description",
        content: "Scopri i prodotti Notte e scegli la variante che preferisci.",
      },
    ],
  }),
  component: Catalogo,
});

const categories = [
  "Tutte",
  ...Array.from(new Set(products.filter((p) => !p.soon).map((p) => p.category))),
];

function Catalogo() {
  const [active, setActive] = useState("Tutte");
  const list =
    active === "Tutte" ? products : products.filter((p) => !p.soon && p.category === active);

  return (
    <div className="container-page py-14">
      <h1 className="text-4xl">Catalogo</h1>
      <p className="mt-2 max-w-lg text-muted-foreground">
        I prodotti selezionati per la luce della notte. Scegli la variante che preferisci
        direttamente dalla scheda.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={
              active === c
                ? "btn-base btn-primary !px-4 !py-1.5 !text-xs"
                : "btn-base btn-outline !px-4 !py-1.5 !text-xs"
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 flex items-stretch gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
        {list.map((p) => (
          <div key={p.slug} className="flex w-[80%] flex-shrink-0 sm:w-auto sm:flex-shrink">
            <ProductCard product={p} enableVariantImage />
          </div>
        ))}
      </div>
    </div>
  );
}
