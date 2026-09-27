import React from 'react';
import { ResumeData } from '../../data/resumeData';
import { ResumeSettings } from '../../types/resume';
import { ACCENT_PALETTES } from '../../utils/accentThemes';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  Terminal,
  Server,
  Globe
} from 'lucide-react';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
  onOpenTopology?: () => void;
  onOpenPhotoModal?: () => void;
}

export const ModernTheme: React.FC<Props> = ({ data, settings, onOpenTopology, onOpenPhotoModal }) => {
  const palette = ACCENT_PALETTES[settings.accent] || ACCENT_PALETTES.navy;

  return (
    <div className="w-full text-slate-800 antialiased font-sans leading-snug">
      {/* Header */}
      <header className="border-b pb-2.5 mb-2.5" style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-slate-900 font-display uppercase leading-tight">
              {data.fullName}
            </h1>
            <p 
              className="text-[11px] sm:text-xs font-bold tracking-wider uppercase mt-0.5" 
              style={{ color: 'var(--accent-bar, #2563eb)' }}
            >
              {data.title}
            </p>
            
            {/* Contact Details */}
            <div className="flex flex-wrap items-center gap-y-0.5 gap-x-2.5 text-[11px] text-slate-600 mt-1 font-medium">
              <span className="inline-flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="hover:underline">{data.phone}</a>
              </span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
              </span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{data.location}</span>
              </span>
              {data.linkedin && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Linkedin className="w-3 h-3 text-slate-400" />
                    <span>{data.linkedin}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Optional Profile Avatar */}
          {settings.showAvatar && data.avatarUrl && (
            <div 
              onClick={onOpenPhotoModal}
              className={`shrink-0 relative group ${onOpenPhotoModal ? 'cursor-pointer' : ''}`}
              title="Click to edit or replace photo"
            >
              <img
                src={data.avatarUrl}
                alt={data.fullName}
                referrerPolicy="no-referrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover object-top border-2 shadow-sm transition-transform group-hover:scale-105"
                style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
              />
              {onOpenPhotoModal && (
                <div className="no-print photo-overlay-badge change-photo-badge absolute inset-0 rounded-xl bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-medium transition-opacity backdrop-blur-[1px]">
                  Change
                </div>
              )}
            </div>
          )}
        </div>

        {/* Credentials Quick Banner */}
        {settings.showCredentialsBadges && (
          <div 
            className="mt-2 py-1.5 px-2.5 rounded-lg flex flex-wrap items-center justify-between gap-1.5 border text-[11px]"
            style={{ 
              backgroundColor: 'var(--primary-light, #eff6ff)', 
              borderColor: 'var(--accent-border, #bfdbfe)' 
            }}
          >
            <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--heading-color, #1e3a8a)' }}>
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>Certified Qualifications:</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-slate-700 font-medium">
              <span>Google IT Support Professional</span>
              <span className="text-slate-400">/</span>
              <span>Siemens TIA Basic PLC & Sitrain L1</span>
              <span className="text-slate-400">/</span>
              <span>SKM Level 3 (IT-020-3:2013)</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Body Grid */}
      <div className="grid grid-cols-12 gap-3.5">
        {/* Left Column (Skills, Certs, Education) - 4 cols */}
        <div className="col-span-4 space-y-2.5">
          {/* Key Skill Categories */}
          <section 
            className="p-2.5 rounded-xl border"
            style={{ 
              backgroundColor: 'var(--primary-light, #eff6ff)', 
              borderColor: 'var(--accent-border, #bfdbfe)' 
            }}
          >
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-200">
              <Layers className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
              Core Competencies
            </h2>
            <div className="space-y-1.5">
              {data.skillCategories.map((cat) => (
                <div key={cat.id} className="text-[11px]">
                  <div 
                    className="font-semibold text-[10.5px] mb-0.5"
                    style={{ color: 'var(--heading-color, #1e3a8a)' }}
                  >
                    {cat.name}
                  </div>
                  <div className="flex flex-wrap gap-1 text-[10px] text-slate-600">
                    {cat.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white px-1 py-0.5 rounded border text-slate-700 font-medium"
                        style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications & Badges */}
          <section 
            className="p-2.5 rounded-xl border bg-white"
            style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
          >
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-200">
              <Award className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
              Certifications
            </h2>
            <div className="space-y-1.5">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-[10.5px]">
                  <div className="font-bold text-slate-900 leading-tight">
                    {cert.title}
                  </div>
                  <div className="text-[10px] text-slate-600 leading-tight">
                    {cert.issuer}
                  </div>
                  <div className="flex items-center justify-between text-[9.5px] text-slate-500">
                    <span>{cert.date}</span>
                    {cert.credentialCode && (
                      <span className="font-mono-tech text-[9px] text-slate-600 font-medium">
                        {cert.credentialCode}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section 
            className="p-2.5 rounded-xl border bg-white"
            style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
          >
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-200">
              <GraduationCap className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
              Education
            </h2>
            <div className="space-y-1.5">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-[10.5px]">
                  <div className="font-bold text-slate-900 leading-tight">
                    {edu.degree}
                  </div>
                  <div className="text-[10px] text-slate-600 leading-tight">
                    {edu.institution}
                  </div>
                  <div className="text-[9.5px] text-slate-500 flex justify-between">
                    <span>{edu.yearOrPeriod}</span>
                    {edu.location && <span>{edu.location}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section 
            className="p-2 rounded-xl border bg-white"
            style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
          >
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1 pb-0.5 border-b border-slate-200">
              <Globe className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
              Languages
            </h2>
            <div className="space-y-0.5 text-[10.5px]">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="font-medium text-slate-800">{lang.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Experience, Projects, Summary) - 8 cols */}
        <div className="col-span-8 space-y-2.5">
          {/* Professional Profile */}
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
              Professional Profile
            </h2>
            <p className="text-[11.5px] text-slate-700 leading-normal text-justify">
              {data.professionalProfile}
            </p>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 
              className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1.5 border-b pb-0.5" 
              style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
            >
              <Briefcase className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
              Professional Experience
            </h2>
            <div className="space-y-1.5">
              {data.experience.map((exp) => (
                <div 
                  key={exp.id} 
                  className="relative pl-2.5 border-l-2" 
                  style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 mb-0.5">
                    <div>
                      <span className="text-[11.5px] font-bold text-slate-900">{exp.role}</span>
                      <span className="text-slate-400 mx-1">|</span>
                      <span 
                        className="text-[11px] font-semibold"
                        style={{ color: 'var(--primary-color, #1e3a8a)' }}
                      >
                        {exp.company}
                      </span>
                    </div>
                    <div className="text-[10.5px] text-slate-500 font-medium">
                      <span>{exp.location}</span>
                      <span className="mx-1">·</span>
                      <span className="font-semibold text-slate-700">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="list-disc pl-3.5 space-y-0.5 text-[11px] text-slate-700 leading-tight">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="marker:text-slate-400">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Featured IT/OT Project */}
          <section>
            <div 
              className="flex items-center justify-between border-b pb-0.5 mb-1.5" 
              style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
            >
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
                Featured IT/OT Project
              </h2>
              {onOpenTopology && (
                <button
                  onClick={onOpenTopology}
                  type="button"
                  className="no-print text-[10px] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  style={{ color: 'var(--accent-bar, #2563eb)' }}
                >
                  <Server className="w-2.5 h-2.5" />
                  View Lab Diagram
                </button>
              )}
            </div>

            {data.projects.map((proj) => (
              <div 
                key={proj.id} 
                className="p-2.5 rounded-xl border" 
                style={{ 
                  borderColor: 'var(--accent-border, #bfdbfe)',
                  backgroundColor: 'var(--primary-light, #eff6ff)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 mb-0.5">
                  <h3 
                    className="text-[11.5px] font-bold"
                    style={{ color: 'var(--heading-color, #1e3a8a)' }}
                  >
                    {proj.title}
                  </h3>
                  {proj.period && (
                    <span className="text-[10px] font-semibold text-slate-500">
                      {proj.period}
                    </span>
                  )}
                </div>

                <p className="text-[10.5px] font-medium text-slate-600 mb-1 italic">
                  {proj.subtitle}
                </p>

                <ul className="list-disc pl-3.5 space-y-0.5 text-[11px] text-slate-700 leading-tight mb-1.5">
                  {proj.bullets.map((bullet, idx) => (
                    <li key={idx} className="marker:text-slate-400">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Architecture Callout */}
                {proj.architectureSummary && (
                  <div 
                    className="p-1.5 rounded bg-white border text-[10px] text-slate-700 mb-1.5 font-mono-tech flex items-start gap-1"
                    style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
                  >
                    <Terminal className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Lab Setup:</strong> {proj.architectureSummary}</span>
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap items-center gap-1 text-[9.5px]">
                  <span className="font-semibold text-slate-500 mr-0.5">Stack:</span>
                  {proj.techStack.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[9.5px] font-medium border"
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
            ))}
          </section>

          {/* Technical Training Overview */}
          <section 
            className="p-2 rounded-xl border"
            style={{ 
              borderColor: 'var(--accent-border, #bfdbfe)',
              backgroundColor: 'var(--primary-light, #eff6ff)'
            }}
          >
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-0.5">
              <Server className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
              Relevant Technical Training
            </h2>
            <p className="text-[10.5px] text-slate-700 leading-snug">
              {data.technicalTraining}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
