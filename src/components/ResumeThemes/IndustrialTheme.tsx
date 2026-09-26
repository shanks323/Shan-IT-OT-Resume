import React from 'react';
import { ResumeData } from '../../data/resumeData';
import { ResumeSettings } from '../../types/resume';
import { ACCENT_PALETTES } from '../../utils/accentThemes';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Cpu, 
  ShieldCheck, 
  Network, 
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
    <div className="w-full text-slate-800 antialiased font-sans">
      {/* Industrial Header Banner */}
      <header className="border-b-2 pb-4 mb-4" style={{ borderColor: palette.primaryDark }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[11px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                INDUSTRIAL & IT INFRASTRUCTURE
              </span>
              <span className="font-mono-tech text-[10px] text-slate-400">SYS-ID // MY-42300</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              {data.fullName}
            </h1>
            
            <div className="font-mono-tech text-xs sm:text-[13px] font-semibold tracking-wide" style={{ color: palette.headingColor }}>
              {data.title}
            </div>

            {/* Industrial Contact Grid */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-mono-tech pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="hover:underline">{data.phone}</a>
              </span>
              <span className="text-slate-300">/</span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
              </span>
              <span className="text-slate-300">/</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{data.location}</span>
              </span>
            </div>
          </div>

          {/* Right Visual / Avatar or Tech Badge */}
          <div className="flex items-center gap-3 shrink-0">
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
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover object-top border-2 border-slate-700 shadow-sm transition-transform group-hover:scale-105"
                />
                {onOpenPhotoModal && (
                  <div className="no-print absolute inset-0 rounded-lg bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-mono-tech transition-opacity">
                    EDIT
                  </div>
                )}
              </div>
            )}
            <div className="hidden sm:block text-right font-mono-tech text-[10px] text-slate-500 border-l border-slate-200 pl-3">
              <div>STATUS: READY TO DEPLOY</div>
              <div className="text-emerald-700 font-bold mt-0.5">● SIEMENS CERTIFIED</div>
              <div className="text-blue-700 font-bold">● GOOGLE IT VERIFIED</div>
            </div>
          </div>
        </div>

        {/* Skill Matrix Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-3 border-t border-dashed border-slate-200 text-xs">
          {data.skillCategories.map((cat) => (
            <div key={cat.id} className="p-2 rounded bg-slate-50 border border-slate-200/80">
              <div className="font-bold text-[11px] uppercase tracking-wider text-slate-900 mb-1 flex items-center justify-between">
                <span>{cat.name}</span>
              </div>
              <div className="text-[10px] text-slate-600 line-clamp-2">
                {cat.skills.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Industrial Grid Body */}
      <div className="space-y-4">
        {/* Profile */}
        <section className="bg-slate-50/70 p-3.5 rounded-lg border-l-4 border-slate-800 border-t border-r border-b border-slate-200">
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              Executive Profile & Technical Baseline
            </h2>
            <span className="font-mono-tech text-[10px] text-slate-500">REF: SUMMARY.01</span>
          </div>
          <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify">
            {data.professionalProfile}
          </p>
        </section>

        {/* 2-Column Section: Experience + IT/OT Featured Lab */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Experience Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Experience */}
            <section>
              <div className="flex items-center justify-between border-b pb-1 mb-2.5" style={{ borderColor: '#cbd5e1' }}>
                <h2 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-slate-700" />
                  Field & Industrial Experience
                </h2>
                <span className="font-mono-tech text-[10px] text-slate-500">TIMELINE</span>
              </div>

              {data.experience.map((exp) => (
                <div key={exp.id} className="p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5 pb-1 border-b border-dashed border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                      <span className="text-slate-400 mx-1.5">@</span>
                      <span className="text-xs font-bold text-slate-700">{exp.company}</span>
                    </div>
                    <div className="font-mono-tech text-[11px] text-slate-600">
                      <span>{exp.location}</span>
                      <span className="mx-1">/</span>
                      <span className="font-bold text-slate-800">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 font-mono-tech mt-0.5">▸</span>
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Featured IT/OT Project */}
            <section>
              <div className="flex items-center justify-between border-b pb-1 mb-2.5" style={{ borderColor: '#cbd5e1' }}>
                <h2 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-slate-700" />
                  Industrial IT/OT Project Spotlight
                </h2>
                {onOpenTopology && (
                  <button
                    onClick={onOpenTopology}
                    type="button"
                    className="no-print text-[11px] font-mono-tech text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Terminal className="w-3 h-3" />
                    [LAUNCH TOPOLOGY DIAGRAM]
                  </button>
                )}
              </div>

              {data.projects.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-lg border border-slate-300 bg-slate-50/50">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-xs font-bold text-slate-900 font-mono-tech">
                      {proj.title}
                    </h3>
                    <span className="font-mono-tech text-[10px] text-slate-500">{proj.period}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mb-2 font-medium">
                    {proj.subtitle}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-700 mb-3">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 font-mono-tech mt-0.5">▸</span>
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack badge matrix */}
                  <div className="bg-white p-2 rounded border border-slate-200 text-[11px]">
                    <div className="font-mono-tech text-[10px] font-bold text-slate-600 uppercase mb-1">
                      ENVIRONMENT STACK:
                    </div>
                    <div className="flex flex-wrap gap-1 font-mono-tech text-[10px]">
                      {proj.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-300 font-medium">
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
          <div className="lg:col-span-5 space-y-4">
            {/* Verified Certifications */}
            <section className="bg-white p-3.5 rounded-lg border border-slate-200">
              <h2 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2.5 pb-1 border-b border-slate-200">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Verified Certifications & Accreditations
              </h2>
              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="text-xs pb-2 border-b border-dashed border-slate-200 last:border-0 last:pb-0">
                    <div className="font-bold text-slate-900 flex items-start justify-between gap-1">
                      <span>{cert.title}</span>
                      {cert.badge && (
                        <span className="shrink-0 font-mono-tech text-[9px] bg-slate-100 text-slate-700 font-semibold px-1.5 py-0.5 rounded border">
                          {cert.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      {cert.issuer}
                    </div>
                    <div className="flex items-center justify-between font-mono-tech text-[10px] text-slate-500 mt-1">
                      <span>{cert.date}</span>
                      {cert.credentialCode && <span>ID: {cert.credentialCode}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Academic & Technical Training */}
            <section className="bg-white p-3.5 rounded-lg border border-slate-200">
              <h2 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2.5 pb-1 border-b border-slate-200">
                <Server className="w-4 h-4 text-slate-700" />
                Education & Vocational History
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-[11px] text-slate-600">{edu.institution}</div>
                    <div className="flex justify-between font-mono-tech text-[10px] text-slate-500 mt-0.5">
                      <span>{edu.yearOrPeriod}</span>
                      {edu.location && <span>{edu.location}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Training Syllabus Summary */}
              <div className="mt-3 pt-2.5 border-t border-slate-200">
                <div className="font-mono-tech text-[10px] font-bold uppercase text-slate-600 mb-1">
                  CORE TECHNICAL CURRICULUM:
                </div>
                <p className="text-[11px] text-slate-700 leading-snug">
                  {data.technicalTraining}
                </p>
              </div>
            </section>

            {/* Languages & Communication */}
            <section className="bg-white p-3 rounded-lg border border-slate-200">
              <h2 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-200">
                <Settings2 className="w-4 h-4 text-slate-700" />
                Language Capabilities
              </h2>
              <div className="space-y-1.5 text-xs">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-900">{lang.name}</span>
                    <span className="font-mono-tech text-[11px] text-slate-500">{lang.level}</span>
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
