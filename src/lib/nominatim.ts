// Wrapper per l'API pubblica di OpenStreetMap Nominatim.
//
// Limiti d'uso del servizio pubblico (policy Nominatim):
// - massimo 1 richiesta al secondo (qui gestito con debounce + AbortController)
// - va indicato un User-Agent/Referer valido (il browser lo fa in automatico
//   sul dominio del sito)
// - va mostrata l'attribuzione "© OpenStreetMap contributors" nell'interfaccia
// Per traffico e-commerce importante valuta un provider a pagamento o
// un'istanza Nominatim self-hosted.

export type NominatimCity = {
  label: string;
  city: string;
  province?: string; // county/state — significativo soprattutto fuori Italia
  country: string;
  countryCode: string; // es. "it"
  lat: string;
  lon: string;
};

export type NominatimAddress = {
  label: string;
  road: string;
  houseNumber: string;
  city?: string;
  lat: string;
  lon: string;
};

const BASE = "https://nominatim.openstreetmap.org/search";

export async function searchCitiesNominatim(
  query: string,
  signal?: AbortSignal,
): Promise<NominatimCity[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const url = new URL(BASE);
  url.searchParams.set("q", q);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", "8");

  const res = await fetch(url.toString(), {
    signal: signal ?? null,
    headers: { "Accept-Language": "it" },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as any[];

  const out: NominatimCity[] = [];
  for (const d of data) {
    const addr = d.address ?? {};
    const city = addr.city || addr.town || addr.village || addr.municipality;
    if (!city) continue;
    out.push({
      label: d.display_name,
      city,
      province: addr.county || addr.state_district || addr.province,
      country: addr.country ?? "",
      countryCode: (addr.country_code ?? "").toLowerCase(),
      lat: d.lat,
      lon: d.lon,
    });
  }
  return out;
}

export async function searchAddressesNominatim(
  query: string,
  context: { city?: string; country?: string },
  signal?: AbortSignal,
): Promise<NominatimAddress[]> {
  const q = query.trim();
  if (q.length < 3) return [];

  const composed = [q, context.city, context.country].filter(Boolean).join(", ");
  const url = new URL(BASE);
  url.searchParams.set("q", composed);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", "6");

  const res = await fetch(url.toString(), {
    signal: signal ?? null,
    headers: { "Accept-Language": "it" },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as any[];

  return data
    .map((d) => {
      const addr = d.address ?? {};
      const road = addr.road || addr.pedestrian || addr.footway || "";
      if (!road) return null;
      return {
        label: d.display_name,
        road,
        houseNumber: addr.house_number ?? "",
        city: addr.city || addr.town || addr.village,
        lat: d.lat,
        lon: d.lon,
      } as NominatimAddress;
    })
    .filter((x): x is NominatimAddress => x !== null);
}
