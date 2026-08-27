const MONTHS_IT = [
  "gen",
  "feb",
  "mar",
  "apr",
  "mag",
  "giu",
  "lug",
  "ago",
  "set",
  "ott",
  "nov",
  "dic",
];

/**
 * Calcola la finestra di consegna stimata a partire da oggi, dati un numero
 * minimo e massimo di giorni. Si aggiorna automaticamente ogni giorno e
 * gestisce da solo il passaggio al mese (o anno) successivo.
 *
 * Esempi di output: "ago 21 - 25" oppure, se la finestra attraversa un
 * cambio mese, "ago 30 - set 3".
 */
export function estimateDelivery(minDays: number, maxDays: number, from: Date = new Date()) {
  const start = new Date(from);
  start.setDate(start.getDate() + minDays);

  const end = new Date(from);
  end.setDate(end.getDate() + maxDays);

  const startMonth = MONTHS_IT[start.getMonth()];
  const endMonth = MONTHS_IT[end.getMonth()];

  if (startMonth === endMonth && start.getFullYear() === end.getFullYear()) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}`;
  }
  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
}
