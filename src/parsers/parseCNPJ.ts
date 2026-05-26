import { mapToAlphaNumeric } from '../helpers/mapToAlphaNumeric'
import { isCNPJ } from '../validators/isCNPJ'

/**
 * Parse CNPJ value into a string without mask.
 * @example ```js
 * parseCNPJ('41142260000189')
 * //=> 41142260000189
 *
 * parseCNPJ('45.723.174/0001-10')
 * //=> 45723174000110
 *
 * parseCNPJ('411407182')
 * //=> undefined
 *
 * parseCNPJ('11.111.111/1111-11')
 * //=> undefined
 * ```
 * @param value - A text containing a CNPJ.
 * @returns A string without mask or `undefined` when invalid.
 */
export function parseCNPJ(value: string): string | undefined {
  if (!isCNPJ(value)) {
    return
  }

  return mapToAlphaNumeric(value)
}
