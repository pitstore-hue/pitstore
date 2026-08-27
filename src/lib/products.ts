import proiettoreAsset from "@/assets/proiettore-cielo-stellato.png";
import proiettoreVar3pz from "@/assets/proiettore-var-3pz.png";
import proiettoreGallery01 from "@/assets/proiettore-gallery-01.png";
import proiettoreGallery02 from "@/assets/proiettore-gallery-02.png";
import proiettoreGallery03 from "@/assets/proiettore-gallery-03.png";
import proiettoreGallery04 from "@/assets/proiettore-gallery-04.png";

import dragonBallRef from "@/assets/dragon-ball-cornice-ref.png";
import dragonBallVar01 from "@/assets/dragon-ball-var-01.png";
import dragonBallVar02 from "@/assets/dragon-ball-var-02.png";
import dragonBallVar03 from "@/assets/dragon-ball-var-03.png";
import dragonBallVar04 from "@/assets/dragon-ball-var-04.png";
import dragonBallVar05 from "@/assets/dragon-ball-var-05.png";
import dragonBallVar06 from "@/assets/dragon-ball-var-06.png";
import dragonBallVar07 from "@/assets/dragon-ball-var-07.png";
import dragonBallVar08 from "@/assets/dragon-ball-var-08.png";
import dragonBallVar09 from "@/assets/dragon-ball-var-09.png";
import dragonBallVar10 from "@/assets/dragon-ball-var-10.png";
import dragonBallVar11 from "@/assets/dragon-ball-var-11.png";
import dragonBallVar12 from "@/assets/dragon-ball-var-12.png";
import dragonBallGallery01 from "@/assets/dragon-ball-gallery-01.png";
import dragonBallGallery02 from "@/assets/dragon-ball-gallery-02.png";
import dragonBallGallery03 from "@/assets/dragon-ball-gallery-03.png";
import dragonBallGallery04 from "@/assets/dragon-ball-gallery-04.png";

import flameDiffuserRef from "@/assets/flame-diffuser-ref.png";
import flameDiffuserNero from "@/assets/flame-diffuser-nero.png";
import flameDiffuserBianco from "@/assets/flame-diffuser-bianco.png";
import flameDiffuserGallery01 from "@/assets/flame-diffuser-gallery-01.png";
import flameDiffuserGallery02 from "@/assets/flame-diffuser-gallery-02.png";
import flameDiffuserGallery03 from "@/assets/flame-diffuser-gallery-03.png";
import flameDiffuserGallery04 from "@/assets/flame-diffuser-gallery-04.png";

export type Variant = {
  id: string;
  label: string;
  price: number;
  /** Prezzo barrato, mostrato sopra al prezzo reale. */
  oldPrice?: number;
  note?: string;
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  /** Foto aggiuntive scorribili con le frecce, NON legate a nessuna variante specifica. */
  gallery?: string[];
  category: string;
  tagline: string;
  description: string;
  specs: string[];
  badge?: string;
  variantLabel?: string;
  variants?: Variant[];
  soon?: boolean;
  /** Finestra di consegna stimata (in giorni da oggi), es. { min: 7, max: 11 }. */
  deliveryDays?: { min: number; max: number };
};

