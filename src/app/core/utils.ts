export function capitalize(text: string) {
  if (!text.length) return '';

  if (text.length === 1) return text.toLocaleUpperCase();

  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function minmax(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
