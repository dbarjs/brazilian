/**
 * Get remaining of 11 or `0` if lower than 2.
 * @param value - Value used remaining.
 */
export function getRemaining(value: number): number {
  return (value % 11) < 2 ? 0 : 11 - (value % 11)
}
