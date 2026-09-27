import React from 'react';
import { ResumeData } from '../../data/resumeData';
import { ResumeSettings } from '../../types/resume';
import { ACCENT_PALETTES } from '../../utils/accentThemes';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
  onOpenTopology?: () => void;
  onOpenPhotoModal?: () => void;
}

export const MinimalistTheme: React.FC<Props> = ({ data, settings, onOpenTopology, onOpenPhotoModal }) => {
  const palette = ACCENT_PALETTES[settings.accent] || ACCENT_PALETTES.navy;

  return (
    <div className="w-full text-slate-900 antialiased font-sans leading-snug">
      {/* Header with Dynamic Primary Accent Border */}
      <header 
        className="pb-2.5 mb-2.5 border-b-2"
        style={{ borderColor: 'var(--primary-color, #1e3a8a)' }}
      >
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-0.5">
            <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-slate-950 font-display">
              {data.fullName}
            </h1>
            <p 
              className="text-[11px] font-bold tracking-widest uppercase"
              style={{ color: 'var(--accent-bar, #2563eb)' }}
            >
              {data.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-slate-600 pt-0.5 font-medium">
              <span>{data.phone}</span>
              <span className="text-slate-300">/</span>
              <a href={`mailto:${data.email || 'shankerdayallan80@gmail.com'}`} className="hover:underline">{data.email}</a>
              <span className="text-slate-300">/</span>
              <span>{data.location}</span>
              {data.linkedin && (
                <>
                  <span className="text-slate-300">/</span>
                  <span>{data.linkedin}</span>
                </>
              )}
            </div>
          </div>

          {settings.showAvatar && data.avatarUrl && (
            <div 
              onClick={onOpenPhotoModal}
              className={`relative group shrink-0 ${onOpenPhotoModal ? 'cursor-pointer' : ''}`}
              title="Click to edit or replace photo"
            >
              <img
                src={data.avatarUrl}
                alt={data.fullName}
                referrerPolicy="no-referrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover border transition-transform group-hover:scale-105"
                style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
              />
              {onOpenPhotoModal && (
                <div className="no-print photo-overlay-badge change-photo-badge absolute inset-0 rounded-md bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-mono transition-opacity">
                  Edit
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Single/Structured Column */}
      <div className="space-y-2.5">
        {/* Professional Summary */}
        <section>
          <h2 
            className="text-[11px] font-bold tracking-widest uppercase border-b pb-0.5 mb-1"
            style={{ 
              color: 'var(--heading-color, #1e3a8a)', 
              borderColor: 'var(--accent-border, #bfdbfe)' 
            }}
          >
            Professional Profile
          </h2>
          <p className="text-[11px] text-slate-800 leading-normal text-justify">
            {data.professionalProfile}
          </p>
        </section>

        {/* Core Skills & Competencies */}
        <section>
          <h2 
            className="text-[11px] font-bold tracking-widest uppercase border-b pb-0.5 mb-1"
            style={{ 
              color: 'var(--heading-color, #1e3a8a)', 
              borderColor: 'var(--accent-border, #bfdbfe)' 
            }}
          >
            Technical Competencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-3 text-[10.5px]">
            {data.skillCategories.map((cat) => (
              <div key={cat.id}>
                <span 
                  className="font-bold"
                  style={{ color: 'var(--primary-color, #1e3a8a)' }}
                >
                  {cat.name}:{' '}
                </span>
                <span className="text-slate-700">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section>
          <h2 
            className="text-[11px] font-bold tracking-widest uppercase border-b pb-0.5 mb-1"
            style={{ 
              color: 'var(--heading-color, #1e3a8a)', 
              borderColor: 'var(--accent-border, #bfdbfe)' 
            }}
          >
            Professional Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="space-y-0.5 mb-1.5 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[11px]">
                <div>
                  <span className="font-bold text-slate-950">{exp.role}</span>
                  <span 
                    className="font-semibold"
                    style={{ color: 'var(--primary-color, #1e3a8a)' }}
                  >
                    {' '}— {exp.company}
                  </span>
                </div>
                <div className="text-slate-600 font-medium text-[10.5px]">
                  {exp.location} | {exp.period}
                </div>
              </div>
              <ul className="list-disc pl-3.5 space-y-0.5 text-[11px] text-slate-800 leading-tight">
                {exp.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Featured IT/OT Project */}
        <section>
          <div 
            className="flex justify-between items-center border-b pb-0.5 mb-1"
            style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
          >
            <h2 
              className="text-[11px] font-bold tracking-widest uppercase"
              style={{ color: 'var(--heading-color, #1e3a8a)' }}
            >
              Featured Technical Project
            </h2>
            {onOpenTopology && (
              <button
                onClick={onOpenTopology}
                type="button"
                className="no-print text-[10px] font-semibold hover:underline cursor-pointer"
                style={{ color: 'var(--accent-bar, #2563eb)' }}
              >
                Diagram & Schematic →
              </button>
            )}
          </div>
          {data.projects.map((proj) => (
            <div key={proj.id} className="space-y-0.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[11px]">
                <span 
                  className="font-bold"
                  style={{ color: 'var(--heading-color, #1e3a8a)' }}
                >
                  {proj.title}
                </span>
                {proj.period && <span className="text-slate-600 text-[10px]">{proj.period}</span>}
              </div>
              <p className="text-[10px] text-slate-600 italic">{proj.subtitle}</p>
              <ul className="list-disc pl-3.5 space-y-0.5 text-[11px] text-slate-800 leading-tight">
                {proj.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
              <div className="text-[10px] text-slate-700 pt-0.5 flex flex-wrap items-center gap-1">
                <span 
                  className="font-bold"
                  style={{ color: 'var(--primary-color, #1e3a8a)' }}
                >
                  Technologies:
                </span>
                {proj.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.2 rounded border text-[9.5px] font-medium"
                    style={{
                      backgroundColor: 'var(--primary-light, #eff6ff)',
                      color: 'var(--primary-color, #1e3a8a)',
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

        {/* Certifications & Education */}
        <div className="grid grid-cols-2 gap-3 pt-0.5">
          {/* Certifications */}
          <section>
            <h2 
              className="text-[11px] font-bold tracking-widest uppercase border-b pb-0.5 mb-1"
              style={{ 
                color: 'var(--heading-color, #1e3a8a)', 
                borderColor: 'var(--accent-border, #bfdbfe)' 
              }}
            >
              Certifications & Credentials
            </h2>
            <div className="space-y-1 text-[10.5px]">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-bold text-slate-950 leading-tight">{cert.title}</div>
                  <div 
                    className="text-[10px] font-medium leading-tight"
                    style={{ color: 'var(--accent-bar, #2563eb)' }}
                  >
                    {cert.issuer}
                  </div>
                  <div className="text-[9.5px] text-slate-500">
                    {cert.date} {cert.credentialCode ? `(${cert.credentialCode})` : ''}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 
              className="text-[11px] font-bold tracking-widest uppercase border-b pb-0.5 mb-1"
              style={{ 
                color: 'var(--heading-color, #1e3a8a)', 
                borderColor: 'var(--accent-border, #bfdbfe)' 
              }}
            >
              Education & Languages
            </h2>
            <div className="space-y-1 text-[10.5px] mb-1.5">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-950 leading-tight">{edu.degree}</div>
                  <div 
                    className="text-[10px] font-medium leading-tight"
                    style={{ color: 'var(--accent-bar, #2563eb)' }}
                  >
                    {edu.institution}
                  </div>
                  <div className="text-[9.5px] text-slate-500">
                    {edu.yearOrPeriod} {edu.location ? `· ${edu.location}` : ''}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px]">
              <span 
                className="font-bold"
                style={{ color: 'var(--heading-color, #1e3a8a)' }}
              >
                Languages:{' '}
              </span>
              <span className="text-slate-700">
                {data.languages.map((l) => `${l.name} (${l.level})`).join(', ')}
              </span>
            </div>
          </section>
        </div>

        {/* Technical Training */}
        <section className="pt-0.5">
          <div 
            className="text-[10px] text-slate-600 border-t pt-1.5"
            style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
          >
            <span 
              className="font-bold"
              style={{ color: 'var(--heading-color, #1e3a8a)' }}
            >
              Relevant Technical Training:{' '}
            </span>
            {data.technicalTraining}
          </div>
        </section>
      </div>
    </div>
  );
};
