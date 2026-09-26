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
  const isCompact = settings.density === 'compact';
  const isSpacious = settings.density === 'spacious';

  const spacingClass = isCompact 
    ? 'space-y-3' 
    : isSpacious 
      ? 'space-y-6' 
      : 'space-y-4';

  const sectionMargin = isCompact ? 'mb-3' : isSpacious ? 'mb-6' : 'mb-4';

  return (
    <div className="w-full text-slate-800 antialiased font-sans leading-relaxed">
      {/* Header */}
      <header className="border-b pb-4 mb-4" style={{ borderColor: '#e2e8f0' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display uppercase">
              {data.fullName}
            </h1>
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase mt-1" style={{ color: palette.accentBar }}>
              {data.title}
            </p>
            
            {/* Contact Details */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600 mt-2 font-medium">
              <span className="inline-flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="hover:underline">{data.phone}</a>
              </span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
              </span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{data.location}</span>
              </span>
              {data.linkedin && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Linkedin className="w-3.5 h-3.5 text-slate-400" />
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
              className={`shrink-0 self-start sm:self-center relative group ${onOpenPhotoModal ? 'cursor-pointer' : ''}`}
              title="Click to edit or replace photo"
            >
              <img
                src={data.avatarUrl}
                alt={data.fullName}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-top border-2 shadow-sm transition-transform group-hover:scale-105"
                style={{ borderColor: palette.border }}
              />
              {onOpenPhotoModal && (
                <div className="no-print absolute inset-0 rounded-xl bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-medium transition-opacity backdrop-blur-[1px]">
                  Change
                </div>
              )}
            </div>
          )}
        </div>

        {/* Credentials Quick Banner */}
        {settings.showCredentialsBadges && (
          <div 
            className="mt-3.5 py-2 px-3 rounded-lg flex flex-wrap items-center justify-between gap-2 border text-xs"
            style={{ backgroundColor: palette.primaryLight, borderColor: palette.border }}
          >
            <div className="flex items-center gap-1.5 font-semibold" style={{ color: palette.headingColor }}>
              <Award className="w-4 h-4 shrink-0" />
              <span>Certified Qualifications:</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-700">
              <span className="font-medium">Google IT Support Professional</span>
              <span className="text-slate-400">/</span>
              <span className="font-medium">Siemens TIA Basic PLC & Sitrain L1</span>
              <span className="text-slate-400">/</span>
              <span className="font-medium">SKM Level 3 (IT-020-3:2013)</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Body Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Column (Skills & Meta) */}
        <div className="md:col-span-4 space-y-4">
          {/* Key Skill Categories */}
          <section className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2.5 pb-1 border-b border-slate-200">
              <Layers className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
              Core Competencies
            </h2>
            <div className="space-y-3">
              {data.skillCategories.map((cat) => (
                <div key={cat.id} className="text-xs">
                  <div className="font-semibold text-slate-800 flex items-center justify-between mb-1">
                    <span>{cat.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
                    {cat.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white px-1.5 py-0.5 rounded border border-slate-200/90 text-slate-700 font-medium"
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
          <section className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-200">
              <Award className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
              Certifications
            </h2>
            <div className="space-y-2.5">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <div className="font-semibold text-slate-900 leading-snug">
                    {cert.title}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {cert.issuer}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>{cert.date}</span>
                    {cert.credentialCode && (
                      <span className="font-mono-tech text-[10px] text-slate-600 font-medium">
                        {cert.credentialCode}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-200">
              <GraduationCap className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
              Education
            </h2>
            <div className="space-y-2.5">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-semibold text-slate-900">
                    {edu.degree}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {edu.institution}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex justify-between">
                    <span>{edu.yearOrPeriod}</span>
                    {edu.location && <span>{edu.location}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-200">
              <Globe className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
              Languages
            </h2>
            <div className="space-y-1.5 text-xs">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-800">{lang.name}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Experience & Featured IT/OT Project) */}
        <div className="md:col-span-8 space-y-4">
          {/* Professional Profile */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
              Professional Profile
            </h2>
            <div className="text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify bg-white rounded-lg">
              {data.professionalProfile}
            </div>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2 border-b pb-1" style={{ borderColor: '#e2e8f0' }}>
              <Briefcase className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
              Professional Experience
            </h2>
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: palette.border }}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 mb-1">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                      <span className="text-slate-400 mx-1.5">|</span>
                      <span className="text-xs font-semibold text-slate-700">{exp.company}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      <span>{exp.location}</span>
                      <span className="mx-1">·</span>
                      <span className="font-semibold text-slate-700">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 leading-snug">
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
            <div className="flex items-center justify-between border-b pb-1 mb-2" style={{ borderColor: '#e2e8f0' }}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
                Featured IT/OT Project
              </h2>
              {onOpenTopology && (
                <button
                  onClick={onOpenTopology}
                  type="button"
                  className="no-print text-[11px] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  style={{ color: palette.accentBar }}
                >
                  <Server className="w-3 h-3" />
                  View Lab Diagram
                </button>
              )}
            </div>

            {data.projects.map((proj) => (
              <div 
                key={proj.id} 
                className="p-3 rounded-xl border bg-slate-50/50" 
                style={{ borderColor: palette.border }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                  <h3 className="text-xs font-bold text-slate-900">
                    {proj.title}
                  </h3>
                  {proj.period && (
                    <span className="text-[11px] font-semibold text-slate-500">
                      {proj.period}
                    </span>
                  )}
                </div>

                <p className="text-[11px] font-medium text-slate-600 mb-2 italic">
                  {proj.subtitle}
                </p>

                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 leading-snug mb-2.5">
                  {proj.bullets.map((bullet, idx) => (
                    <li key={idx} className="marker:text-slate-400">
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Architecture Callout */}
                {proj.architectureSummary && (
                  <div className="p-2 rounded bg-white border border-slate-200 text-[11px] text-slate-700 mb-2 font-mono-tech flex items-start gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Lab Setup:</strong> {proj.architectureSummary}</span>
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap items-center gap-1 text-[10px]">
                  <span className="font-semibold text-slate-500 mr-1">Technologies:</span>
                  {proj.techStack.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ backgroundColor: palette.badgeBg, color: palette.badgeText }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Technical Training Overview */}
          <section className="p-3 rounded-xl bg-slate-50/60 border border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1">
              <Server className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
              Relevant Technical Training
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {data.technicalTraining}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
