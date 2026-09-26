import React from 'react';
import { ResumeData } from '../../data/resumeData';
import { ResumeSettings } from '../../types/resume';
import { ACCENT_PALETTES } from '../../utils/accentThemes';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
  onOpenTopology?: () => void;
  onOpenPhotoModal?: () => void;
}

export const MinimalistTheme: React.FC<Props> = ({ data, settings, onOpenTopology, onOpenPhotoModal }) => {
  const palette = ACCENT_PALETTES[settings.accent] || ACCENT_PALETTES.slate;

  return (
    <div className="w-full text-slate-900 antialiased font-sans leading-normal">
      {/* Header */}
      <header className="pb-4 mb-4 border-b border-slate-900">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 font-display">
              {data.fullName}
            </h1>
            <p className="text-xs font-bold tracking-widest text-slate-700 uppercase">
              {data.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 pt-1 font-medium">
              <span>{data.phone}</span>
              <span className="text-slate-300">/</span>
              <span>{data.email}</span>
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
              className={`relative group ${onOpenPhotoModal ? 'cursor-pointer' : ''}`}
              title="Click to edit or replace photo"
            >
              <img
                src={data.avatarUrl}
                alt={data.fullName}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-md object-cover grayscale contrast-125 border border-slate-300 transition-transform group-hover:scale-105"
              />
              {onOpenPhotoModal && (
                <div className="no-print absolute inset-0 rounded-md bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-mono transition-opacity">
                  Edit
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Single/Structured Column */}
      <div className="space-y-4">
        {/* Professional Summary */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
            Professional Profile
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed text-justify">
            {data.professionalProfile}
          </p>
        </section>

        {/* Core Skills & Competencies */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
            Technical Competencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-xs">
            {data.skillCategories.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold text-slate-900">{cat.name}: </span>
                <span className="text-slate-700">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
            Professional Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="space-y-1 mb-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-950">{exp.role}</span>
                  <span className="text-slate-500"> — {exp.company}</span>
                </div>
                <div className="text-slate-600 font-medium">
                  {exp.location} | {exp.period}
                </div>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-800 leading-snug">
                {exp.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Featured IT/OT Project */}
        <section>
          <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-2">
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase">
              Featured Technical Project
            </h2>
            {onOpenTopology && (
              <button
                onClick={onOpenTopology}
                type="button"
                className="no-print text-[11px] font-semibold text-slate-700 hover:text-black hover:underline cursor-pointer"
              >
                Diagram & Schematic →
              </button>
            )}
          </div>
          {data.projects.map((proj) => (
            <div key={proj.id} className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                <span className="font-bold text-slate-950">{proj.title}</span>
                {proj.period && <span className="text-slate-600">{proj.period}</span>}
              </div>
              <p className="text-[11px] text-slate-600 italic">{proj.subtitle}</p>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-800 leading-snug">
                {proj.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
              <div className="text-[11px] text-slate-700 pt-1">
                <span className="font-bold">Technologies Used: </span>
                {proj.techStack.join(' · ')}
              </div>
            </div>
          ))}
        </section>

        {/* Certifications & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Certifications */}
          <section>
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
              Certifications & Credentials
            </h2>
            <div className="space-y-2 text-xs">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-bold text-slate-950">{cert.title}</div>
                  <div className="text-[11px] text-slate-700">{cert.issuer}</div>
                  <div className="text-[10px] text-slate-500">
                    {cert.date} {cert.credentialCode ? `(${cert.credentialCode})` : ''}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
              Education & Languages
            </h2>
            <div className="space-y-2 text-xs mb-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-950">{edu.degree}</div>
                  <div className="text-[11px] text-slate-700">{edu.institution}</div>
                  <div className="text-[10px] text-slate-500">
                    {edu.yearOrPeriod} {edu.location ? `· ${edu.location}` : ''}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-900">Languages: </span>
              <span className="text-slate-700">
                {data.languages.map((l) => `${l.name} (${l.level})`).join(', ')}
              </span>
            </div>
          </section>
        </div>

        {/* Technical Training */}
        <section className="pt-1">
          <div className="text-[11px] text-slate-600 border-t border-slate-200 pt-2">
            <span className="font-bold text-slate-800">Relevant Technical Training: </span>
            {data.technicalTraining}
          </div>
        </section>
      </div>
    </div>
  );
};
