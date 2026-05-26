/**
 * Check if items are same, if their values are repeated.
 * @param items
 */
export function isRepeatedArray<T>(items: Array<T>): boolean {
  return items.every(item => items[0] === item)
}
