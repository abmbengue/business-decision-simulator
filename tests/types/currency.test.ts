import { describe, it, expect } from 'vitest';
import { getCurrencyConfig, toDisplayValue, fromDisplayValue, CURRENCY_CONFIGS } from '@types/currency';

describe('Currency Types', () => {
  describe('getCurrencyConfig', () => {
    it('should return config for XOF', () => {
      const config = getCurrencyConfig('XOF');
      expect(config.code).toBe('XOF');
      expect(config.decimalPlaces).toBe(0);
    });

    it('should return config for EUR', () => {
      const config = getCurrencyConfig('EUR');
      expect(config.code).toBe('EUR');
      expect(config.decimalPlaces).toBe(2);
    });

    it('should return config for USD', () => {
      const config = getCurrencyConfig('USD');
      expect(config.code).toBe('USD');
      expect(config.decimalPlaces).toBe(2);
    });

    it('should throw error for unsupported currency', () => {
      expect(() => getCurrencyConfig('XXX' as any)).toThrow('Unsupported currency: XXX');
    });
  });

  describe('toDisplayValue', () => {
    it('should convert XOF amount to display value', () => {
      const result = toDisplayValue({ amount: 1000, currency: 'XOF' });
      expect(result).toBe(1000); // XOF has 0 decimal places
    });

    it('should convert EUR amount to display value', () => {
      const result = toDisplayValue({ amount: 100, currency: 'EUR' });
      expect(result).toBe(1); // EUR 100 cents = 1 euro
    });

    it('should convert USD amount to display value', () => {
      const result = toDisplayValue({ amount: 1050, currency: 'USD' });
      expect(result).toBe(10.5); // USD 1050 cents = 10.50 dollars
    });
  });

  describe('fromDisplayValue', () => {
    it('should create MonetaryAmount from XOF display value', () => {
      const result = fromDisplayValue(1000, 'XOF');
      expect(result.amount).toBe(1000);
      expect(result.currency).toBe('XOF');
    });

    it('should create MonetaryAmount from EUR display value', () => {
      const result = fromDisplayValue(10.5, 'EUR');
      expect(result.amount).toBe(1050);
      expect(result.currency).toBe('EUR');
    });

    it('should create MonetaryAmount from USD display value', () => {
      const result = fromDisplayValue(25.99, 'USD');
      expect(result.amount).toBe(2599);
      expect(result.currency).toBe('USD');
    });

    it('should round correctly for EUR', () => {
      const result = fromDisplayValue(10.555, 'EUR');
      expect(result.amount).toBe(1056); // Rounds to nearest cent
    });
  });

  describe('CURRENCY_CONFIGS', () => {
    it('should contain XOF, EUR, USD', () => {
      expect(CURRENCY_CONFIGS).toHaveProperty('XOF');
      expect(CURRENCY_CONFIGS).toHaveProperty('EUR');
      expect(CURRENCY_CONFIGS).toHaveProperty('USD');
    });

    it('should have consistent structure for all currencies', () => {
      Object.values(CURRENCY_CONFIGS).forEach((config) => {
        expect(config).toHaveProperty('code');
        expect(config).toHaveProperty('name');
        expect(config).toHaveProperty('symbol');
        expect(config).toHaveProperty('decimalPlaces');
      });
    });
  });
});
