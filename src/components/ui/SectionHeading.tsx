import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number?: string; // e.g. "01", "02"
  tag?: string; // e.g. "SELECTED WORK", "HOW I THINK ABOUT INTELLIGENT SYSTEMS"
  title: string;
  description?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  tag,
  title,
  description,
  alignment = 'left',
  className = '',
}) => {
  const alignClass = alignment === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-3xl mb-12 sm:mb-16 ${alignClass} ${className}`}
    >
      {/* Number and Tag Line */}
      {(number || tag) && (
        <div className={`flex items-center gap-2.5 mb-3.5 ${alignment === 'center' ? 'justify-center' : 'justify-start'}`}>
          {number && (
            <span className="font-mono text-xs font-semibold tracking-wider text-[#00D2FF] bg-[#00D2FF]/15 border border-[#00D2FF]/35 px-2 py-0.5 rounded-md shadow-[0_0_12px_rgba(0,210,255,0.2)]">
              {number}
            </span>
          )}
          {number && tag && <span className="text-slate-500 font-mono text-xs">/</span>}
          {tag && (
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-medium">
              {tag}
            </span>
          )}
        </div>
      )}

      {/* Main Title */}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] mb-3.5">
        {title}
      </h2>

      {/* Optional Description */}
      {description && (
        <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
};
