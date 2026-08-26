import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Zap,
  Cpu,
  Activity,
  Layers,
  Sparkles,
  MousePointerClick
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { NeuralBrainScene } from '../3d/NeuralBrainScene';
import { ShimmerButton } from '../ui/ShimmerButton';
import { sounds } from '../ui/SoundEffects';

export const MindSystemsSection: React.FC = () => {
  const [pulseCount, setPulseCount] = useState(0);

  const triggerShockwave = () => {
    sounds.playNeuralPulse();
    setPulseCount((c) => c + 1);
  };

  const neuralPillars = [
    {
      title: 'Deep Learning & Vision',
      tech: 'ResNet18 • Hugging Face • FFT',
      desc: 'Spatial and Fourier domain anomaly inspection in VeritaScan.',
      icon: Brain,
      color: 'text-pink-400',
    },
    {
      title: 'Distributed Full-Stack',
      tech: 'FastAPI • Node.js • Supabase',
      desc: 'Real-time WebSocket event pipelines and relational schema isolation.',
      icon: Layers,
      color: 'text-purple-400',
    },
    {
      title: 'Edge & Embedded Systems',
      tech: 'ESP32 • CAN Bus • Bare-Metal C',
      desc: 'High-speed vehicular bus acquisition and on-device risk inference.',
      icon: Cpu,
      color: 'text-cyan-400',
    },
  ];

  return (
    <section id="mind" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        number="02"
        tag="NEURAL & SYSTEMS CORE"
        title="From Software to Intelligent Systems"
        description="The interactive 3D neural core represents the convergence of software engineering, artificial intelligence, IoT, and edge-computing microcontrollers."
        alignment="center"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        {/* Left 3 Columns: Interactive Pillars */}
        <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
          {neuralPillars.slice(0, 2).map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-4 rounded-2xl bg-[#0e111a]/80 border border-white/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon className={`w-4 h-4 ${pillar.color}`} />
                  <h4 className="font-display font-bold text-sm text-white">{pillar.title}</h4>
                </div>
                <div className="font-mono text-[11px] text-cyan-300 mb-1.5">{pillar.tech}</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Center 6 Columns: Three.js Interactive 3D Brain Visualizer */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
            {/* Interactive 3D Canvas */}
            <NeuralBrainScene
              className="w-full h-full"
              intensity={1.2}
              interactive={true}
            />

            {/* Interaction Hint Overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-slate-300 font-mono text-[11px] flex items-center gap-2 pointer-events-none">
              <MousePointerClick className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
              <span>Click or move cursor to excite neural nodes</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ShimmerButton
              onClick={triggerShockwave}
              variant="outline"
              size="sm"
              icon={<Zap className="w-3.5 h-3.5 text-purple-400" />}
              cursorLabel="TRIGGER WAVE"
            >
              Trigger Synaptic Shockwave ({pulseCount})
            </ShimmerButton>
          </div>
        </div>

        {/* Right 3 Columns: System Bridge Details */}
        <div className="lg:col-span-3 space-y-4 order-3">
          {neuralPillars.slice(2).map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-4 rounded-2xl bg-[#0e111a]/80 border border-white/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon className={`w-4 h-4 ${pillar.color}`} />
                  <h4 className="font-display font-bold text-sm text-white">{pillar.title}</h4>
                </div>
                <div className="font-mono text-[11px] text-cyan-300 mb-1.5">{pillar.tech}</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}

          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 font-mono text-xs text-purple-300 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>SYMETRIC DUAL CORE</span>
            </div>
            <div className="text-[11px] text-slate-300 leading-relaxed font-sans">
              Pink hemisphere represents high-level software & AI intelligence; Cyan hemisphere represents low-level physical sensors & vehicular bus telemetry.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
