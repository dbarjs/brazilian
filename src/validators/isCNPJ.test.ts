import { describe, expect, it } from 'vitest'
import { isCNPJ } from './isCNPJ'

describe('isCNPJ', () => {
  describe('valid CNPJs', () => {
    it('should return true for valid numeric CNPJ without formatting', () => {
      expect(isCNPJ('41142260000189')).toBe(true)
      expect(isCNPJ('11222333000181')).toBe(true)
      expect(isCNPJ('00000000000191')).toBe(true)
    })

    it('should return true for valid numeric CNPJ with formatting', () => {
      expect(isCNPJ('41.142.260/0001-89')).toBe(true)
      expect(isCNPJ('11.222.333/0001-81')).toBe(true)
      expect(isCNPJ('00.000.000/0001-91')).toBe(true)
    })

    it('should validate alphanumeric CNPJ without formatting', () => {
      expect(isCNPJ('12ABC34501DE35')).toBe(true)
      expect(isCNPJ('AB12CD34EF5678')).toBe(false)
    })

    it('should validate alphanumeric CNPJ with formatting', () => {
      expect(isCNPJ('12.ABC.345/01DE-35')).toBe(true)
      expect(isCNPJ('AB.12C.D34/EF56-78')).toBe(false)
    })

    it('should handle lowercase alphanumeric CNPJs', () => {
      expect(isCNPJ('12abc34501de35')).toBe(true)
      expect(isCNPJ('ab.12c.d34/ef56-78')).toBe(false)
    })
  })

  describe('invalid CNPJs', () => {
    it('should return false for CNPJs with incorrect length', () => {
      expect(isCNPJ('411407182')).toBe(false)
      expect(isCNPJ('1234567890123')).toBe(false)
      expect(isCNPJ('123456789012345')).toBe(false)
    })

    it('should return false for CNPJs with all repeated digits', () => {
      expect(isCNPJ('11111111111111')).toBe(false)
      expect(isCNPJ('11.111.111/1111-11')).toBe(false)
      expect(isCNPJ('00000000000000')).toBe(false)
      expect(isCNPJ('22222222222222')).toBe(false)
      expect(isCNPJ('33333333333333')).toBe(false)
      expect(isCNPJ('44444444444444')).toBe(false)
      expect(isCNPJ('55555555555555')).toBe(false)
      expect(isCNPJ('66666666666666')).toBe(false)
      expect(isCNPJ('77777777777777')).toBe(false)
      expect(isCNPJ('88888888888888')).toBe(false)
      expect(isCNPJ('99999999999999')).toBe(false)
    })

    it('should return false for CNPJs with all repeated letters', () => {
      expect(isCNPJ('AAAAAAAAAAAAAA')).toBe(false)
      expect(isCNPJ('AA.AAA.AAA/AAAA-AA')).toBe(false)
      expect(isCNPJ('BBBBBBBBBBBBBB')).toBe(false)
    })

    it('should return false for CNPJs with invalid check digits', () => {
      expect(isCNPJ('41142260000180')).toBe(false)
      expect(isCNPJ('11222333000182')).toBe(false)
      expect(isCNPJ('00000000000192')).toBe(false)
    })

    it('should return false for formatted CNPJs with invalid check digits', () => {
      expect(isCNPJ('41.142.260/0001-88')).toBe(false)
      expect(isCNPJ('11.222.333/0001-80')).toBe(false)
    })

    it('should return false for empty string', () => {
      expect(isCNPJ('')).toBe(false)
    })

    it('should return false for strings with only special characters', () => {
      expect(isCNPJ('##.###.###/####-##')).toBe(false)
      expect(isCNPJ('..///--')).toBe(false)
    })

    it('should return false for strings with letters in check digit positions', () => {
      expect(isCNPJ('411422600001AB')).toBe(false)
      expect(isCNPJ('41.142.260/0001-AB')).toBe(false)
    })

    it('should return false for incorrectly formatted CNPJs', () => {
      expect(isCNPJ('41-142-260/0001.89')).toBe(false)
      expect(isCNPJ('41 142 260 0001 89')).toBe(false)
      expect(isCNPJ('41142260/0001-89')).toBe(false)
      expect(isCNPJ('41.142.2600001-89')).toBe(false)
    })

    it('should return false for CNPJs with invalid characters', () => {
      expect(isCNPJ('4114226000018@')).toBe(false)
      expect(isCNPJ('41.142.260/0001-8$')).toBe(false)
      expect(isCNPJ('CNPJ: 41142260000189')).toBe(false)
    })

    it('should return false for null-like values passed as strings', () => {
      expect(isCNPJ('null')).toBe(false)
      expect(isCNPJ('undefined')).toBe(false)
    })
  })

  describe('edge cases', () => {
    it('should handle CNPJs with extra whitespace', () => {
      expect(isCNPJ(' 06990590000123 ')).toBe(false)
      expect(isCNPJ('06.990.590/0001-22')).toBe(false)
      expect(isCNPJ(' 41142260000189 ')).toBe(false)
      expect(isCNPJ('41 142 260 000 189')).toBe(false)
    })
  })

  describe('real-world CNPJs', () => {
    it('should validate known valid CNPJs', () => {
      expect(isCNPJ('06990590000123')).toBe(true)
      expect(isCNPJ('06.990.590/0001-23')).toBe(true)

      expect(isCNPJ('34028316000103')).toBe(true)
      expect(isCNPJ('34.028.316/0001-03')).toBe(true)

      expect(isCNPJ('07526557000100')).toBe(true)
      expect(isCNPJ('07.526.557/0001-00')).toBe(true)

      expect(isCNPJ('60701190000104')).toBe(true)
      expect(isCNPJ('60.701.190/0001-04')).toBe(true)
    })

    it('should reject known invalid CNPJs', () => {
      expect(isCNPJ('34028316000104')).toBe(false)
      expect(isCNPJ('07526557000101')).toBe(false)
      expect(isCNPJ('60701190000105')).toBe(false)
    })
  })
})
