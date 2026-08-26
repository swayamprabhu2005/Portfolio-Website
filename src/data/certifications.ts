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
    id: 'ibm-agentic-ai',
    title: 'Make Agentic AI Work for You',
    issuer: 'IBM',
    year: '2026',
    category: 'AI & Agents',
    featured: true,
    credentialNote: 'Autonomous Agents & Multi-Agent Workflow Architectures',
    badgeColor: '#3B82F6',
    skills: ['Agentic AI', 'Multi-Agent Workflows', 'Tool Use', 'Autonomous Systems']
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
    skills: ['Anthropic Claude', 'LLM Principles', 'Prompt Architecture', 'AI Safety']
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
    skills: ['Claude Architecture', 'Large Context Windows', 'Structured Outputs']
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
    skills: ['Claude Code', 'Agentic Workflows', 'Terminal Automation', 'Code Generation']
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
    skills: ['Agent Tool Calling', 'API Schemas', 'Tool Execution Pipelines']
  },
  {
    id: 'anthropic-claude-cowork',
    title: 'Introduction to Claude Cowork',
    issuer: 'Anthropic',
    year: '2026',
    category: 'AI & Agents',
    credentialNote: 'Collaborative AI Pair-Programming Workflows',
    badgeColor: '#C084FC',
    skills: ['Human-in-the-loop AI', 'Interactive Refactoring', 'Collaborative Coding']
  },
  {
    id: 'simplilearn-genai',
    title: 'Introduction to Generative AI',
    issuer: 'Simplilearn',
    year: '2025',
    category: 'AI & Agents',
    credentialNote: 'Generative Neural Architectures & Foundations',
    badgeColor: '#F59E0B',
    skills: ['Generative AI', 'Diffusion Models', 'Transformer Foundations']
  },

  // ENGINEERING & CS
  {
    id: 'nptel-entrepreneurship',
    title: 'Understanding Incubation and Entrepreneurship',
    issuer: 'NPTEL, IIT Bombay',
    year: '2025',
    category: 'Engineering & CS',
    featured: true,
    credentialNote: '3 Credits | Rigorous Academic Evaluation',
    badgeColor: '#EF4444',
    skills: ['Product Development', 'Technology Commercialization', 'Startup Incubation']
  },
  {
    id: 'nptel-software-testing',
    title: 'Software Testing',
    issuer: 'NPTEL, IIT Bangalore',
    year: '2025',
    category: 'Engineering & CS',
    featured: true,
    credentialNote: '3 Credits | Automated Verification & Testing Theory',
    badgeColor: '#10B981',
    skills: ['Unit Testing', 'Automated Verification', 'Coverage Analysis', 'Test Oracles']
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
  {
    id: 'infosys-computer-vision',
    title: 'Computer Vision',
    issuer: 'Infosys Springboard',
    year: '2025',
    category: 'AI & Agents',
    credentialNote: 'Image Transformations, Feature Detectors & Spatial Filters',
    badgeColor: '#8B5CF6',
    skills: ['OpenCV', 'Feature Extraction', 'Convolutional Filters', 'Object Detection']
  },
  {
    id: 'infosys-nlp',
    title: 'Introduction to Natural Language Processing',
    issuer: 'Infosys Springboard',
    year: '2025',
    category: 'AI & Agents',
    credentialNote: 'Tokenization, Embeddings & Syntax Parsing',
    badgeColor: '#06B6D4',
    skills: ['NLP', 'Tokenization', 'Text Classification', 'Vector Semantics']
  },

  // DATA & ANALYTICS
  {
    id: 'hp-critical-thinking',
    title: 'Critical Thinking in the AI Era',
    issuer: 'HP LIFE',
    year: '2025',
    category: 'Data & Analytics',
    credentialNote: 'Analytical Decision Frameworks for AI Outputs',
    badgeColor: '#3B82F6',
    skills: ['Analytical Thinking', 'AI Validation', 'Algorithmic Bias Assessment']
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
    id: 'forage-quantium',
    title: 'Quantium - Software Engineering Job Simulation',
    issuer: 'Forage / Quantium',
    year: '2025',
    category: 'Industry Simulations',
    credentialNote: 'High-Volume Commercial Data Processing & Engineering',
    badgeColor: '#F43F5E',
    skills: ['Commercial Data Pipelines', 'Data Processing', 'Engineering Hygiene']
  },
  {
    id: 'forage-genai-analytics',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Forage / Tata Group',
    year: '2025',
    category: 'Industry Simulations',
    credentialNote: 'Enterprise AI Data Synthesis & Executive Dashboards',
    badgeColor: '#A855F7',
    skills: ['Enterprise AI Analytics', 'Data Storytelling', 'Executive Synthesis']
  }
];
