import React from 'react';
import { Printer, Download, Edit3, Network, CheckCircle2, FileText, Share2, Camera, Loader2, Mail } from 'lucide-react';

interface Props {
  onOpenTopology: () => void;
  onOpenAts: () => void;
  onOpenCoverLetter: () => void;
  onOpenEditor: () => void;
  onOpenShare: () => void;
  onOpenPhotoModal: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  isGeneratingPdf?: boolean;
  email?: string;
}

export const TopNav: React.FC<Props> = ({
  onOpenTopology,
  onOpenAts,
  onOpenCoverLetter,
  onOpenEditor,
  onOpenShare,
  onOpenPhotoModal,
  onDownloadPdf,
  onPrint,
  isGeneratingPdf,
  email = 'shankerdayallan80@gmail.com',
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

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-300">
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

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          <a 
            href={`mailto:shankerdayallan80@gmail.com?subject=Job%20Opportunity%20-%20IT%20Support%20/%20IT/OT`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-300 bg-blue-950/60 hover:bg-blue-900/60 rounded-lg border border-blue-700/50 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>shankerdayallan80@gmail.com</span>
          </a>

          <button
            onClick={onOpenShare}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 rounded-lg border border-emerald-700/50 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>

          <button
            onClick={onOpenEditor}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800/90 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>

          <button
            onClick={onPrint}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="Browser Print Preview"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={onDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download 1-Page PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
