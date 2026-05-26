import { generateCheckSums } from '../helpers/generateCheckSums'
import { getRemaining } from '../helpers/getRemaining'
import { isRepeatedArray } from '../helpers/isRepeatedValue'
import { mapToNumbers } from '../helpers/mapToNumbers'

/**
 * Pattern to match formatted CNPJ (XX.XXX.XXX/XXXX-99) or 14 chars.
 * Now supports alphanumeric CNPJs as per IN RFB nº 2.229/2024.
 * Positions 13 and 14 (check digits) remain strictly numeric.
 */
export const CNPJ_PATTERN = /^([A-Z0-9]{12}\d{2}|[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-\d{2})$/i

/**
 * Check if value is a valid CNPJ.
 * Supports the new Alphanumeric format (IN RFB nº 2.229/2024).
 *
 * @example ```js
 * isCNPJ('41142260000189')
 * //=> true
 *
 * isCNPJ('12.ABC.345/01DE-35')
 * //=> true
 *
 * isCNPJ('45.723.174/0001-10')
 * //=> true
 *
 * isCNPJ('411407182')
 * //=> false
 *
 * isCNPJ('11.111.111/1111-11')
 * //=> false
 * ```
 * @param value - A text containing a CNPJ.
 * @return Whether the CNPJ is valid or not.
 */
export function isCNPJ(value: string): boolean {
  if (!CNPJ_PATTERN.test(value))
    return false

  const numbers = mapToNumbers(value)

  if (isRepeatedArray(numbers))
    return false

  const validators = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const checkers = generateCheckSums(numbers, validators)

  return (
    numbers[12] === getRemaining(checkers[0])
    && numbers[13] === getRemaining(checkers[1])
  )
}
