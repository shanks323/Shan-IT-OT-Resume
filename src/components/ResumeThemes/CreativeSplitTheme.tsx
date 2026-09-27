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
  Terminal,
  ExternalLink
} from 'lucide-react';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
  onOpenTopology?: () => void;
  onOpenPhotoModal?: () => void;
}

export const CreativeSplitTheme: React.FC<Props> = ({ data, settings, onOpenTopology, onOpenPhotoModal }) => {
  const palette = ACCENT_PALETTES[settings.accent] || ACCENT_PALETTES.navy;

  return (
    <div className="w-full h-full min-h-[297mm] text-slate-800 antialiased font-sans leading-snug creative-split-theme">
      <div className="creative-split-grid grid grid-cols-12 gap-0 overflow-hidden rounded-xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:rounded-none h-full min-h-[297mm] items-stretch">
        
        {/* Left Distinct Sidebar (4 cols) - Dynamically styled using var(--sidebar-bg), filled to bottom */}
        <aside 
          className="col-span-4 p-4 text-white flex flex-col justify-between dark-sidebar resume-dark-sidebar creative-split-sidebar min-h-[297mm] h-full"
          style={{ backgroundColor: 'var(--sidebar-bg, #0b1a30)' }}
        >
          <div className="space-y-3">
            {/* Avatar & Name */}
            <div className="text-center md:text-left">
              {settings.showAvatar && data.avatarUrl && (
                <div className="mb-2 flex justify-center md:justify-start">
                  <div 
                    onClick={onOpenPhotoModal}
                    className={`relative group ${onOpenPhotoModal ? 'cursor-pointer' : ''}`}
                    title="Click to edit or replace photo"
                  >
                    <img
                      src={data.avatarUrl}
                      alt={data.fullName}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover object-top border-2 border-white/30 shadow-md transition-transform group-hover:scale-105"
                    />
                    {onOpenPhotoModal && (
                      <div className="no-print photo-overlay-badge change-photo-badge absolute inset-0 rounded-2xl bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-medium transition-opacity backdrop-blur-[1px]">
                        Change
                      </div>
                    )}
                  </div>
                </div>
              )}
              <h1 className="text-xl sm:text-[22px] font-black font-display tracking-tight text-white leading-tight uppercase">
                {data.fullName}
              </h1>
              <div 
                className="text-[10px] font-semibold tracking-wider uppercase mt-0.5"
                style={{ color: 'var(--badge-bg, #dbeafe)' }}
              >
                {data.title}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-1 text-[10px] text-white/90 border-t border-white/10 pt-2">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 shrink-0" style={{ color: 'var(--accent-bar, #93c5fd)' }} />
                <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="hover:underline">{data.phone}</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 shrink-0" style={{ color: 'var(--accent-bar, #93c5fd)' }} />
                <a href={`mailto:${data.email}`} className="hover:underline break-all">{data.email}</a>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 shrink-0 mt-0.5" style={{ color: 'var(--accent-bar, #93c5fd)' }} />
                <span>{data.location}</span>
              </div>
              {data.linkedin && (
                <div className="flex items-center gap-1.5">
                  <Linkedin className="w-3 h-3 shrink-0" style={{ color: 'var(--accent-bar, #93c5fd)' }} />
                  <span>{data.linkedin}</span>
                </div>
              )}
            </div>

            {/* Skills Matrix */}
            <div className="border-t border-white/10 pt-2 space-y-1.5">
              <h2 
                className="text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1"
                style={{ color: 'var(--accent-border, #bfdbfe)' }}
              >
                <span>Technical Skills</span>
              </h2>
              {data.skillCategories.map((cat) => (
                <div key={cat.id} className="text-[10px]">
                  <div className="font-semibold text-white/95 mb-0.5">{cat.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s, idx) => (
                      <span 
                        key={idx}
                        className="text-[9px] px-1 py-0.2 rounded bg-white/10 text-white/90 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Credentials Badges */}
            <div className="border-t border-white/10 pt-2 space-y-1.5">
              <h2 
                className="text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1"
                style={{ color: 'var(--accent-border, #bfdbfe)' }}
              >
                <Award className="w-3 h-3" />
                <span>Key Credentials</span>
              </h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-[10px] pb-1 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="font-semibold text-white leading-tight">{cert.title}</div>
                  <div className="text-[9px] text-white/70 leading-tight">{cert.issuer}</div>
                  <div 
                    className="text-[8.5px] mt-0.5"
                    style={{ color: 'var(--badge-bg, #dbeafe)' }}
                  >
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="border-t border-white/10 pt-2">
              <h2 
                className="text-[10.5px] font-bold uppercase tracking-wider mb-0.5"
                style={{ color: 'var(--accent-border, #bfdbfe)' }}
              >
                Languages
              </h2>
              <div className="space-y-0.5 text-[10px]">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-white/90">
                    <span>{l.name}</span>
                    <span className="text-white/60 text-[9px]">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Content (8 cols) - Tightened for Guaranteed 1-Page A4 Fit */}
        <main className="col-span-8 p-4 sm:p-5 bg-white space-y-2 creative-split-main main-container min-h-[297mm] h-full flex flex-col justify-between">
          <div>
            {/* Professional Profile */}
            <section className="profile-block mb-2">
              <h2 
                className="text-[11px] font-bold uppercase tracking-wider border-b pb-0.5 mb-1 flex items-center justify-between" 
                style={{ 
                  color: 'var(--heading-color, #1e3a8a)',
                  borderColor: 'var(--accent-border, #e2e8f0)' 
                }}
              >
                <span>Professional Profile</span>
                <span className="text-[9.5px] font-normal text-slate-400">IT / OT Infrastructure</span>
              </h2>
              <p className="text-[10.5px] text-slate-700 leading-[1.3] text-justify">
                {data.professionalProfile}
              </p>
            </section>

            {/* Professional Experience */}
            <section className="experience-block mb-2">
              <h2 
                className="text-[11px] font-bold uppercase tracking-wider border-b pb-0.5 mb-1 flex items-center gap-1.5" 
                style={{ 
                  color: 'var(--heading-color, #1e3a8a)',
                  borderColor: 'var(--accent-border, #e2e8f0)' 
                }}
              >
                <Briefcase className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
                <span>Professional Experience</span>
              </h2>

              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-1.5 last:mb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-0.5">
                    <div>
                      <span className="text-[11px] font-bold text-slate-900">{exp.role}</span>
                      <span className="text-slate-400 mx-1">|</span>
                      <span 
                        className="text-[10.5px] font-semibold" 
                        style={{ color: 'var(--primary-color, #1e3a8a)' }}
                      >
                        {exp.company}
                      </span>
                    </div>
                    <div className="text-[9.5px] text-slate-500 font-medium">
                      {exp.location} · <strong className="text-slate-700">{exp.period}</strong>
                    </div>
                  </div>
                  <ul className="list-disc pl-3.5 space-y-0.5 text-[10.5px] text-slate-700 leading-[1.3]">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="marker:text-slate-400">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Featured IT/OT Project */}
            <section className="projects-block mb-2">
              <div 
                className="flex items-center justify-between border-b pb-0.5 mb-1" 
                style={{ borderColor: 'var(--accent-border, #e2e8f0)' }}
              >
                <h2 
                  className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: 'var(--heading-color, #1e3a8a)' }}
                >
                  <Cpu className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
                  <span>Featured IT/OT Project</span>
                </h2>
                {onOpenTopology && (
                  <button
                    onClick={onOpenTopology}
                    type="button"
                    className="no-print text-[10px] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                    style={{ color: 'var(--accent-bar, #2563eb)' }}
                  >
                    <span>Interactive Topology</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>

              {data.projects.map((proj) => (
                <div 
                  key={proj.id} 
                  className="p-2 rounded-lg border bg-slate-50/60 print:bg-transparent print:p-1.5"
                  style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
                >
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 
                      className="text-[11px] font-bold"
                      style={{ color: 'var(--heading-color, #1e3a8a)' }}
                    >
                      {proj.title}
                    </h3>
                    <span className="text-[9.5px] text-slate-500 font-medium">{proj.period}</span>
                  </div>
                  <div className="text-[9.5px] text-slate-600 font-medium italic mb-0.5">
                    {proj.subtitle}
                  </div>
                  <ul className="list-disc pl-3.5 space-y-0.5 text-[10.5px] text-slate-700 leading-[1.3] mb-1">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>

                  {proj.architectureSummary && (
                    <div 
                      className="p-1 rounded bg-white border font-mono-tech text-[9px] text-slate-700 flex items-start gap-1 leading-[1.3]"
                      style={{ borderColor: 'var(--accent-border, #bfdbfe)' }}
                    >
                      <Terminal className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                      <span><strong>Architecture:</strong> {proj.architectureSummary}</span>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </div>

          {/* Education & Academic Record */}
          <section className="education-block mb-0">
            <h2 
              className="text-[11px] font-bold uppercase tracking-wider border-b pb-0.5 mb-1 flex items-center gap-1.5" 
              style={{ 
                color: 'var(--heading-color, #1e3a8a)',
                borderColor: 'var(--accent-border, #e2e8f0)' 
              }}
            >
              <GraduationCap className="w-3 h-3" style={{ color: 'var(--accent-bar, #2563eb)' }} />
              <span>Education & Technical Training</span>
            </h2>
            <div className="space-y-1 mb-1">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-[10px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 leading-tight">{edu.degree}</span>
                    <span className="text-[9.5px] text-slate-500">{edu.yearOrPeriod}</span>
                  </div>
                  <div 
                    className="text-[9.5px] font-medium leading-tight"
                    style={{ color: 'var(--accent-bar, #2563eb)' }}
                  >
                    {edu.institution} {edu.location ? `· ${edu.location}` : ''}
                  </div>
                </div>
              ))}
            </div>

            <div 
              className="text-[9.5px] text-slate-600 p-1.5 rounded border leading-[1.3]"
              style={{ 
                backgroundColor: 'var(--primary-light, #eff6ff)', 
                borderColor: 'var(--accent-border, #bfdbfe)' 
              }}
            >
              <strong style={{ color: 'var(--primary-color, #1e3a8a)' }}>Technical Syllabus:</strong> {data.technicalTraining}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
