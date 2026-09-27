import React from 'react';
import { ResumeData } from '../../data/resumeData';
import { ResumeSettings } from '../../types/resume';
import { ACCENT_PALETTES } from '../../utils/accentThemes';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Cpu, 
  ShieldCheck, 
  HardDrive, 
  Settings2, 
  Server, 
  Terminal, 
  FileCheck
} from 'lucide-react';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
  onOpenTopology?: () => void;
  onOpenPhotoModal?: () => void;
}

export const IndustrialTheme: React.FC<Props> = ({ data, settings, onOpenTopology, onOpenPhotoModal }) => {
  const palette = ACCENT_PALETTES[settings.accent] || ACCENT_PALETTES.slate;

  return (
    <div className="w-full text-slate-800 antialiased font-sans leading-snug">
      {/* Industrial Header Banner with Dynamic Primary Color */}
      <header 
        className="border-b-2 pb-2.5 mb-2.5" 
        style={{ borderColor: 'var(--primary-color, #1e3a8a)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span 
                className="font-mono-tech text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
                style={{ 
                  backgroundColor: 'var(--primary-light, #eff6ff)', 
                  color: 'var(--primary-color, #1e3a8a)', 
                  borderColor: 'var(--accent-border, #bfdbfe)' 
                }}
              >
                INDUSTRIAL & IT INFRASTRUCTURE
              </span>
              <span className="font-mono-tech text-[9.5px] text-slate-400">SYS-ID // MY-42300</span>
            </div>
            
            <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-slate-900 font-display">
              {data.fullName}
            </h1>
            
            <div 
              className="font-mono-tech text-[11.5px] font-bold tracking-wide" 
              style={{ color: 'var(--heading-color, #1e3a8a)' }}
            >
              {data.title}
            </div>

            {/* Industrial Contact Grid */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-600 font-mono-tech pt-0.5">
              <span className="inline-flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-500" />
                <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="hover:underline">{data.phone}</a>
              </span>
              <span className="text-slate-300">/</span>
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-500" />
                <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
              </span>
              <span className="text-slate-300">/</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>{data.location}</span>
              </span>
            </div>
          </div>

          {/* Right Visual / Avatar or Tech Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            {settings.showAvatar && data.avatarUrl && (
              <div 
                onClick={onOpenPhotoModal}
                className={`relative group ${onOpenPhotoModal ? 'cursor-pointer' : ''}`}
                title="Click to edit or replace photo"
              >
                <img
                  src={data.avatarUrl}
                  alt={data.fullName}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover object-top border-2 shadow-sm transition-transform group-hover:scale-105"
                  style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
                />
                {onOpenPhotoModal && (
                  <div className="no-print photo-overlay-badge change-photo-badge absolute inset-0 rounded-lg bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-mono-tech transition-opacity">
                    EDIT
                  </div>
                )}
              </div>
            )}
            <div 
              className="hidden sm:block text-right font-mono-tech text-[9.5px] border-l pl-2.5"
              style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
            >
              <div className="text-slate-500">STATUS: FIELD READY</div>
              <div 
                className="font-bold mt-0.5"
                style={{ color: 'var(--accent-bar, #2563eb)' }}
              >
                ● SIEMENS CERTIFIED
              </div>
              <div 
                className="font-bold"
                style={{ color: 'var(--primary-color, #1e3a8a)' }}
              >
                ● GOOGLE IT VERIFIED
              </div>
            </div>
          </div>
        </div>

        {/* Skill Matrix Summary Bar (Dynamic Accent Boxes) */}
        <div 
          className="grid grid-cols-5 gap-1.5 mt-2 pt-2 border-t border-dashed text-[10.5px]"
          style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
        >
          {data.skillCategories.map((cat) => (
            <div 
              key={cat.id} 
              className="p-1.5 rounded border"
              style={{ 
                backgroundColor: 'var(--primary-light, #eff6ff)', 
                borderColor: 'var(--accent-border, #bfdbfe)' 
              }}
            >
              <div 
                className="font-bold text-[10px] uppercase tracking-wider mb-0.5"
                style={{ color: 'var(--heading-color, #1e3a8a)' }}
              >
                {cat.name}
              </div>
              <div className="text-[9.5px] text-slate-700 line-clamp-2 leading-tight">
                {cat.skills.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Industrial Grid Body */}
      <div className="space-y-2.5">
        {/* Profile */}
        <section 
          className="p-2.5 rounded-lg border-l-4 border-t border-r border-b"
          style={{ 
            borderLeftColor: 'var(--primary-color, #1e3a8a)', 
            borderColor: 'var(--accent-border, #bfdbfe)',
            backgroundColor: 'var(--primary-light, #eff6ff)'
          }}
        >
          <div className="flex items-center justify-between mb-0.5">
            <h2 
              className="font-mono-tech text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1.5"
              style={{ color: 'var(--heading-color, #1e3a8a)' }}
            >
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--accent-bar, #2563eb)' }} />
              Executive Profile & Technical Baseline
            </h2>
            <span className="font-mono-tech text-[9px] text-slate-500">REF: SUMMARY.01</span>
          </div>
          <p className="text-[11px] text-slate-700 leading-normal text-justify">
            {data.professionalProfile}
          </p>
        </section>

        {/* 2-Column Section: Experience + IT/OT Featured Lab */}
        <div className="grid grid-cols-12 gap-3">
          {/* Main Experience Column (7 cols) */}
          <div className="col-span-7 space-y-2.5">
            {/* Experience */}
            <section>
              <div 
                className="flex items-center justify-between border-b pb-0.5 mb-1.5" 
                style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
              >
                <h2 
                  className="font-mono-tech text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: 'var(--heading-color, #1e3a8a)' }}
                >
                  <HardDrive className="w-3.5 h-3.5" style={{ color: 'var(--accent-bar, #2563eb)' }} />
                  Field & Industrial Experience
                </h2>
                <span className="font-mono-tech text-[9px] text-slate-500">TIMELINE</span>
              </div>

              {data.experience.map((exp) => (
                <div 
                  key={exp.id} 
                  className="p-2.5 rounded-lg border bg-white mb-2 last:mb-0"
                  style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
                >
                  <div 
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 mb-1 pb-1 border-b border-dashed"
                    style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
                  >
                    <div>
                      <span className="text-[11.5px] font-bold text-slate-900">{exp.role}</span>
                      <span className="text-slate-400 mx-1">@</span>
                      <span 
                        className="text-[11px] font-bold"
                        style={{ color: 'var(--primary-color, #1e3a8a)' }}
                      >
                        {exp.company}
                      </span>
                    </div>
                    <div className="font-mono-tech text-[10px] text-slate-600">
                      <span>{exp.location}</span>
                      <span className="mx-1">/</span>
                      <span className="font-bold text-slate-800">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-0.5 text-[11px] text-slate-700">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span 
                          className="font-mono-tech mt-0.5 text-[10px]"
                          style={{ color: 'var(--accent-bar, #2563eb)' }}
                        >
                          ▸
                        </span>
                        <span className="leading-tight">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Featured IT/OT Project */}
            <section>
              <div 
                className="flex items-center justify-between border-b pb-0.5 mb-1.5" 
                style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
              >
                <h2 
                  className="font-mono-tech text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: 'var(--heading-color, #1e3a8a)' }}
                >
                  <Cpu className="w-3.5 h-3.5" style={{ color: 'var(--accent-bar, #2563eb)' }} />
                  Industrial IT/OT Project Spotlight
                </h2>
                {onOpenTopology && (
                  <button
                    onClick={onOpenTopology}
                    type="button"
                    className="no-print text-[10px] font-mono-tech font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    style={{ color: 'var(--accent-bar, #2563eb)' }}
                  >
                    <Terminal className="w-2.5 h-2.5" />
                    [TOPOLOGY]
                  </button>
                )}
              </div>

              {data.projects.map((proj) => (
                <div 
                  key={proj.id} 
                  className="p-2.5 rounded-lg border"
                  style={{ 
                    borderColor: 'var(--accent-border, #bfdbfe)',
                    backgroundColor: 'var(--primary-light, #eff6ff)'
                  }}
                >
                  <div className="flex items-baseline justify-between mb-0.5">
                    <h3 
                      className="text-[11.5px] font-bold font-mono-tech"
                      style={{ color: 'var(--heading-color, #1e3a8a)' }}
                    >
                      {proj.title}
                    </h3>
                    <span className="font-mono-tech text-[9.5px] text-slate-500">{proj.period}</span>
                  </div>
                  <p className="text-[10px] text-slate-600 mb-1 font-medium">
                    {proj.subtitle}
                  </p>

                  <ul className="space-y-0.5 text-[11px] text-slate-700 mb-1.5">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span 
                          className="font-mono-tech mt-0.5 text-[10px]"
                          style={{ color: 'var(--accent-bar, #2563eb)' }}
                        >
                          ▸
                        </span>
                        <span className="leading-tight">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack badge matrix */}
                  <div 
                    className="bg-white p-1.5 rounded border text-[10px]"
                    style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
                  >
                    <div 
                      className="font-mono-tech text-[9px] font-bold uppercase mb-0.5"
                      style={{ color: 'var(--heading-color, #1e3a8a)' }}
                    >
                      ENVIRONMENT STACK:
                    </div>
                    <div className="flex flex-wrap gap-1 font-mono-tech text-[9px]">
                      {proj.techStack.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-1.5 py-0.5 rounded border font-medium"
                          style={{
                            backgroundColor: 'var(--badge-bg, #dbeafe)',
                            color: 'var(--badge-text, #1e40af)',
                            borderColor: 'var(--accent-border, #bfdbfe)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Right Rail: Credentials, Training & Education (5 cols) */}
          <div className="col-span-5 space-y-2.5">
            {/* Verified Certifications */}
            <section 
              className="bg-white p-2.5 rounded-lg border"
              style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
            >
              <h2 
                className="font-mono-tech text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5 pb-0.5 border-b"
                style={{ 
                  color: 'var(--heading-color, #1e3a8a)',
                  borderColor: 'var(--accent-border, #bfdbfe)'
                }}
              >
                <FileCheck className="w-3.5 h-3.5" style={{ color: 'var(--accent-bar, #2563eb)' }} />
                Verified Accreditations
              </h2>
              <div className="space-y-1.5">
                {data.certifications.map((cert) => (
                  <div 
                    key={cert.id} 
                    className="text-[10.5px] pb-1 border-b border-dashed last:border-0 last:pb-0"
                    style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
                  >
                    <div className="font-bold text-slate-900 flex items-start justify-between gap-1">
                      <span>{cert.title}</span>
                      {cert.badge && (
                        <span 
                          className="shrink-0 font-mono-tech text-[8.5px] font-semibold px-1 py-0.2 rounded border"
                          style={{
                            backgroundColor: 'var(--badge-bg, #dbeafe)',
                            color: 'var(--badge-text, #1e40af)',
                            borderColor: 'var(--accent-border, #bfdbfe)'
                          }}
                        >
                          {cert.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[9.5px] text-slate-600 leading-tight">
                      {cert.issuer}
                    </div>
                    <div className="flex items-center justify-between font-mono-tech text-[9px] text-slate-500 mt-0.5">
                      <span>{cert.date}</span>
                      {cert.credentialCode && <span>ID: {cert.credentialCode}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Academic & Technical Training */}
            <section 
              className="bg-white p-2.5 rounded-lg border"
              style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
            >
              <h2 
                className="font-mono-tech text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5 pb-0.5 border-b"
                style={{ 
                  color: 'var(--heading-color, #1e3a8a)',
                  borderColor: 'var(--accent-border, #bfdbfe)'
                }}
              >
                <Server className="w-3.5 h-3.5" style={{ color: 'var(--accent-bar, #2563eb)' }} />
                Education & Training
              </h2>
              <div className="space-y-1.5">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-[10.5px]">
                    <div className="font-bold text-slate-900 leading-tight">{edu.degree}</div>
                    <div className="text-[9.5px] text-slate-600 leading-tight">{edu.institution}</div>
                    <div className="flex justify-between font-mono-tech text-[9px] text-slate-500">
                      <span>{edu.yearOrPeriod}</span>
                      {edu.location && <span>{edu.location}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Training Syllabus Summary */}
              <div 
                className="mt-1.5 pt-1.5 border-t"
                style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
              >
                <div 
                  className="font-mono-tech text-[9px] font-bold uppercase mb-0.5"
                  style={{ color: 'var(--primary-color, #1e3a8a)' }}
                >
                  CORE TECHNICAL CURRICULUM:
                </div>
                <p className="text-[10px] text-slate-700 leading-tight">
                  {data.technicalTraining}
                </p>
              </div>
            </section>

            {/* Languages & Communication */}
            <section 
              className="bg-white p-2 rounded-lg border"
              style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
            >
              <h2 
                className="font-mono-tech text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1 pb-0.5 border-b"
                style={{ 
                  color: 'var(--heading-color, #1e3a8a)',
                  borderColor: 'var(--accent-border, #bfdbfe)'
                }}
              >
                <Settings2 className="w-3.5 h-3.5" style={{ color: 'var(--accent-bar, #2563eb)' }} />
                Language Capabilities
              </h2>
              <div className="space-y-0.5 text-[10px]">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">{lang.name}</span>
                    <span className="font-mono-tech text-[9.5px] text-slate-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
