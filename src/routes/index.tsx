import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, Moon, Star } from "lucide-react";
import heroLamp from "@/assets/hero-lamp.jpg";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Notte — Lampade da comodino di design" },
      {
        name: "description",
        content:
          "Lampade da notte per comodino: ceramica, ottone, legno e vetro. Spedizione gratuita da 100 €, pagamento con carta e PayPal.",
      },
      { property: "og:title", content: "Notte — Lampade da comodino di design" },
      {
        property: "og:description",
        content: "Luce calda per le tue serate. Lampade da comodino disegnate in Italia.",
      },
    ],
  }),
  component: Home,
});

const reviews = [
  {
    nome: "Giulia M.",
    testo:
      "Qualità davvero sopra le aspettative! È arrivata in soli 7 giorni, perfettamente imballata e senza alcun danno. Sono soddisfatta dell’acquisto!",
    stelle: 5,
  },
  {
    nome: "Marco T.",
    testo:
      "Presa come regalo per mio figlio ed è rimasto davvero entusiasta! Colori belli e vivaci, soprattutto con le luci spente. Fa davvero un bell'effetto!",
    stelle: 5,
  },
  {
    nome: "Federica R.",
    testo: "Bel prodotto, la qualità è ottima e fa un bellissimo effetto. L’unica pecca è stata la spedizione, avrei preferito fosse stata più veloce.",
    stelle: 4,
  },
];

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Collezione 2026
            </p>
            <h1 className="mt-4 text-5xl leading-[1.05] md:text-6xl">
              La luce giusta
              <br />
              per addormentarsi
            </h1>
            <p className="mt-5 max-w-md text-muted-foreground">
              Lampade da comodino a luce LED a tema anime, lampade proiettori a tema galassia e tema pianeti e lampade al plasma.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalogo" className="btn-base btn-primary">
                Scopri il catalogo
              </Link>
              <Link to="/contatti" className="btn-base btn-outline">
                Parla con noi
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroLamp}
              alt="Lampada da comodino accesa in una camera da letto"
              width={1600}
              height={1104}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-card)]"
            />
          </div>
        </div>
      </section>

      <section className="container-page grid gap-4 sm:grid-cols-3">
        {[
          { icon: Truck, title: "Spedizione gratuita", text: "Per ordini superiori a 40€" },
          { icon: ShieldCheck, title: "Garanzia", text: "Reso gratuito entro 14 giorni" },
          { icon: Moon, title: "Luce LED", text: "Non disturba il sonno" },
        ].map((f) => (
          <div key={f.title} className="surface-card flex items-start gap-3 p-5">
            <f.icon className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">{f.title}</p>
              <p className="text-sm text-muted-foreground">{f.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="container-page mt-20">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl">I prodotti</h2>
          <Link to="/catalogo" className="text-sm text-primary hover:underline">
            Vedi tutto
          </Link>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Sfoglia i prodotti: per acquistare vai alla scheda prodotto o al catalogo.
        </p>
        <div className="mt-8 flex items-stretch gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {products.slice(0, 3).map((p) => (
            <div key={p.slug} className="flex w-[80%] flex-shrink-0 sm:w-auto sm:flex-shrink">
              <ProductCard product={p} readOnly />
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-30 mb-10">
        <h2 className="text-3xl">Cosa dicono i nostri clienti</h2>
        <div className="mt-8 flex items-stretch gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
          {reviews.map((r) => (
            <div key={r.nome} className="surface-card w-[80%] flex-shrink-0 p-6 sm:w-auto sm:flex-shrink">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < r.stelle ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">"{r.testo}"</p>
              <p className="mt-4 text-sm font-semibold">{r.nome}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
