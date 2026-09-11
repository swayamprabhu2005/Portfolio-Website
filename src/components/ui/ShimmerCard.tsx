import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ShimmerCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'pink' | 'emerald';
  bordered?: boolean;
  cursorLabel?: string;
}

export const ShimmerCard: React.FC<ShimmerCardProps> = ({
  children,
  className = '',
  bordered = true,
  cursorLabel,
  ...props
}) => {
  return (
    <motion.div
      data-cursor={cursorLabel}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl bg-[#0E1738]/80 backdrop-blur-xl transition-all duration-250 ${
        bordered ? 'border border-white/10 hover:border-[#00D2FF]/40' : ''
      } shadow-2xl hover:shadow-[0_12px_30px_-8px_rgba(0,210,255,0.2)] ${className}`}
      {...props}
    >
      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
