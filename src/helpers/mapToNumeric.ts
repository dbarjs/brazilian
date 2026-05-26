/**
 * Matches every non-numeric characters.
 */
const NonNumeric = /\D/g

/**
 * Maps to a text containing only numeric characters.
 * @param value - A text containing numbers.
 */
export function mapToNumeric(value: string): string {
  return value.replace(NonNumeric, '')
}
