import { mapToAlphaNumeric } from './mapToAlphaNumeric'

/**
 * Maps a text to a collection of its calculation numbers.
 * Updated to support IN RFB 2.119 (Anexo XV):
 * - Numeric values (0-9): ASCII - 48
 * - Alpha values (A-Z): ASCII - 48
 * This logic works for both CPF (only numbers) and new CNPJ.
 * @param value - A text containing numbers/letters.
 */
export function mapToNumbers(value: string): number[] {
  return mapToAlphaNumeric(value)
    .split('')
    .map(char => char.charCodeAt(0) - 48)
}
