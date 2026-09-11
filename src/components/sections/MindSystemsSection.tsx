import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Zap,
  Cpu,
  Layers,
  Activity,
  Database,
  Terminal,
  ArrowRight,
  Sparkles,
  MousePointerClick,
  Bot
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { NeuralBrainScene } from '../3d/NeuralBrainScene';
import { ShimmerButton } from '../ui/ShimmerButton';

interface SystemPillar {
  id: string;
  title: string;
  badge: string;
  tech: string;
  desc: string;
  details: string[];
  connectedProject: string;
  icon: React.ElementType;
  accent: string;
  badgeBg: string;
  badgeText: string;
}

const SYSTEM_PILLARS: SystemPillar[] = [
  {
    id: 'software',
    title: 'Software Architecture',
    badge: 'LAYER 01',
    tech: 'FastAPI • React • TypeScript • Node.js',
    desc: 'Decoupled backend microservices, strongly-typed state trees, and high-throughput architectures designed for reliability and clean domain boundaries.',
    details: [
      'Clean domain-driven separation of concerns',
      'High-performance asynchronous APIs with FastAPI and Node.js',
      'Type-safe frontend architectures with React & TypeScript',
    ],
    connectedProject: 'Bodhami & Full-Stack Apps',
    icon: Layers,
    accent: 'blue',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence & Vision',
    badge: 'LAYER 02',
    tech: 'PyTorch • ResNet18 • OpenCV • Fast Whisper',
    desc: 'Spatial domain feature extraction paired with Fast Fourier Transform frequency analysis for multimodal synthetic media anomaly detection.',
    details: [
      'Dual-domain analysis (spatial boundaries + Fourier spectra)',
      'Convolutional backbones fine-tuned for deepfake forensics',
      'High-throughput video and frame artifact extraction',
    ],
    connectedProject: 'VeritaScan AI Forensics',
    icon: Brain,
    accent: 'purple',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
  },
  {
    id: 'agents',
    title: 'AI Agents & LLM Pipelines',
    badge: 'LAYER 03',
    tech: 'LangGraph • LangChain • Gemini • OpenAI • Qdrant',
    desc: 'Stateful multi-agent workflows, cyclic tool-use graphs, and retrieval-augmented generation grounded in vector databases.',
    details: [
      'Multi-agent task decomposition and prompt chaining',
      'Semantic embeddings and high-dimensional vector search',
      'Structured tool calling with strict schema validation',
    ],
    connectedProject: 'AI Goal Journal & Nexus-AI',
    icon: Bot,
    accent: 'emerald',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
  },
  {
    id: 'data',
    title: 'Data Pipelines & Telemetry',
    badge: 'LAYER 04',
    tech: 'MongoDB • PostgreSQL • Real-Time Probes • Chart.js',
    desc: 'Deterministic ingestion pipelines, multi-sensor calibration, and threshold-based anomaly detection for physical and web telemetry.',
    details: [
      'Continuous multi-sensor ingestion (pH, turbidity, TDS)',
      'Dynamic threshold calculation for anomaly forecasting',
      'Time-series storage and real-time visualization streams',
    ],
    connectedProject: 'Smart Water IoT Platform',
    icon: Database,
    accent: 'cyan',
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-800',
  },
  {
    id: 'systems',
    title: 'Algorithmic Optimization',
    badge: 'LAYER 05',
    tech: 'C++ • Java • Data Structures • Memory Management',
    desc: 'Deep computer science fundamentals applied to runtime efficiency, polymorphic object models, and persistent serialization.',
    details: [
      'Runtime polymorphism and class inheritance hierarchies',
      'Persistent binary and stream serialization (fstream, JDBC)',
      'Strict asymptotic time and space complexity optimization',
    ],
    connectedProject: 'C++ & Java Core Codebases',
    icon: Terminal,
    accent: 'amber',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
  },
];

export const MindSystemsSection: React.FC = () => {
  const [pulseCount, setPulseCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const triggerShockwave = () => {
    setPulseCount((c) => c + 1);
  };

  const currentPillar = SYSTEM_PILLARS[activeTab];
  const CurrentIcon = currentPillar.icon;

  return (
    <section id="mind" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        number="03"
        tag="MIND / SYSTEMS ARCHITECTURE"
        title="How I Think About Intelligent Systems"
        description="True engineering depth is built at the intersection of modern software architectures, applied artificial intelligence, agentic LLM workflows, and algorithmic optimization."
        alignment="center"
      />

      {/* 5 Conceptual Layer Tabs */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#091024]/90 backdrop-blur-xl rounded-2xl border border-white/15 max-w-4xl mx-auto shadow-2xl">
        {SYSTEM_PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={pillar.id}
              onClick={() => {
                setActiveTab(idx);
                triggerShockwave();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-[#0B132B] font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0B132B]' : 'text-[#00D2FF]'}`} />
              <span>{pillar.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-10">
        {/* Left Column (5 Cols): Selected Pillar Deep Dive */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillar.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-[#0E1738]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-7 shadow-2xl h-full flex flex-col justify-between text-white"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold ${currentPillar.badgeBg} ${currentPillar.badgeText}`}>
                    {currentPillar.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    System Dimension {activeTab + 1} of 5
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00D2FF]/15 border border-[#00D2FF]/30 flex items-center justify-center text-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.25)]">
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {currentPillar.title}
                    </h3>
                    <div className="font-mono text-xs text-[#00D2FF] font-medium">
                      {currentPillar.tech}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 font-sans leading-relaxed mt-4">
                  {currentPillar.desc}
                </p>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                    Architectural Tenets
                  </h4>
                  <ul className="space-y-2.5">
                    {currentPillar.details.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Primary Manifestation</div>
                  <div className="text-xs font-semibold text-white">{currentPillar.connectedProject}</div>
                </div>
                <button
                  onClick={() => {
                    const next = (activeTab + 1) % SYSTEM_PILLARS.length;
                    setActiveTab(next);
                    triggerShockwave();
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#00D2FF] font-medium hover:text-[#33DCFF] transition-colors"
                >
                  <span>Next Dimension</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center / Right Column (7 Cols): Framed 3D Neural & Systems Canvas */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-[#0E1738]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center flex-1">
            {/* Top Toolbar / Model Status */}
            <div className="w-full flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
                <span className="font-mono text-[11px] text-slate-300 font-medium">
                  NEURAL & EMBEDDED DUAL-CORE
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                <MousePointerClick className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>Drag to rotate • Click nodes to pulse</span>
              </div>
            </div>

            {/* 3D Three.js Visualizer Canvas */}
            <div className="relative w-full aspect-square max-w-[480px] flex items-center justify-center">
              <NeuralBrainScene
                className="w-full h-full"
                intensity={1.1}
                interactive={true}
              />
            </div>

            {/* Bottom Controls & Hemisphere Key */}
            <div className="w-full mt-3 pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 px-3">
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-purple-700">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span>High-Level AI / Vision</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Telemetry & Cloud Edge</span>
                </div>
              </div>

              <ShimmerButton
                onClick={triggerShockwave}
                variant="outline"
                size="sm"
                icon={<Zap className="w-3.5 h-3.5 text-blue-600" />}
                cursorLabel="PULSE"
              >
                Excite Synaptic Bus ({pulseCount})
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

