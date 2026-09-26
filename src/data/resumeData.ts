export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  period?: string;
  bullets: string[];
  techStack: string[];
  architectureSummary?: string;
  highlights?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  yearOrPeriod: string;
  details?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialCode?: string;
  badge?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface ResumeData {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  linkedin?: string;
  whatsapp?: string;
  github?: string;
  avatarUrl: string;
  projectImageUrl: string;
  professionalProfile: string;
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  education: EducationItem[];
  technicalTraining: string;
  languages: LanguageItem[];
}

export const initialResumeData: ResumeData = {
  fullName: "SHANKER DAYALLAN A/L SUBRAMANIAM",
  title: "IT SUPPORT | IT/OT TECHNICIAN | JUNIOR TECHNICAL SUPPORT",
  phone: "+60 12-980 0657",
  email: "shankerdayallan80@gmail.com",
  location: "Puncak Alam, Selangor 42300, Malaysia",
  linkedin: "linkedin.com/in/shanker-dayallan",
  whatsapp: "+60129800657",
  github: "github.com/shanker-dayallan",
  avatarUrl: "/src/assets/images/avatar_shanker_portrait_1790395453599.jpg",
  projectImageUrl: "/src/assets/images/it_ot_lab_schematic_1790395472143.jpg",
  professionalProfile:
    "Hands-on IT support trainee with practical experience in workstation setup, software installation, hardware diagnostics, LAN and printer troubleshooting, user account configuration, and hardware inventory. Holds the Google IT Support Professional Certificate and SKM Level 3 in Computer System Operation, with additional Siemens TIA Basic PLC and Sitrain TIA Training Level 1. Brings an emerging IT/OT skill set supported by practical lab work in networking, PLC fundamentals, troubleshooting, and technical documentation.",
  skillCategories: [
    {
      id: "it-support",
      name: "IT Support",
      skills: ["Troubleshooting", "User Support", "Account Setup", "Ticketing & Escalation", "Endpoint Deployment"],
    },
    {
      id: "networking",
      name: "Networking",
      skills: ["LAN / IP Addressing", "Connectivity", "Printer Access", "Switch Port Configuration", "Ping / Tracert Diagnostics"],
    },
    {
      id: "systems",
      name: "Systems & OS",
      skills: ["Windows 10 / 11", "Software Installation", "Command Line (CLI)", "Patch Management", "System Health Monitoring"],
    },
    {
      id: "it-ot",
      name: "IT/OT & PLC",
      skills: ["Siemens TIA Portal", "PLC Fundamentals (S7-1200)", "Fault Diagnosis", "Logic Testing", "Industrial Ethernet"],
    },
    {
      id: "hardware",
      name: "Hardware",
      skills: ["PC Setup & Assembly", "Hardware Diagnostics", "Peripherals & Cabling", "Asset Tracking & Inventory"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "IT Support Intern",
      company: "REDFEM MARKETING",
      location: "Sungai Buloh, Selangor",
      period: "Dec 2025 – Feb 2026",
      bullets: [
        "Prepared, assembled, and configured end-user computers; completed routine software installations and performed hardware diagnostics to support daily office operations.",
        "Troubleshot LAN connectivity, printer access, and user account issues while meticulously documenting incidents, steps taken, and follow-up actions.",
        "Maintained and updated hardware inventory records, verifying device details and endpoint status for accurate physical asset tracking across the company.",
        "Provided responsive day-to-day technical assistance to office staff and systematically escalated unresolved technical issues with clear troubleshooting logs.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Home IT/OT Lab — PC, LAN & PLC Training Network",
      subtitle: "Hands-on Hybrid Network & Industrial Automation Simulation",
      period: "2025 – 2026",
      bullets: [
        "Built a dedicated training environment combining a Windows PC workstation, basic LAN configuration, and Siemens TIA Portal/PLC practice to develop IT/OT convergence troubleshooting skills.",
        "Configured static IP addressing, subnets, and basic network connectivity between lab endpoints; tested and verified end-to-end connectivity with Wireshark and ICMP tools, documenting setup for repeatable troubleshooting.",
        "Practised PLC fundamentals using Siemens TIA training concepts, including basic hardware device configuration, ladder logic testing, and structured fault-diagnosis workflows.",
        "Created an intuitive device inventory and topology network diagram to strengthen endpoint tracking, preventative maintenance, and IT/OT technical documentation.",
      ],
      techStack: ["Siemens TIA Portal v17/v18", "Siemens S7-1200 PLC", "Industrial Ethernet", "IPv4 Subnetting", "Windows Workstation", "Network Diagnostics"],
      architectureSummary: "Windows Workstation (IP: 192.168.0.10) ⟷ Unmanaged Switch ⟷ Siemens S7-1200 PLC (IP: 192.168.0.2) with TIA Portal Diagnostic Buffer & Tag Monitoring",
      highlights: ["Isolated Subnet Architecture", "Step-by-Step Fault Reproduction", "Structured Lab Documentation"],
    },
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Google IT Support Professional Certificate",
      issuer: "Coursera",
      date: "July 2026",
      badge: "Google Verified",
    },
    {
      id: "cert-2",
      title: "Siemens Professional Certificate",
      issuer: "TIA Basic PLC & Sitrain TIA Training Level 1 | STDC Shah Alam",
      date: "September 2026",
      badge: "Siemens Sitrain",
    },
    {
      id: "cert-3",
      title: "SKM Level 3: Computer System Operation",
      issuer: "Selangor Technical Skills Development Centre (STDC)",
      credentialCode: "IT-020-3:2013",
      date: "April 2026",
      badge: "National Skills Standard",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Computer Operation Systems",
      institution: "Selangor Technical Skills Development Centre (STDC)",
      location: "Shah Alam, Selangor",
      yearOrPeriod: "Jan 2025 – Apr 2026",
      details: "Comprehensive vocational training in system operations, hardware maintenance, network infrastructure, and diagnostic procedures.",
    },
    {
      id: "edu-2",
      degree: "Foundation in Computer Science",
      institution: "Universiti Tenaga Nasional (UNITEN)",
      location: "Malaysia",
      yearOrPeriod: "2023",
      details: "Core computational foundations, computer architecture, algorithms, and technical problem solving.",
    },
  ],
  technicalTraining:
    "Computer networks, local servers, hardware setup, operating-system fault diagnosis, simulated network troubleshooting, network protocols, cloud computing, command-line interfaces, systems administration, and IT security.",
  languages: [
    { id: "lang-1", name: "English", level: "Fluent & Proficient" },
    { id: "lang-2", name: "Bahasa Melayu", level: "Fluent & Proficient" },
    { id: "lang-3", name: "Tamil", level: "Intermediate" },
  ],
};
