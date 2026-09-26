import React from 'react';
import { ResumeData } from '../data/resumeData';
import { ResumeSettings } from '../types/resume';
import { ModernTheme } from './ResumeThemes/ModernTheme';
import { IndustrialTheme } from './ResumeThemes/IndustrialTheme';
import { MinimalistTheme } from './ResumeThemes/MinimalistTheme';
import { CreativeSplitTheme } from './ResumeThemes/CreativeSplitTheme';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
  onOpenTopology: () => void;
  onOpenPhotoModal?: () => void;
}

export const ResumeSheet: React.FC<Props> = ({ data, settings, onOpenTopology, onOpenPhotoModal }) => {
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

  const paddingClass = settings.density === 'compact' 
    ? 'p-6 sm:p-8' 
    : settings.density === 'spacious' 
      ? 'p-8 sm:p-12' 
      : 'p-6 sm:p-10';

  return (
    <div className="w-full flex justify-center py-6 sm:py-10 px-2 sm:px-6">
      <div 
        id="resume-document"
        className={`resume-paper w-full max-w-[850px] bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 transition-all ${paddingClass}`}
        style={{ minHeight: '1100px' }}
      >
        {renderTheme()}
      </div>
    </div>
  );
};
