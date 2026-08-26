import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string; // e.g. "01", "02"
  tag: string; // e.g. "ENGINEERING PHILOSOPHY", "INTELLIGENT SYSTEMS"
  title: string; // e.g. "From Software to Edge Intelligence"
  description?: string;
  alignment?: 'left' | 'center';
  gradient?: 'purple-cyan' | 'pink-cyan' | 'metal';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  tag,
  title,
  description,
  alignment = 'left',
  gradient = 'purple-cyan',
  className = '',
}) => {
  const gradientClass = {
    'purple-cyan': 'text-gradient-purple-cyan',
    'pink-cyan': 'text-gradient-pink-cyan',
    'metal': 'text-gradient-metal',
  }[gradient];

  const alignClass = alignment === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-3xl mb-12 sm:mb-16 ${alignClass} ${className}`}
    >
      {/* Number and Tag Line */}
      <div className={`flex items-center gap-3 mb-3 ${alignment === 'center' ? 'justify-center' : 'justify-start'}`}>
        <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-purple-400 bg-purple-950/40 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
          {number}
        </span>
        <div className="h-px w-6 bg-white/20" />
        <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-slate-400">
          {tag}
        </span>
      </div>

      {/* Main Title */}
      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-4 ${gradientClass}`}>
        {title}
      </h2>

      {/* Optional Description */}
      {description && (
        <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
          {description}
        </p>
      )}
    </motion.div>
  );
};
