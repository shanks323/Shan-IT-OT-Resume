import React from 'react';
import { 
  Palette, 
  Sliders, 
  UserCheck, 
  Layers, 
  Award, 
  Copy, 
  Check, 
  Share2, 
  Sparkles,
  Network,
  CheckCircle2,
  FileText,
  Printer,
  Edit3,
  Camera
} from 'lucide-react';
import { ThemeId, ColorAccent, SpacingDensity, ResumeSettings } from '../types/resume';
import { ResumeData } from '../data/resumeData';

interface Props {
  settings: ResumeSettings;
  data: ResumeData;
  onUpdateSettings: (newSettings: Partial<ResumeSettings>) => void;
  onOpenTopology: () => void;
  onOpenAts: () => void;
  onOpenCoverLetter: () => void;
  onOpenEditor: () => void;
  onOpenPhotoModal: () => void;
  onOpenShareModal: () => void;
  onPrint: () => void;
}

export const ThemeToolbar: React.FC<Props> = ({
  settings,
  data,
  onUpdateSettings,
  onOpenTopology,
  onOpenAts,
  onOpenCoverLetter,
  onOpenEditor,
  onOpenPhotoModal,
  onOpenShareModal,
  onPrint,
}) => {
  const [copiedText, setCopiedText] = React.useState(false);

  const themes: { id: ThemeId; name: string; tag: string }[] = [
    { id: 'modern', name: 'Executive Modern', tag: 'High-Impact 2-Col' },
    { id: 'industrial', name: 'Industrial IT/OT', tag: 'PLC & Automation' },
    { id: 'minimalist', name: 'Swiss Minimalist', tag: 'ATS Maximum' },
    { id: 'creative', name: 'Creative Split', tag: 'Editorial Tech' },
  ];

  const accents: { id: ColorAccent; name: string; color: string }[] = [
    { id: 'navy', name: 'Navy', color: '#1e3a8a' },
    { id: 'slate', name: 'Slate', color: '#334155' },
    { id: 'cyan', name: 'Cyan', color: '#0e7490' },
    { id: 'emerald', name: 'Emerald', color: '#065f46' },
    { id: 'amber', name: 'Industrial Amber', color: '#92400e' },
  ];

  const handleCopyPlainText = () => {
    const text = `
${data.fullName}
${data.title}
Phone: ${data.phone} | Email: ${data.email} | Location: ${data.location}

PROFESSIONAL SUMMARY
${data.professionalProfile}

CORE SKILLS
${data.skillCategories.map(c => `${c.name}: ${c.skills.join(', ')}`).join('\n')}

PROFESSIONAL EXPERIENCE
${data.experience.map(e => `${e.role} - ${e.company} (${e.period}, ${e.location})\n${e.bullets.map(b => `• ${b}`).join('\n')}`).join('\n\n')}

FEATURED PROJECT
${data.projects.map(p => `${p.title} (${p.period})\n${p.subtitle}\n${p.bullets.map(b => `• ${b}`).join('\n')}\nTech: ${p.techStack.join(', ')}`).join('\n\n')}

CREDENTIALS & CERTIFICATIONS
${data.certifications.map(c => `• ${c.title} - ${c.issuer} (${c.date})`).join('\n')}

EDUCATION
${data.education.map(ed => `• ${ed.degree} - ${ed.institution} (${ed.yearOrPeriod})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <aside className="no-print w-full bg-slate-900 border-b border-slate-800 text-slate-200 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Left: Theme Selection & Style Options */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Themes */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => onUpdateSettings({ theme: t.id })}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  settings.theme === t.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>{t.name}</span>
              </button>
            ))}
          </div>

          {/* Color Accents */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1.5 rounded-xl border border-slate-800">
            {accents.map((acc) => (
              <button
                key={acc.id}
                onClick={() => onUpdateSettings({ accent: acc.id })}
                title={acc.name}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                  settings.accent === acc.id ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: acc.color }}
              >
                {settings.accent === acc.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                )}
              </button>
            ))}
          </div>

          {/* Spacing Density */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['compact', 'balanced', 'spacious'] as SpacingDensity[]).map((d) => (
              <button
                key={d}
                onClick={() => onUpdateSettings({ density: d })}
                className={`px-2 py-1 rounded-md capitalize font-medium transition-colors cursor-pointer ${
                  settings.density === d
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {d === 'compact' ? '1-Page A4' : d}
              </button>
            ))}
          </div>

          {/* Photo toggle & Edit Photo */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onUpdateSettings({ showAvatar: !settings.showAvatar })}
              className={`px-2.5 py-1.5 rounded-l-xl border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                settings.showAvatar
                  ? 'bg-slate-800 text-blue-400 border-blue-500/30'
                  : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{settings.showAvatar ? 'Photo Shown' : 'Text-Only'}</span>
            </button>
            <button
              onClick={onOpenPhotoModal}
              title="Upload / Change Portrait Photo"
              className="px-2 py-1.5 rounded-r-xl border border-l-0 border-slate-800 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
            >
              <Camera className="w-3.5 h-3.5 text-blue-400" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Right: Quick Action Badges */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 flex-wrap">
          {/* Mobile visible tool buttons */}
          <div className="flex lg:hidden items-center gap-1 text-xs">
            <button
              onClick={onOpenTopology}
              className="p-1.5 rounded-lg bg-slate-800 text-blue-400 border border-slate-700 hover:bg-slate-700"
              title="IT/OT Lab Diagram"
            >
              <Network className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAts}
              className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 hover:bg-slate-700"
              title="ATS Audit"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCoverLetter}
              className="p-1.5 rounded-lg bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700"
              title="Cover Letter"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleCopyPlainText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
            title="Copy formatted plain text resume for ATS job application forms"
          >
            {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedText ? 'Copied ATS Text' : 'Copy for ATS'}</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            title="Send read-only links for each resume variation"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Send Variation Link</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
