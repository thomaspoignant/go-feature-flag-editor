export function isNumeric (n: never): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
