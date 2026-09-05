import proiettoreAsset from "@/assets/proiettore-cielo-stellato.png";
import proiettoreVar3pz from "@/assets/proiettore-var-3pz.png";
import proiettoreGallery01 from "@/assets/proiettore-gallery-01.png";
import proiettoreGallery02 from "@/assets/proiettore-gallery-02.png";
import proiettoreGallery03 from "@/assets/proiettore-gallery-03.png";
import proiettoreGallery04 from "@/assets/proiettore-gallery-04.png";

import cuboLedCover from "@/assets/cubo-led-cover.png";
import cuboLedVarAssemblato from "@/assets/cubo-led-var-assemblato.png";
import cuboLedVarKit from "@/assets/cubo-led-var-kit.png";
import cuboLedGallery01 from "@/assets/cubo-led-gallery-01.png";
import cuboLedGallery02 from "@/assets/cubo-led-gallery-02.png";
import cuboLedGallery03 from "@/assets/cubo-led-gallery-03.png";
import cuboLedGallery04 from "@/assets/cubo-led-gallery-04.png";

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
    slug: "cubo-led-infinity-tunnel",
    name: "Cubo LED Infinity Effetto Tunnel 4D",
    price: 53.99,
    image: cuboLedCover,
    gallery: [cuboLedGallery01, cuboLedGallery02, cuboLedGallery03, cuboLedGallery04],
    category: "Cubi LED",
    tagline: "Cubo luminoso con effetto tunnel infinito 4D, disponibile assemblato o in kit fai-da-te",
    description:
      "Cubo decorativo con struttura a LED che crea un affascinante effetto tunnel infinito, ideale come lampada d'atmosfera per comodino, scrivania o postazione gaming. Disponibile già assemblato e pronto all'uso, oppure in versione kit fai-da-te per chi ama montare i propri progetti: un'esperienza di assemblaggio semplice e divertente, con tutti i componenti inclusi. Alimentazione tramite USB, luce bianca intensa e design moderno in acrilico trasparente.",
    specs: [
      "Effetto tunnel infinito 4D con struttura a LED",
      "Alimentazione USB, luce bianca",
      "Disponibile assemblato o in kit fai-da-te da montare",
      "Struttura in acrilico trasparente, design moderno",
      "Ottimo come lampada d'atmosfera da comodino o scrivania",
    ],
    badge: "Novità",
    variantLabel: "Versione",
    variants: [
      {
        id: "assemblato",
        label: "Assemblato",
        price: 53.99,
        oldPrice: 65,
        note: "Risparmi 11,01 €",
        image: cuboLedVarAssemblato,
      },
      {
        id: "kit-fai-da-te",
        label: "Kit fai-da-te",
        price: 34.99,
        oldPrice: 50,
        note: "Risparmi 15,00 €",
        image: cuboLedVarKit,
      },
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
