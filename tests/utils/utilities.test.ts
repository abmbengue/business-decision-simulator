import { describe, it, expect } from 'vitest';
import { formatCurrency, clamp, roundToInteger } from '@utils/index';

describe('Utilities', () => {
  describe('formatCurrency', () => {
    it('should format number with currency code', () => {
      const result = formatCurrency(1000, 'XOF');
      expect(result).toContain('1000');
      expect(result).toContain('XOF');
    });

    it('should format large numbers with locale string', () => {
      const result = formatCurrency(1000000, 'EUR');
      expect(result).toContain('1');
      expect(result).toContain('000000');
      expect(result).toContain('EUR');
    });
  });

  describe('clamp', () => {
    it('should return value within range', () => {
      expect(clamp(50, 0, 100)).toBe(50);
    });

    it('should clamp value below min to min', () => {
      expect(clamp(-10, 0, 100)).toBe(0);
    });

    it('should clamp value above max to max', () => {
      expect(clamp(150, 0, 100)).toBe(100);
    });

    it('should handle negative ranges', () => {
      expect(clamp(-50, -100, -10)).toBe(-50);
      expect(clamp(-150, -100, -10)).toBe(-100);
      expect(clamp(0, -100, -10)).toBe(-10);
    });
  });

  describe('roundToInteger', () => {
    it('should round to nearest integer', () => {
      expect(roundToInteger(1.4)).toBe(1);
      expect(roundToInteger(1.5)).toBe(2);
      expect(roundToInteger(1.6)).toBe(2);
    });

    it('should handle negative numbers', () => {
      expect(roundToInteger(-1.4)).toBe(-1);
      expect(roundToInteger(-1.5)).toBe(-2);
      expect(roundToInteger(-1.6)).toBe(-2);
    });

    it('should handle zero', () => {
      expect(roundToInteger(0)).toBe(0);
      expect(roundToInteger(0.1)).toBe(0);
      expect(roundToInteger(0.5)).toBe(0);
    });
  });
});
