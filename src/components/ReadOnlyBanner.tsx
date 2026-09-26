import React from 'react';
import { 
  Printer, 
  Phone, 
  MessageSquare, 
  Mail, 
  Share2, 
  Sliders, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { ResumeData } from '../data/resumeData';
import { ResumeSettings } from '../types/resume';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
  onPrint: () => void;
  onOpenShare: () => void;
  onExitReadOnly: () => void;
  onOpenTopology: () => void;
}

export const ReadOnlyBanner: React.FC<Props> = ({
  data,
  settings,
  onPrint,
  onOpenShare,
  onExitReadOnly,
  onOpenTopology,
}) => {
  const themeLabels: Record<string, string> = {
    modern: 'Executive Modern (IT Support & Desktop Ops)',
    industrial: 'Industrial IT/OT Specialist (Siemens PLC & SCADA)',
    minimalist: 'Swiss Minimalist (ATS Optimized)',
    creative: 'Creative Split Column (Editorial Tech)',
  };

  return (
    <header className="no-print w-full bg-slate-900 border-b border-slate-800 text-slate-200 py-2.5 px-4 sm:px-6 sticky top-0 z-40 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Candidate Identifier & Variation */}
        <div className="flex flex-wrap items-center gap-2.5 text-center md:text-left">
          <span className="font-extrabold text-white text-sm tracking-tight font-display uppercase">
            {data.fullName}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-blue-400 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Variation: {themeLabels[settings.theme] || settings.theme}</span>
          </span>
          <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700">
            READ-ONLY VIEW
          </span>
        </div>

        {/* Employer Action Suite */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={onOpenTopology}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 font-medium transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
          >
            <span>Lab Diagram</span>
          </button>

          <a
            href={`https://wa.me/${data.whatsapp?.replace(/[^0-9]/g, '') || '60129800657'}?text=Hello%20Shanker,%20I%20reviewed%20your%20resume%20and%20would%20like%20to%20connect`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 font-medium transition-colors flex items-center gap-1.5 text-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`mailto:${data.email}?subject=Job%20Opportunity%20-%20IT%20Support%20/%20IT/OT`}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium transition-colors flex items-center gap-1.5 text-xs"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>Email</span>
          </a>

          <button
            onClick={onPrint}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer flex items-center gap-1.5 text-xs shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save as PDF</span>
          </button>

          <button
            onClick={onOpenShare}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Share this variation link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={onExitReadOnly}
            className="ml-2 text-[11px] text-slate-400 hover:text-blue-400 underline cursor-pointer transition-colors"
          >
            Open Interactive Studio
          </button>
        </div>
      </div>
    </header>
  );
};
