// Richiede la libreria "libphonenumber-js":
//   npm install libphonenumber-js
//
// Verifica che il numero abbia un formato/lunghezza/prefisso reale per il
// paese indicato (default Italia). Non garantisce che il numero sia
// realmente attivo/raggiungibile — per quello serve un servizio a
// pagamento tipo Twilio Lookup.

import { isValidPhoneNumber } from "libphonenumber-js";

export function isPlausiblePhone(phone: string, countryCode: string = "IT"): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return false;
  try {
    return isValidPhoneNumber(trimmed, countryCode as any);
  } catch {
    return false;
  }
}
