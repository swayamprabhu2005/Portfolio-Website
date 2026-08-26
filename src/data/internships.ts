export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  period: string;
  status: 'CURRENTLY COMPLETING' | 'COMPLETED' | 'UPCOMING';
  location: string;
  description: string[];
  techStack: string[];
  certificateUrl?: string;
  featured?: boolean;
}

/**
 * Authoritative Modular Internship Data
 * Update entries here as new company names, durations, and certificates are confirmed.
 */
export const INTERNSHIPS: Internship[] = [
  {
    id: 'creative-capsule',
    company: 'Creative Capsule',
    role: 'Software Engineering Intern',
    duration: '2 Months',
    period: '2026 – Present',
    status: 'CURRENTLY COMPLETING',
    location: 'Goa, India',
    description: [
      'Contributing to full-stack engineering, enterprise workflow architecture, and offline-first systems.',
      'Working closely with industry engineering supervisors on production-grade software delivery and clean architecture.',
      'Applying modern distributed design patterns, TypeScript, modular components, and automated quality workflows.'
    ],
    techStack: ['TypeScript', 'Full-Stack Architecture', 'Offline-First Systems', 'Enterprise Software', 'REST APIs'],
    certificateUrl: '#CERTIFICATE_URL_1',
    featured: true
  }
];

export interface VirtualExperience {
  id: string;
  company: string;
  program: string;
  date: string;
  platform: string;
  description: string;
  skillsGained: string[];
}

export const VIRTUAL_EXPERIENCES: VirtualExperience[] = [
  {
    id: 'deloitte-virtual',
    company: 'Deloitte',
    program: 'Deloitte Virtual Internship Program',
    date: 'May 2025',
    platform: 'Forage / Deloitte',
    description: 'Practical technology consulting simulation exploring enterprise systems architecture, security analysis, and client solution design.',
    skillsGained: ['Enterprise Architecture', 'Systems Analysis', 'Security Consulting', 'Client Technical Solutions']
  },
  {
    id: 'google-cloud-genai',
    company: 'Google Cloud',
    program: 'Introduction to Generative AI Virtual Internship',
    date: 'July 2025',
    platform: 'Google Cloud',
    description: 'Explored Large Language Models, Generative AI principles, prompt engineering, attention mechanisms, and foundation model infrastructure.',
    skillsGained: ['Generative AI', 'Large Language Models', 'Google Cloud AI', 'Transformer Architectures']
  },
  {
    id: 'tata-genai-analytics',
    company: 'Tata',
    program: 'GenAI-Powered Data Analytics Virtual Internship',
    date: 'September 2025',
    platform: 'Forage / Tata Group',
    description: 'Applied Generative AI techniques to data pipeline analysis, business intelligence synthesis, exploratory analytics, and predictive metric modeling.',
    skillsGained: ['GenAI Data Analytics', 'Business Intelligence', 'Data Synthesis', 'Predictive Modeling']
  }
];
