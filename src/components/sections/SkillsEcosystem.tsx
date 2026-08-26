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
import { sounds } from '../ui/SoundEffects';

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
    if (skill) sounds.playHover();
    setActiveSkill(skill);
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="03"
        tag="TECHNOLOGY ECOSYSTEM"
        title="Interconnected Engineering Skills"
        description="Every tool in this ecosystem is grounded in real implementation. Hover over any technology to inspect its role and see its linked production projects."
      />

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none font-mono text-xs">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sounds.playClick();
              setSelectedCategory(cat.id);
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-white font-semibold shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-400/50'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
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
                whileHover={{ scale: 1.03, y: -2 }}
                className={`relative p-3.5 rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden ${
                  isHovered
                    ? 'bg-[#181d2c] border border-purple-500/60 shadow-[0_0_25px_rgba(139,92,246,0.3)]'
                    : 'bg-[#0d1017]/80 border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Top Row: Icon + Category Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center p-1.5"
                    style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                  >
                    <Icon className="w-full h-full" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
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
                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-1">
                  <span className="font-mono text-[9px] text-slate-500">PROJECTS:</span>
                  <span className="font-mono text-[9px] font-bold text-cyan-400">
                    {skill.connectedProjects.length}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right 4 Columns: Interactive Live Telemetry HUD */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="p-6 rounded-2xl bg-[#0b0e17] border border-white/15 backdrop-blur-xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                NEURAL SKILL HUD
              </span>
              <span className="text-purple-400 uppercase font-semibold">
                {activeSkill ? 'ACTIVE LINK' : 'STANDBY'}
              </span>
            </div>

            {activeSkill ? (
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-purple-400 mb-1">
                    {activeSkill.category}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {activeSkill.name}
                  </h3>
                  <div className="font-mono text-xs text-cyan-300 mt-0.5">
                    {activeSkill.level}
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {activeSkill.description}
                </p>

                {/* Connected Projects List */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Connected Projects ({activeSkill.connectedProjects.length})
                  </div>
                  <div className="space-y-1.5">
                    {activeSkill.connectedProjects.map((projId) => (
                      <div
                        key={projId}
                        className="px-3 py-2 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs font-mono text-white flex items-center justify-between"
                      >
                        <span className="font-semibold text-purple-200">{getProjectName(projId)}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 space-y-3">
                <Network className="w-10 h-10 text-slate-600 mx-auto animate-pulse" />
                <p className="font-mono text-xs text-slate-500">
                  Hover over any technology card on the left to inspect its live neural connections and linked project implementations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
