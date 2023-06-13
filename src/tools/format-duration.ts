const ONE_MINUTE_IN_SECONDS = 60;
const ONE_HOUR_IN_MINUTES = 60;

export function formatDuration(durationInSeconds: number): string {
  const durationInMinutes = Math.round(durationInSeconds / ONE_MINUTE_IN_SECONDS);
  const durationInHours = Math.floor(durationInMinutes / ONE_HOUR_IN_MINUTES);
  if (durationInHours === 0) {
    return `${durationInMinutes} min`;
  }
  return `${durationInHours}h${durationInMinutes % ONE_HOUR_IN_MINUTES}m`;
}
