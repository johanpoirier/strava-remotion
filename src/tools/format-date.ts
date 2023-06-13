const dateTimeFormat = new Intl.DateTimeFormat('fr-FR');
export function formatDate(date: Date): string {
  return dateTimeFormat.format(date);
}

export function formatStringDate(date: string): string {
  return dateTimeFormat.format(Date.parse(date));
}

export function formatTimeDate(dateInMs: number): string {
  return dateTimeFormat.format(new Date(dateInMs));
}
