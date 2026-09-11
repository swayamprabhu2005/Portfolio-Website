import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Layers,
  X
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

type VerticalPlacement = 'top' | 'bottom' | 'side-left' | 'side-right';
type HorizontalPlacement = 'left' | 'right' | 'center';

interface PlacementConfig {
  v: VerticalPlacement;
  h: HorizontalPlacement;
}

export const SkillsEcosystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [placement, setPlacement] = useState<PlacementConfig>({
    v: 'bottom',
    h: 'center'
  });

  const gridRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  // Close HUD when clicking outside of any skill card container
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.skill-card-container')) {
        setIsLocked(false);
        setActiveSkill(null);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const filteredSkills =
    selectedCategory === 'all'
      ? SKILLS
      : SKILLS.filter((s) => s.category === selectedCategory);

  const getProjectName = (projId: string) => {
    const p = PROJECTS.find((proj) => proj.id === projId);
    return p ? p.title : projId;
  };

  // Dynamically calculate optimal placement strictly relative to the SKILLS GRID boundaries
  // This guarantees the HUD NEVER exceeds row 1 (above) and NEVER bleeds past the last row (below).
  const calculatePlacement = (cardEl: HTMLElement): PlacementConfig => {
    const cardRect = cardEl.getBoundingClientRect();
    const gridEl = gridRef.current;

    if (!gridEl) {
      return { v: 'bottom', h: 'center' };
    }

    const gridRect = gridEl.getBoundingClientRect();
    const spaceAbove = cardRect.top - gridRect.top;
    const spaceBelow = gridRect.bottom - cardRect.bottom;
    const HUD_HEIGHT = 290; // compact HUD height

    // Horizontal boundary detection
    const isNearLeft = (cardRect.left - gridRect.left) < 130 || cardRect.left < 150;
    const isNearRight = (gridRect.right - cardRect.right) < 130 || (window.innerWidth - cardRect.right) < 150;
    const h: HorizontalPlacement = isNearLeft ? 'left' : isNearRight ? 'right' : 'center';

    // Vertical placement strictly bounded between first and last rows
    let v: VerticalPlacement = 'bottom';

    // If grid has only 1 row or vertical space is tight both sides on desktop
    if (spaceAbove < 230 && spaceBelow < 230 && window.innerWidth >= 768) {
      if (isNearLeft) {
        v = 'side-right';
      } else if (isNearRight) {
        v = 'side-left';
      } else {
        v = 'bottom';
      }
    } else if (spaceAbove < HUD_HEIGHT) {
      // Near top of grid (Rows 1 & 2): MUST open downwards to stay inside the grid
      v = 'bottom';
    } else if (spaceBelow < HUD_HEIGHT) {
      // Near bottom of grid (Last row & row before): MUST open upwards to stay inside the grid
      v = 'top';
    } else {
      // Middle rows: open towards whichever direction has greater clearance inside the grid
      v = spaceBelow >= spaceAbove ? 'bottom' : 'top';
    }

    return { v, h };
  };

  const handleCardMouseEnter = (skill: SkillNode, e: React.MouseEvent<HTMLDivElement>) => {
    if (isLocked && activeSkill?.id === skill.id) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    const newPlacement = calculatePlacement(e.currentTarget);
    setPlacement(newPlacement);
    setActiveSkill(skill);
  };

  const handleCardMouseLeave = () => {
    if (isLocked) return;
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveSkill(null);
    }, 200);
  };

  const handlePopoverMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handlePopoverMouseLeave = () => {
    if (isLocked) return;
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveSkill(null);
    }, 200);
  };

  const handleCardClick = (skill: SkillNode, e: React.MouseEvent<HTMLDivElement>) => {
    if (activeSkill?.id === skill.id && isLocked) {
      setIsLocked(false);
      setActiveSkill(null);
    } else {
      const newPlacement = calculatePlacement(e.currentTarget);
      setPlacement(newPlacement);
      setActiveSkill(skill);
      setIsLocked(true);
    }
  };

  const getPlacementClasses = () => {
    if (placement.v === 'side-right') {
      return 'left-full ml-3 top-0 before:content-[""] before:absolute before:inset-y-0 before:right-full before:w-4 before:bg-transparent';
    }
    if (placement.v === 'side-left') {
      return 'right-full mr-3 top-0 before:content-[""] before:absolute before:inset-y-0 before:left-full before:w-4 before:bg-transparent';
    }

    const verticalClass =
      placement.v === 'top'
        ? 'bottom-full mb-2.5 before:content-[""] before:absolute before:inset-x-0 before:top-full before:h-3 before:bg-transparent'
        : 'top-full mt-2.5 before:content-[""] before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-transparent';

    const horizontalClass =
      placement.h === 'center'
        ? 'left-1/2 -translate-x-1/2'
        : placement.h === 'left'
        ? 'left-0'
        : 'right-0';

    return `${verticalClass} ${horizontalClass}`;
  };

  const getInitialAnimation = () => {
    if (placement.v === 'top') return { opacity: 0, scale: 0.94, y: 6 };
    if (placement.v === 'bottom') return { opacity: 0, scale: 0.94, y: -6 };
    if (placement.v === 'side-right') return { opacity: 0, scale: 0.94, x: -6 };
    return { opacity: 0, scale: 0.94, x: 6 };
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
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
            onClick={() => {
              setSelectedCategory(cat.id);
              setActiveSkill(null);
              setIsLocked(false);
            }}
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

      {/* Full-Width Grid with Strict Row Boundaries */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 relative min-h-[380px] transition-all duration-300"
      >
        {filteredSkills.map((skill) => {
          const Icon = ICON_MAP[skill.iconName] || Code;
          const isCurrentActive = activeSkill?.id === skill.id;

          return (
            <div
              key={skill.id}
              className={`relative skill-card-container ${isCurrentActive ? 'z-40' : 'z-10'}`}
              onMouseEnter={(e) => handleCardMouseEnter(skill, e)}
              onMouseLeave={handleCardMouseLeave}
              onClick={(e) => handleCardClick(skill, e)}
            >
              {/* Skill Card */}
              <motion.div
                whileHover={{ y: -2 }}
                className={`relative p-4 rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden h-full flex flex-col justify-between ${
                  isCurrentActive
                    ? 'bg-[#00D2FF]/20 border border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.3)] ring-1 ring-[#00D2FF]/50'
                    : 'bg-[#0E1738]/80 backdrop-blur-xl border border-white/10 hover:border-[#00D2FF]/40 shadow-2xl'
                }`}
              >
                <div>
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
                </div>

                {/* Linked Project Indicators */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">PROJECTS</span>
                  <span className="font-bold text-[#00D2FF]">
                    {skill.connectedProjects.length}
                  </span>
                </div>
              </motion.div>

              {/* Anchored Contextual Popover HUD (Strictly Bound to Skills Rows) */}
              <AnimatePresence>
                {isCurrentActive && (
                  <motion.div
                    initial={getInitialAnimation()}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={getInitialAnimation()}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    onMouseEnter={handlePopoverMouseEnter}
                    onMouseLeave={handlePopoverMouseLeave}
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute z-50 w-72 sm:w-80 p-4 sm:p-5 rounded-2xl bg-[#0B132B]/95 backdrop-blur-2xl border border-[#00D2FF]/40 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(0,210,255,0.25)] text-white space-y-3 pointer-events-auto ${getPlacementClasses()}`}
                  >
                    {/* Header: Indicator + Category + Close button if locked */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
                        <span className="text-[#00D2FF] font-semibold uppercase tracking-wider text-[10px]">
                          SYSTEM INTERFACE HUD
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#091024] text-slate-300 border border-white/10 font-medium">
                          {skill.category.split(' ')[0]}
                        </span>
                        {isLocked && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsLocked(false);
                              setActiveSkill(null);
                            }}
                            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            title="Close HUD"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Title & Level */}
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">
                        {skill.name}
                      </h3>
                      <div className="font-mono text-xs text-[#00D2FF] font-medium mt-0.5">
                        {skill.level}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Connected Implementations with Clickable Project Links */}
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
                        <span>Connected Projects ({skill.connectedProjects.length})</span>
                      </div>
                      <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1 scrollbar-none">
                        {skill.connectedProjects.map((projId) => (
                          <a
                            key={projId}
                            href="#projects"
                            onClick={() => {
                              setIsLocked(false);
                              setActiveSkill(null);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-[#091024]/90 hover:bg-[#00D2FF]/20 border border-white/10 hover:border-[#00D2FF]/50 text-xs font-mono text-slate-200 hover:text-white flex items-center justify-between transition-all group"
                          >
                            <span className="font-semibold truncate mr-2">
                              {getProjectName(projId)}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#00D2FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer Helper Note */}
      <div className="mt-8 text-center font-mono text-xs text-slate-400 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
        <span>Hover or tap any technology card to inspect its architecture role and linked project implementations.</span>
      </div>
    </section>
  );
};
