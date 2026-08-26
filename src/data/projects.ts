export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI / ML' | 'Edge & IoT' | 'Full Stack' | 'Systems & C++';
  period: string;
  status: 'COMPLETED' | 'CURRENTLY BUILDING' | 'FINALIST';
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
  {
    id: 'veritascan',
    title: 'VeritaScan',
    subtitle: 'Forensic AI Deepfake Detection Platform',
    category: 'AI / ML',
    period: '2025 – 2026',
    status: 'COMPLETED',
    badge: 'HERO AI SHOWCASE',
    tagline: 'Multi-layer deep learning platform detecting synthetic media manipulation via spatial-frequency neural analysis.',
    description: 'VeritaScan is an end-to-end forensic analysis platform designed to combat hyper-realistic synthetic media and video deepfakes. It combines spatial artifact inspection using modified convolutional backbones with frequency-domain Fourier transform analysis, producing calibrated authenticity confidence scores and downloadable forensic inspection certificates.',
    highlights: [
      'Multi-stage neural pipeline: Spatial feature extraction with ResNet-18 combined with frequency domain spectral analysis.',
      'High-throughput asynchronous backend built with FastAPI and Uvicorn for sub-second frame artifact inference.',
      'Interactive 3D confidence geometry and real-time biometric artifact heatmap powered by Three.js & Framer Motion.',
      'Automated cryptographic forensic certificate generation via fpdf2 with digital tamper-evident signatures.',
      'Secure multi-tier user identity and scan history management powered by Firebase Authentication.'
    ],
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'FastAPI',
      'Python',
      'Uvicorn',
      'Hugging Face Transformers',
      'ResNet18',
      'Three.js',
      'Framer Motion',
      'Firebase Auth',
      'fpdf2'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005',
    architectureDetails: {
      layers: [
        'Client Media Intake (React + Three.js visualizer)',
        'Asynchronous Ingestion API (FastAPI / Uvicorn worker pool)',
        'Facial Landmark & Frame Extraction (OpenCV / MediaPipe)',
        'Dual-Branch Neural Engine (ResNet18 Spatial + FFT Frequency Spectrum)',
        'Forensic Report Compiler (fpdf2 vector report engine)'
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
      { label: 'Report Format', value: 'Vector Forensic PDF' }
    ],
    featured: true
  },
  {
    id: 'automotive-blackbox',
    title: 'Automotive Black Box',
    subtitle: 'Accident Detection & Prediction via Edge ML',
    category: 'Edge & IoT',
    period: '2025 – 2026',
    status: 'CURRENTLY BUILDING',
    badge: 'BITS PILANI GOA COLLABORATION',
    tagline: 'User-owned, privacy-first vehicular telemetry system with high-speed CAN bus acquisition and embedded ML crash prediction.',
    description: 'Developed in association with BITS Pilani Goa, this edge-computing automotive telemetry platform acquires raw vehicle diagnostic signals directly from the OBD-II interface via CAN bus (MCP2515 transceiver) into an ESP32 microcontroller. The system synchronizes 6-axis IMU inertial data and high-frequency GPS logs for real-time impact detection and pre-crash time-series feature extraction.',
    highlights: [
      'Engineered bare-metal ESP32 firmware in C/C++ handling concurrent SPI (CAN controller), I²C (6-axis IMU), and UART (GPS) interfaces.',
      'Real-time OBD-II parameter acquisition over CAN bus 2.0B at 500 kbps (RPM, speed, throttle position, engine load).',
      'High-G crash pulse detection with time-synchronized pre-crash, crash, and post-crash black-box data ring buffer.',
      'Edge-based accident risk prediction utilizing lightweight time-series feature extraction and sensor fusion algorithms.',
      'Strictly user-owned, privacy-first onboard memory storage architecture without continuous third-party tracking.'
    ],
    technologies: [
      'ESP32',
      'C/C++',
      'CAN bus (MCP2515)',
      'OBD-II',
      'IMU (Accelerometer/Gyro)',
      'GPS Module',
      'UART / SPI / I²C',
      'Edge ML',
      'Sensor Fusion',
      'Raspberry Pi'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005',
    architectureDetails: {
      layers: [
        'Vehicle Diagnostic Port (OBD-II Connector)',
        'Physical Bus Interface (MCP2515 CAN Transceiver + SPI bus)',
        'Sensor Ingestion Hub (ESP32 Multi-Threaded FreeRTOS Firmware)',
        'Inertial & Kinematic Fusion (MPU-6050 6-DOF IMU + NEO-6M GPS)',
        'On-Device Ring Buffer & TinyML Inference Engine'
      ],
      dataFlow: [
        'CAN / OBD-II Stream',
        'SPI Packet Parse',
        'IMU Kinematic Fusion',
        'Edge ML Inference',
        'Accident Risk Score'
      ],
      keyInnovation: 'Deterministic microsecond timestamp synchronization between CAN bus engine metrics and external 6-axis inertial kinematics.'
    },
    metrics: [
      { label: 'Bus Speed', value: '500 kbps CAN 2.0B' },
      { label: 'Ring Buffer', value: 'Pre/During/Post Crash' },
      { label: 'Architecture', value: '100% User-Owned Edge' }
    ],
    featured: true
  },
  {
    id: 'smart-water-monitoring',
    title: 'Smart Water Monitoring',
    subtitle: 'IoT-Based Rural Water Quality & ML Predictive Alerts',
    category: 'Edge & IoT',
    period: '2025 – 2026',
    status: 'FINALIST',
    badge: 'IDEAS 4.0 FINALIST AWARD',
    tagline: 'Real-time telemetry and predictive contamination forecasting for rural freshwater sources.',
    description: 'Selected as a Finalist in the prestigious IDEAS 4.0 engineering competition at Padre Conceicao College of Engineering. The system connects multi-parameter analog/digital water quality probes (pH, Turbidity, and Total Dissolved Solids) to a centralized Node.js/MongoDB analytics dashboard featuring interactive telemetry and machine learning models exploring contamination likelihood based on seasonal rainfall patterns.',
    highlights: [
      'Deployed multi-sensor hardware array tracking pH, Turbidity (NTU), and Total Dissolved Solids (TDS) in real-time.',
      'Engineered a centralized web dashboard with Chart.js live telemetry visualization and safe/unsafe water thresholds.',
      'Explored predictive machine learning classifiers to forecast potential contamination spikes correlated with rainfall runoff.',
      'Engineered for extreme affordability and scalability to serve rural community drinking water reservoirs.',
      'Recognized with Final Round distinction at the college-wide IDEAS 4.0 innovation showcase.'
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Node.js',
      'MongoDB',
      'Chart.js',
      'IoT Sensor Architecture',
      'Analog-to-Digital Conversion',
      'Predictive ML'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005',
    architectureDetails: {
      layers: [
        'Water Probe Array (pH Electrode, Optical Turbidity, TDS Probes)',
        'Signal Conditioning & Microcontroller Ingestion',
        'Telemetry Gateway API (Node.js / Express)',
        'Time-Series Database (MongoDB)',
        'Real-time Supervisory UI (Chart.js & Dynamic Alert Indicators)'
      ],
      dataFlow: [
        'Sensor Probes',
        'Signal Conditioning',
        'Central API',
        'Time-Series DB',
        'Live Telemetry UI'
      ],
      keyInnovation: 'Combining low-cost physical sensor calibration with environmental trend prediction for early contamination warnings.'
    },
    metrics: [
      { label: 'Monitored Sensors', value: 'pH, Turbidity, TDS' },
      { label: 'Award', value: 'IDEAS 4.0 Final Round' },
      { label: 'Telemetry', value: 'Sub-minute Sync' }
    ],
    featured: true
  },
  {
    id: 'travellog',
    title: 'TravelLog',
    subtitle: 'Full Stack Travel Journal & Real-Time Traveler Community',
    category: 'Full Stack',
    period: '2025',
    status: 'COMPLETED',
    tagline: 'Social storytelling and exploration platform with live traveler chat rooms and interactive log mapping.',
    description: 'A full-stack travel journaling platform enabling adventurers to document journeys with rich multimedia, geotagged map coordinates, travel recommendations, and ratings. Built with a high-performance MongoDB schema and integrated Socket.IO engine powering concurrent live chat rooms for travelers on identical itineraries.',
    highlights: [
      'Engineered robust authentication and authorization flows utilizing Supabase Auth for session tokens and permission tiers.',
      'Designed scalable MongoDB document models supporting nested media arrays, coordinate metadata, and traveler reviews.',
      'Built real-time multi-room community chat with Socket.IO enabling instant peer-to-peer travel advice and discussions.',
      'Designed responsive dashboard with travel insight statistics, interactive trip timelines, and traveler engagement metrics.'
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Node.js',
      'MongoDB',
      'Socket.IO',
      'Supabase Auth',
      'Responsive Web Design'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005',
    featured: true
  },
  {
    id: 'tunevault',
    title: 'TuneVault',
    subtitle: 'Full Stack Song Registration & Trademark Platform',
    category: 'Full Stack',
    period: '2025',
    status: 'COMPLETED',
    tagline: 'Digital trademark-style ownership registry for music creators, albums, and copyright metadata.',
    description: 'TuneVault delivers a clean, secure digital portal for musicians and audio producers to register song metadata, track musical assets, and enforce ownership integrity through structured role-based access control and relational database transactions.',
    highlights: [
      'Architected digital trademark-style registration pipeline for artist profiles, master tracks, and cataloged albums.',
      'Implemented strict ownership-based permissions ensuring only authorized creators can mutate or delete musical assets.',
      'Integrated normalized MySQL schema on Supabase backend with high-integrity foreign keys and indexing.',
      'Delivered clean, modular backend routing with Node.js and RESTful CRUD endpoints.'
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Node.js',
      'MySQL',
      'Supabase Auth & Database',
      'RBAC Architecture'
    ],
    githubUrl: 'https://github.com/swayamprabhu2005/SONG-REGISTRATION',
    featured: true
  },
  {
    id: 'urban-gardening',
    title: 'Urban Gardening',
    subtitle: 'Sustainable Living & Botanical Intelligence Platform',
    category: 'Full Stack',
    period: '2025',
    status: 'COMPLETED',
    tagline: 'Interactive web platform providing home gardening guidance, plant care scheduling, and botanical storage.',
    description: 'A full-stack sustainability application developed to educate and guide urban households in practicing organic gardening. Features comprehensive botanical database records, watering and light care recommendations, and Supabase user profiles with MySQL persistence.',
    highlights: [
      'Created structured botanical knowledge base mapping care schedules to species requirements.',
      'Integrated Supabase authentication with Node.js and MySQL backend services.',
      'Designed responsive UI providing customized plant care alerts and seasonal cultivation tips.'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'MySQL', 'Supabase'],
    githubUrl: 'https://github.com/swayamprabhu2005/URBAN-GARDENING',
    featured: false
  },
  {
    id: 'recipe-book',
    title: 'Online Recipe Book',
    subtitle: 'Object-Oriented Console Recipe Management System in C++',
    category: 'Systems & C++',
    period: '2024',
    status: 'COMPLETED',
    tagline: 'Demonstrating core C++ OOP principles, runtime polymorphism, and persistent stream file handling.',
    description: 'Console-based software system demonstrating deep computer science fundamentals including class inheritance, runtime polymorphism, credential authentication, and persistent file stream (fstream) serialization for recipe taxonomy.',
    highlights: [
      'Structured modular OOP architecture leveraging abstract base classes and polymorphic categorization.',
      'Implemented custom fstream file parser for secure user authentication and persistent culinary database storage.',
      'Built efficient, menu-driven CLI interface with validated input sanitization.'
    ],
    technologies: ['C++', 'Object-Oriented Programming', 'Polymorphism', 'File Handling (fstream)', 'CLI Architecture'],
    githubUrl: 'https://github.com/swayamprabhu2005/Online-Recipe-Book',
    featured: false
  },
  {
    id: 'student-management',
    title: 'Student Management System',
    subtitle: 'Enterprise Java Application with JDBC & MySQL Persistence',
    category: 'Systems & C++',
    period: '2025',
    status: 'COMPLETED',
    tagline: 'Java package-based architecture implementing full CRUD operations over JDBC relational database storage.',
    description: 'Developed an object-oriented Java application structured into distinct domain packages and classes, interfacing directly with a MySQL relational database via JDBC for student records, enrollment tracking, and parameterized SQL search queries.',
    highlights: [
      'Structured clean multi-tier Java architecture separating presentation logic, domain models, and DAO database layers.',
      'Implemented robust CRUD queries and prepared statements preventing SQL injection.',
      'Integrated indexing and filtered queries for instant student record retrieval.'
    ],
    technologies: ['Java', 'JDBC', 'MySQL', 'Object-Oriented Design', 'SQL Optimization'],
    githubUrl: 'https://github.com/swayamprabhu2005/JAVA-STUDENT-MANAGEMENT',
    featured: false
  }
];
