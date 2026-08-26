import React, { useRef, useState } from 'react';
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
  glowColor = 'purple',
  bordered = true,
  cursorLabel,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const glowColors = {
    purple: 'rgba(139, 92, 246, 0.18)',
    cyan: 'rgba(6, 182, 212, 0.18)',
    pink: 'rgba(236, 72, 153, 0.18)',
    emerald: 'rgba(16, 185, 129, 0.18)',
  }[glowColor];

  const borderColors = {
    purple: 'group-hover:border-purple-500/50',
    cyan: 'group-hover:border-cyan-500/50',
    pink: 'group-hover:border-pink-500/50',
    emerald: 'group-hover:border-emerald-500/50',
  }[glowColor];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor={cursorLabel}
      className={`group relative rounded-2xl bg-gradient-to-b from-[#141926]/90 via-[#0e121c]/85 to-[#090b12]/90 backdrop-blur-xl transition-all duration-300 ${
        bordered ? `border border-white/10 ${borderColors}` : ''
      } overflow-hidden shadow-lg ${className}`}
      {...props}
    >
      {/* Radial Hover Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColors}, transparent 65%)`,
        }}
      />

      {/* Top Border Subtle Ambient Light Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500" />

      {/* Card Body */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
