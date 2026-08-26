import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Cpu,
  Globe,
  Radio,
  Music,
  Sprout,
  BookOpen,
  GraduationCap,
  ArrowRight,
  X,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerButton } from '../ui/ShimmerButton';
import { ShimmerCard } from '../ui/ShimmerCard';
import { PROJECTS, Project } from '../../data/projects';
import { VeritaScanDemo } from './projects/VeritaScanDemo';
import { WaterMonitoringDemo } from './projects/WaterMonitoringDemo';
import { sounds } from '../ui/SoundEffects';

export const FeaturedProjects: React.FC = () => {
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const heroProject = PROJECTS.find((p) => p.id === 'veritascan')!;
  const waterProject = PROJECTS.find((p) => p.id === 'smart-water-monitoring')!;
  const otherProjects = PROJECTS.filter(
    (p) => p.id !== 'veritascan' && p.id !== 'automotive-blackbox' && p.id !== 'smart-water-monitoring'
  );

  const openModal = (proj: Project) => {
    sounds.playClick();
    setSelectedModalProject(proj);
  };

  const closeModal = () => {
    sounds.playClick();
    setSelectedModalProject(null);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="04"
        tag="FEATURED WORK"
        title="Production & Experimental Projects"
        description="A selection of software systems, AI forensics platforms, and real-time distributed platforms engineered with precision."
      />

      {/* 1. HERO PROJECT: VERITASCAN (Forensic AI Deepfake Detection) */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40">
            ★ HERO AI SPOTLIGHT
          </span>
          <span className="font-mono text-xs text-slate-400 hidden sm:inline">
            FastAPI • ResNet18 • Hugging Face • Three.js • Firebase
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white">
              {heroProject.title}
            </h3>
            <div className="font-mono text-sm text-cyan-300 font-medium">
              {heroProject.subtitle}
            </div>
            <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
              {heroProject.description}
            </p>

            {/* Architecture Pipeline Flow Diagram */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2 font-mono text-xs">
              <div className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>NEURAL PIPELINE FLOW:</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-purple-300 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30">MEDIA</span>
                <span>→</span>
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30">SCAN</span>
                <span>→</span>
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30">AI ANALYSIS</span>
                <span>→</span>
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30">CONFIDENCE</span>
                <span>→</span>
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30">REPORT</span>
              </div>
            </div>

            {/* Tech Badges */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              {heroProject.technologies.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <ShimmerButton
                onClick={() => openModal(heroProject)}
                variant="primary"
                size="md"
                cursorLabel="DEEP DIVE"
              >
                Inspect Architecture
              </ShimmerButton>
              <a
                href={heroProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-xs transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Interactive VeritaScan Live Simulator */}
          <div className="lg:col-span-7">
            <VeritaScanDemo />
          </div>
        </div>
      </div>

      {/* 2. SMART WATER MONITORING (IDEAS 4.0 FINALIST) */}
      <div className="my-20 pt-16 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40">
            ★ IDEAS 4.0 FINALIST AWARD
          </span>
          <span className="font-mono text-xs text-slate-400 hidden sm:inline">
            IoT Multi-Probe Array • Node.js • MongoDB • Chart.js • Predictive ML
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white">
              {waterProject.title}
            </h3>
            <div className="font-mono text-sm text-cyan-300 font-medium">
              {waterProject.subtitle}
            </div>
            <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
              {waterProject.description}
            </p>

            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2 font-mono text-xs text-cyan-200">
              <div className="font-semibold flex items-center gap-1.5 text-cyan-400">
                <Activity className="w-4 h-4" />
                KEY INNOVATION:
              </div>
              <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
                Combining low-cost physical sensor calibration with environmental trend prediction for early contamination warnings.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap pt-2">
              {waterProject.technologies.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <ShimmerButton
                onClick={() => openModal(waterProject)}
                variant="outline"
                size="md"
                cursorLabel="DEEP DIVE"
              >
                Inspect Specifications
              </ShimmerButton>
              <a
                href={waterProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-xs transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Interactive Smart Water Demo */}
          <div className="lg:col-span-7">
            <WaterMonitoringDemo />
          </div>
        </div>
      </div>

      {/* 3. ADDITIONAL FULL-STACK & SYSTEMS PROJECTS GRID */}
      <div className="my-16 pt-16 border-t border-white/10">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-8">
          Full-Stack & Systems Architecture Catalog
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <ShimmerCard
              key={project.id}
              glowColor="purple"
              className="p-6 flex flex-col justify-between"
              cursorLabel="VIEW DETAILS"
            >
              <div className="space-y-4">
                {/* Header Row: Category Badge + Status */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 uppercase font-semibold">
                    {project.category}
                  </span>
                  <span className="text-slate-400">{project.period}</span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h4>
                  <div className="font-mono text-xs text-cyan-400/90 mt-0.5">
                    {project.subtitle}
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="font-mono text-[10px] text-slate-500">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => openModal(project)}
                  className="font-mono text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Architecture Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </ShimmerCard>
          ))}
        </div>
      </div>

      {/* Project Deep Dive Modal */}
      <AnimatePresence>
        {selectedModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0d1017] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                    {selectedModalProject.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-2">
                    {selectedModalProject.title}
                  </h3>
                  <div className="font-mono text-sm text-cyan-400">
                    {selectedModalProject.subtitle}
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedModalProject.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Key Technical Highlights
                </h4>
                <ul className="space-y-1.5">
                  {selectedModalProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Technology Stack
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedModalProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2.5 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                {selectedModalProject.githubUrl && (
                  <a
                    href={selectedModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                  </a>
                )}
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-mono text-xs font-semibold"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
