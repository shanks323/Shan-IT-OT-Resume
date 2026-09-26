import { ResumeData } from '../data/resumeData';

export type ThemeId = 'modern' | 'industrial' | 'minimalist' | 'creative';

export type ColorAccent = 'navy' | 'slate' | 'cyan' | 'emerald' | 'amber';

export type SpacingDensity = 'compact' | 'balanced' | 'spacious';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  recommendedFor: string;
}

export interface AccentOption {
  id: ColorAccent;
  name: string;
  hex: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  ringClass: string;
  badgeBg: string;
  badgeText: string;
}

export interface ResumeSettings {
  theme: ThemeId;
  accent: ColorAccent;
  density: SpacingDensity;
  showAvatar: boolean;
  showTechSchematic: boolean;
  showCredentialsBadges: boolean;
}
