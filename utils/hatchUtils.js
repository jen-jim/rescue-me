export function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return { hours, minutes, seconds };
}
export function formatTimeString(ms) {
  const { hours, minutes, seconds } = formatTime(ms);
  return `${hours}h ${minutes}m ${seconds}s`;
}
