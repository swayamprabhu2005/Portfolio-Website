export type ProjectCategory =
  | 'AI & Deep Learning'
  | 'AI Agents & LLMs'
  | 'Full Stack Web'
  | 'IoT & Systems'
  | 'Data Science & Case Studies';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  period: string;
  status: 'COMPLETED' | 'ACTIVE DEVELOPMENT' | 'FINALIST';
  badge?: string;
  tagline: string;
  description: string;
  highlights: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureDetails?: {
    layers: string[];
    dataFlow: string[];
    keyInnovation: string;
  };
  metrics?: { label: string; value: string }[];
  featured: boolean;
}

export const PROJECTS: Project[] = [
  // 1. VeritaScan (AI & Deep Learning)
  {
    id: 'veritascan',
    title: 'VeritaScan',
    subtitle: 'Forensic Deepfake Detection Platform',
    category: 'AI & Deep Learning',
    period: '2025 – 2026',
    status: 'COMPLETED',
    badge: '★ FLAGSHIP AI FORENSICS',
    tagline: 'Multi-layer deep learning platform detecting synthetic media manipulation via spatial-frequency neural analysis.',
    description: 'VeritaScan is an end-to-end forensic analysis platform designed to detect synthetic video, audio, and image deepfakes. It combines spatial artifact inspection using modified convolutional backbones (ResNet-18) with frequency-domain Fast Fourier Transform (FFT) analysis, producing calibrated authenticity confidence scores and forensic inspection reports.',
    highlights: [
      'Dual-domain neural pipeline: Spatial feature extraction with ResNet-18 combined with Fourier spectral frequency analysis.',
      'Acoustic synthetic voice analysis leveraging Fast Whisper and Librosa spectral decomposition.',
      'High-throughput asynchronous backend built with FastAPI and Uvicorn for sub-second frame inference.',
      'Interactive 3D confidence geometry and real-time artifact heatmap powered by Three.js and Framer Motion.',
      'Automated tamper-evident forensic PDF report compiler.'
    ],
    technologies: [
      'PyTorch',
      'ResNet18',
      'OpenCV',
      'Fast Whisper',
      'Librosa',
      'Python',
      'FastAPI',
      'React',
      'TypeScript',
      'Three.js',
      'Firebase Auth'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/VERITASCAN',
    architectureDetails: {
      layers: [
        'Client Media Ingest (React / Vite / Three.js Visualizer)',
        'Asynchronous Ingestion Engine (FastAPI / Uvicorn Worker Pool)',
        'Facial Landmark & Frame Extraction (OpenCV / MediaPipe)',
        'Dual-Branch Neural Engine (ResNet18 Spatial + FFT Frequency Spectrum)',
        'Forensic Report Compiler (Vector PDF Engine)'
      ],
      dataFlow: [
        'Media Ingest',
        'Frame Parsing',
        'Deep Spectral Scan',
        'Confidence Scoring',
        'Tamper Report'
      ],
      keyInnovation: 'Dual-domain artifact detection examining both spatial boundary blending anomalies and high-frequency Fourier spectral inconsistencies.'
    },
    metrics: [
      { label: 'Inference Speed', value: '<420ms / frame' },
      { label: 'Detection Modes', value: 'Spatial + Frequency' },
      { label: 'Report Format', value: 'Tamper-Evident PDF' }
    ],
    featured: true
  },

  // 2. EduLens AI (AI & Deep Learning)
  {
    id: 'edulens-ai',
    title: 'EduLens AI',
    subtitle: 'Computer Vision Attention & Engagement Telemetry',
    category: 'AI & Deep Learning',
    period: '2026',
    status: 'COMPLETED',
    badge: 'CV ENGAGEMENT ENGINE',
    tagline: 'Real-time computer vision system tracking student focus, head pose, and engagement analytics.',
    description: 'EduLens AI leverages real-time webcam telemetry and computer vision models to track classroom focus, gaze distribution, and emotional engagement during online and hybrid learning sessions, providing educators with interactive analytical heatmaps.',
    highlights: [
      'Real-time webcam stream processing using OpenCV and browser media capture.',
      'Facial landmark extraction, eye gaze vector estimation, and head orientation classification.',
      'High-performance asynchronous telemetry backend built with Python FastAPI.',
      'Analytical engagement dashboards and time-series focus graphs rendered with Recharts & Chart.js.'
    ],
    technologies: [
      'Python',
      'OpenCV',
      'FastAPI',
      'React',
      'Tailwind CSS',
      'Chart.js',
      'Recharts',
      'Webcam API'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/EduLens-AI',
    architectureDetails: {
      layers: [
        'Webcam Stream Capture (React Webcam)',
        'Frame Processing Pipeline (OpenCV Landmark Extraction)',
        'Engagement Inference Service (FastAPI)',
        'Analytics Dashboard (Chart.js / Recharts)'
      ],
      dataFlow: [
        'Video Feed',
        'Landmark Mesh',
        'Focus Classifier',
        'Telemetry Aggregator',
        'Time-Series Chart'
      ],
      keyInnovation: 'Edge-oriented facial orientation and blink rate estimation yielding real-time engagement telemetry without storing raw video frames.'
    },
    metrics: [
      { label: 'Stream FPS', value: '30 FPS Real-Time' },
      { label: 'Telemetry', value: 'Gaze + Head Pose' },
      { label: 'Privacy', value: 'Zero Frame Storage' }
    ],
    featured: true
  },

  // 3. BreathMetrics (AI & Deep Learning)
  {
    id: 'breathmetrics',
    title: 'BreathMetrics',
    subtitle: 'Respiratory Health Diagnostics & Acoustic ML',
    category: 'AI & Deep Learning',
    period: '2026',
    status: 'COMPLETED',
    badge: 'ACOUSTIC ML DIAGNOSTICS',
    tagline: 'Machine learning diagnostic platform analyzing respiratory acoustic signals and breathing telemetry.',
    description: 'BreathMetrics processes respiratory audio recordings and breath pattern telemetry using specialized acoustic machine learning models to detect wheezing, crackles, and abnormalities for pulmonary screening and early triage.',
    highlights: [
      'Acoustic signal preprocessing, spectrogram generation, and audio feature extraction in Python.',
      'Machine learning classification pipeline categorizing respiratory sound anomalies.',
      'Decoupled microservice architecture with a dedicated Python ML service and Node.js orchestrator.',
      'Interactive patient diagnostic dashboard with waveform and frequency spectrum visualization.'
    ],
    technologies: [
      'Python',
      'Scikit-Learn',
      'Audio Signal Processing',
      'JavaScript',
      'React',
      'Node.js',
      'Express'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/BreathMetrics',
    architectureDetails: {
      layers: [
        'Audio Ingestion Service (React / Audio API)',
        'Spectrogram Transformation (Python Audio Pipeline)',
        'Acoustic Classifier (Scikit-Learn ML Model)',
        'Diagnostic Report Service (Node.js)'
      ],
      dataFlow: [
        'Acoustic Sample',
        'Noise Filtering',
        'Spectrogram Extractor',
        'Classifier Inference',
        'Diagnostic Score'
      ],
      keyInnovation: 'Mel-frequency cepstral coefficient (MFCC) feature extraction combined with statistical classifiers for pulmonary sound triage.'
    },
    metrics: [
      { label: 'Sampling Rate', value: '44.1 kHz Hi-Res' },
      { label: 'Feature Extraction', value: 'MFCC + Spectrograms' },
      { label: 'Latency', value: '<600ms Analysis' }
    ],
    featured: false
  },

  // 4. Aether (AI Agents & LLMs)
  {
    id: 'aether',
    title: 'Aether',
    subtitle: 'Autonomous Multi-Agent Orchestration Framework',
    category: 'AI Agents & LLMs',
    period: '2026',
    status: 'COMPLETED',
    badge: 'ENTERPRISE AGENTIC GRAPH',
    tagline: 'Stateful multi-agent execution framework with cyclic graphs, Qdrant vector memory, and BigQuery telemetry.',
    description: 'Aether is an advanced autonomous multi-agent platform designed for complex workflow orchestration. Built on LangGraph, FastAPI, and Qdrant, it coordinates specialized agents that decompose tasks, execute cyclic tool loops, perform semantic retrieval, and log data to Google Cloud BigQuery.',
    highlights: [
      'Cyclic multi-agent graph orchestration built with LangGraph and Python.',
      'Sub-second semantic vector retrieval with high-dimensional embeddings via Qdrant Client.',
      'Google Cloud BigQuery enterprise telemetry logging for agent interaction auditing.',
      'Async PostgreSQL storage with SQLAlchemy and AsyncPG for high-concurrency state persistence.',
      'Automated executive PDF summary generation using ReportLab.'
    ],
    technologies: [
      'Python',
      'FastAPI',
      'LangGraph',
      'Qdrant',
      'OpenAI API',
      'Google BigQuery',
      'PostgreSQL',
      'SQLAlchemy',
      'AsyncPG',
      'TypeScript'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/Aether',
    architectureDetails: {
      layers: [
        'Client Control Plane (TypeScript / React)',
        'Asynchronous Gateway (FastAPI / Uvicorn)',
        'Stateful Agent Graph (LangGraph Execution Engine)',
        'Semantic Memory (Qdrant Vector Database)',
        'Data Warehouse Telemetry (Google Cloud BigQuery)'
      ],
      dataFlow: [
        'User Prompt',
        'Graph Planner',
        'Vector Retrieval',
        'Tool Execution Loop',
        'BigQuery Telemetry'
      ],
      keyInnovation: 'Cyclic graph state machine with dynamic self-correction and multi-tier semantic memory buffers.'
    },
    metrics: [
      { label: 'Graph Framework', value: 'LangGraph Cyclic' },
      { label: 'Vector Engine', value: 'Qdrant Vector DB' },
      { label: 'Telemetry', value: 'GCP BigQuery' }
    ],
    featured: true
  },

  // 5. AI Goal Journal (AI Agents & LLMs)
  {
    id: 'ai-goal-journal',
    title: 'AI Goal Journal',
    subtitle: 'Agentic Goal Decomposition & Habit Telemetry',
    category: 'AI Agents & LLMs',
    period: '2025 – 2026',
    status: 'COMPLETED',
    badge: 'AGENTIC PRODUCTIVITY',
    tagline: 'Productivity platform providing automated milestone decomposition, semantic memory, and daily reflection.',
    description: 'AI Goal Journal decomposes ambitious long-term goals into structured daily milestones using Google Gemini and LangChain. It uses Qdrant vector search for episodic memory and Firebase for authentication and real-time state synchronization.',
    highlights: [
      'Automated milestone decomposition turning multi-month objectives into daily verifiable steps.',
      'Semantic episodic memory powered by Qdrant vector search and Google Gemini embeddings.',
      'Smooth micro-animations and distraction-free writing environment built with Framer Motion and AnimeJS.',
      'Secure user authentication and real-time cloud persistence powered by Firebase.'
    ],
    technologies: [
      'JavaScript',
      'React',
      'Tailwind CSS',
      'Framer Motion',
      'AnimeJS',
      'Python',
      'FastAPI',
      'Qdrant',
      'Google Gemini',
      'Firebase'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/AI-Goal-Journal',
    architectureDetails: {
      layers: [
        'Journal Frontend (React / Vite / Framer Motion)',
        'Agentic API Service (FastAPI / Python)',
        'Semantic Embeddings & Search (Qdrant Vector Store)',
        'Identity & State Sync (Firebase)'
      ],
      dataFlow: [
        'Goal Intake',
        'Gemini Decomposition',
        'Vector Indexing',
        'Daily Reflection',
        'Progress Analytics'
      ],
      keyInnovation: 'Episodic memory querying matching current reflections with historical milestones for personalized coaching.'
    },
    metrics: [
      { label: 'LLM Engine', value: 'Google Gemini' },
      { label: 'Vector Index', value: 'Qdrant Memory' },
      { label: 'Auth & Sync', value: 'Firebase Realtime' }
    ],
    featured: true
  },

  // 6. A.H.A.N.A. / Ohana (AI Agents & LLMs)
  {
    id: 'ahana-ai',
    title: 'A.H.A.N.A. (Ohana)',
    subtitle: '3D Interactive Multimodal AI Companion',
    category: 'AI Agents & LLMs',
    period: '2026',
    status: 'COMPLETED',
    badge: '3D GENERATIVE AGENT',
    tagline: 'Interactive 3D web companion powered by Google Generative AI, Three.js shaders, and GSAP kinematics.',
    description: 'A.H.A.N.A. is a 3D multimodal AI companion featuring an expressive procedural avatar rendered in Three.js and GSAP. It streams natural conversational responses generated by Google Gemini with synced visual animations and real-time audio reactivity.',
    highlights: [
      'Interactive 3D procedural character mesh and particle geometry rendered with Three.js.',
      'Smooth kinematics and facial expression morph targets driven by GSAP animation timelines.',
      'Real-time streaming conversational intelligence powered by Google Generative AI (@google/generative-ai).',
      'Type-safe, modern frontend built with TypeScript and Vite.'
    ],
    technologies: [
      'TypeScript',
      'Three.js',
      'GSAP',
      'Google Generative AI',
      'HTML5 Canvas',
      'Vite'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/A.H.A.N.A.',
    architectureDetails: {
      layers: [
        'WebGL Render Pipeline (Three.js / Shader Materials)',
        'Kinematic Animation Controller (GSAP Timelines)',
        'Generative Agent Client (@google/generative-ai SDK)',
        'Audio Reactivity Node (Web Audio API)'
      ],
      dataFlow: [
        'User Prompt',
        'Gemini Stream',
        'Expression Parser',
        'GSAP Interpolation',
        'Three.js Render'
      ],
      keyInnovation: 'Procedural 3D mesh morphing that adjusts avatar lighting and geometries synchronously with LLM semantic sentiment.'
    },
    metrics: [
      { label: 'Render Rate', value: '60 FPS WebGL' },
      { label: 'AI Model', value: 'Google Gemini API' },
      { label: 'Animation', value: 'GSAP 3D Kinematics' }
    ],
    featured: true
  },

  // 7. Nexus-AI (AI Agents & LLMs)
  {
    id: 'nexus-ai',
    title: 'Nexus-AI',
    subtitle: 'AI API Test Automation & Benchmark Suite',
    category: 'AI Agents & LLMs',
    period: '2026',
    status: 'COMPLETED',
    badge: 'API TEST AUTOMATION',
    tagline: 'Automated test suite benchmarking latency, response schemas, and reliability across LLM APIs.',
    description: 'Nexus-AI is an automated testing and evaluation framework designed to benchmark LLM API endpoints across multi-turn consistency, response latency, token throughput, and JSON schema compliance.',
    highlights: [
      'Automated test runner executing standardized prompt matrices across multiple LLM endpoints.',
      'Strict schema validation and conformance testing for structured function-calling outputs.',
      'Statistical latency distribution analysis and rate-limit regression testing in Python and Node.js.',
      'Comprehensive HTML and markdown test artifact generation.'
    ],
    technologies: [
      'Python',
      'JavaScript',
      'Node.js',
      'Axios',
      'JSON Schema',
      'REST APIs'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/Nexus-AI',
    architectureDetails: {
      layers: [
        'Prompt Matrix Suite (YAML / JSON Schema Test Specs)',
        'Concurrent Request Dispatcher (Axios / Node.js Pool)',
        'Response Validator (Python Schema Conformance Engine)',
        'Telemetry Reporter (HTML / CSV Benchmarks)'
      ],
      dataFlow: [
        'Test Spec',
        'Concurrent Dispatch',
        'Payload Validation',
        'Latency Calculation',
        'Benchmark Output'
      ],
      keyInnovation: 'Concurrent prompt fuzzing verifying API response guarantees and schema invariants under rate-limited conditions.'
    },
    metrics: [
      { label: 'Conformance', value: 'Strict Schema Guard' },
      { label: 'Concurrency', value: 'Multi-Endpoint Pool' },
      { label: 'Telemetry', value: 'P95 / P99 Latency' }
    ],
    featured: false
  },

  // 8. Bodhami InteriorAI Platform (Full Stack Web)
  {
    id: 'bodhami-interior',
    title: 'Bodhami InteriorAI Platform',
    subtitle: 'Modular Interior Design & Dynamic Quote Engine',
    category: 'Full Stack Web',
    period: '2026',
    status: 'COMPLETED',
    badge: 'ENTERPRISE 3D PLATFORM',
    tagline: 'End-to-end platform with interactive 4-wall 3D rendering, automated dynamic pricing, and bank-compliant PDF quotes.',
    description: 'Bodhami InteriorAI is a comprehensive web platform for homeowners, interior designers, and contractors. It features real-time 3D room visualization, modular furniture customization, an automated cost calculation engine, and instant bank-compliant PDF quote generation.',
    highlights: [
      'Interactive 3D / 4-wall room floorplan visualization built with Three.js and TypeScript.',
      'Algorithmic pricing calculator computing real-time material, labor, and hardware costs dynamically.',
      'Automated generation of bank-compliant estimation and quotation PDFs.',
      'Contractor execution tracking and comprehensive administrative dashboard.'
    ],
    technologies: [
      'TypeScript',
      'React',
      'Three.js',
      'Node.js',
      'Python',
      'FastAPI',
      'Tailwind CSS',
      'PDF Engine'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/Bodhami-Interior-Design-Website',
    architectureDetails: {
      layers: [
        'Interactive 3D Studio (React / Three.js 4-Wall Canvas)',
        'Pricing & Specification Engine (TypeScript Core)',
        'REST Microservices (Python FastAPI / Node.js)',
        'Bank-Compliant Quotation Engine (PDF Document Generator)'
      ],
      dataFlow: [
        'Room Layout Input',
        '3D Modular Placement',
        'Material Specification',
        'Dynamic Cost Calculation',
        'Contractor PDF Export'
      ],
      keyInnovation: 'Interactive 4-wall isometric camera toggle allowing real-time wall elevation inspection paired with synchronous pricing updates.'
    },
    metrics: [
      { label: '3D Engine', value: 'Three.js 4-Wall' },
      { label: 'Pricing Update', value: 'Real-Time Dynamic' },
      { label: 'Output', value: 'Bank-Compliant PDF' }
    ],
    featured: true
  },

  // 9. FinanceFlow (Full Stack Web)
  {
    id: 'financeflow',
    title: 'FinanceFlow',
    subtitle: 'Personal Financial Analytics & Budget Telemetry',
    category: 'Full Stack Web',
    period: '2026',
    status: 'COMPLETED',
    badge: 'FINANCIAL DASHBOARD',
    tagline: 'High-density personal finance dashboard offering expense tracking, cash flow forecasting, and portfolio budgeting.',
    description: 'FinanceFlow provides individuals with comprehensive financial visibility through intuitive transaction categorizations, cash flow forecasting, net-worth tracking, and visual budget analytics built on React, Vite, Tailwind, and Supabase.',
    highlights: [
      'Interactive financial charting, budget allocation donuts, and monthly income/expense trends via Recharts.',
      'Type-safe state management and high-performance component rendering with TypeScript and Vite.',
      'Secure backend and database synchronization powered by Supabase.',
      'Responsive editorial dashboard design optimized for desktop and mobile devices.'
    ],
    technologies: [
      'TypeScript',
      'React',
      'Vite',
      'Tailwind CSS',
      'Recharts',
      'Supabase',
      'Lucide Icons'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/FinanceFlow-Personal-Finance-Dashboard-FRONTEND-ONLY-',
    architectureDetails: {
      layers: [
        'Dashboard Frontend (React / Vite / Tailwind CSS)',
        'Telemetry Visualization (Recharts SVG Analytics)',
        'State & Filter Store (React Hooks / TypeScript)',
        'Cloud Database (Supabase REST API)'
      ],
      dataFlow: [
        'Transaction Ledger',
        'Category Aggregator',
        'Monthly Delta Engine',
        'Trend Visualizer'
      ],
      keyInnovation: 'Local-first optimistic UI updates paired with reactive SVG telemetry charts for instant financial calculations.'
    },
    metrics: [
      { label: 'Bundle Size', value: '<75 kB Optimized' },
      { label: 'Chart Engine', value: 'Recharts Responsive' },
      { label: 'State Sync', value: 'Supabase Cloud' }
    ],
    featured: false
  },

  // 10. Song Registration Portal (Full Stack Web)
  {
    id: 'song-registration-portal',
    title: 'Song Registration Portal',
    subtitle: 'Full-Stack Music Licensing & Rights Management (TuneVault)',
    category: 'Full Stack Web',
    period: '2025',
    status: 'COMPLETED',
    badge: 'FULL-STACK IP PORTAL',
    tagline: 'Full-stack copyright and music registration portal managing metadata, ownership claims, and audio uploads.',
    description: 'A verified web application and copyright management portal for musicians and record labels to register original musical compositions, timestamp intellectual property claims, upload high-fidelity audio tracks, and store cryptographic metadata in relational databases.',
    highlights: [
      'Relational schema design with normalized tables for artists, tracks, copyright timestamps, and claims.',
      'Server-side rendering and MVC architecture built with Node.js, Express, and EJS templates.',
      'Dual-database compatibility: MySQL database with Supabase cloud backup.',
      'Containerized execution environment with Docker support for deterministic local and cloud environments.',
      'Secure media file handling and metadata validation pipelines.'
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Node.js',
      'Express',
      'MySQL',
      'Supabase',
      'Docker',
      'EJS',
      'Bootstrap'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/SONG-REGISTRATION-PORTAL-FULL-STACK',
    architectureDetails: {
      layers: [
        'Client Interface (HTML5 / CSS3 / EJS Templates / Bootstrap)',
        'MVC Application Controller (Node.js / Express)',
        'Containerized Runtime (Docker Microservice)',
        'Data Access Layer (MySQL2 Client)',
        'Cloud Persistence (Supabase Relational Backup)'
      ],
      dataFlow: [
        'Track Metadata Form Submission',
        'File Upload & Audio Parsing',
        'Relational Constraint Validation',
        'Timestamp Registration'
      ],
      keyInnovation: 'ACID-compliant transaction handling ensuring simultaneous registration of copyright certificates and audio asset hashes.'
    },
    metrics: [
      { label: 'Architecture', value: 'MVC Full Stack' },
      { label: 'Databases', value: 'MySQL + Supabase' },
      { label: 'DevOps', value: 'Docker' }
    ],
    featured: true
  },

  // 11. TravelLog (Full Stack Web)
  {
    id: 'travellog',
    title: 'TravelLog',
    subtitle: 'Real-Time Traveler Community & Media Journal',
    category: 'Full Stack Web',
    period: '2025',
    status: 'COMPLETED',
    badge: 'COMMUNITY MEDIA JOURNAL',
    tagline: 'Travel journal and social exploration platform supporting large media uploads, geo-tagging, and community trip logs.',
    description: 'TravelLog is a full-stack media journal where travelers can document excursions, share geotagged photographs, publish itineraries, and interact with fellow explorers through a distributed MongoDB GridFS media architecture.',
    highlights: [
      'Scalable chunked binary media storage handling high-resolution photo uploads using MongoDB GridFS.',
      'RESTful API architecture handling user authentication, trip logging, and community engagement.',
      'Interactive feed with dynamic sorting, location filtering, and responsive gallery viewports.',
      'Robust session management and password hashing security.'
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'GridFS',
      'Multer',
      'EJS'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/TravelLog-Travel_Journal',
    architectureDetails: {
      layers: [
        'Responsive Web UI (HTML5 / CSS3 / EJS)',
        'Routing & Controllers (Express / Node.js)',
        'Streaming Ingestion (Multer-GridFS-Storage)',
        'NoSQL Media Store (MongoDB Chunks & Metadata)'
      ],
      dataFlow: [
        'Journal Entry',
        'Image Binary Stream',
        'GridFS Chunking',
        'Metadata Indexing',
        'Feed Dispatch'
      ],
      keyInnovation: 'Chunked GridFS streaming allowing large high-resolution camera uploads without memory bottlenecks on the Express application server.'
    },
    metrics: [
      { label: 'Storage', value: 'MongoDB GridFS' },
      { label: 'Media Chunking', value: '255 kB Streams' },
      { label: 'API Pattern', value: 'RESTful MVC' }
    ],
    featured: false
  },

  // 12. ReturnLoad (Full Stack Web)
  {
    id: 'returnload',
    title: 'ReturnLoad',
    subtitle: 'Logistics Freight & Deadhead Route Optimization',
    category: 'Full Stack Web',
    period: '2026',
    status: 'COMPLETED',
    badge: 'LOGISTICS & FREIGHT AI',
    tagline: 'Full-stack logistics platform optimizing freight return trips, matching carriers with deadhead loads.',
    description: 'ReturnLoad addresses inefficiencies in commercial freight by matching carriers on empty return legs ("deadhead trips") with shippers needing regional transport, reducing carbon emissions and empty transit miles.',
    highlights: [
      'Freight load matching engine connecting shippers and empty truck carriers.',
      'Decoupled architecture featuring Node.js backend services and a dedicated Python optimization engine.',
      'Cross-platform mobile and web application architecture.',
      'Automated dispatch calculations and trip profitability estimations.'
    ],
    technologies: [
      'JavaScript',
      'Node.js',
      'Express',
      'Python',
      'React Native / Mobile',
      'REST APIs'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/Returnload',
    architectureDetails: {
      layers: [
        'Carrier / Shipper Interface (Mobile / Web Client)',
        'Logistics Gateway (Node.js / Express)',
        'Route Optimization Service (Python AI Service)',
        'Trip State Ledger (Relational / Document DB)'
      ],
      dataFlow: [
        'Route Posting',
        'Deadhead Detection',
        'Load Matching Service',
        'Carrier Confirmation',
        'Dispatch Generation'
      ],
      keyInnovation: 'Proximity-based freight matching algorithm calculating backhaul routing deviations to minimize deadhead transit costs.'
    },
    metrics: [
      { label: 'Domain', value: 'Freight Telemetry' },
      { label: 'Services', value: 'Node.js + Python ML' },
      { label: 'Optimization', value: 'Deadhead Reduction' }
    ],
    featured: false
  },

  // 13. Urban Gardening Portal (Full Stack Web)
  {
    id: 'urban-gardening',
    title: 'Urban Gardening Portal',
    subtitle: 'Horticulture Community & Plant Care Platform',
    category: 'Full Stack Web',
    period: '2025',
    status: 'COMPLETED',
    badge: 'COMMUNITY HORTICULTURE',
    tagline: 'Web portal for urban gardeners offering plant care schedules, gardening guides, and community forums.',
    description: 'A dedicated web application encouraging sustainable urban living by providing customized watering schedules, plant disease diagnosis tips, micro-climate gardening guides, and community plant-swap discussion forums.',
    highlights: [
      'Structured plant catalog with detailed sunlight, water, and soil specification filters.',
      'User authentication and personalized urban garden inventory tracking.',
      'Interactive community forums with thread creation, commenting, and tips sharing.',
      'Server-side rendered dynamic pages with Express and MySQL database integration.'
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Node.js',
      'Express',
      'MySQL',
      'EJS'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/URBAN-GARDENING-FULL-STACK',
    architectureDetails: {
      layers: [
        'Server-Rendered UI (EJS / CSS3)',
        'Web Controller Engine (Node.js / Express)',
        'Database Storage (MySQL Relational Tables)'
      ],
      dataFlow: [
        'Plant Catalog Query',
        'Filter Engine',
        'Care Schedule Generator',
        'Forum Thread Dispatch'
      ],
      keyInnovation: 'Relational query optimization joining botanical care requirements with individual user garden inventories.'
    },
    metrics: [
      { label: 'Stack', value: 'Node.js / Express / MySQL' },
      { label: 'Templates', value: 'EJS Dynamic' },
      { label: 'Data Model', value: 'Normalized Schema' }
    ],
    featured: false
  },

  // 14. Smart Water Quality Monitoring System (IoT & Systems)
  {
    id: 'smart-water-monitoring',
    title: 'Smart Water Quality Monitoring',
    subtitle: 'Real-Time Environmental IoT Telemetry',
    category: 'IoT & Systems',
    period: '2024 – 2025',
    status: 'FINALIST',
    badge: '★ IDEAS 4.0 FINALIST',
    tagline: 'IoT multi-probe telemetry pipeline streaming continuous contamination metrics and threshold anomaly alerts.',
    description: 'Awarded Finalist distinction at IDEAS 4.0, this physical computing system monitors environmental water safety using submerged hardware probes (pH, turbidity, TDS, temperature). It streams telemetry to an Express/MongoDB pipeline with automated email alerts and Supabase cloud sync.',
    highlights: [
      'Hardware integration: Microcontroller firmware written in Arduino C++ interfacing analog sensor arrays.',
      'High-frequency time-series telemetry ingestion built with Node.js, Express, and MongoDB.',
      'Automated contamination threshold detection triggering asynchronous email alerts via Nodemailer.',
      'Scheduled background cron jobs via Node-Cron for periodic calibration and statistical telemetry aggregation.'
    ],
    technologies: [
      'Arduino C++',
      'ESP32 / ESP8266',
      'Node.js',
      'Express',
      'MongoDB',
      'Supabase',
      'Node-Cron',
      'Nodemailer',
      'Hardware Sensors'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/IDEAS_SMART_WATER_MONITORING',
    architectureDetails: {
      layers: [
        'Hardware Edge Layer (Arduino C++ / ESP32 Sensor Array)',
        'Physical Sensors (pH Probe, Turbidity Sensor, TDS Meter, DS18B20)',
        'Telemetry Gateway (Node.js / Express Ingestion Pipeline)',
        'Time-Series Storage (MongoDB & Supabase Real-Time)',
        'Alert Notification Engine (Node-Cron / Nodemailer)'
      ],
      dataFlow: [
        'Analog Probe Voltage',
        'Microcontroller Calibration',
        'HTTP Telemetry Dispatch',
        'Threshold Anomaly Engine',
        'Automated Alert Dispatch'
      ],
      keyInnovation: 'Hardware-level moving average filtering mitigating transient sensor noise before transmitting calibrated water quality telemetry to the cloud.'
    },
    metrics: [
      { label: 'Award', value: 'IDEAS 4.0 Finalist' },
      { label: 'Sensors', value: 'pH, Turbidity, TDS, Temp' },
      { label: 'Telemetry', value: 'Real-Time IoT Stream' }
    ],
    featured: true
  },

  // 15. Dungeon Dice & Duelist (IoT & Systems)
  {
    id: 'dungeon-dice',
    title: 'Dungeon Dice & Duelist',
    subtitle: 'Procedural 2D Maze & Algorithmic Combat Engine',
    category: 'IoT & Systems',
    period: '2026',
    status: 'COMPLETED',
    badge: 'ALGORITHMIC CS GAME',
    tagline: 'Procedurally generated maze exploration and 1v1 combat powered by named CS algorithms in Python & Pygame.',
    description: 'A 2D algorithmic game combining procedural maze exploration with fast-paced stickman combat. Built from scratch in Python and Pygame with OpenCV image integration, every mechanic is powered by classic computer science algorithms (Kruskal maze generation, A* pathfinding, and physics simulation).',
    highlights: [
      'Procedural maze generation implementing randomized Kruskal / Prim graph algorithms.',
      'Dynamic enemy pathfinding and navigation mesh routing built with A* algorithm.',
      'Stickman skeletal physics and hit-box collision detection implemented with NumPy vectors.',
      'Computer vision asset processing with OpenCV (opencv-python) for custom sprite generation.'
    ],
    technologies: [
      'Python',
      'Pygame',
      'OpenCV',
      'NumPy',
      'A* Pathfinding',
      'Graph Algorithms'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/Dungeon-Dice-and-Duelist-Game',
    architectureDetails: {
      layers: [
        'Game Loop & Render Pipeline (Pygame Display Surface)',
        'Procedural Maze Generator (Graph Spanning Tree Algorithms)',
        'Autonomous Enemy AI (A* Pathfinding on 2D Grid)',
        'Physics & Collision System (NumPy Vector Calculations)'
      ],
      dataFlow: [
        'Random Seed',
        'Kruskal Maze Generation',
        'Dice Roll Event',
        'A* Enemy Chase',
        'Combat State Evaluation'
      ],
      keyInnovation: 'Seamless state-machine switching between turn-based algorithmic maze navigation and real-time stickman vector physics combat.'
    },
    metrics: [
      { label: 'Core Algorithms', value: 'Kruskal + A* Pathfinding' },
      { label: 'Engine', value: 'Pygame 2D Engine' },
      { label: 'Physics', value: 'NumPy Vector Math' }
    ],
    featured: true
  },

  // 16. Identity CLI (IoT & Systems)
  {
    id: 'identity-cli',
    title: 'Identity CLI',
    subtitle: 'Developer Security & Keyring CLI Tool',
    category: 'IoT & Systems',
    period: '2026',
    status: 'COMPLETED',
    badge: 'CLI DEVELOPER TOOL',
    tagline: 'Cross-platform command-line tool for managing developer identities, keyrings, and encrypted credentials.',
    description: 'Identity CLI is a cross-platform command-line utility built in modern Python 3.10+ using Typer and Rich. It provides developers with encrypted local keyring management, multi-profile identity switching, and secure token storage with formatted terminal output.',
    highlights: [
      'Command-line interface built with Typer featuring autocomplete, subcommands, and flag parsing.',
      'Rich terminal UI with styled tables, spinners, progress bars, and syntax highlighting.',
      'Cryptographic credential storage ensuring developer tokens and secrets remain securely encrypted.',
      'Standardized packaging and distribution using modern pyproject.toml specification.'
    ],
    technologies: [
      'Python 3.10+',
      'Typer',
      'Rich',
      'Cryptography',
      'PyProject.toml',
      'Linux / macOS / Windows'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/Identity-CLI',
    architectureDetails: {
      layers: [
        'CLI Command Dispatcher (Typer Command Group)',
        'Terminal Presentation Layer (Rich Console / Tables)',
        'Keyring & Crypto Engine (Symmetric Cipher Store)',
        'System OS Credential Bridge (Cross-Platform Store)'
      ],
      dataFlow: [
        'CLI Flag / Command',
        'Argument Validation',
        'Crypto Keyring Operation',
        'Terminal Rich Formatting'
      ],
      keyInnovation: 'Zero-dependency master secret derivation allowing encrypted local profile switching without sending plaintext keys across shell history.'
    },
    metrics: [
      { label: 'Python Version', value: 'Python 3.10+ Modern' },
      { label: 'CLI Framework', value: 'Typer + Rich UI' },
      { label: 'Packaging', value: 'PEP 621 Pyproject' }
    ],
    featured: false
  },

  // 17. SCANTRA (IoT & Systems)
  {
    id: 'scantra',
    title: 'SCANTRA',
    subtitle: 'Offline Document Scanner & Smart QR Utility',
    category: 'IoT & Systems',
    period: '2026',
    status: 'COMPLETED',
    badge: 'OFFLINE ML UTILITY',
    tagline: 'Flutter mobile app featuring offline document edge detection, OCR text extraction, and smart QR tools.',
    description: 'SCANTRA is a production-ready mobile application engineered with Flutter (Dart) and a Node.js companion backend. It features on-device document scanner edge detection, offline text extraction using Google ML Kit, PDF manipulation, and QR generation without requiring internet connectivity.',
    highlights: [
      'Offline document scanner with automatic perspective correction and edge detection.',
      'On-device Optical Character Recognition (OCR) powered by Google ML Kit.',
      'PDF toolchain allowing merging, page reordering, compression, and watermarking directly on mobile.',
      'Dynamic QR code generator and batch barcode scanner with format validation.'
    ],
    technologies: [
      'Dart',
      'Flutter',
      'Google ML Kit (Offline OCR)',
      'C++',
      'Node.js',
      'CMake',
      'Cross-Platform Mobile'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/SCANTRA',
    architectureDetails: {
      layers: [
        'Flutter Reactive View Layer (Dart UI)',
        'Hardware Camera & Edge Processing (C++ / Native Platform Channels)',
        'On-Device ML Engine (Google ML Kit Vision)',
        'PDF Generation Pipeline (Native Mobile PDF Stream)'
      ],
      dataFlow: [
        'Camera Frame',
        'Edge Contour Detection',
        'Perspective Warp',
        'Offline OCR Recognition',
        'Searchable PDF Export'
      ],
      keyInnovation: 'Completely offline on-device OCR inference and perspective transform pipeline preserving sensitive document confidentiality.'
    },
    metrics: [
      { label: 'Platform', value: 'Flutter Cross-Platform' },
      { label: 'ML Model', value: 'On-Device Google ML Kit' },
      { label: 'Connectivity', value: '100% Offline Capable' }
    ],
    featured: true
  },

  // 18. Online Recipe Book (IoT & Systems)
  {
    id: 'online-recipe-book',
    title: 'Online Recipe Book',
    subtitle: 'Object-Oriented Console Recipe Engine',
    category: 'IoT & Systems',
    period: '2024',
    status: 'COMPLETED',
    badge: 'OBJECT-ORIENTED C++',
    tagline: 'Console application in C++ demonstrating OOP principles, authentication, and persistent file I/O.',
    description: 'Engineered in modern C++, this application showcases core software engineering concepts including object-oriented encapsulation, inheritance, user authentication with credential separation, and file I/O data persistence.',
    highlights: [
      'Engineered with strict Object-Oriented Programming (OOP) principles in C++.',
      'Custom authentication sub-system with separated credential and data storage.',
      'Categorized recipe registry supporting dietary classification (Veg/Non-Veg) and course categorization.',
      'Robust file streaming I/O parsing and persisting recipe cards across application sessions.'
    ],
    technologies: [
      'C++',
      'OOP',
      'File I/O Streams',
      'Memory Management',
      'CLI'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/Online-Recipe-Book',
    architectureDetails: {
      layers: [
        'Command-Line Presentation Console',
        'Authentication Domain Controller',
        'Recipe Management Class Hierarchy',
        'File Stream Persistence Layer'
      ],
      dataFlow: [
        'User Command',
        'Authentication Check',
        'Recipe Instance Instantiation',
        'File Stream Serialization'
      ],
      keyInnovation: 'Clean class separation and deterministic file record serialization without external runtime dependencies.'
    },
    metrics: [
      { label: 'Language', value: 'C++ Modern OOP' },
      { label: 'Persistence', value: 'File Stream Serialization' },
      { label: 'Security', value: 'Separated Auth Storage' }
    ],
    featured: false
  },

  // 19. Student Management System (IoT & Systems)
  {
    id: 'student-management',
    title: 'Student Management System',
    subtitle: 'Academic Record & Administration System',
    category: 'IoT & Systems',
    period: '2024',
    status: 'COMPLETED',
    badge: 'ENTERPRISE JAVA & JDBC',
    tagline: 'Desktop enterprise application built with Java Swing and JDBC managing student records and academic administration.',
    description: 'A desktop database management application engineered with Java Swing and MySQL via JDBC, providing registrars and academic administrators with transactional tools to maintain student enrollments, grades, and records.',
    highlights: [
      'Interactive graphical user interface built with Java Swing and AWT layout managers.',
      'Robust JDBC connection pooling and parameterized SQL queries preventing SQL injection.',
      'ACID transactional record management for student enrollments, grades, and fee records.',
      'Normalized relational database schema with referential integrity constraints.'
    ],
    technologies: [
      'Java',
      'Java Swing / AWT',
      'JDBC',
      'MySQL',
      'SQL',
      'Desktop GUI'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/JAVA-STUDENT-MANAGEMENT',
    architectureDetails: {
      layers: [
        'Desktop GUI Interface (Java Swing / AWT)',
        'Business Logic Controller (Java POJOs)',
        'Data Access Objects (DAO / JDBC)',
        'Relational Database Engine (MySQL Server)'
      ],
      dataFlow: [
        'Form Input',
        'Data Validation',
        'Parameterized SQL Execution',
        'Result Set Parsing',
        'Table Model Update'
      ],
      keyInnovation: 'Structured DAO pattern implementation decoupling Swing view components from direct JDBC SQL transaction handling.'
    },
    metrics: [
      { label: 'Runtime', value: 'Java SE Desktop' },
      { label: 'Database Access', value: 'JDBC Transactional' },
      { label: 'Database', value: 'MySQL Relational' }
    ],
    featured: false
  },

  // 20. Heart Disease Detection Case Study (Data Science & Case Studies)
  {
    id: 'heart-disease-detection',
    title: 'Heart Disease Detection Case Study',
    subtitle: 'Clinical Risk Classification & Statistical Modeling in R',
    category: 'Data Science & Case Studies',
    period: '2025',
    status: 'COMPLETED',
    badge: 'CLINICAL DATA SCIENCE IN R',
    tagline: 'Modular data science pipeline in R evaluating clinical biometric markers to predict cardiovascular disease risk.',
    description: 'An end-to-end clinical machine learning and exploratory data analysis pipeline implemented in R. It processes clinical biometric parameters (resting blood pressure, cholesterol, ECG, thallium scans), performs outlier handling, and evaluates three statistical classifiers (Logistic Regression, Decision Trees, KNN).',
    highlights: [
      'Rigorous exploratory data analysis (EDA) and biometric correlation matrices in R.',
      'Data cleaning, standardization, IQR outlier imputation, and train/test cross-validation.',
      'Comparative evaluation of three supervised models: Logistic Regression, Decision Trees, and K-Nearest Neighbors (KNN).',
      'Interactive risk prediction script simulating real-time patient diagnosis with odds ratio interpretation.'
    ],
    technologies: [
      'R',
      'Statistical Learning',
      'Logistic Regression',
      'Decision Trees',
      'K-Nearest Neighbors',
      'EDA & Data Cleansing',
      'Biostatistics'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/HEART-DISEASE-DETECTION-CASE-STUDY',
    architectureDetails: {
      layers: [
        'Data Ingestion (Clinical CSV Patient Records)',
        'Preprocessing & Outlier Pipeline (Standardization / Imputation in R)',
        'Model Comparison Suite (Logistic Regression / Decision Trees / KNN)',
        'Real-Time Patient Diagnostic Scoring Script'
      ],
      dataFlow: [
        'Clinical Raw Data',
        'Z-Score Normalization',
        'Feature Selection',
        'Multi-Model Cross Validation',
        'Risk Likelihood Score'
      ],
      keyInnovation: 'Statistically grounded model benchmarking demonstrating the trade-offs between linear interpretability (Logistic Regression) and non-linear boundaries (KNN).'
    },
    metrics: [
      { label: 'Language', value: 'R Statistical Core' },
      { label: 'Models Evaluated', value: 'Logistic Reg, Trees, KNN' },
      { label: 'Domain', value: 'Clinical Biostatistics' }
    ],
    featured: true
  },

  // 21. Loan Prediction Case Study (Data Science & Case Studies)
  {
    id: 'loan-prediction',
    title: 'Loan Prediction Case Study',
    subtitle: 'Data Mining & Supervised ML Risk Analysis (CE634)',
    category: 'Data Science & Case Studies',
    period: '2025',
    status: 'COMPLETED',
    badge: 'SUPERVISED MACHINE LEARNING',
    tagline: 'Data mining case study evaluating credit risk, applicant financials, and loan default probabilities.',
    description: 'Completed as part of the CE634 Data Mining & Data Warehousing curriculum, this project implements a complete data preparation and supervised machine learning workflow in Python and Jupyter Notebook to evaluate credit risk and forecast loan approvals.',
    highlights: [
      'Exploratory data analysis uncovering credit history influence and income co-dependencies.',
      'Missing data imputation, label encoding, and feature scaling using Scikit-Learn pipelines.',
      'Trained and validated multiple machine learning classifiers with precision/recall trade-off analysis.',
      'Comprehensive case study report and automated notebook execution script.'
    ],
    technologies: [
      'Python',
      'Scikit-Learn',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Jupyter Notebook'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/LOAN-PREDICTION-CASE-STUDY',
    architectureDetails: {
      layers: [
        'Data Mining Ingest (Financial Applicant Records)',
        'Preprocessing Pipeline (Pandas / Scikit-Learn Imputation)',
        'Classification Models (Logistic Regression / Random Forest)',
        'Evaluation Metrics (Confusion Matrix / ROC-AUC)'
      ],
      dataFlow: [
        'Applicant Data',
        'Feature Engineering',
        'Pipeline Scaling',
        'Model Training',
        'Credit Risk Classification'
      ],
      keyInnovation: 'Systematic feature importance extraction highlighting credit history as the primary deterministic feature in underwriting decisions.'
    },
    metrics: [
      { label: 'Course', value: 'CE634 Data Mining' },
      { label: 'Framework', value: 'Scikit-Learn + Pandas' },
      { label: 'Deliverable', value: 'Jupyter Pipeline + Report' }
    ],
    featured: false
  }
];
