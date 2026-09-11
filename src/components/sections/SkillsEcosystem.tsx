import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Terminal,
  Code,
  FileCode2,
  Zap,
  Layout,
  Palette,
  Atom,
  Flame,
  Server,
  FileCode,
  Database,
  HardDrive,
  ShieldCheck,
  Boxes,
  Activity,
  KeyRound,
  Radio,
  Bot,
  Network,
  ScanFace,
  MessageSquareText,
  Gauge,
  Sliders,
  Box,
  Sparkles,
  LineChart,
  ArrowUpRight,
  Layers
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { SKILLS, SKILL_CATEGORIES, SkillNode } from '../../data/skills';
import { PROJECTS } from '../../data/projects';

// Icon map for dynamically rendering skill icons
const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Terminal,
  Code,
  FileCode2,
  Zap,
  Layout,
  Palette,
  Atom,
  Flame,
  Server,
  FileCode,
  Database,
  HardDrive,
  ShieldCheck,
  Boxes,
  Activity,
  KeyRound,
  Radio,
  Bot,
  Network,
  ScanFace,
  MessageSquareText,
  Gauge,
  Sliders,
  Box,
  Sparkles,
  LineChart,
  Layers,
};

export const SkillsEcosystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);

  const filteredSkills =
    selectedCategory === 'all'
      ? SKILLS
      : SKILLS.filter((s) => s.category === selectedCategory);

  const getProjectName = (projId: string) => {
    const p = PROJECTS.find((proj) => proj.id === projId);
    return p ? p.title : projId;
  };

  const handleSkillHover = (skill: SkillNode | null) => {
    setActiveSkill(skill);
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="04"
        tag="TECHNICAL CAPABILITIES"
        title="Engineering Ecosystem & Technologies"
        description="Grounded in real implementations. Every tool in this ecosystem has been used to build production applications, agentic AI pipelines, or real-time platforms."
        alignment="left"
      />

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 mt-10 scrollbar-none font-mono text-xs">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-[#0B132B] font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                : 'bg-[#0E1738]/80 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid: Skill Nodes + Connected Project Inspection HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Columns: Skill Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {filteredSkills.map((skill) => {
            const Icon = ICON_MAP[skill.iconName] || Code;
            const isHovered = activeSkill?.id === skill.id;

            return (
              <motion.div
                key={skill.id}
                onMouseEnter={() => handleSkillHover(skill)}
                onMouseLeave={() => handleSkillHover(null)}
                whileHover={{ y: -2 }}
                className={`relative p-4 rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden ${
                  isHovered
                    ? 'bg-[#00D2FF]/20 border border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.3)] ring-1 ring-[#00D2FF]/50'
                    : 'bg-[#0E1738]/80 backdrop-blur-xl border border-white/10 hover:border-[#00D2FF]/40 shadow-2xl'
                }`}
              >
                {/* Top Row: Icon + Category Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center p-1.5"
                    style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                  >
                    <Icon className="w-full h-full" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#091024]/80 text-slate-300 font-medium border border-white/5">
                    {skill.category.split(' ')[0]}
                  </span>
                </div>

                {/* Skill Name */}
                <h4 className="font-display font-bold text-sm text-white truncate mb-0.5">
                  {skill.name}
                </h4>

                {/* Level / Focus */}
                <div className="font-mono text-[10px] text-slate-400 truncate">
                  {skill.level}
                </div>

                {/* Linked Project Indicators */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">PROJECTS</span>
                  <span className="font-bold text-[#00D2FF]">
                    {skill.connectedProjects.length}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right 4 Columns: Interactive Live Telemetry HUD */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="p-6 rounded-2xl bg-[#0E1738]/85 backdrop-blur-xl border border-white/10 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
              <span className="text-slate-300 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
                SYSTEM INTERFACE HUD
              </span>
              <span className="text-[#00D2FF] uppercase font-semibold text-[11px]">
                {activeSkill ? 'INSPECTING' : 'READY'}
              </span>
            </div>

            {activeSkill ? (
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#00D2FF] font-semibold mb-1">
                    {activeSkill.category}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {activeSkill.name}
                  </h3>
                  <div className="font-mono text-xs text-[#00D2FF] font-medium mt-0.5">
                    {activeSkill.level}
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {activeSkill.description}
                </p>

                {/* Connected Projects List */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
                    Connected Implementations ({activeSkill.connectedProjects.length})
                  </div>
                  <div className="space-y-1.5">
                    {activeSkill.connectedProjects.map((projId) => (
                      <div
                        key={projId}
                        className="px-3.5 py-2.5 rounded-xl bg-[#091024]/80 hover:bg-[#00D2FF]/15 border border-white/10 hover:border-[#00D2FF]/40 text-xs font-mono text-slate-200 flex items-center justify-between transition-colors"
                      >
                        <span className="font-semibold">{getProjectName(projId)}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#00D2FF]" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 space-y-3">
                <Network className="w-10 h-10 text-slate-500 mx-auto" />
                <p className="font-mono text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Hover over or tap any skill card on the left to inspect its role and linked project implementations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

