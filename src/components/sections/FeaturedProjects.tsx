import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Layers,
  ArrowRight,
  X,
  CheckCircle2,
  Cpu,
  Sparkles,
  Filter
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerCard } from '../ui/ShimmerCard';
import { PROJECTS, Project } from '../../data/projects';

export const FeaturedProjects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'ALL', label: `All Projects (${PROJECTS.length})` },
    { id: 'AI & Deep Learning', label: 'AI & Deep Learning' },
    { id: 'AI Agents & LLMs', label: 'AI Agents & LLMs' },
    { id: 'Full Stack Web', label: 'Full Stack Web' },
    { id: 'IoT & Systems', label: 'IoT & Systems' },
    { id: 'Data Science & Case Studies', label: 'Data Science & Case Studies' },
  ];

  const filteredProjects = activeCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const openModal = (proj: Project) => {
    setSelectedModalProject(proj);
  };

  const closeModal = () => {
    setSelectedModalProject(null);
  };

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div id="projects"></div>
      <SectionHeading
        number="02"
        tag="SELECTED ENGINEERING WORK"
        title="Featured Projects & Production Systems"
        description="A curated catalog of deep learning forensics, agentic LLM platforms, real-time telemetry, and distributed full-stack applications engineered with strict technical rigor."
        alignment="left"
      />

      {/* Category Filter Pills */}
      <div className="mt-10 mb-12 flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-[#0B132B] font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                  : 'bg-[#0E1738]/80 text-slate-300 hover:text-white border border-white/10 hover:border-[#00D2FF]/40'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid (Uniform Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredProjects.map((project) => {
          const isFlagship = project.id === 'veritascan' || project.id === 'smart-water-monitoring' || project.id === 'ai-goal-journal';

          return (
            <ShimmerCard
              key={project.id}
              className={`p-7 flex flex-col justify-between transition-all duration-300 ${
                isFlagship ? 'ring-1 ring-[#00D2FF]/30' : ''
              }`}
              cursorLabel="DETAILS"
            >
              <div className="space-y-4">
                {/* Header Row: Category Badge + Period */}
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30 font-semibold uppercase">
                    {project.category}
                  </span>
                  <span className="text-slate-400 font-medium">{project.period}</span>
                </div>

                {/* Optional Flagship Badge */}
                {project.badge && (
                  <div className="inline-block">
                    <span className="font-mono text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#DC143C]/20 text-[#FF4D6D] border border-[#DC143C]/40">
                      {project.badge}
                    </span>
                  </div>
                )}

                {/* Title & Subtitle */}
                <div>
                  <h4 className="font-display font-bold text-xl text-white group-hover:text-[#00D2FF] transition-colors">
                    {project.title}
                  </h4>
                  <div className="font-mono text-xs text-[#00D2FF]/90 mt-0.5 font-medium">
                    {project.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#091024]/80 text-slate-300 border border-white/10 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="font-mono text-[10px] text-slate-400">
                      +{project.technologies.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => openModal(project)}
                  className="font-mono text-xs text-[#00D2FF] hover:text-[#33DCFF] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Architecture Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </ShimmerCard>
          );
        })}
      </div>

      {/* Interactive Architectural Details Lightbox Modal */}
      <AnimatePresence>
        {selectedModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-2xl bg-[#0B132B]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto text-white"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30 font-semibold">
                    {selectedModalProject.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-2">
                    {selectedModalProject.title}
                  </h3>
                  <div className="font-mono text-sm text-[#00D2FF] font-medium">
                    {selectedModalProject.subtitle}
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Description */}
              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                {selectedModalProject.description}
              </p>

              {/* Architecture Layers & Data Flow (if available) */}
              {selectedModalProject.architectureDetails && (
                <div className="p-4 rounded-xl bg-[#091024]/80 border border-white/10 space-y-3 font-mono text-xs">
                  <div className="text-white font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <Layers className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>System Architecture Layers:</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {selectedModalProject.architectureDetails.layers.map((layer, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                        <span>{layer}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedModalProject.architectureDetails.keyInnovation && (
                    <div className="pt-2 border-t border-white/10 text-slate-300 text-[11px]">
                      <span className="font-bold text-[#FFD700]">Key Innovation: </span>
                      {selectedModalProject.architectureDetails.keyInnovation}
                    </div>
                  )}
                </div>
              )}

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Key Technical Highlights
                </h4>
                <ul className="space-y-2">
                  {selectedModalProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
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
                      className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#0E1738] text-slate-200 border border-white/10 font-medium"
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
                    className="px-4 py-2 rounded-xl bg-[#0E1738] hover:bg-white/10 text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors border border-white/10"
                  >
                    <Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                  </a>
                )}
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-[#0B132B] font-mono text-xs font-bold transition-colors shadow-[0_0_15px_rgba(0,210,255,0.3)] cursor-pointer"
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

