import { describe, it, expect } from 'vitest';
import { getTemplate, listTemplateIds, listTemplates } from '@core/templates';

describe('Business Templates', () => {
  describe('getTemplate', () => {
    it('should return small-retail template', () => {
      const template = getTemplate('small-retail');
      expect(template.id).toBe('small-retail');
      expect(template.name).toBe('Petit commerce');
      expect(template.language).toBe('fr');
      expect(template.currency).toBe('XOF');
    });

    it('should throw error for unknown template', () => {
      expect(() => getTemplate('unknown-template')).toThrow('Template not found: unknown-template');
    });
  });

  describe('listTemplateIds', () => {
    it('should return array of template IDs', () => {
      const ids = listTemplateIds();
      expect(Array.isArray(ids)).toBe(true);
      expect(ids.length).toBeGreaterThan(0);
      expect(ids).toContain('small-retail');
    });
  });

  describe('listTemplates', () => {
    it('should return array of templates', () => {
      const templates = listTemplates();
      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
    });

    it('all templates should have required fields', () => {
      const templates = listTemplates();
      templates.forEach((template) => {
        expect(template).toHaveProperty('id');
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('description');
        expect(template).toHaveProperty('category');
        expect(template).toHaveProperty('defaultAssumptions');
        expect(template).toHaveProperty('minimumValues');
        expect(template).toHaveProperty('maximumValues');
        expect(template).toHaveProperty('language');
        expect(template).toHaveProperty('currency');
      });
    });
  });

  describe('Small Retail Template', () => {
    it('should have sensible default assumptions', () => {
      const template = getTemplate('small-retail');
      const assumptions = template.defaultAssumptions;

      expect(assumptions.initialCapital).toBeGreaterThan(0);
      expect(assumptions.monthlyFixedCosts).toBeGreaterThanOrEqual(0);
      expect(assumptions.pricePerUnit).toBeGreaterThan(0);
      expect(assumptions.unitsPerMonth).toBeGreaterThanOrEqual(0);
      expect(assumptions.costPerUnit).toBeGreaterThanOrEqual(0);
      expect(assumptions.costPerUnit).toBeLessThan(assumptions.pricePerUnit);
      expect(assumptions.projectionMonths).toBeGreaterThan(0);
    });

    it('should have realistic minimum and maximum values', () => {
      const template = getTemplate('small-retail');
      const min = template.minimumValues;
      const max = template.maximumValues;
      const defaults = template.defaultAssumptions;

      // Defaults should be between min and max
      expect(defaults.initialCapital).toBeGreaterThanOrEqual(min.initialCapital);
      expect(defaults.initialCapital).toBeLessThanOrEqual(max.initialCapital);
      expect(defaults.pricePerUnit).toBeGreaterThanOrEqual(min.pricePerUnit);
      expect(defaults.pricePerUnit).toBeLessThanOrEqual(max.pricePerUnit);
    });

    it('should be in French with XOF currency', () => {
      const template = getTemplate('small-retail');
      expect(template.language).toBe('fr');
      expect(template.currency).toBe('XOF');
    });
  });
});
