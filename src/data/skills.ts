export interface SkillNode {
  id: string;
  name: string;
  category: 'PROGRAMMING' | 'WEB' | 'BACKEND / DB' | 'AI / ML' | 'SYSTEMS / IOT' | 'VISUAL & INTERACTIVE';
  iconName: string;
  level: string; // e.g. 'Advanced', 'Proficient', 'Core'
  connectedProjects: string[]; // project IDs linked to this skill
  description: string;
  color: string;
}

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Ecosystem' },
  { id: 'PROGRAMMING', label: 'Programming' },
  { id: 'WEB', label: 'Web Tech' },
  { id: 'BACKEND / DB', label: 'Backend & DB' },
  { id: 'AI / ML', label: 'AI & ML' },
  { id: 'SYSTEMS / IOT', label: 'Systems & IoT' },
  { id: 'VISUAL & INTERACTIVE', label: 'Visual / 3D' },
] as const;

export const SKILLS: SkillNode[] = [
  // PROGRAMMING
  {
    id: 'c',
    name: 'C',
    category: 'PROGRAMMING',
    iconName: 'Cpu',
    level: 'Core Fundamentals',
    connectedProjects: ['automotive-blackbox', 'smart-water-monitoring'],
    description: 'Low-level memory management, pointers, bitwise logic, and firmware programming.',
    color: '#06B6D4'
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'PROGRAMMING',
    iconName: 'Terminal',
    level: 'Data Structures & OOP',
    connectedProjects: ['recipe-book', 'automotive-blackbox'],
    description: 'Object-oriented programming, inheritance, polymorphism, templates, and embedded ESP32 control.',
    color: '#3B82F6'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'PROGRAMMING',
    iconName: 'Code',
    level: 'Enterprise OOP',
    connectedProjects: ['student-management'],
    description: 'Object-oriented application architecture, package structuring, JDBC, and SQL integration.',
    color: '#EF4444'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'PROGRAMMING',
    iconName: 'FileCode2',
    level: 'Advanced / AI & Systems',
    connectedProjects: ['veritascan', 'smart-water-monitoring'],
    description: 'Machine learning pipelines, FastAPI backend services, OpenCV computer vision, and data analysis.',
    color: '#F59E0B'
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'PROGRAMMING',
    iconName: 'Zap',
    level: 'Full Stack Proficient',
    connectedProjects: ['veritascan', 'travellog', 'tunevault', 'smart-water-monitoring', 'urban-gardening'],
    description: 'Asynchronous event loops, modern DOM manipulation, functional patterns, and full-stack runtime engineering.',
    color: '#FBBF24'
  },

  // WEB
  {
    id: 'html5',
    name: 'HTML5',
    category: 'WEB',
    iconName: 'Layout',
    level: 'Semantic / Modern',
    connectedProjects: ['veritascan', 'travellog', 'tunevault', 'smart-water-monitoring'],
    description: 'Semantic document structure, accessible ARIA attributes, and audio/video media integration.',
    color: '#F97316'
  },
  {
    id: 'css3',
    name: 'CSS3 / Tailwind',
    category: 'WEB',
    iconName: 'Palette',
    level: 'Advanced Responsive',
    connectedProjects: ['veritascan', 'travellog', 'tunevault', 'smart-water-monitoring'],
    description: 'Modern CSS Grid, Flexbox, hardware-accelerated animations, glassmorphism, and responsive design.',
    color: '#38BDF8'
  },
  {
    id: 'react',
    name: 'React',
    category: 'WEB',
    iconName: 'Atom',
    level: 'Component Architecture',
    connectedProjects: ['veritascan', 'creative-capsule'],
    description: 'Modern hooks, state machines, context patterns, component composition, and virtual DOM optimization.',
    color: '#06B6D4'
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'WEB',
    iconName: 'Flame',
    level: 'Fast Build Tooling',
    connectedProjects: ['veritascan'],
    description: 'High-speed ESM bundling, HMR, production chunk splitting, and plugin pipelines.',
    color: '#A855F7'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'WEB',
    iconName: 'Server',
    level: 'Backend Services',
    connectedProjects: ['travellog', 'tunevault', 'smart-water-monitoring', 'urban-gardening'],
    description: 'Event-driven asynchronous microservices, REST API design, middleware handling, and streams.',
    color: '#22C55E'
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'WEB',
    iconName: 'FileCode',
    level: 'Server-side Web',
    connectedProjects: ['tunevault'],
    description: 'Server-side rendering, session lifecycle handling, and relational database connectivity.',
    color: '#818CF8'
  },

  // BACKEND & DB
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'BACKEND / DB',
    iconName: 'Database',
    level: 'Relational Schema Design',
    connectedProjects: ['tunevault', 'student-management', 'urban-gardening'],
    description: 'ACID transactions, indexed relational schemas, foreign key integrity, and query optimization.',
    color: '#0284C7'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'BACKEND / DB',
    iconName: 'HardDrive',
    level: 'NoSQL Document Store',
    connectedProjects: ['travellog', 'smart-water-monitoring'],
    description: 'Document schema design, aggregation pipelines, time-series telemetry storage, and indexing.',
    color: '#10B981'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'BACKEND / DB',
    iconName: 'ShieldCheck',
    level: 'Auth & Cloud DB',
    connectedProjects: ['travellog', 'tunevault', 'urban-gardening'],
    description: 'PostgreSQL-backed authentication, row-level security policies, and real-time cloud data subscriptions.',
    color: '#34D399'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'BACKEND / DB',
    iconName: 'Boxes',
    level: 'Asynchronous High-Throughput',
    connectedProjects: ['veritascan'],
    description: 'Type-safe asynchronous REST endpoints with Pydantic validation and automatic OpenAPI documentation.',
    color: '#059669'
  },
  {
    id: 'uvicorn',
    name: 'Uvicorn',
    category: 'BACKEND / DB',
    iconName: 'Activity',
    level: 'ASGI Server',
    connectedProjects: ['veritascan'],
    description: 'Lightning-fast ASGI server implementation for asynchronous Python machine learning inference workers.',
    color: '#6366F1'
  },
  {
    id: 'firebase-auth',
    name: 'Firebase Auth',
    category: 'BACKEND / DB',
    iconName: 'KeyRound',
    level: 'Identity & Tokens',
    connectedProjects: ['veritascan'],
    description: 'Secure identity federation, JWT validation, and multi-tenant user authentication.',
    color: '#F59E0B'
  },
  {
    id: 'socketio',
    name: 'Socket.IO',
    category: 'BACKEND / DB',
    iconName: 'Radio',
    level: 'Real-Time WebSockets',
    connectedProjects: ['travellog'],
    description: 'Bi-directional low-latency event channels, chat room multiplexing, and reconnection logic.',
    color: '#EC4899'
  },

  // AI & ML
  {
    id: 'hf-transformers',
    name: 'Hugging Face Transformers',
    category: 'AI / ML',
    iconName: 'Bot',
    level: 'Deep Learning & NLP',
    connectedProjects: ['veritascan'],
    description: 'Fine-tuning transformer architectures, attention weight analysis, and pretrained model inference.',
    color: '#FBBF24'
  },
  {
    id: 'resnet18',
    name: 'ResNet18 / CNNs',
    category: 'AI / ML',
    iconName: 'Network',
    level: 'Computer Vision',
    connectedProjects: ['veritascan'],
    description: 'Deep residual learning, spatial artifact extraction, feature maps, and biometric classification.',
    color: '#EC4899'
  },
  {
    id: 'computervision',
    name: 'Computer Vision',
    category: 'AI / ML',
    iconName: 'ScanFace',
    level: 'Spatial & Spectral Analysis',
    connectedProjects: ['veritascan'],
    description: 'Facial landmark detection, Fourier transform frequency analysis, optical flow, and image processing.',
    color: '#8B5CF6'
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    category: 'AI / ML',
    iconName: 'MessageSquareText',
    level: 'Text Representation & Tokenization',
    connectedProjects: ['veritascan'],
    description: 'Text preprocessing, semantic embeddings, sentiment classification, and tokenization techniques.',
    color: '#06B6D4'
  },

  // SYSTEMS & IOT
  {
    id: 'esp32',
    name: 'ESP32 & Microcontrollers',
    category: 'SYSTEMS / IOT',
    iconName: 'Cpu',
    level: 'Firmware & FreeRTOS',
    connectedProjects: ['automotive-blackbox', 'smart-water-monitoring'],
    description: 'Bare-metal C/C++ firmware, multi-core task scheduling, ADC sampling, and hardware interrupts.',
    color: '#E11D48'
  },
  {
    id: 'canbus',
    name: 'CAN Bus & OBD-II',
    category: 'SYSTEMS / IOT',
    iconName: 'Gauge',
    level: 'Automotive Networks',
    connectedProjects: ['automotive-blackbox'],
    description: 'ISO 11898 CAN 2.0B protocol, MCP2515 SPI controllers, standard OBD-II PID polling, and vehicle telemetry.',
    color: '#D97706'
  },
  {
    id: 'sensors-buses',
    name: 'UART / SPI / I²C & Sensors',
    category: 'SYSTEMS / IOT',
    iconName: 'Sliders',
    level: 'Hardware Interfacing',
    connectedProjects: ['automotive-blackbox', 'smart-water-monitoring'],
    description: 'Interfacing 6-DOF IMUs (MPU6050), GPS (NEO-6M), pH electrodes, turbidity sensors, and TDS meters.',
    color: '#10B981'
  },

  // VISUAL & INTERACTIVE
  {
    id: 'threejs',
    name: 'Three.js & WebGL',
    category: 'VISUAL & INTERACTIVE',
    iconName: 'Box',
    level: '3D Math & Shaders',
    connectedProjects: ['veritascan'],
    description: 'Buffer geometries, custom GLSL shaders, point clouds, particle systems, and 3D camera matrices.',
    color: '#8B5CF6'
  },
  {
    id: 'framermotion',
    name: 'Framer Motion',
    category: 'VISUAL & INTERACTIVE',
    iconName: 'Sparkles',
    level: 'Kinetic Motion & Physics',
    connectedProjects: ['veritascan'],
    description: 'Spring physics, layout animations, scroll-driven transforms, magnetic forces, and staggered reveals.',
    color: '#EC4899'
  },
  {
    id: 'chartjs',
    name: 'Chart.js',
    category: 'VISUAL & INTERACTIVE',
    iconName: 'LineChart',
    level: 'Real-Time Data Viz',
    connectedProjects: ['smart-water-monitoring'],
    description: 'Dynamic time-series charts, threshold alert lines, live updating datasets, and custom tooltips.',
    color: '#38BDF8'
  }
];
