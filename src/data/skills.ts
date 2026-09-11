export interface SkillNode {
  id: string;
  name: string;
  category: 'PROGRAMMING' | 'AI & ML' | 'AI AGENTS & LLMs' | 'WEB & FULL STACK' | 'DATABASES & CLOUD' | 'SYSTEMS & UTILITIES';
  iconName: string;
  level: string; // e.g. 'Advanced', 'Proficient', 'Core'
  connectedProjects: string[]; // project IDs linked to this skill
  description: string;
  color: string;
}

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Ecosystem' },
  { id: 'AI & ML', label: 'AI & Deep Learning' },
  { id: 'AI AGENTS & LLMs', label: 'AI Agents & LLMs' },
  { id: 'PROGRAMMING', label: 'Languages' },
  { id: 'WEB & FULL STACK', label: 'Web & Full Stack' },
  { id: 'DATABASES & CLOUD', label: 'Databases & Cloud' },
  { id: 'SYSTEMS & UTILITIES', label: 'Systems & Hardware' },
] as const;

export const SKILLS: SkillNode[] = [
  // AI & ML
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI & ML',
    iconName: 'Flame',
    level: 'Deep Learning Framework',
    connectedProjects: ['veritascan'],
    description: 'Tensor computations, custom neural model training, ResNet backbones, and GPU-accelerated inference.',
    color: '#EE4C2C'
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'AI & ML',
    iconName: 'ScanFace',
    level: 'Computer Vision',
    connectedProjects: ['veritascan', 'dungeon-dice', 'edulens-ai'],
    description: 'Facial landmark extraction, eye-gaze tracking, perspective warps, contour analysis, and frame transformations.',
    color: '#5C3EE8'
  },
  {
    id: 'fast-whisper',
    name: 'Fast Whisper & Audio ML',
    category: 'AI & ML',
    iconName: 'Zap',
    level: 'Acoustic Processing',
    connectedProjects: ['veritascan', 'breathmetrics'],
    description: 'Acoustic signal analysis, Mel-spectrogram transformation, synthetic voice forensics, and respiratory sound classification.',
    color: '#00A67E'
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-Learn',
    category: 'AI & ML',
    iconName: 'LineChart',
    level: 'Supervised & Statistical ML',
    connectedProjects: ['loan-prediction', 'smart-water-monitoring', 'breathmetrics'],
    description: 'Classification models (Random Forest, Logistic Regression), regression forecasting, clustering, and data pipelines.',
    color: '#F7931E'
  },
  {
    id: 'r-stats',
    name: 'R (Statistical Learning)',
    category: 'AI & ML',
    iconName: 'Activity',
    level: 'Statistical Data Science',
    connectedProjects: ['heart-disease-detection'],
    description: 'Exploratory data analysis, biometric correlation matrices, IQR imputation, and supervised classifiers (KNN, Trees) in R.',
    color: '#276DC3'
  },

  // AI AGENTS & LLMs
  {
    id: 'langgraph',
    name: 'LangGraph & LangChain',
    category: 'AI AGENTS & LLMs',
    iconName: 'Boxes',
    level: 'Agentic Workflows',
    connectedProjects: ['aether', 'ai-goal-journal'],
    description: 'Stateful multi-agent execution graphs, cyclic tool-use loops, task decomposition, and memory buffers.',
    color: '#1C3C3C'
  },
  {
    id: 'gemini-llm',
    name: 'Google Gemini',
    category: 'AI AGENTS & LLMs',
    iconName: 'Sparkles',
    level: 'Foundation Models',
    connectedProjects: ['ahana-ai', 'ai-goal-journal', 'nexus-ai'],
    description: 'Streaming multimodal generation, structured tool calling, semantic embeddings, and conversational agents.',
    color: '#1A73E8'
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    category: 'AI AGENTS & LLMs',
    iconName: 'Bot',
    level: 'LLM Orchestration',
    connectedProjects: ['aether', 'veritascan'],
    description: 'Function-calling APIs, prompt chaining, reasoning models, and automated report synthesis.',
    color: '#10A37F'
  },
  {
    id: 'qdrant',
    name: 'Qdrant Vector Database',
    category: 'AI AGENTS & LLMs',
    iconName: 'Database',
    level: 'Vector Memory Store',
    connectedProjects: ['aether', 'ai-goal-journal'],
    description: 'High-dimensional vector indexing, cosine similarity search, filtered semantic memory, and payload metadata filtering.',
    color: '#DC2626'
  },

  // PROGRAMMING LANGUAGES
  {
    id: 'python',
    name: 'Python 3',
    category: 'PROGRAMMING',
    iconName: 'Terminal',
    level: 'Core Language',
    connectedProjects: [
      'aether',
      'veritascan',
      'ai-goal-journal',
      'identity-cli',
      'dungeon-dice',
      'edulens-ai',
      'loan-prediction',
      'nexus-ai',
      'breathmetrics',
      'returnload'
    ],
    description: 'Asynchronous concurrency, algorithmic data structures, data analysis, deep learning, and CLI engineering.',
    color: '#3776AB'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'PROGRAMMING',
    iconName: 'FileCode2',
    level: 'Type-Safe Architecture',
    connectedProjects: ['bodhami-interior', 'ahana-ai', 'financeflow', 'aether'],
    description: 'Static typing, generic interfaces, domain-driven contracts, and enterprise React/Node.js systems.',
    color: '#3178C6'
  },
  {
    id: 'javascript-node',
    name: 'JavaScript / Node.js',
    category: 'PROGRAMMING',
    iconName: 'Code',
    level: 'Event-Driven Systems',
    connectedProjects: [
      'smart-water-monitoring',
      'tunevault',
      'travellog',
      'returnload',
      'urban-gardening',
      'nexus-ai',
      'scantra',
      'ai-goal-journal'
    ],
    description: 'Asynchronous event loops, RESTful microservices, stream manipulation, and web application routing.',
    color: '#F7DF1E'
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'PROGRAMMING',
    iconName: 'Cpu',
    level: 'Systems & Embedded',
    connectedProjects: ['online-recipe-book', 'smart-water-monitoring', 'scantra'],
    description: 'Object-Oriented Programming (OOP), file stream I/O, microcontroller firmware, memory efficiency, and native compilation.',
    color: '#00599C'
  },
  {
    id: 'java',
    name: 'Java (SE & JDBC)',
    category: 'PROGRAMMING',
    iconName: 'FileCode',
    level: 'Enterprise OOP',
    connectedProjects: ['student-management'],
    description: 'Object-oriented patterns, Swing/AWT desktop user interfaces, transactional JDBC drivers, and MySQL connectivity.',
    color: '#EA2D2E'
  },
  {
    id: 'dart-flutter',
    name: 'Dart & Flutter',
    category: 'PROGRAMMING',
    iconName: 'Layers',
    level: 'Mobile Application',
    connectedProjects: ['scantra'],
    description: 'Reactive cross-platform mobile apps, native device channels, offline Google ML Kit OCR integration, and PDF manipulation.',
    color: '#02569B'
  },

  // WEB & FULL STACK
  {
    id: 'react',
    name: 'React & Vite',
    category: 'WEB & FULL STACK',
    iconName: 'Atom',
    level: 'Frontend Architecture',
    connectedProjects: ['ai-goal-journal', 'bodhami-interior', 'financeflow', 'edulens-ai', 'veritascan'],
    description: 'Virtual DOM reconciliation, custom hooks, component composition, state machines, and high-speed Vite bundler tooling.',
    color: '#61DAFB'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'WEB & FULL STACK',
    iconName: 'Server',
    level: 'High-Performance API',
    connectedProjects: ['aether', 'veritascan', 'ai-goal-journal', 'edulens-ai'],
    description: 'Asynchronous OpenAPI architectures, Pydantic type validation, background worker pools, and sub-millisecond serialization.',
    color: '#059669'
  },
  {
    id: 'threejs',
    name: 'Three.js & WebGL',
    category: 'WEB & FULL STACK',
    iconName: 'Boxes',
    level: '3D Graphics',
    connectedProjects: ['bodhami-interior', 'ahana-ai', 'veritascan'],
    description: 'Interactive 3D scenes, custom vertex and fragment shaders, 4-wall isometric views, and camera projection geometry.',
    color: '#000000'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'WEB & FULL STACK',
    iconName: 'Palette',
    level: 'Design Systems',
    connectedProjects: ['ai-goal-journal', 'financeflow', 'edulens-ai', 'bodhami-interior'],
    description: 'Modern utility-first responsive styling, design tokens, micro-interactions, and accessibility standards.',
    color: '#06B6D4'
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'WEB & FULL STACK',
    iconName: 'Layout',
    level: 'Semantic Web & Structure',
    connectedProjects: ['urban-gardening', 'travellog', 'song-registration-portal', 'tunevault'],
    description: 'Semantic document markup, W3C accessibility compliance, HTML5 Canvas memory graphics, and responsive web foundations.',
    color: '#E34F26'
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'WEB & FULL STACK',
    iconName: 'Palette',
    level: 'Responsive Design & Layouts',
    connectedProjects: ['urban-gardening', 'travellog', 'song-registration-portal', 'tunevault'],
    description: 'Modern CSS Grid, Flexbox layouts, keyframe animations, glassmorphism backdrop filters, and cross-browser styling.',
    color: '#1572B6'
  },

  // DATABASES & CLOUD
  {
    id: 'postgresql-bigquery',
    name: 'PostgreSQL & BigQuery',
    category: 'DATABASES & CLOUD',
    iconName: 'Database',
    level: 'Enterprise Data Warehouse',
    connectedProjects: ['aether'],
    description: 'ACID transactional SQL, AsyncPG connection pools, SQLAlchemy ORM, and Google Cloud BigQuery telemetry pipelines.',
    color: '#336791'
  },
  {
    id: 'mongodb',
    name: 'MongoDB & GridFS',
    category: 'DATABASES & CLOUD',
    iconName: 'HardDrive',
    level: 'Document & Blob Storage',
    connectedProjects: ['smart-water-monitoring', 'travellog'],
    description: 'NoSQL document schemas, chunked binary storage (GridFS) for media streams, and time-series telemetry storage.',
    color: '#47A248'
  },
  {
    id: 'mysql',
    name: 'MySQL & SQL',
    category: 'DATABASES & CLOUD',
    iconName: 'Database',
    level: 'Relational Database',
    connectedProjects: ['song-registration-portal', 'tunevault', 'urban-gardening', 'student-management', 'bodhami-interior'],
    description: 'Normalized database design, foreign-key constraints, complex joins, indexing, and ACID compliance.',
    color: '#4479A1'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'DATABASES & CLOUD',
    iconName: 'Zap',
    level: 'Cloud Backend & Auth',
    connectedProjects: ['financeflow', 'smart-water-monitoring', 'song-registration-portal', 'tunevault'],
    description: 'Real-time database triggers, Row Level Security (RLS), auto-generated REST APIs, and instant cloud sync.',
    color: '#3ECF8E'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DATABASES & CLOUD',
    iconName: 'Box',
    level: 'Containerization & DevOps',
    connectedProjects: ['song-registration-portal', 'bodhami-interior', 'aether'],
    description: 'Containerized application runtimes, multi-stage Dockerfiles, microservice isolation, and reproducible deployments across development and production.',
    color: '#2496ED'
  },

  // SYSTEMS & UTILITIES
  {
    id: 'iot-arduino',
    name: 'Arduino & ESP32 Telemetry',
    category: 'SYSTEMS & UTILITIES',
    iconName: 'Radio',
    level: 'Hardware & IoT Probes',
    connectedProjects: ['smart-water-monitoring'],
    description: 'Analog probe calibration, voltage curve filtering, Wi-Fi telemetry streaming, and environmental threshold alerts.',
    color: '#00979D'
  },
  {
    id: 'pygame-algo',
    name: 'Pygame & Algorithmic Engines',
    category: 'SYSTEMS & UTILITIES',
    iconName: 'Cpu',
    level: 'Procedural Generation & AI',
    connectedProjects: ['dungeon-dice'],
    description: 'Graph-based maze generation (Kruskal/Prim), A* pathfinding routing, and vector-based collision dynamics.',
    color: '#E11D48'
  },
  {
    id: 'typer-cli',
    name: 'Typer & Rich CLI',
    category: 'SYSTEMS & UTILITIES',
    iconName: 'Terminal',
    level: 'CLI Architecture',
    connectedProjects: ['identity-cli'],
    description: 'Cross-platform command-line applications, encrypted local keyrings, formatted terminal tables, and PEP 621 packaging.',
    color: '#0284C7'
  }
];