export const products: Product[] = [
  {
    slug: "proiettore-cielo-stellato",
    name: "Lampada Cubo Effetto Onde d'Acqua",
    price: 34.99,
    image: proiettoreAsset,
    gallery: [proiettoreGallery01, proiettoreGallery02, proiettoreGallery03, proiettoreGallery04],
    category: "Proiettori",
    tagline: "Proiettore a cubo con effetto onde d'acqua, 16 colori regolabili da telecomando",
    description:
      "Lampada a forma di cubo in cristallo acrilico con texture a onde d'acqua: la luce LED alla base crea riflessi dinamici che sembrano acqua in movimento. 16 colori selezionabili tramite telecomando incluso, con dimmer a regolazione continua da 10% a 100% per adattare l'atmosfera a ogni momento della giornata. Design elegante adatto a comodino, scrivania o soggiorno.",
    specs: [
      "16 colori selezionabili tramite telecomando incluso",
      "Dimmer a regolazione continua, luminosità dal 10% al 100%",
      "Texture 'onde d'acqua', effetto tridimensionale",
      "Design elegante da comodino o scrivania",
      "Dimensioni: 9,5 x 11 x 11 cm",
    ],
    badge: "Novità",
    variantLabel: "Modello",
    variants: [
      {
        id: "cubo-cristallo-rgb",
        label: "Cubo RGB 16 colori",
        price: 34.99,
        oldPrice: 42.99,
        note: "Risparmi 8,00 €",
        image: proiettoreVar3pz,
      },
    ],
  },
  {
    slug: "cornice-dragon-ball",
    name: "Cornice Luminosa Dragon Ball",
    price: 38.85,
    image: dragonBallRef,
    gallery: [dragonBallGallery01, dragonBallGallery02, dragonBallGallery03, dragonBallGallery04],
    category: "Cornici luminose",
    tagline: "Quadro con luce LED, si accende come una vera trasformazione",
    description:
      "Cornice fotografica con illuminazione LED integrata: da spenta è un'illustrazione in bianco e nero o a colori tenui, da accesa si trasforma in una scena luminosa a effetto con luce LED. Perfetta come lampada da comodino o scrivania per chi ama Dragon Ball, e come idea regalo per veri appassionati. Disponibile in 12 grafiche diverse dedicate ai personaggi più iconici della serie.",
    specs: [
      "Effetto 'off/on': l'immagine cambia quando la luce si accende",
      "Si accende con un semplice interruttore",
      "12 grafiche Dragon Ball disponibili",
      "Ottima come lampada da comodino",
      "Ottima come idea regalo per fan anime",
    ],
    badge: "Novità",
    variantLabel: "Grafica",
    variants: [
      { id: "01", label: "01", price: 38.85, oldPrice: 44.99, image: dragonBallVar01 },
      { id: "02", label: "02", price: 38.35, oldPrice: 44.99, image: dragonBallVar02 },
      { id: "03", label: "03", price: 38.65, oldPrice: 44.99, image: dragonBallVar03 },
      { id: "04", label: "04", price: 38.45, oldPrice: 44.99, image: dragonBallVar04 },
      { id: "05", label: "05", price: 38.45, oldPrice: 44.99, image: dragonBallVar05 },
      { id: "06", label: "06", price: 38.35, oldPrice: 44.99, image: dragonBallVar06 },
      { id: "07", label: "07", price: 38.35, oldPrice: 44.99, image: dragonBallVar07 },
      { id: "08", label: "08", price: 38.95, oldPrice: 44.99, image: dragonBallVar08 },
      { id: "09", label: "09", price: 38.35, oldPrice: 44.99, image: dragonBallVar09 },
      { id: "10", label: "10", price: 38.75, oldPrice: 44.99, image: dragonBallVar10 },
      { id: "11", label: "11", price: 38.65, oldPrice: 44.99, image: dragonBallVar11 },
      { id: "12", label: "12", price: 38.35, oldPrice: 44.99, image: dragonBallVar12 },
    ],
  },
  {
    slug: "diffusore-effetto-fiamma",
    name: "Diffusore Aromi Effetto Fiamma",
    price: 34.99,
    image: flameDiffuserRef,
    gallery: [
      flameDiffuserGallery01,
      flameDiffuserGallery02,
      flameDiffuserGallery03,
      flameDiffuserGallery04,
    ],
    category: "Diffusori",
    tagline: "Vapore illuminato che simula una fiamma viva, senza fuoco reale",
    description:
      "Diffusore di aromi con effetto fiamma realistico a 7 colori: un vapore illuminato da LED che crea l'illusione di un fuoco che danza, senza calore né rischio. Serbatoio da 120ML per fino a 5 ore di funzionamento continuo, 3 timer preimpostati (1H/3H/5H) e funzionamento ultra silenzioso (fino a 30dB) per non disturbare il sonno. Perfetto come lampada d'atmosfera da comodino, scrivania o soggiorno.",
    specs: [
      "Effetto fiamma a 7 colori tramite luce LED",
      "Serbatoio 120ML, fino a 5 ore di autonomia",
      "3 timer preimpostati: 1H, 3H, 5H",
      "Funzionamento ultra silenzioso, fino a 30dB, spegnimento automatico",
      "Nessun fuoco reale: sicuro anche vicino a tessuti e bambini",
      "Ottima idea regalo per chi ama gli oggetti d'atmosfera",
    ],
    badge: "Novità",
    variantLabel: "Colore",
    variants: [
      { id: "nero", label: "Nero", price: 34.99, oldPrice: 43.99, note: "Risparmi 9,00 €", image: flameDiffuserNero },
      { id: "bianco", label: "Bianco", price: 36.99, oldPrice: 47.99, note: "Risparmi 11,00 €", image: flameDiffuserBianco },
    ],
  },
];

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function findVariant(product: Product, variantId?: string) {
  if (!product.variants?.length) return undefined;
  return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
}

export function priceOf(product: Product, variantId?: string) {
  return findVariant(product, variantId)?.price ?? product.price;
}

/** Prezzo barrato (precedente) della variante selezionata, se presente. */
export function oldPriceOf(product: Product, variantId?: string) {
  return findVariant(product, variantId)?.oldPrice;
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(value);
