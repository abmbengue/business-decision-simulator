import { describe, it, expect } from 'vitest';
import { getLocalizationConfig, LOCALIZATION_CONFIGS } from '@types/localization';

describe('Localization Types', () => {
  describe('getLocalizationConfig', () => {
    it('should return config for French', () => {
      const config = getLocalizationConfig('fr');
      expect(config.locale).toBe('fr');
      expect(config.language).toBe('Français');
    });

    it('should return config for English', () => {
      const config = getLocalizationConfig('en');
      expect(config.locale).toBe('en');
      expect(config.language).toBe('English');
    });

    it('should throw error for unsupported locale', () => {
      expect(() => getLocalizationConfig('es' as any)).toThrow('Unsupported locale: es');
    });
  });

  describe('LOCALIZATION_CONFIGS', () => {
    it('should contain fr and en', () => {
      expect(LOCALIZATION_CONFIGS).toHaveProperty('fr');
      expect(LOCALIZATION_CONFIGS).toHaveProperty('en');
    });

    it('should have consistent structure for all locales', () => {
      Object.values(LOCALIZATION_CONFIGS).forEach((config) => {
        expect(config).toHaveProperty('locale');
        expect(config).toHaveProperty('language');
        expect(config).toHaveProperty('region');
      });
    });
  });
});
