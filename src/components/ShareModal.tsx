import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  Lock, 
  Sparkles, 
  MessageSquare, 
  Mail, 
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ThemeId, ColorAccent, SpacingDensity, ResumeSettings } from '../types/resume';
import { ResumeData } from '../data/resumeData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settings: ResumeSettings;
  data: ResumeData;
  onSelectVariation?: (theme: ThemeId, accent: ColorAccent) => void;
}

export const ShareModal: React.FC<Props> = ({ isOpen, onClose, settings, data, onSelectVariation }) => {
  const [copiedCurrent, setCopiedCurrent] = useState(false);
  const [copiedVariationId, setCopiedVariationId] = useState<string | null>(null);
  const [readOnlyMode, setReadOnlyMode] = useState<boolean>(true);

  if (!isOpen) return null;

  const baseUrl = window.location.origin + window.location.pathname;

  const buildUrl = (theme: ThemeId, accent: ColorAccent, density: SpacingDensity, showAvatar: boolean, isReadOnly: boolean) => {
    const params = new URLSearchParams();
    params.set('theme', theme);
    params.set('accent', accent);
    params.set('density', density);
    params.set('photo', showAvatar ? '1' : '0');
    if (isReadOnly) {
      params.set('mode', 'readonly');
    }
    return `${baseUrl}?${params.toString()}`;
  };

  const currentLink = buildUrl(settings.theme, settings.accent, settings.density, settings.showAvatar, readOnlyMode);

  const variations: {
    id: string;
    theme: ThemeId;
    accent: ColorAccent;
    name: string;
    badge: string;
    description: string;
    recommendedFor: string;
  }[] = [
    {
      id: 'var-industrial',
      theme: 'industrial',
      accent: 'amber',
      name: 'Industrial IT/OT Specialist',
      badge: 'Siemens PLC & Automation',
      description: 'Engineered for manufacturing, factory automation, SCADA, and plant IT/OT convergence roles.',
      recommendedFor: 'Plant Managers, Industrial Automation Recruiters',
    },
    {
      id: 'var-modern',
      theme: 'modern',
      accent: 'navy',
      name: 'Executive Modern',
      badge: 'IT Support & Infrastructure',
      description: 'Balanced 2-column layout with credential badges and clear skill grouping for enterprise IT operations.',
      recommendedFor: 'IT Service Desks, MSPs, Corporate IT Teams',
    },
    {
      id: 'var-minimalist',
      theme: 'minimalist',
      accent: 'slate',
      name: 'Swiss Minimalist (ATS Maximum)',
      badge: '100% ATS Verified',
      description: 'Single-column typographical structure with maximum readability for corporate HR scanning systems.',
      recommendedFor: 'Jobstreet, Workday, Taleo, Corporate HR portals',
    },
    {
      id: 'var-creative',
      theme: 'creative',
      accent: 'navy',
      name: 'Creative Split Column',
      badge: 'Modern Editorial Tech',
      description: 'High-contrast sidebar layout highlighting photo, technical skills, and practical lab experience.',
      recommendedFor: 'Tech Startups, Modern Engineering Firms',
    },
  ];

  const handleCopyCurrent = () => {
    navigator.clipboard.writeText(currentLink);
    setCopiedCurrent(true);
    setTimeout(() => setCopiedCurrent(false), 2000);
  };

  const handleCopyVariation = (v: typeof variations[0]) => {
    const url = buildUrl(v.theme, v.accent, 'compact', settings.showAvatar, readOnlyMode);
    navigator.clipboard.writeText(url);
    setCopiedVariationId(v.id);
    setTimeout(() => setCopiedVariationId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Shareable Resume Variation Links
              </h2>
              <p className="text-xs text-slate-400">
                Send tailored, read-only links directly to employers and hiring managers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-200">
          
          {/* Read-Only Mode Toggle Banner */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Read-Only Recruiter View</div>
                <p className="text-slate-400 text-xs">
                  Recipients will see a clean, distraction-free resume without editing buttons or sidebars.
                </p>
              </div>
            </div>

            <button
              onClick={() => setReadOnlyMode(!readOnlyMode)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 text-xs flex items-center gap-1.5 ${
                readOnlyMode 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{readOnlyMode ? 'Read-Only (Active)' : 'Interactive Mode'}</span>
            </button>
          </div>

          {/* Current Active Variation Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
                Currently Selected Variation Link
              </span>
              <span className="text-[11px] font-medium text-blue-400 capitalize">
                Theme: {settings.theme} · Accent: {settings.accent}
              </span>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-700/80 font-mono text-[11px] text-slate-300">
              <span className="truncate flex-1 select-all">{currentLink}</span>
              <button
                onClick={handleCopyCurrent}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                {copiedCurrent ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCurrent ? 'Copied!' : 'Copy Link'}</span>
              </button>
              <a
                href={currentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick-Send Variations for Different Employers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
                Targeted Variation Links (Click to Copy Link for specific employers)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {variations.map((v) => {
                const isSelected = settings.theme === v.theme && settings.accent === v.accent;
                return (
                  <div
                    key={v.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-slate-800/90 border-blue-500/60 shadow-md ring-1 ring-blue-500/30' 
                        : 'bg-slate-800/40 border-slate-700/70 hover:bg-slate-800/70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-white text-xs">{v.name}</span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-blue-300">
                          {v.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                        {v.description}
                      </p>
                      <div className="text-[10px] text-slate-500 mb-3">
                        <strong className="text-slate-400">Best for:</strong> {v.recommendedFor}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                      <button
                        onClick={() => handleCopyVariation(v)}
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-[11px]"
                      >
                        {copiedVariationId === v.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-300 font-bold">Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Copy Variation Link</span>
                          </>
                        )}
                      </button>

                      {onSelectVariation && (
                        <button
                          onClick={() => {
                            onSelectVariation(v.theme, v.accent);
                            onClose();
                          }}
                          className="py-1.5 px-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/40 text-blue-300 font-medium transition-colors text-[11px] cursor-pointer"
                        >
                          View Here
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Direct Message Snippet */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
            <span className="font-semibold text-slate-300">Tip for Sending to Recruiters:</span>
            <p>
              When applying via email or WhatsApp, include the read-only variation link alongside your PDF:
            </p>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-300 italic">
              "Dear Hiring Team, please find my resume attached. You can also view my live interactive profile and verified Siemens IT/OT lab topology here: {currentLink}"
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Read-only links automatically fit mobile, tablet, and desktop</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
