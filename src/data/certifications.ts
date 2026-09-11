export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'AI & Agents' | 'Engineering & CS' | 'Data & Analytics' | 'Industry Simulations';
  featured?: boolean;
  credentialNote?: string;
  badgeColor?: string;
  skills: string[];
  fileUrl?: string;
}

export const CERTIFICATION_CATEGORIES = [
  'All',
  'AI & Agents',
  'Engineering & CS',
  'Data & Analytics',
  'Industry Simulations'
] as const;

export const CERTIFICATIONS: Certification[] = [
  // AI & AGENTS
  {
    id: 'bodhami-agent-developer',
    title: 'AI Agent Developer Certification',
    issuer: 'Bodhami Learning',
    year: '2026',
    category: 'AI & Agents',
    featured: true,
    credentialNote: 'Autonomous Agents, Workflow Loops & Agent Architecture',
    badgeColor: '#00D2FF',
    skills: ['AI Agents', 'Agent Workflows', 'Autonomous Systems', 'Tool Calling'],
    fileUrl: 'certificates/bodhami-agent-developer.webp'
  },
  {
    id: 'bodhami-genai-rag',
    title: 'AI Application Engineer: GenAI & RAG',
    issuer: 'Bodhami Learning',
    year: '2026',
    category: 'AI & Agents',
    featured: true,
    credentialNote: 'Production RAG Architectures, Vector Embeddings & LLM Integrations',
    badgeColor: '#A855F7',
    skills: ['GenAI', 'RAG Pipelines', 'Vector Databases', 'Semantic Search'],
    fileUrl: 'certificates/bodhami-genai-rag.webp'
  },
  {
    id: 'ibm-agentic-ai',
    title: 'Make Agentic AI Work for You',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    category: 'AI & Agents',
    featured: true,
    credentialNote: 'Autonomous Agents & Multi-Agent Workflow Architectures',
    badgeColor: '#3B82F6',
    skills: ['Agentic AI', 'Multi-Agent Workflows', 'Tool Use', 'Autonomous Systems'],
    fileUrl: 'certificates/ibm-agentic-ai.webp'
  },
  {
    id: 'anthropic-ai-fluency',
    title: 'AI Fluency for Students',
    issuer: 'Anthropic',
    year: '2026',
    category: 'AI & Agents',
    featured: true,
    credentialNote: 'Frontier AI Principles & LLM Application Strategies',
    badgeColor: '#A855F7',
    skills: ['Anthropic Claude', 'LLM Principles', 'Prompt Architecture', 'AI Safety'],
    fileUrl: 'certificates/anthropic-ai-fluency.webp'
  },
  {
    id: 'anthropic-claude-101',
    title: 'Claude 101',
    issuer: 'Anthropic',
    year: '2026',
    category: 'AI & Agents',
    featured: true,
    credentialNote: 'Foundational Claude Architecture & Context Processing',
    badgeColor: '#8B5CF6',
    skills: ['Claude Architecture', 'Large Context Windows', 'Structured Outputs'],
    fileUrl: 'certificates/anthropic-claude-101.webp'
  },
  {
    id: 'anthropic-claude-code',
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    year: '2026',
    category: 'AI & Agents',
    featured: true,
    credentialNote: 'Agentic CLI & High-Velocity Terminal Development',
    badgeColor: '#6366F1',
    skills: ['Claude Code', 'Agentic Workflows', 'Terminal Automation', 'Code Generation'],
    fileUrl: 'certificates/anthropic-claude-code.webp'
  },
  {
    id: 'anthropic-agent-skills',
    title: 'Introduction to Agent Skills',
    issuer: 'Anthropic',
    year: '2026',
    category: 'AI & Agents',
    featured: true,
    credentialNote: 'Designing Reusable Tooling & Agentic Capabilities',
    badgeColor: '#EC4899',
    skills: ['Agent Tool Calling', 'API Schemas', 'Tool Execution Pipelines'],
    fileUrl: 'certificates/anthropic-agent-skills.webp'
  },
  {
    id: 'anthropic-claude-cowork',
    title: 'Introduction to Claude Cowork',
    issuer: 'Anthropic',
    year: '2026',
    category: 'AI & Agents',
    credentialNote: 'Collaborative AI Pair-Programming Workflows',
    badgeColor: '#C084FC',
    skills: ['Human-in-the-loop AI', 'Interactive Refactoring', 'Collaborative Coding'],
    fileUrl: 'certificates/anthropic-claude-cowork.webp'
  },
  {
    id: 'infosys-computer-vision',
    title: 'Computer Vision 101',
    issuer: 'Infosys Springboard',
    year: '2026',
    category: 'AI & Agents',
    credentialNote: 'Image Transformations, Feature Detectors & Spatial Filters',
    badgeColor: '#8B5CF6',
    skills: ['OpenCV', 'Feature Extraction', 'Convolutional Filters', 'Object Detection'],
    fileUrl: 'certificates/infosys-computer-vision.webp'
  },
  {
    id: 'infosys-nlp',
    title: 'Introduction to Natural Language Processing',
    issuer: 'Infosys Springboard',
    year: '2026',
    category: 'AI & Agents',
    credentialNote: 'Tokenization, Embeddings & Syntax Parsing',
    badgeColor: '#06B6D4',
    skills: ['NLP', 'Tokenization', 'Text Classification', 'Vector Semantics'],
    fileUrl: 'certificates/infosys-nlp.webp'
  },

  // ENGINEERING & CS
  {
    id: 'bodhami-cloud-devops',
    title: 'Cloud & DevOps Associate: AWS, Docker & CI/CD',
    issuer: 'Bodhami Learning',
    year: '2026',
    category: 'Engineering & CS',
    featured: true,
    credentialNote: 'Containerization, AWS Cloud Infrastructure & Automated CI/CD Pipelines',
    badgeColor: '#FF6B00',
    skills: ['AWS', 'Docker', 'CI/CD Pipelines', 'Cloud Architecture'],
    fileUrl: 'certificates/bodhami-cloud-devops.webp'
  },
  {
    id: 'nptel-entrepreneurship',
    title: 'Understanding Incubation and Entrepreneurship',
    issuer: 'NPTEL, IIT Bombay',
    year: '2026',
    category: 'Engineering & CS',
    featured: true,
    credentialNote: '4 Credits | Score 93/100 (Elite + Gold Top Performer)',
    badgeColor: '#EF4444',
    skills: ['Product Development', 'Technology Commercialization', 'Startup Incubation'],
    fileUrl: 'certificates/nptel-entrepreneurship.webp'
  },
  {
    id: 'nptel-software-testing',
    title: 'Software Testing',
    issuer: 'NPTEL, IIT Bangalore',
    year: '2025',
    category: 'Engineering & CS',
    featured: true,
    credentialNote: '3-4 Credits | Automated Verification & Testing Theory',
    badgeColor: '#10B981',
    skills: ['Unit Testing', 'Automated Verification', 'Coverage Analysis', 'Test Oracles'],
    fileUrl: 'certificates/nptel-software-testing.webp'
  },
  {
    id: 'udemy-dsa-c',
    title: 'Data Structures and Algorithms in C',
    issuer: 'Udemy',
    year: '2024–2025',
    category: 'Engineering & CS',
    credentialNote: 'Fundamental Algorithms, Memory Allocation & Complexity Analysis',
    badgeColor: '#06B6D4',
    skills: ['Data Structures', 'C Memory Management', 'Pointers', 'Big-O Optimization']
  },

  // DATA & ANALYTICS
  {
    id: 'hp-critical-thinking',
    title: 'Critical Thinking in the AI Era',
    issuer: 'HP LIFE',
    year: '2026',
    category: 'Data & Analytics',
    credentialNote: 'Analytical Decision Frameworks for AI Outputs & Bias Detection',
    badgeColor: '#3B82F6',
    skills: ['Analytical Thinking', 'AI Validation', 'Algorithmic Bias Assessment'],
    fileUrl: 'certificates/hp-critical-thinking.webp'
  },
  {
    id: 'hp-data-science',
    title: 'Data Science & Analytics',
    issuer: 'HP LIFE',
    year: '2025',
    category: 'Data & Analytics',
    credentialNote: 'Exploratory Data Analysis & Statistical Synthesis',
    badgeColor: '#10B981',
    skills: ['Exploratory Data Analysis', 'Statistical Inference', 'Metrics Synthesis']
  },

  // INDUSTRY SIMULATIONS
  {
    id: 'forage-deloitte',
    title: 'Deloitte Virtual Internship Program',
    issuer: 'Forage / Deloitte',
    year: 'May 2025',
    category: 'Industry Simulations',
    featured: true,
    credentialNote: 'Practical technology consulting simulation exploring enterprise systems architecture, security analysis, and client solution design.',
    badgeColor: '#3B82F6',
    skills: ['Enterprise Architecture', 'Systems Analysis', 'Security Consulting', 'Client Technical Solutions'],
    fileUrl: 'certificates/forage-deloitte.webp'
  },
  {
    id: 'google-cloud-genai',
    title: 'Introduction to Generative AI Virtual Internship',
    issuer: 'Google Cloud',
    year: 'July 2025',
    category: 'Industry Simulations',
    featured: true,
    credentialNote: 'Explored Large Language Models, Generative AI principles, prompt engineering, attention mechanisms, and foundation model infrastructure.',
    badgeColor: '#F59E0B',
    skills: ['Generative AI', 'Large Language Models', 'Google Cloud AI', 'Transformer Architectures'],
    fileUrl: 'certificates/simplilearn-genai.webp'
  },
  {
    id: 'forage-genai-analytics',
    title: 'GenAI-Powered Data Analytics Virtual Internship',
    issuer: 'Forage / Tata Group',
    year: 'September 2025',
    category: 'Industry Simulations',
    featured: true,
    credentialNote: 'Applied Generative AI techniques to data pipeline analysis, business intelligence synthesis, exploratory analytics, and predictive metric modeling.',
    badgeColor: '#A855F7',
    skills: ['GenAI Data Analytics', 'Business Intelligence', 'Data Synthesis', 'Predictive Modeling'],
    fileUrl: 'certificates/forage-genai-analytics.webp'
  },
  {
    id: 'forage-quantium',
    title: 'Quantium - Software Engineering Job Simulation',
    issuer: 'Forage / Quantium',
    year: '2025–2026',
    category: 'Industry Simulations',
    credentialNote: 'Commercial Data Processing, Dash Application & Testing',
    badgeColor: '#F43F5E',
    skills: ['Commercial Data Pipelines', 'Dash Application', 'Engineering Hygiene'],
    fileUrl: 'certificates/forage-quantium.webp'
  }
];
