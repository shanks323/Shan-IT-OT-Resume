import React from 'react';
import { Printer, Edit3, Network, CheckCircle2, FileText, Share2, Camera } from 'lucide-react';

interface Props {
  onOpenTopology: () => void;
  onOpenAts: () => void;
  onOpenCoverLetter: () => void;
  onOpenEditor: () => void;
  onOpenShare: () => void;
  onOpenPhotoModal: () => void;
  onPrint: () => void;
}

export const TopNav: React.FC<Props> = ({
  onOpenTopology,
  onOpenAts,
  onOpenCoverLetter,
  onOpenEditor,
  onOpenShare,
  onOpenPhotoModal,
  onPrint,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a 
          href="/" 
          className="text-base sm:text-lg font-extrabold tracking-tight text-white font-display uppercase shrink-0 hover:text-blue-400 transition-colors"
        >
          Shanker Dayallan
        </a>

        {/* Zone 2: Navigation Links (clean text links with subtle hover underlines) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={onOpenTopology}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 py-1"
          >
            <Network className="w-3.5 h-3.5 text-blue-400" />
            <span>IT/OT Lab Diagram</span>
          </button>

          <button
            onClick={onOpenAts}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 py-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>ATS Compatibility</span>
          </button>

          <button
            onClick={onOpenCoverLetter}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 py-1"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Cover Letter</span>
          </button>

          <button
            onClick={onOpenPhotoModal}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 py-1"
          >
            <Camera className="w-3.5 h-3.5 text-purple-400" />
            <span>Edit Photo</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenShare}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 rounded-lg border border-emerald-700/50 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>

          <button
            onClick={onOpenEditor}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800/90 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Resume</span>
          </button>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save as PDF / Print</span>
          </button>
        </div>
      </div>
    </header>
  );
};
