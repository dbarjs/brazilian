/**
 * Matches every character that is NOT a valid CNPJ character (A-Z or 0-9).
 * Replaces the old `NonNumeric` to support the new alphanumeric format.
 */
const NonAlphaNumeric = /[^A-Z0-9]/g

/**
 * Maps to a text containing only valid document characters (A-Z and 0-9).
 * Renamed from mapToNumeric to reflect it accepts letters now.
 * @param value - A text containing numbers or letters.
 */
export function mapToAlphaNumeric(value: string): string {
  return value.toUpperCase().replace(NonAlphaNumeric, '')
}
