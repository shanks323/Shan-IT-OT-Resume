import React, { useState } from 'react';
import { X, Printer, Copy, Check, FileText } from 'lucide-react';
import { ResumeData } from '../data/resumeData';

interface Props {
  data: ResumeData;
  isOpen: boolean;
  onClose: () => void;
}

export const CoverLetterModal: React.FC<Props> = ({ data, isOpen, onClose }) => {
  const [roleFocus, setRoleFocus] = useState<'it-support' | 'it-ot'>('it-support');
  const [companyName, setCompanyName] = useState('Hiring Team');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const today = new Date().toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const letterContent = {
    'it-support': {
      targetRole: 'IT Support Specialist / Junior Technical Support',
      opening: `I am writing to express my strong interest in the IT Support Specialist position at ${companyName}. With hands-on internship experience in end-user workstation deployment, network troubleshooting, and hardware maintenance at REDFEM MARKETING, combined with my Google IT Support Professional Certificate and SKM Level 3 in Computer System Operation, I am eager to contribute immediately to your IT operations team.`,
      body1: `During my tenure at REDFEM MARKETING, I was entrusted with preparing and configuring end-user PC systems, diagnosing hardware issues, managing LAN and printer connectivity, and resolving user account incidents. I developed a disciplined approach to documentation, ensuring every ticket and hardware inventory record was meticulously tracked to minimize downtime for office staff.`,
      body2: `Beyond routine desktop administration, I have actively expanded my technical versatility. At Selangor Technical Skills Development Centre (STDC), I completed intensive hands-on modules in operating system fault diagnosis, simulated network troubleshooting, and command-line system administration. To further bridge traditional IT with modern industrial systems, I have built a dedicated home training lab integrating PC workstations, local LAN routing, and Siemens TIA Portal automation workflows.`,
      closing: `I take pride in clear technical communication, structured problem-solving, and a patient, user-focused mindset. I welcome the opportunity to discuss how my practical foundation and dedication can support ${companyName}. Thank you for your time and consideration.`,
    },
    'it-ot': {
      targetRole: 'IT/OT Technician / Industrial Systems Support',
      opening: `I am writing to express my enthusiastic interest in the IT/OT Technician role at ${companyName}. With formal certification in Siemens TIA Basic PLC & Sitrain TIA Training Level 1 alongside my SKM Level 3 in Computer System Operation and practical IT support experience at REDFEM MARKETING, I offer a unique combination of enterprise IT desktop support and foundational industrial automation competencies.`,
      body1: `Recognizing the growing convergence between Information Technology (IT) and Operational Technology (OT), I constructed a dedicated Home IT/OT Lab environment. In this lab, I established deterministic LAN networking between Windows engineering workstations and a Siemens S7-1200 PLC, practicing IP subnet allocation, PROFINET connectivity testing, and ladder logic fault diagnosis. This practical experience has provided me with a robust understanding of both shop-floor industrial hardware and enterprise IT infrastructure.`,
      body2: `My hands-on experience at REDFEM MARKETING also reinforced my competencies in hardware diagnostics, asset tracking, endpoint configuration, and structured incident escalation. Coupled with my Foundation in Computer Science from UNITEN and rigorous training at STDC in local servers and network protocols, I am equipped to troubleshoot both physical and network-layer disruptions effectively.`,
      closing: `I am eager to bring my proactive work ethic, technical documentation skills, and cross-functional IT/OT readiness to your engineering team. Thank you for considering my application.`,
    },
  }[roleFocus];

  const handleCopy = () => {
    const fullText = `
${data.fullName}
${data.title}
Phone: ${data.phone} | Email: ${data.email} | Location: ${data.location}
Date: ${today}

To: The ${companyName}

RE: Application for ${letterContent.targetRole}

Dear Hiring Manager,

${letterContent.opening}

${letterContent.body1}

${letterContent.body2}

${letterContent.closing}

Sincerely,
${data.fullName}
    `.trim();

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 no-print">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Tailored Cover Letter
              </h2>
              <p className="text-xs text-slate-400">
                Matched to Shanker Dayallan's qualifications & certifications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="px-6 py-3 bg-slate-800/70 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs no-print">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Target Role:</span>
            <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-700">
              <button
                onClick={() => setRoleFocus('it-support')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  roleFocus === 'it-support'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                IT Support
              </button>
              <button
                onClick={() => setRoleFocus('it-ot')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  roleFocus === 'it-ot'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                IT / OT Technician
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Target Company:</span>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Intel, Dyson, Top Glove, PETRONAS..."
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 w-44"
            />
          </div>
        </div>

        {/* Letter Sheet */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white text-slate-800 font-sans leading-relaxed text-xs sm:text-[13px]">
          <div className="max-w-xl mx-auto space-y-4">
            {/* Header info */}
            <div className="border-b border-slate-300 pb-3">
              <h1 className="text-xl font-extrabold text-slate-900 font-display tracking-tight uppercase">
                {data.fullName}
              </h1>
              <p className="text-xs font-semibold text-blue-800 tracking-wide mt-0.5">
                {data.title}
              </p>
              <div className="flex flex-wrap gap-x-3 text-xs text-slate-600 mt-1">
                <span>{data.phone}</span>
                <span>·</span>
                <span>{data.email}</span>
                <span>·</span>
                <span>{data.location}</span>
              </div>
            </div>

            {/* Date & Addressee */}
            <div className="text-xs text-slate-600 space-y-1 pt-1">
              <div>{today}</div>
              <div className="font-semibold text-slate-900 mt-2">Hiring Team</div>
              <div className="text-slate-700">{companyName}</div>
            </div>

            {/* Subject */}
            <div className="font-bold text-slate-900 text-xs sm:text-sm border-l-2 border-blue-600 pl-2.5 py-0.5">
              RE: Application for {letterContent.targetRole}
            </div>

            {/* Body */}
            <div className="space-y-3 text-slate-700 text-justify">
              <p>Dear Hiring Team,</p>
              <p>{letterContent.opening}</p>
              <p>{letterContent.body1}</p>
              <p>{letterContent.body2}</p>
              <p>{letterContent.closing}</p>
              <div className="pt-3">
                <p>Sincerely,</p>
                <p className="font-bold text-slate-900 text-sm mt-1">{data.fullName}</p>
                <p className="text-xs text-slate-500">IT Support & IT/OT Specialist</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 no-print">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Letter</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
