import React from 'react';
import { ResumeData } from '../data/resumeData';
import { ResumeSettings } from '../types/resume';
import { ModernTheme } from './ResumeThemes/ModernTheme';
import { IndustrialTheme } from './ResumeThemes/IndustrialTheme';
import { MinimalistTheme } from './ResumeThemes/MinimalistTheme';
import { CreativeSplitTheme } from './ResumeThemes/CreativeSplitTheme';
import { ACCENT_PALETTES } from '../utils/accentThemes';
import { FileCheck } from 'lucide-react';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
  onOpenTopology: () => void;
  onOpenPhotoModal?: () => void;
}

export const ResumeSheet: React.FC<Props> = ({ data, settings, onOpenTopology, onOpenPhotoModal }) => {
  const isCreative = settings.theme === 'creative';
  const palette = ACCENT_PALETTES[settings.accent] || ACCENT_PALETTES.navy;

  const renderTheme = () => {
    switch (settings.theme) {
      case 'industrial':
        return <IndustrialTheme data={data} settings={settings} onOpenTopology={onOpenTopology} onOpenPhotoModal={onOpenPhotoModal} />;
      case 'minimalist':
        return <MinimalistTheme data={data} settings={settings} onOpenTopology={onOpenTopology} onOpenPhotoModal={onOpenPhotoModal} />;
      case 'creative':
        return <CreativeSplitTheme data={data} settings={settings} onOpenTopology={onOpenTopology} onOpenPhotoModal={onOpenPhotoModal} />;
      case 'modern':
      default:
        return <ModernTheme data={data} settings={settings} onOpenTopology={onOpenTopology} onOpenPhotoModal={onOpenPhotoModal} />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-6 sm:py-8 px-2 sm:px-4">
      {/* Visual A4 Page Dimension Marker - Hidden in print */}
      <div className="no-print mb-2.5 flex items-center justify-between gap-2 text-[11px] text-slate-400 w-full max-w-[210mm]">
        <div className="flex items-center gap-1.5 font-medium text-slate-300">
          <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Standard A4 Dimension Canvas (210mm × 297mm)</span>
        </div>
        <span className="bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 font-semibold px-2 py-0.5 rounded text-[10px]">
          1-Page Guaranteed
        </span>
      </div>

      {/* Exact A4 Sheet Document with Dynamic CSS Variables */}
      <div 
        id="resume-document"
        className={`resume-paper main-container w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 rounded-lg shadow-2xl border border-slate-200/90 transition-all box-border overflow-hidden ${
          isCreative ? 'p-0 theme-creative' : 'p-6 sm:p-7'
        }`}
        style={{
          '--primary-color': palette.primary,
          '--primary-light': palette.primaryLight,
          '--primary-dark': palette.primaryDark,
          '--sidebar-bg': palette.sidebarBg,
          '--accent-bar': palette.accentBar,
          '--accent-border': palette.border,
          '--badge-bg': palette.badgeBg,
          '--badge-text': palette.badgeText,
          '--tag-bg': palette.tagBg,
          '--tag-text': palette.tagText,
          '--heading-color': palette.headingColor,
          '--icon-color': palette.iconColor,
        } as React.CSSProperties}
      >
        {renderTheme()}
      </div>
    </div>
  );
};
