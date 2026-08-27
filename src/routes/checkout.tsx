import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CreditCard, Lock, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/lib/orders.functions";
import { formatPrice } from "@/lib/products";
import { AutocompleteField } from "@/components/AutocompleteField";
import { searchComuni, provinciaDiComune, type ComuneIT } from "@/lib/it-cities";
import { searchCitiesNominatim, searchAddressesNominatim, type NominatimCity, type NominatimAddress } from "@/lib/nominatim";
import { isPlausiblePhone } from "@/lib/phone";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout sicuro — Notte" },
      {
        name: "description",
        content: "Completa il tuo ordine: dati di spedizione, fatturazione e pagamento sicuro.",
      },
      { property: "og:title", content: "Checkout sicuro — Notte" },
      { property: "og:description", content: "Pagamento protetto con carta o PayPal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

// Solo lettere (accentate incluse), spazi, apostrofi e trattini — niente cifre.
const LETTERS_ONLY = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'’.-]+$/;
// Civico: alfanumerico permissivo (es. "12", "12/A", "4 bis").
const CIVICO_OK = /^[A-Za-z0-9/\s.-]+$/;

// Tabella prefissi telefonici internazionali (ordine alfabetico, Italia predefinita).
type CountryDialCode = { iso: string; name: string; dial: string; flag: string };
const COUNTRY_CODES: CountryDialCode[] = [
  { iso: "AF", name: "Afghanistan", dial: "+93", flag: "🇦🇫" },
  { iso: "AL", name: "Albania", dial: "+355", flag: "🇦🇱" },
  { iso: "DZ", name: "Algeria", dial: "+213", flag: "🇩🇿" },
  { iso: "AD", name: "Andorra", dial: "+376", flag: "🇦🇩" },
  { iso: "AO", name: "Angola", dial: "+244", flag: "🇦🇴" },
  { iso: "AG", name: "Antigua e Barbuda", dial: "+1268", flag: "🇦🇬" },
  { iso: "SA", name: "Arabia Saudita", dial: "+966", flag: "🇸🇦" },
  { iso: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { iso: "AM", name: "Armenia", dial: "+374", flag: "🇦🇲" },
  { iso: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { iso: "AT", name: "Austria", dial: "+43", flag: "🇦🇹" },
  { iso: "AZ", name: "Azerbaigian", dial: "+994", flag: "🇦🇿" },
  { iso: "BS", name: "Bahamas", dial: "+1242", flag: "🇧🇸" },
  { iso: "BH", name: "Bahrein", dial: "+973", flag: "🇧🇭" },
  { iso: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { iso: "BB", name: "Barbados", dial: "+1246", flag: "🇧🇧" },
  { iso: "BE", name: "Belgio", dial: "+32", flag: "🇧🇪" },
  { iso: "BZ", name: "Belize", dial: "+501", flag: "🇧🇿" },
  { iso: "BJ", name: "Benin", dial: "+229", flag: "🇧🇯" },
  { iso: "BT", name: "Bhutan", dial: "+975", flag: "🇧🇹" },
  { iso: "BY", name: "Bielorussia", dial: "+375", flag: "🇧🇾" },
  { iso: "BO", name: "Bolivia", dial: "+591", flag: "🇧🇴" },
  { iso: "BA", name: "Bosnia ed Erzegovina", dial: "+387", flag: "🇧🇦" },
  { iso: "BW", name: "Botswana", dial: "+267", flag: "🇧🇼" },
  { iso: "BR", name: "Brasile", dial: "+55", flag: "🇧🇷" },
  { iso: "BN", name: "Brunei", dial: "+673", flag: "🇧🇳" },
  { iso: "BG", name: "Bulgaria", dial: "+359", flag: "🇧🇬" },
  { iso: "BF", name: "Burkina Faso", dial: "+226", flag: "🇧🇫" },
  { iso: "BI", name: "Burundi", dial: "+257", flag: "🇧🇮" },
  { iso: "KH", name: "Cambogia", dial: "+855", flag: "🇰🇭" },
  { iso: "CM", name: "Camerun", dial: "+237", flag: "🇨🇲" },
  { iso: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { iso: "CV", name: "Capo Verde", dial: "+238", flag: "🇨🇻" },
  { iso: "TD", name: "Ciad", dial: "+235", flag: "🇹🇩" },
  { iso: "CL", name: "Cile", dial: "+56", flag: "🇨🇱" },
  { iso: "CN", name: "Cina", dial: "+86", flag: "🇨🇳" },
  { iso: "CY", name: "Cipro", dial: "+357", flag: "🇨🇾" },
  { iso: "VA", name: "Città del Vaticano", dial: "+379", flag: "🇻🇦" },
  { iso: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { iso: "KM", name: "Comore", dial: "+269", flag: "🇰🇲" },
  { iso: "KP", name: "Corea del Nord", dial: "+850", flag: "🇰🇵" },
  { iso: "KR", name: "Corea del Sud", dial: "+82", flag: "🇰🇷" },
  { iso: "CR", name: "Costa Rica", dial: "+506", flag: "🇨🇷" },
  { iso: "CI", name: "Costa d'Avorio", dial: "+225", flag: "🇨🇮" },
  { iso: "HR", name: "Croazia", dial: "+385", flag: "🇭🇷" },
  { iso: "CU", name: "Cuba", dial: "+53", flag: "🇨🇺" },
  { iso: "DK", name: "Danimarca", dial: "+45", flag: "🇩🇰" },
  { iso: "DM", name: "Dominica", dial: "+1767", flag: "🇩🇲" },
  { iso: "EC", name: "Ecuador", dial: "+593", flag: "🇪🇨" },
  { iso: "EG", name: "Egitto", dial: "+20", flag: "🇪🇬" },
  { iso: "SV", name: "El Salvador", dial: "+503", flag: "🇸🇻" },
  { iso: "AE", name: "Emirati Arabi Uniti", dial: "+971", flag: "🇦🇪" },
  { iso: "ER", name: "Eritrea", dial: "+291", flag: "🇪🇷" },
  { iso: "EE", name: "Estonia", dial: "+372", flag: "🇪🇪" },
  { iso: "SZ", name: "Eswatini", dial: "+268", flag: "🇸🇿" },
  { iso: "ET", name: "Etiopia", dial: "+251", flag: "🇪🇹" },
  { iso: "FJ", name: "Figi", dial: "+679", flag: "🇫🇯" },
  { iso: "PH", name: "Filippine", dial: "+63", flag: "🇵🇭" },
  { iso: "FI", name: "Finlandia", dial: "+358", flag: "🇫🇮" },
  { iso: "FR", name: "Francia", dial: "+33", flag: "🇫🇷" },
  { iso: "GA", name: "Gabon", dial: "+241", flag: "🇬🇦" },
  { iso: "GM", name: "Gambia", dial: "+220", flag: "🇬🇲" },
  { iso: "GE", name: "Georgia", dial: "+995", flag: "🇬🇪" },
  { iso: "DE", name: "Germania", dial: "+49", flag: "🇩🇪" },
  { iso: "GH", name: "Ghana", dial: "+233", flag: "🇬🇭" },
  { iso: "JM", name: "Giamaica", dial: "+1876", flag: "🇯🇲" },
  { iso: "JP", name: "Giappone", dial: "+81", flag: "🇯🇵" },
  { iso: "GI", name: "Gibilterra", dial: "+350", flag: "🇬🇮" },
  { iso: "DJ", name: "Gibuti", dial: "+253", flag: "🇩🇯" },
  { iso: "JO", name: "Giordania", dial: "+962", flag: "🇯🇴" },
  { iso: "GR", name: "Grecia", dial: "+30", flag: "🇬🇷" },
  { iso: "GD", name: "Grenada", dial: "+1473", flag: "🇬🇩" },
  { iso: "GT", name: "Guatemala", dial: "+502", flag: "🇬🇹" },
  { iso: "GN", name: "Guinea", dial: "+224", flag: "🇬🇳" },
  { iso: "GQ", name: "Guinea Equatoriale", dial: "+240", flag: "🇬🇶" },
  { iso: "GW", name: "Guinea-Bissau", dial: "+245", flag: "🇬🇼" },
  { iso: "GY", name: "Guyana", dial: "+592", flag: "🇬🇾" },
  { iso: "HT", name: "Haiti", dial: "+509", flag: "🇭🇹" },
  { iso: "HN", name: "Honduras", dial: "+504", flag: "🇭🇳" },
  { iso: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { iso: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩" },
  { iso: "IR", name: "Iran", dial: "+98", flag: "🇮🇷" },
  { iso: "IQ", name: "Iraq", dial: "+964", flag: "🇮🇶" },
  { iso: "IE", name: "Irlanda", dial: "+353", flag: "🇮🇪" },
  { iso: "IS", name: "Islanda", dial: "+354", flag: "🇮🇸" },
  { iso: "MH", name: "Isole Marshall", dial: "+692", flag: "🇲🇭" },
  { iso: "IL", name: "Israele", dial: "+972", flag: "🇮🇱" },
  { iso: "IT", name: "Italia", dial: "+39", flag: "🇮🇹" },
  { iso: "KZ", name: "Kazakistan", dial: "+7", flag: "🇰🇿" },
  { iso: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { iso: "KG", name: "Kirghizistan", dial: "+996", flag: "🇰🇬" },
  { iso: "KI", name: "Kiribati", dial: "+686", flag: "🇰🇮" },
  { iso: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { iso: "LA", name: "Laos", dial: "+856", flag: "🇱🇦" },
  { iso: "LS", name: "Lesotho", dial: "+266", flag: "🇱🇸" },
  { iso: "LV", name: "Lettonia", dial: "+371", flag: "🇱🇻" },
  { iso: "LB", name: "Libano", dial: "+961", flag: "🇱🇧" },
  { iso: "LR", name: "Liberia", dial: "+231", flag: "🇱🇷" },
  { iso: "LY", name: "Libia", dial: "+218", flag: "🇱🇾" },
  { iso: "LI", name: "Liechtenstein", dial: "+423", flag: "🇱🇮" },
  { iso: "LT", name: "Lituania", dial: "+370", flag: "🇱🇹" },
  { iso: "LU", name: "Lussemburgo", dial: "+352", flag: "🇱🇺" },
  { iso: "MK", name: "Macedonia del Nord", dial: "+389", flag: "🇲🇰" },
  { iso: "MG", name: "Madagascar", dial: "+261", flag: "🇲🇬" },
  { iso: "MW", name: "Malawi", dial: "+265", flag: "🇲🇼" },
  { iso: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { iso: "MV", name: "Maldive", dial: "+960", flag: "🇲🇻" },
  { iso: "ML", name: "Mali", dial: "+223", flag: "🇲🇱" },
  { iso: "MT", name: "Malta", dial: "+356", flag: "🇲🇹" },
  { iso: "MA", name: "Marocco", dial: "+212", flag: "🇲🇦" },
  { iso: "MR", name: "Mauritania", dial: "+222", flag: "🇲🇷" },
  { iso: "MU", name: "Mauritius", dial: "+230", flag: "🇲🇺" },
  { iso: "MX", name: "Messico", dial: "+52", flag: "🇲🇽" },
  { iso: "MD", name: "Moldavia", dial: "+373", flag: "🇲🇩" },
  { iso: "MC", name: "Monaco", dial: "+377", flag: "🇲🇨" },
  { iso: "MN", name: "Mongolia", dial: "+976", flag: "🇲🇳" },
  { iso: "ME", name: "Montenegro", dial: "+382", flag: "🇲🇪" },
  { iso: "MZ", name: "Mozambico", dial: "+258", flag: "🇲🇿" },
  { iso: "MM", name: "Myanmar (Birmania)", dial: "+95", flag: "🇲🇲" },
  { iso: "NA", name: "Namibia", dial: "+264", flag: "🇳🇦" },
  { iso: "NR", name: "Nauru", dial: "+674", flag: "🇳🇷" },
  { iso: "NP", name: "Nepal", dial: "+977", flag: "🇳🇵" },
  { iso: "NI", name: "Nicaragua", dial: "+505", flag: "🇳🇮" },
  { iso: "NE", name: "Niger", dial: "+227", flag: "🇳🇪" },
  { iso: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { iso: "NO", name: "Norvegia", dial: "+47", flag: "🇳🇴" },
  { iso: "NZ", name: "Nuova Zelanda", dial: "+64", flag: "🇳🇿" },
  { iso: "OM", name: "Oman", dial: "+968", flag: "🇴🇲" },
  { iso: "NL", name: "Paesi Bassi", dial: "+31", flag: "🇳🇱" },
  { iso: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { iso: "PW", name: "Palau", dial: "+680", flag: "🇵🇼" },
  { iso: "PA", name: "Panama", dial: "+507", flag: "🇵🇦" },
  { iso: "PG", name: "Papua Nuova Guinea", dial: "+675", flag: "🇵🇬" },
  { iso: "PY", name: "Paraguay", dial: "+595", flag: "🇵🇾" },
  { iso: "PE", name: "Perù", dial: "+51", flag: "🇵🇪" },
  { iso: "PL", name: "Polonia", dial: "+48", flag: "🇵🇱" },
  { iso: "PT", name: "Portogallo", dial: "+351", flag: "🇵🇹" },
  { iso: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { iso: "GB", name: "Regno Unito", dial: "+44", flag: "🇬🇧" },
  { iso: "CZ", name: "Repubblica Ceca", dial: "+420", flag: "🇨🇿" },
  { iso: "CF", name: "Repubblica Centrafricana", dial: "+236", flag: "🇨🇫" },
  { iso: "CD", name: "Repubblica Democratica del Congo", dial: "+243", flag: "🇨🇩" },
  { iso: "DO", name: "Repubblica Dominicana", dial: "+1809", flag: "🇩🇴" },
  { iso: "CG", name: "Repubblica del Congo", dial: "+242", flag: "🇨🇬" },
  { iso: "RO", name: "Romania", dial: "+40", flag: "🇷🇴" },
  { iso: "RW", name: "Ruanda", dial: "+250", flag: "🇷🇼" },
  { iso: "RU", name: "Russia", dial: "+7", flag: "🇷🇺" },
  { iso: "KN", name: "Saint Kitts e Nevis", dial: "+1869", flag: "🇰🇳" },
  { iso: "LC", name: "Saint Lucia", dial: "+1758", flag: "🇱🇨" },
  { iso: "VC", name: "Saint Vincent e Grenadine", dial: "+1784", flag: "🇻🇨" },
  { iso: "WS", name: "Samoa", dial: "+685", flag: "🇼🇸" },
  { iso: "SM", name: "San Marino", dial: "+378", flag: "🇸🇲" },
  { iso: "SN", name: "Senegal", dial: "+221", flag: "🇸🇳" },
  { iso: "RS", name: "Serbia", dial: "+381", flag: "🇷🇸" },
  { iso: "SC", name: "Seychelles", dial: "+248", flag: "🇸🇨" },
  { iso: "SL", name: "Sierra Leone", dial: "+232", flag: "🇸🇱" },
  { iso: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { iso: "SY", name: "Siria", dial: "+963", flag: "🇸🇾" },
  { iso: "SK", name: "Slovacchia", dial: "+421", flag: "🇸🇰" },
  { iso: "SI", name: "Slovenia", dial: "+386", flag: "🇸🇮" },
  { iso: "SO", name: "Somalia", dial: "+252", flag: "🇸🇴" },
  { iso: "ES", name: "Spagna", dial: "+34", flag: "🇪🇸" },
  { iso: "LK", name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { iso: "US", name: "Stati Uniti", dial: "+1", flag: "🇺🇸" },
  { iso: "ZA", name: "Sudafrica", dial: "+27", flag: "🇿🇦" },
  { iso: "SD", name: "Sudan", dial: "+249", flag: "🇸🇩" },
  { iso: "SS", name: "Sudan del Sud", dial: "+211", flag: "🇸🇸" },
  { iso: "SR", name: "Suriname", dial: "+597", flag: "🇸🇷" },
  { iso: "SE", name: "Svezia", dial: "+46", flag: "🇸🇪" },
  { iso: "CH", name: "Svizzera", dial: "+41", flag: "🇨🇭" },
  { iso: "ST", name: "São Tomé e Príncipe", dial: "+239", flag: "🇸🇹" },
  { iso: "TJ", name: "Tagikistan", dial: "+992", flag: "🇹🇯" },
  { iso: "TW", name: "Taiwan", dial: "+886", flag: "🇹🇼" },
  { iso: "TZ", name: "Tanzania", dial: "+255", flag: "🇹🇿" },
  { iso: "TH", name: "Thailandia", dial: "+66", flag: "🇹🇭" },
  { iso: "TL", name: "Timor Est", dial: "+670", flag: "🇹🇱" },
  { iso: "TG", name: "Togo", dial: "+228", flag: "🇹🇬" },
  { iso: "TO", name: "Tonga", dial: "+676", flag: "🇹🇴" },
  { iso: "TT", name: "Trinidad e Tobago", dial: "+1868", flag: "🇹🇹" },
  { iso: "TN", name: "Tunisia", dial: "+216", flag: "🇹🇳" },
  { iso: "TR", name: "Turchia", dial: "+90", flag: "🇹🇷" },
  { iso: "TM", name: "Turkmenistan", dial: "+993", flag: "🇹🇲" },
  { iso: "TV", name: "Tuvalu", dial: "+688", flag: "🇹🇻" },
  { iso: "UA", name: "Ucraina", dial: "+380", flag: "🇺🇦" },
  { iso: "UG", name: "Uganda", dial: "+256", flag: "🇺🇬" },
  { iso: "HU", name: "Ungheria", dial: "+36", flag: "🇭🇺" },
  { iso: "UY", name: "Uruguay", dial: "+598", flag: "🇺🇾" },
  { iso: "UZ", name: "Uzbekistan", dial: "+998", flag: "🇺🇿" },
  { iso: "VU", name: "Vanuatu", dial: "+678", flag: "🇻🇺" },
  { iso: "VE", name: "Venezuela", dial: "+58", flag: "🇻🇪" },
  { iso: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳" },
  { iso: "ZM", name: "Zambia", dial: "+260", flag: "🇿🇲" },
  { iso: "ZW", name: "Zimbabwe", dial: "+263", flag: "🇿🇼" },
];

const schema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Email non valida"),
    nome: z.string().trim().min(2, "Campo obbligatorio").max(80).regex(LETTERS_ONLY, "Solo lettere, niente numeri"),
    cognome: z.string().trim().min(2, "Campo obbligatorio").max(80).regex(LETTERS_ONLY, "Solo lettere, niente numeri"),
    telefono: z
      .string()
      .trim()
      .min(6, "Campo obbligatorio")
      .max(30)
      .refine((v) => isPlausiblePhone(v, "IT"), "Numero di telefono non valido"),
    citta: z.string().trim().min(2, "Seleziona una città dall'elenco").max(80),
    provincia: z.string().trim().max(40).optional().default(""),
    paese: z.string().trim().min(2, "Campo obbligatorio").max(80),
    indirizzo: z.string().trim().min(4, "Seleziona un indirizzo dall'elenco").max(160),
    civico: z.string().trim().min(1, "Campo obbligatorio").max(20).regex(CIVICO_OK, "Numero civico non valido"),
    cap: z.string().trim().min(1, "Campo obbligatorio").max(12),
  })
  .superRefine((val, ctx) => {
    const isItalia = val.paese.trim().toLowerCase() === "italia";
    if (isItalia) {
      if (!/^[A-Z]{2}$/.test(val.provincia.trim())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["provincia"],
          message: "Provincia: 2 lettere maiuscole (es. MI)",
        });
      }
      if (!/^\d{5}$/.test(val.cap.trim())) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cap"], message: "CAP italiano: 5 cifre" });
      } else if (/[A-Za-z]/.test(val.cap)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cap"], message: "Il CAP deve contenere solo cifre" });
      }
    }
  });

function Field({
  id,
  label,
  error,
  ...rest
}: { id: string; label: string; error?: string | undefined } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input id={id} name={id} className="field-input mt-1" {...rest} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

type CityOption = {
  key: string;
  label: string;
  comune: string;
  provincia: string | null;
  paese: string;
  source: "it" | "osm";
};

function useDebounced<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function Checkout() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<"carta" | "paypal">("carta");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submitOrder = useServerFn(createOrder);
  const navigate = useNavigate();

  // ── Prefisso telefonico (predefinito Italia) ─────────────────────────────
  const [phonePrefixIso, setPhonePrefixIso] = useState<string>("IT");
  const phonePrefix: CountryDialCode = COUNTRY_CODES.find((c) => c.iso === phonePrefixIso) ?? COUNTRY_CODES[0]!;
  const [prefixOpen, setPrefixOpen] = useState(false);
  const [prefixFilter, setPrefixFilter] = useState("");
  const prefixRef = useRef<HTMLDivElement>(null);
  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(prefixFilter.trim().toLowerCase()) ||
      c.dial.includes(prefixFilter.trim()),
  );

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (prefixRef.current && !prefixRef.current.contains(e.target as Node)) {
        setPrefixOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // ── Città / Provincia (collegate) ────────────────────────────────────────
  const [provinciaQuery, setProvinciaQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<{ comune: string; provincia: string; paese: string } | null>(null);
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const debouncedCityQuery = useDebounced(cityQuery, 350);
  const debouncedProvincia = useDebounced(provinciaQuery, 350);
  const cityAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const localMatches: ComuneIT[] = searchComuni(debouncedCityQuery, debouncedProvincia || null, 6);
      const localAsOptions: CityOption[] = localMatches.map((c) => ({
        key: `it-${c.comune}-${c.sigla}`,
        label: `${c.comune} (${c.sigla}) — ${c.provincia}`,
        comune: c.comune,
        provincia: c.sigla,
        paese: "Italia",
        source: "it",
      }));

      // Se la provincia scritta corrisponde a una provincia italiana nota,
      // restringiamo alla sola Italia e non serve interrogare Nominatim.
      const provinciaENota = debouncedProvincia.trim().length > 0 && localMatches.length > 0;

      if (provinciaENota || debouncedCityQuery.trim().length < 2) {
        if (!cancelled) {
          setCityOptions(localAsOptions);
          setCityLoading(false);
        }
        return;
      }

      setCityLoading(true);
      cityAbort.current?.abort();
      const controller = new AbortController();
      cityAbort.current = controller;
      try {
        const osm: NominatimCity[] = await searchCitiesNominatim(debouncedCityQuery, controller.signal);
        if (cancelled) return;
        const osmAsOptions: CityOption[] = osm
          .filter((o) => o.countryCode !== "it") // le città italiane arrivano già dal dataset locale
          .map((o) => ({
            key: `osm-${o.city}-${o.countryCode}-${o.lat}`,
            label: `${o.city} — ${o.country}`,
            comune: o.city,
            provincia: o.province ?? null,
            paese: o.country,
            source: "osm",
          }));
        const merged = [...localAsOptions, ...osmAsOptions].slice(0, 8);
        setCityOptions(merged);
      } catch {
        if (!cancelled) setCityOptions(localAsOptions);
      } finally {
        if (!cancelled) setCityLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedCityQuery, debouncedProvincia]);

  function onSelectCity(opt: CityOption) {
    setCityQuery(opt.comune);
    setSelectedCity({ comune: opt.comune, provincia: opt.provincia ?? "", paese: opt.paese });
    setProvinciaQuery(opt.provincia ?? "");
    // cambiando città, l'indirizzo scelto in precedenza non è più valido
    setSelectedAddress(null);
    setAddressQuery("");
  }

  function onChangeCityText(text: string) {
    setCityQuery(text);
    // se l'utente riscrive manualmente la città, invalida la selezione finché non sceglie di nuovo dal menu
    setSelectedCity(null);
  }

  const isItalia = (selectedCity?.paese ?? "Italia").toLowerCase() === "italia";

  // ── Indirizzo (collegato a città/provincia) ──────────────────────────────
  const [addressQuery, setAddressQuery] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<{ road: string } | null>(null);
  const [civico, setCivico] = useState("");
  const [addressOptions, setAddressOptions] = useState<NominatimAddress[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const debouncedAddressQuery = useDebounced(addressQuery, 350);
  const addressAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!selectedCity || debouncedAddressQuery.trim().length < 3) {
        setAddressOptions([]);
        return;
      }
      setAddressLoading(true);
      addressAbort.current?.abort();
      const controller = new AbortController();
      addressAbort.current = controller;
      try {
        const res = await searchAddressesNominatim(
          debouncedAddressQuery,
          { city: selectedCity.comune, country: selectedCity.paese },
          controller.signal,
        );
        if (!cancelled) setAddressOptions(res);
      } catch {
        if (!cancelled) setAddressOptions([]);
      } finally {
        if (!cancelled) setAddressLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedAddressQuery, selectedCity]);

  function onSelectAddress(opt: NominatimAddress) {
    setAddressQuery(opt.road);
    setSelectedAddress({ road: opt.road });
    if (opt.houseNumber) setCivico(opt.houseNumber);
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl">Il carrello è vuoto</h1>
        <p className="mt-2 text-muted-foreground">Aggiungi una lampada per procedere.</p>
        <Link to="/catalogo" className="btn-base btn-primary mt-6">
          Vai al catalogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="text-4xl">Checkout</h1>

      <form
        className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]"
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const plain = Object.fromEntries(fd.entries());

          const payload = {
            ...plain,
            telefono: `${phonePrefix!.dial} ${String(plain["telefono"] ?? "").trim()}`.trim(),
            citta: selectedCity?.comune ?? cityQuery,
            provincia: provinciaQuery,
            paese: selectedCity?.paese ?? "Italia",
            indirizzo: selectedAddress?.road ?? addressQuery,
            civico,
          };

          const parsed = schema.safeParse(payload);
          if (!parsed.success) {
            const next: Record<string, string> = {};
            for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
            setErrors(next);
            return;
          }
          setErrors({});
          setSubmitError(null);
          setLoading(true);
                   try {
  const res = await submitOrder({
    data: {
      ...parsed.data,
      metodo_pagamento: method,
      items: items.map((i) => ({
        prodotto: i.product.name,
        variante: i.variant?.label ?? null,
        quantita: i.qty,
        prezzo: i.unitPrice,
      })),
      subtotale: subtotal,
      spedizione: shipping,
      totale: total,
    },
  });

  if (method === "carta") {
    const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
      "create-checkout-session",
      {
        body: {
          numero_ordine: res.numero_ordine,
          items: items.map((i) => ({
            name: i.product.name,
            price: Math.round(i.unitPrice * 100), // in centesimi
            quantity: i.qty,
          })),
        },
      },
    );

    if (checkoutError || !checkoutData?.url) {
      throw new Error("Impossibile avviare il pagamento");
    }

    clear();
    window.location.href = checkoutData.url; // porta il cliente a pagare su Stripe
    return;
  }

  if (method === "paypal") {
    const { data: paypalData, error: paypalError } = await supabase.functions.invoke(
      "create-paypal-order",
      {
        body: {
          numero_ordine: res.numero_ordine,
          totale: total,
          items: items.map((i) => ({
            name: i.product.name,
            price: Math.round(i.unitPrice * 100),
            quantity: i.qty,
          })),
        },
      },
    );

    if (paypalError || !paypalData?.url) {
      throw new Error("Impossibile avviare il pagamento PayPal");
    }

    clear();
    window.location.href = paypalData.url; // porta il cliente ad approvare su PayPal
    return;
  }
} catch (err) {
  console.error(err);
  setSubmitError("Non è stato possibile completare l'ordine. Riprova.");
  setLoading(false);
}
        }}
      >
        <div className="space-y-6">
          <section className="surface-card space-y-4 p-6">
            <h2 className="text-xl">1. Contatti</h2>
            <Field id="email" label="Email" type="email" error={errors["email"]} maxLength={255} required />
            <div>
              <label htmlFor="telefono" className="text-sm">
                Telefono
              </label>
              <div className="mt-1 flex gap-2">
                <div ref={prefixRef} className="relative w-20 shrink-0 md:w-52">
                  <button
                    type="button"
                    onClick={() => setPrefixOpen((v) => !v)}
                    aria-label="Prefisso internazionale"
                    aria-expanded={prefixOpen}
                    className="field-input flex w-full items-center justify-between gap-1 whitespace-nowrap !px-2 text-left md:!px-3"
                  >
                    <span className="truncate">
                      <span className="md:hidden">{phonePrefix.dial}</span>
                      <span className="hidden md:inline">
                        {phonePrefix.name} ({phonePrefix.dial})
                      </span>
                    </span>
                    <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                  </button>

                  {prefixOpen && (
                    <div className="absolute left-0 top-full z-30 mt-1 w-[min(280px,85vw)] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
                      <input
                        autoFocus
                        value={prefixFilter}
                        onChange={(e) => setPrefixFilter(e.target.value)}
                        placeholder="Cerca paese…"
                        className="field-input m-2 w-[calc(100%-1rem)]"
                      />
                      <ul className="max-h-56 overflow-y-auto px-1 pb-1">
                        {filteredCountries.length === 0 ? (
                          <li className="px-3 py-4 text-center text-xs text-muted-foreground">
                            Nessun paese trovato
                          </li>
                        ) : (
                          filteredCountries.map((c) => (
                            <li key={c.iso}>
                              <button
                                type="button"
                                onClick={() => {
                                  setPhonePrefixIso(c.iso);
                                  setPrefixOpen(false);
                                  setPrefixFilter("");
                                }}
                                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-secondary ${
                                  c.iso === phonePrefixIso ? "bg-secondary text-primary" : ""
                                }`}
                              >
                                <span className="flex-1 truncate">{c.name}</span>
                                <span className="text-muted-foreground">{c.dial}</span>
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="Numero di telefono"
                  maxLength={20}
                  required
                  className="field-input flex-1"
                />
              </div>
              {errors["telefono"] && <p className="mt-1 text-xs text-destructive">{errors["telefono"]}</p>}
            </div>
          </section>

          <section className="surface-card space-y-4 p-6">
            <h2 className="text-xl">2. Spedizione</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="nome" label="Nome" error={errors["nome"]} maxLength={80} required />
              <Field id="cognome" label="Cognome" error={errors["cognome"]} maxLength={80} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_90px]">
              <AutocompleteField
                id="citta"
                label="Città"
                value={cityQuery}
                onChangeText={onChangeCityText}
                options={cityOptions}
                loading={cityLoading}
                error={errors["citta"] ?? ""}
                getOptionKey={(o) => o.key}
                getOptionLabel={(o) => o.label}
                onSelect={onSelectCity}
                emptyMessage="Nessuna città trovata"
              />

              <div>
                <label htmlFor="provinciaQuery" className="text-sm">
                  Provincia
                </label>
                <input
                  id="provinciaQuery"
                  autoComplete="off"
                  value={provinciaQuery}
                  disabled={!isItalia}
                  maxLength={2}
                  style={{ textTransform: "uppercase" }}
                  onChange={(e) => {
                    const next = e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
                    setProvinciaQuery(next);
                    setSelectedCity(null);
                  }}
                  placeholder={isItalia ? "MI" : "—"}
                  className="field-input mt-1"
                />
                {errors["provincia"] && <p className="mt-1 text-xs text-destructive">{errors["provincia"]}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
              <AutocompleteField
                id="indirizzo"
                label="Indirizzo"
                value={addressQuery}
                disabled={!selectedCity}
                placeholder={selectedCity ? "Via/Piazza…" : "Seleziona prima la città"}
                onChangeText={(t) => {
                  setAddressQuery(t);
                  setSelectedAddress(null);
                }}
                options={addressOptions}
                loading={addressLoading}
                error={errors["indirizzo"] ?? ""}
                getOptionKey={(o) => `${o.road}-${o.lat}-${o.lon}`}
                getOptionLabel={(o) => o.label}
                onSelect={onSelectAddress}
                emptyMessage="Nessun indirizzo trovato"
              />
              <div>
                <label htmlFor="civico" className="text-sm">
                  N. civico
                </label>
                <input
                  id="civico"
                  autoComplete="off"
                  value={civico}
                  onChange={(e) => setCivico(e.target.value)}
                  maxLength={20}
                  className="field-input mt-1"
                />
                {errors["civico"] && <p className="mt-1 text-xs text-destructive">{errors["civico"]}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="cap"
                label={isItalia ? "CAP (5 cifre)" : "Codice postale"}
                error={errors["cap"]}
                maxLength={12}
                inputMode={isItalia ? "numeric" : "text"}
                required
              />
              <div>
                <label className="text-sm">Paese</label>
                <input
                  disabled
                  value={selectedCity?.paese ?? "Italia"}
                  className="field-input mt-1 opacity-70"
                />
              </div>
            </div>
          </section>

          <section className="surface-card space-y-4 p-6">
            <h2 className="text-xl">3. Pagamento</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setMethod("carta")}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm ${
                  method === "carta" ? "border-primary bg-secondary" : "border-border"
                }`}
              >
                <CreditCard className="size-4 text-primary" />
                <span>
                  Carta di credito
                  <span className="block text-xs text-muted-foreground">Visa, Mastercard, Amex</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setMethod("paypal")}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm ${
                  method === "paypal" ? "border-primary bg-secondary" : "border-border"
                }`}
              >
                <span className="font-display text-base text-primary">PP</span>
                <span>
                  PayPal
                  <span className="block text-xs text-muted-foreground">Paghi con il tuo account</span>
                </span>
              </button>
            </div>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3" /> I dati della carta vengono richiesti nella pagina di pagamento protetta.
            </p>
          </section>
        </div>

        <aside className="surface-card h-fit space-y-4 p-6">
          <h2 className="text-xl">Riepilogo</h2>
          <ul className="space-y-3">
            {items.map(({ key, product, qty, variant, unitPrice }) => (
              <li key={key} className="flex items-center gap-3 text-sm">
                <img
                  src={variant?.image || product.image}
                  alt={product.name}
                  loading="lazy"
                  width={48}
                  height={48}
                  className="size-12 rounded-md object-cover"
                />
                <span className="flex-1">
                  {product.name}
                  <span className="block text-xs text-muted-foreground">
                    {variant ? `${variant.label} · ` : ""}Qtà {qty}
                  </span>
                </span>
                <span>{formatPrice(unitPrice * qty)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Subtotale</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Spedizione</span>
              <span>{shipping === 0 ? "Gratuita" : formatPrice(shipping)}</span>
            </div>
          </div>
          <div className="flex justify-between border-t border-border pt-4 font-display text-xl">
            <span>Totale</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button type="submit" disabled={loading} className="btn-base btn-primary w-full">
            {loading ? "Elaborazione…" : `Paga ${formatPrice(total)}`}
          </button>
          {submitError && <p className="text-center text-xs text-destructive">{submitError}</p>}
          <p className="text-center text-xs text-muted-foreground">
            Pagamento sicuro · Reso gratuito entro 14 giorni · © OpenStreetMap contributors
          </p>
        </aside>
      </form>
    </div>
  );
}
