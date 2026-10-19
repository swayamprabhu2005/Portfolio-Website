import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Layers,
  Database,
  Terminal,
  ArrowRight,
  Bot
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { NeuralBrainScene } from '../3d/NeuralBrainScene';

interface SystemPillar {
  id: string;
  title: string;
  tabLabel: string;
  badge: string;
  tech: string;
  desc: string;
  details: string[];
  connectedProject: string;
  icon: React.ElementType;
  accentColor: string;
  image: string;
}

const SYSTEM_PILLARS: SystemPillar[] = [
  {
    id: 'software',
    title: 'Software Architecture',
    tabLabel: 'Software Architecture',
    badge: 'SOFTWARE ARCHITECTURE',
    tech: 'FastAPI • Express • React • TypeScript • Docker • MySQL',
    desc: 'Across my web and backend systems, software architecture is engineered through decoupled, multi-tier boundaries. Presentation layers communicate via type-safe contracts, business logic is isolated in stateless service layers, and data access is guarded by ACID-compliant relational schemas and containerized deployments.',
    details: [
      'Presentation Layer: Strongly-typed React & Vite interfaces or modular server-rendered EJS templates ensuring clean component separation.',
      'API Gateway & Controllers: Asynchronous controllers (FastAPI / Express) enforcing strict schema validation (Pydantic / DTOs) and authenticated routing.',
      'Domain Service Core: Decoupled business logic keeping core application rules independent of transport protocols and database drivers.',
      'Persistence & Storage: Normalized relational schemas (MySQL / PostgreSQL / Supabase) with ACID transactions, paired with MongoDB GridFS for binary media.',
      'Containerized DevOps: Dockerized microservice runtimes ensuring consistent, reproducible environments from local testing to production.'
    ],
    connectedProject: 'TuneVault, Urban Gardening & Bodhami',
    icon: Layers,
    accentColor: '#00D2FF',
    image: 'architecture/arch-software.webp',
  },
  {
    id: 'ai',
    title: 'AI and Vision',
    tabLabel: 'AI and Vision',
    badge: 'AI AND VISION',
    tech: 'PyTorch • OpenCV • ResNet-18 • FFT Fourier • Fast Whisper',
    desc: 'My artificial intelligence and computer vision implementations follow a disciplined multi-stage signal and deep learning pipeline. Rather than treating neural networks as black boxes, models extract both spatial pixel artifacts and mathematical frequency-domain anomalies to produce calibrated decisions.',
    details: [
      'Frame Ingestion & Preprocessing: OpenCV stream capture with ROI extraction, facial/gaze landmark alignment, and geometric normalization.',
      'Spatial Feature Extraction: Convolutional neural backbones (PyTorch / ResNet-18) isolating subtle blending anomalies and pixel boundary artifacts.',
      'Frequency Spectral Decomposition: Fast Fourier Transform (FFT) analysis uncovering high-frequency generative artifacts invisible in standard RGB space.',
      'Acoustic Forensics: Fast Whisper and Librosa spectrogram transformation detecting synthetic speech pitch and vocal tract anomalies.',
      'Calibrated Multi-Modal Fusion: Statistical score aggregation compiling spatial, spectral, and audio indicators into verifiable inspection reports.'
    ],
    connectedProject: 'VeritaScan AI Forensics & EduLens AI',
    icon: Brain,
    accentColor: '#A855F7',
    image: 'architecture/arch-ai-vision.webp',
  },
  {
    id: 'agents',
    title: 'Agentic LLMs',
    tabLabel: 'Agentic LLMs',
    badge: 'AGENTIC LLMS',
    tech: 'LangGraph • LangChain • Gemini 2.5 • OpenAI • Qdrant',
    desc: 'Beyond simple chatbots, my generative AI implementations utilize autonomous agentic architectures. Multi-agent state machines decompose complex user objectives into deterministic steps, query vector memory for context, and execute typed tools with recursive self-correction.',
    details: [
      'Deterministic Prompt Gateway: Structured prompt engineering with strict Pydantic schemas to eliminate hallucinations and constrain output types.',
      'Cyclic Task Execution: Stateful multi-agent planning graphs built with LangGraph for goal breakdown, tool dispatch, and iterative refinement.',
      'Vector Memory & RAG: High-dimensional semantic embeddings stored in Qdrant vector databases for sub-millisecond context retrieval.',
      'Typed Function Calling: Autonomous tool invocation enabling agents to mutate databases, fetch external APIs, and compute numerical operations.',
      'Reflective Self-Evaluation: Critique loops comparing intermediate reasoning results against task rubrics before yielding final answers.'
    ],
    connectedProject: 'Aether Framework & Cadence',
    icon: Bot,
    accentColor: '#00D2FF',
    image: 'architecture/arch-agentic-brain.webp',
  },
  {
    id: 'data',
    title: 'Data and Telemetry',
    tabLabel: 'Data and Telemetry',
    badge: 'DATA AND TELEMETRY',
    tech: 'MongoDB • PostgreSQL • ESP32 • Arduino • WebSockets',
    desc: 'Real-world engineering requires processing high-velocity, real-time data streams. From physical IoT probes to distributed application telemetry, data is conditioned, stored with time-series indexing, and analyzed against statistical thresholds for real-time anomaly detection.',
    details: [
      'Hardware & Probe Telemetry: Analog sensor ingestion via ESP32/Arduino microcontrollers sampling physical metrics (pH, turbidity, TDS).',
      'Signal Conditioning & Filtering: Polynomial calibration curves, moving-window rolling averages, and noise rejection algorithms.',
      'Time-Series Data Storage: Structured persistence in MongoDB and PostgreSQL with compound indexes for rapid historical querying.',
      'Dynamic Anomaly Detection: Continuous evaluation of live sensor readings against baseline rolling averages to trigger automated alerts.',
      'Live Telemetry Streaming: WebSocket channels pushing reactive telemetry updates to interactive dashboards for real-time monitoring.'
    ],
    connectedProject: 'Smart Water Quality IoT & BreathMetrics',
    icon: Database,
    accentColor: '#10B981',
    image: 'architecture/arch-data-telemetry.webp',
  },
  {
    id: 'systems',
    title: 'Algorithms and Systems',
    tabLabel: 'Algorithms and Systems',
    badge: 'ALGORITHMS AND SYSTEMS',
    tech: 'C++ • Java • Data Structures • OOP • Persistent I/O',
    desc: 'Foundational software engineering is grounded in algorithmic efficiency and robust systems design. Core logic is constructed around predictable time complexities, polymorphic class hierarchies, and low-level stream serialization that runs independently of heavy frameworks.',
    details: [
      'Asymptotic Complexity Budgets: Designing core algorithms around strict O(1) hash lookups and O(n log n) sorting to prevent performance regressions.',
      'Polymorphic Class Hierarchies: Clean object-oriented architectures leveraging inheritance, abstract interfaces, and strict encapsulation in C++ and Java.',
      'Persistent Binary & Stream I/O: Direct filesystem serialization (fstream, JDBC) ensuring offline data durability without external dependencies.',
      'Graph & Procedural Heuristics: Implementing graph algorithms (A* pathfinding, Kruskal/Prim maze generation) for deterministic simulations.',
      'Deterministic Resource Lifecycles: Direct memory management, resource cleanup, and allocation reduction for maximum computational efficiency.'
    ],
    connectedProject: 'C++ Recipe Engine, Java SMS & Dungeon Dice',
    icon: Terminal,
    accentColor: '#F59E0B',
    image: 'architecture/arch-algorithms-systems.webp',
  },
];

