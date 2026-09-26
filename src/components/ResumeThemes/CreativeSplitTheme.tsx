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
    <div className="w-full text-slate-800 antialiased font-sans">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-xl border border-slate-200 shadow-sm print:border-none print:shadow-none">
        
        {/* Left Distinct Sidebar */}
        <aside 
          className="md:col-span-4 p-5 text-white flex flex-col justify-between"
          style={{ backgroundColor: palette.primaryDark }}
        >
          <div className="space-y-5">
            {/* Avatar & Name */}
            <div className="text-center md:text-left">
              {settings.showAvatar && data.avatarUrl && (
                <div className="mb-3 flex justify-center md:justify-start">
                  <div 
                    onClick={onOpenPhotoModal}
                    className={`relative group ${onOpenPhotoModal ? 'cursor-pointer' : ''}`}
                    title="Click to edit or replace photo"
                  >
                    <img
                      src={data.avatarUrl}
                      alt={data.fullName}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-white/30 shadow-md transition-transform group-hover:scale-105"
                    />
                    {onOpenPhotoModal && (
                      <div className="no-print absolute inset-0 rounded-2xl bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-medium transition-opacity">
                        Change
                      </div>
                    )}
                  </div>
                </div>
              )}
              <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white leading-tight uppercase">
                {data.fullName}
              </h1>
              <div 
                className="text-[11px] font-semibold tracking-wider uppercase mt-1 text-blue-200"
              >
                {data.title}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-xs text-white/90 border-t border-white/10 pt-3">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="hover:underline">{data.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                <a href={`mailto:${data.email}`} className="hover:underline break-all">{data.email}</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0 mt-0.5" />
                <span>{data.location}</span>
              </div>
              {data.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                  <span>{data.linkedin}</span>
                </div>
              )}
            </div>

            {/* Skills Matrix */}
            <div className="border-t border-white/10 pt-3 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <span>Technical Skills</span>
              </h2>
              {data.skillCategories.map((cat) => (
                <div key={cat.id} className="text-xs">
                  <div className="font-semibold text-white/90 mb-1">{cat.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s, idx) => (
                      <span 
                        key={idx}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/90 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Credentials Badges */}
            <div className="border-t border-white/10 pt-3 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Key Credentials</span>
              </h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-xs pb-1.5 border-b border-white/10 last:border-0">
                  <div className="font-semibold text-white leading-snug">{cert.title}</div>
                  <div className="text-[10px] text-white/70">{cert.issuer}</div>
                  <div className="text-[9px] text-blue-200 mt-0.5">{cert.date}</div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="border-t border-white/10 pt-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-1.5">
                Languages
              </h2>
              <div className="space-y-1 text-xs">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-white/90 text-xs">
                    <span>{l.name}</span>
                    <span className="text-white/60 text-[11px]">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="md:col-span-8 p-5 bg-white space-y-4">
          {/* Professional Profile */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-1.5 flex items-center justify-between" style={{ borderColor: '#e2e8f0' }}>
              <span>Professional Profile</span>
              <span className="text-[10px] font-normal text-slate-400">IT / OT Infrastructure</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify">
              {data.professionalProfile}
            </p>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5" style={{ borderColor: '#e2e8f0' }}>
              <Briefcase className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
              <span>Professional Experience</span>
            </h2>

            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                    <span className="text-slate-400 mx-1.5">|</span>
                    <span className="text-xs font-semibold text-slate-700">{exp.company}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {exp.location} · <strong className="text-slate-700">{exp.period}</strong>
                  </div>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 leading-snug">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="marker:text-blue-500">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Featured IT/OT Project */}
          <section>
            <div className="flex items-center justify-between border-b pb-1 mb-2" style={{ borderColor: '#e2e8f0' }}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
                <span>Featured IT/OT Project</span>
              </h2>
              {onOpenTopology && (
                <button
                  onClick={onOpenTopology}
                  type="button"
                  className="no-print text-[11px] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  style={{ color: palette.accentBar }}
                >
                  <span>Interactive Topology</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>

            {data.projects.map((proj) => (
              <div key={proj.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                  <span className="text-[11px] text-slate-500 font-medium">{proj.period}</span>
                </div>
                <div className="text-[11px] text-slate-600 font-medium italic mb-2">
                  {proj.subtitle}
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 leading-snug mb-2">
                  {proj.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>

                {proj.architectureSummary && (
                  <div className="p-2 rounded bg-white border border-slate-200 font-mono-tech text-[10px] text-slate-700 flex items-start gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span><strong>Architecture:</strong> {proj.architectureSummary}</span>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Education & Academic Record */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5" style={{ borderColor: '#e2e8f0' }}>
              <GraduationCap className="w-3.5 h-3.5" style={{ color: palette.accentBar }} />
              <span>Education & Technical Training</span>
            </h2>
            <div className="space-y-2 mb-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-[11px] text-slate-500">{edu.yearOrPeriod}</span>
                  </div>
                  <div className="text-[11px] text-slate-600">{edu.institution} {edu.location ? `· ${edu.location}` : ''}</div>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
              <strong className="text-slate-800">Technical Syllabus:</strong> {data.technicalTraining}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
