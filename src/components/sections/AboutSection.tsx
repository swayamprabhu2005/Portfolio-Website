import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Globe,
  Brain,
  Wifi,
  Cpu,
  Zap,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerCard } from '../ui/ShimmerCard';

export const AboutSection: React.FC = () => {
  const evolutionStages = [
    {
      step: '01',
      title: 'Software Foundations',
      subtitle: 'C, C++, Java & Algorithmic Rigor',
      icon: Code2,
      color: 'from-cyan-500 to-blue-600',
      tag: 'CORE FOUNDATION',
      description:
        'Mastering memory structures, pointers, object-oriented encapsulation, and algorithmic time-space complexity.',
    },
    {
      step: '02',
      title: 'Full-Stack Systems',
      subtitle: 'React, Node.js, WebSockets & Databases',
      icon: Globe,
      color: 'from-blue-500 to-indigo-600',
      tag: 'WEB & ARCHITECTURE',
      description:
        'Engineering resilient multi-tier web platforms (TravelLog, TuneVault) with relational and document databases.',
    },
    {
      step: '03',
      title: 'Artificial Intelligence & CV',
      subtitle: 'ResNet18, Transformers & Forensic Vision',
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      tag: 'INTELLIGENT MODELS',
      description:
        'Building VeritaScan to detect synthetic deepfakes across spatial Fourier frequency domains.',
    },
    {
      step: '04',
      title: 'IoT & Telemetry',
      subtitle: 'Probes, Microcontrollers & IDEAS 4.0',
      icon: Wifi,
      color: 'from-pink-500 to-rose-600',
      tag: 'HARDWARE SENSING',
      description:
        'Connecting multi-parameter water probes (pH, Turbidity, TDS) to centralized cloud dashboards for real-time safety.',
    },
    {
      step: '05',
      title: 'Embedded & CAN Bus',
      subtitle: 'ESP32 Bare-Metal, SPI, I²C & OBD-II',
      icon: Cpu,
      color: 'from-rose-500 to-amber-600',
      tag: 'VEHICULAR SYSTEMS',
      description:
        'Interfacing MCP2515 CAN transceivers and 6-DOF IMUs directly to ESP32 firmware for automotive black box acquisition.',
    },
    {
      step: '06',
      title: 'Edge Intelligence',
      subtitle: 'Sensor Fusion & On-Device ML',
      icon: Zap,
      color: 'from-amber-500 to-emerald-500',
      tag: 'FRONTIER HORIZON',
      description:
        'Executing lightweight predictive accident models directly at the physical edge with privacy-first architecture.',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="01"
        tag="ENGINEERING NARRATIVE"
        title="From Software Foundations to Edge Intelligence"
        description="I am a Computer Engineering student at Padre Conceicao College of Engineering who learns by building end-to-end systems. My journey bridges high-level web and AI architectures with low-level bare-metal hardware."
      />

      {/* Main Grid: Narrative Statement + Animated Progression Pathway */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Core Philosophy Card */}
        <div className="lg:col-span-5 space-y-6">
          <ShimmerCard glowColor="purple" className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4 text-purple-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                BUILDER MANIFESTO
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-4 leading-snug">
              &ldquo;This developer doesn&apos;t just build applications — he experiments with technology.&rdquo;
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              I believe true engineering depth comes from understanding the full stack — from the mathematical algorithms and neural architectures at the top, down to the bus protocols, registers, and physical sensors at the foundation.
            </p>

            <div className="pt-4 border-t border-white/10 space-y-2.5 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Hands-on implementation over passive theory</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Rigorous Computer Science & OOP Fundamentals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>9.23 CGPA Academic Distinction</span>
              </div>
            </div>
          </ShimmerCard>
        </div>

        {/* Right 7 Cols: Animated Evolution Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-3">
            {evolutionStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <ShimmerCard
                    glowColor="cyan"
                    className="p-4 sm:p-5 flex items-start gap-4 hover:border-white/20"
                  >
                    {/* Step Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stage.color} p-[1px] shrink-0 shadow-lg`}
                    >
                      <div className="w-full h-full bg-[#0d1017] rounded-[11px] flex items-center justify-center text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-purple-400">
                            {stage.step}
                          </span>
                          <h4 className="font-display font-bold text-base text-white">
                            {stage.title}
                          </h4>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 hidden sm:inline">
                          {stage.tag}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-cyan-300/90 mb-1">
                        {stage.subtitle}
                      </div>

                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </ShimmerCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
