export interface Internship {
  id: string;
  company: string;
  role: string;
  duration?: string;
  period: string;
  status: 'CURRENTLY COMPLETING' | 'COMPLETED' | 'UPCOMING';
  location: string;
  description: string[];
  techStack: string[];
  certificateUrl?: string;
  featured?: boolean;
}

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
    featured: true
  },
  {
    id: 'persistent-systems',
    company: 'Persistent Systems Limited',
    role: 'Software Engineering Intern',
    period: '2025',
    status: 'COMPLETED',
    location: 'India',
    description: [
      'Engineered scalable software modules adhering to enterprise clean coding standards and design principles.',
      'Gained deep exposure to enterprise distributed systems, software lifecycle engineering, and performance optimization.',
      'Collaborated within Agile engineering workflows, conducting code reviews and participating in architectural planning.'
    ],
    techStack: ['Java', 'Python', 'Enterprise Architecture', 'Data Structures', 'Agile Engineering'],
    featured: true
  },
  {
    id: 'bodhami',
    company: 'Bodhami Limited',
    role: 'Software Engineering Intern',
    period: '2025',
    status: 'COMPLETED',
    location: 'Goa, India',
    description: [
      'Core contributor to the Bodhami InteriorAI Platform engineering interactive 3D and 4-wall spatial visualization modules.',
      'Architected algorithmic dynamic pricing estimation routines calculating real-time material, labor, and hardware expenses.',
      'Built decoupled full-stack APIs using TypeScript and Python, streamlining contractor quotation workflows and automated PDF generation.'
    ],
    techStack: ['TypeScript', 'React', 'Three.js', 'Python', 'FastAPI', 'Dynamic Pricing Engine'],
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
