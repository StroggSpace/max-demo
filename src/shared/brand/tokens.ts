import type { CSSProperties } from 'react';

import type { Theme } from '@/store/demo';

export type Brand = 'max' | 'store' | 'bank' | 'services';

interface BrandPalette {
  /** Акцент: кнопки, активные вкладки, прогресс */
  accent: string;
  /** Цвет текста и иконок на акценте */
  accentContrast: string;
  /** Акцентный текст на обычных поверхностях */
  themedText: string;
  /** Градиент героев и карточек */
  gradient: string;
  hovered: string;
  pressed: string;
}

export interface BrandDefinition {
  id: Brand;
  title: string;
  swatch: string;
  light: BrandPalette;
  dark: BrandPalette;
}

export const brands: BrandDefinition[] = [
  {
    id: 'max',
    title: 'MAX',
    swatch: '#0055ff',
    light: {
      accent: '#0062d6',
      accentContrast: '#ffffff',
      themedText: '#0062d6',
      gradient: 'linear-gradient(135deg, #0b4ecc, #1a63e0)',
      hovered: '#1877e6',
      pressed: '#0b4ecc',
    },
    dark: {
      accent: '#1a73e8',
      accentContrast: '#ffffff',
      themedText: '#6aaefc',
      gradient: 'linear-gradient(135deg, #0b4ecc, #1a73e8)',
      hovered: '#2f7bff',
      pressed: '#145cc0',
    },
  },
  {
    id: 'store',
    title: 'Магазин',
    swatch: '#12b76a',
    light: {
      accent: '#067647',
      accentContrast: '#ffffff',
      themedText: '#067647',
      gradient: 'linear-gradient(135deg, #05603a, #067647)',
      hovered: '#0e9f6e',
      pressed: '#05603a',
    },
    dark: {
      accent: '#32d583',
      accentContrast: '#06281b',
      themedText: '#32d583',
      gradient: 'linear-gradient(135deg, #0e9f6e, #32d583)',
      hovered: '#4ade80',
      pressed: '#0e9f6e',
    },
  },
  {
    id: 'bank',
    title: 'Банк',
    swatch: '#e02d3c',
    light: {
      accent: '#d92d20',
      accentContrast: '#ffffff',
      themedText: '#d92d20',
      gradient: 'linear-gradient(135deg, #b42318, #f04438)',
      hovered: '#f04438',
      pressed: '#b42318',
    },
    dark: {
      accent: '#e02d3c',
      accentContrast: '#ffffff',
      themedText: '#f97066',
      gradient: 'linear-gradient(135deg, #b42318, #e02d3c)',
      hovered: '#f04438',
      pressed: '#b42318',
    },
  },
  {
    id: 'services',
    title: 'Услуги',
    swatch: '#f5b301',
    light: {
      accent: '#f5b301',
      accentContrast: '#221600',
      themedText: '#8a5a00',
      gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
      hovered: '#fbbf24',
      pressed: '#d97706',
    },
    dark: {
      accent: '#fbbf24',
      accentContrast: '#221600',
      themedText: '#fbbf24',
      gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
      hovered: '#fcd34d',
      pressed: '#f59e0b',
    },
  },
];

export function brandStyle(brand: Brand, theme: Theme): CSSProperties {
  const definition = brands.find((item) => item.id === brand) ?? brands[0];
  const palette = theme === 'dark' ? definition.dark : definition.light;

  return {
    '--background-accent-themed': palette.accent,
    '--text-themed': palette.themedText,
    '--icon-themed': palette.themedText,
    '--text-contrast-static': palette.accentContrast,
    '--brand-gradient': palette.gradient,
    '--states-background-hovered-themed': palette.hovered,
    '--states-background-pressed-themed': palette.pressed,
  } as CSSProperties;
}
