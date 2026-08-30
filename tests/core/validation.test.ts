import { describe, it, expect } from 'vitest';
import { validateAssumptions, validateRange } from '@core/validation/validators';
import { Assumptions } from '@types/business';

const validAssumptions: Assumptions = {
  initialCapital: 500000,
  monthlyFixedCosts: 75000,
  pricePerUnit: 5000,
  unitsPerMonth: 50,
  costPerUnit: 3000,
  projectionMonths: 24,
};

describe('Validation', () => {
  describe('validateAssumptions', () => {
    it('should accept valid assumptions', () => {
      const result = validateAssumptions(validAssumptions);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject negative initial capital', () => {
      const assumptions = { ...validAssumptions, initialCapital: -100000 };
      const result = validateAssumptions(assumptions);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          field: 'initialCapital',
          message: 'Initial capital must be greater than 0',
        })
      );
    });

    it('should reject zero initial capital', () => {
      const assumptions = { ...validAssumptions, initialCapital: 0 };
      const result = validateAssumptions(assumptions);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.field === 'initialCapital')).toBe(true);
    });

    it('should reject negative monthly fixed costs', () => {
      const assumptions = { ...validAssumptions, monthlyFixedCosts: -10000 };
      const result = validateAssumptions(assumptions);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.field === 'monthlyFixedCosts')).toBe(true);
    });

    it('should reject zero price per unit', () => {
      const assumptions = { ...validAssumptions, pricePerUnit: 0 };
      const result = validateAssumptions(assumptions);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.field === 'pricePerUnit')).toBe(true);
    });

    it('should reject negative units per month', () => {
      const assumptions = { ...validAssumptions, unitsPerMonth: -10 };
      const result = validateAssumptions(assumptions);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.field === 'unitsPerMonth')).toBe(true);
    });

    it('should reject negative cost per unit', () => {
      const assumptions = { ...validAssumptions, costPerUnit: -500 };
      const result = validateAssumptions(assumptions);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.field === 'costPerUnit')).toBe(true);
    });

    it('should warn when cost per unit equals price per unit', () => {
      const assumptions = { ...validAssumptions, costPerUnit: validAssumptions.pricePerUnit };
      const result = validateAssumptions(assumptions);
      expect(result.warnings.some((w) => w.field === 'costPerUnit')).toBe(true);
    });

    it('should warn when cost per unit exceeds price per unit', () => {
      const assumptions = { ...validAssumptions, costPerUnit: 6000 };
      const result = validateAssumptions(assumptions);
      expect(result.warnings.some((w) => w.field === 'costPerUnit')).toBe(true);
    });

    it('should reject zero projection months', () => {
      const assumptions = { ...validAssumptions, projectionMonths: 0 };
      const result = validateAssumptions(assumptions);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.field === 'projectionMonths')).toBe(true);
    });

    it('should warn when projection exceeds 60 months', () => {
      const assumptions = { ...validAssumptions, projectionMonths: 120 };
      const result = validateAssumptions(assumptions);
      expect(result.warnings.some((w) => w.field === 'projectionMonths')).toBe(true);
    });

    it('should warn when units per month is zero', () => {
      const assumptions = { ...validAssumptions, unitsPerMonth: 0 };
      const result = validateAssumptions(assumptions);
      expect(result.warnings.some((w) => w.field === 'unitsPerMonth')).toBe(true);
    });
  });

  describe('validateRange', () => {
    it('should accept value within range', () => {
      const result = validateRange(50, 0, 100, 'testField');
      expect(result).toBeUndefined();
    });

    it('should accept value at min boundary', () => {
      const result = validateRange(0, 0, 100, 'testField');
      expect(result).toBeUndefined();
    });

    it('should accept value at max boundary', () => {
      const result = validateRange(100, 0, 100, 'testField');
      expect(result).toBeUndefined();
    });

    it('should reject value below min', () => {
      const result = validateRange(-1, 0, 100, 'testField');
      expect(result).toBeDefined();
      expect(result?.field).toBe('testField');
    });

    it('should reject value above max', () => {
      const result = validateRange(101, 0, 100, 'testField');
      expect(result).toBeDefined();
      expect(result?.field).toBe('testField');
    });
  });
});
