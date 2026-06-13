export function formatDzd(value: number): string {
  return new Intl.NumberFormat("fr-DZ").format(value) + " DZD";
}