export const MindSystemsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const currentPillar = SYSTEM_PILLARS[activeTab];
  const CurrentIcon = currentPillar.icon;

  return (
    <section id="mind" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        number="03"
        tag="MIND / SYSTEMS ARCHITECTURE"
        title="How I Think About Intelligent Systems"
        alignment="center"
        className="mb-8"
      />

      {/* 5 Conceptual Layer Tabs - Horizontal Scroll on Mobile starting at 0, Centered on Desktop */}
      <div className="mt-4 flex items-center justify-start md:justify-center p-1.5 bg-[#091024]/90 backdrop-blur-xl rounded-2xl border border-white/15 max-w-5xl mx-auto shadow-2xl overflow-x-auto scrollbar-none px-2 sm:px-3">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap shrink-0">
          {SYSTEM_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-[#0B132B] font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#0B132B]' : 'text-[#00D2FF]'}`} />
                <span className="whitespace-nowrap">{pillar.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Unified Architecture Card with Translucent Holographic Floating Graphic */}
      <div className="mt-10 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="relative bg-[#0E1738]/85 backdrop-blur-2xl rounded-3xl border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden text-white group"
          >
            {/* Atmospheric Translucent Holographic Visual (Centered Behind Content, Scaled 2x, Zero Black Box) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] md:w-[680px] lg:w-[820px] aspect-square pointer-events-none opacity-15 sm:opacity-20 lg:opacity-25 mix-blend-screen transition-all duration-700 overflow-hidden flex items-center justify-center">
              <NeuralBrainScene
                className="w-full h-full"
                imageSrc={currentPillar.image}
                altText={currentPillar.title}
                accentColor={currentPillar.accentColor}
                interactive={true}
              />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 space-y-6">
              {/* Top Badges & System Dimension */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30 shadow-[0_0_12px_rgba(0,210,255,0.2)]">
                  {currentPillar.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  System Dimension {activeTab + 1} of 5
                </span>
              </div>

              {/* Title & Tech Stack */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#00D2FF]/15 border border-[#00D2FF]/30 flex items-center justify-center text-[#00D2FF] shadow-[0_0_18px_rgba(0,210,255,0.25)] shrink-0">
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    {currentPillar.title}
                  </h3>
                  <div className="font-mono text-xs sm:text-sm text-[#00D2FF] font-medium mt-0.5">
                    {currentPillar.tech}
                  </div>
                </div>
              </div>

              {/* Narrative Description */}
              <p className="text-slate-200 text-sm sm:text-base font-sans leading-relaxed max-w-4xl">
                {currentPillar.desc}
              </p>

              {/* Engineering Execution Flow (2 Columns on Desktop for Balanced Height) */}
              <div className="pt-6 border-t border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#00D2FF] font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
                  Engineering Execution Flow
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
                  {currentPillar.details.map((item, i) => {
                    const colonIndex = item.indexOf(': ');
                    const hasPrefix = colonIndex !== -1;
                    const label = hasPrefix ? item.slice(0, colonIndex) : '';
                    const description = hasPrefix ? item.slice(colonIndex + 2) : item;

                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-[#091024]/60 border border-white/5 backdrop-blur-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] mt-1.5 flex-shrink-0 shadow-[0_0_8px_#00D2FF]" />
                        <div className="text-xs sm:text-sm leading-relaxed">
                          {hasPrefix ? (
                            <>
                              <span className="font-semibold text-white font-mono text-[11px] sm:text-xs">
                                {label}:{' '}
                              </span>
                              <span className="text-slate-300">{description}</span>
                            </>
                          ) : (
                            <span className="text-slate-300">{item}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer: Primary Manifestation & Next Dimension */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Primary Manifestation</div>
                  <div className="text-sm font-semibold text-white mt-0.5">{currentPillar.connectedProject}</div>
                </div>
                <button
                  onClick={() => {
                    const next = (activeTab + 1) % SYSTEM_PILLARS.length;
                    setActiveTab(next);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-mono text-[#00D2FF] font-medium hover:text-[#33DCFF] transition-all cursor-pointer shadow-sm"
                >
                  <span>Next Dimension</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
