import { ColorAccent } from '../types/resume';

export interface AccentStyleConfig {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  sidebarBg: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  tagBg: string;
  tagText: string;
  accentBar: string;
  headingColor: string;
  iconColor: string;
}

export const ACCENT_PALETTES: Record<ColorAccent, AccentStyleConfig> = {
  navy: {
    primary: '#1e3a8a', // blue-900
    primaryLight: '#eff6ff', // blue-50
    primaryDark: '#172554', // blue-950
    sidebarBg: '#0b1a30', // deep navy
    border: '#bfdbfe', // blue-200
    badgeBg: '#dbeafe', // blue-100
    badgeText: '#1e40af', // blue-800
    tagBg: '#f1f5f9', // slate-100
    tagText: '#1e293b', // slate-800
    accentBar: '#2563eb', // blue-600
    headingColor: '#1e3a8a',
    iconColor: '#2563eb',
  },
  slate: {
    primary: '#0f172a', // slate-900
    primaryLight: '#f8fafc', // slate-50
    primaryDark: '#020617', // slate-950
    sidebarBg: '#0f172a', // deep slate
    border: '#cbd5e1', // slate-300
    badgeBg: '#e2e8f0', // slate-200
    badgeText: '#0f172a', // slate-900
    tagBg: '#f1f5f9',
    tagText: '#334155',
    accentBar: '#475569',
    headingColor: '#0f172a',
    iconColor: '#334155',
  },
  cyan: {
    primary: '#0e7490', // cyan-700
    primaryLight: '#ecfeff', // cyan-50
    primaryDark: '#164e63', // cyan-900
    sidebarBg: '#082f49', // deep cyan ocean
    border: '#a5f3fc', // cyan-200
    badgeBg: '#cffafe', // cyan-100
    badgeText: '#155e75', // cyan-800
    tagBg: '#f0fdfa',
    tagText: '#115e59',
    accentBar: '#06b6d4',
    headingColor: '#0e7490',
    iconColor: '#0891b2',
  },
  emerald: {
    primary: '#065f46', // emerald-800
    primaryLight: '#ecfdf5', // emerald-50
    primaryDark: '#064e3b', // emerald-900
    sidebarBg: '#022c22', // deep pine emerald
    border: '#a7f3d0', // emerald-200
    badgeBg: '#d1fae5', // emerald-100
    badgeText: '#065f46', // emerald-800
    tagBg: '#f1f5f9',
    tagText: '#1e293b',
    accentBar: '#10b981',
    headingColor: '#065f46',
    iconColor: '#059669',
  },
  amber: {
    primary: '#92400e', // amber-800
    primaryLight: '#fffbeb', // amber-50
    primaryDark: '#78350f', // amber-900
    sidebarBg: '#451a03', // deep warm industrial amber
    border: '#fde68a', // amber-200
    badgeBg: '#fef3c7', // amber-100
    badgeText: '#92400e', // amber-800
    tagBg: '#f8fafc',
    tagText: '#334155',
    accentBar: '#d97706',
    headingColor: '#92400e',
    iconColor: '#b45309',
  },
};

/**
 * Injects CSS custom properties corresponding to the chosen accent palette
 * into document.documentElement so all templates, components, and print routines
 * access identical dynamic color variables.
 */
export function applyThemeVariables(accent: ColorAccent) {
  if (typeof document === 'undefined') return;
  const palette = ACCENT_PALETTES[accent] || ACCENT_PALETTES.navy;
  const root = document.documentElement;
  root.style.setProperty('--primary-color', palette.primary);
  root.style.setProperty('--primary-light', palette.primaryLight);
  root.style.setProperty('--primary-dark', palette.primaryDark);
  root.style.setProperty('--sidebar-bg', palette.sidebarBg);
  root.style.setProperty('--accent-bar', palette.accentBar);
  root.style.setProperty('--accent-border', palette.border);
  root.style.setProperty('--badge-bg', palette.badgeBg);
  root.style.setProperty('--badge-text', palette.badgeText);
  root.style.setProperty('--tag-bg', palette.tagBg);
  root.style.setProperty('--tag-text', palette.tagText);
  root.style.setProperty('--heading-color', palette.headingColor);
  root.style.setProperty('--icon-color', palette.iconColor);
}
