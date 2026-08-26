import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { MagneticWrapper } from './MagneticWrapper';
import { sounds } from './SoundEffects';

interface ShimmerButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  cursorLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  cursorLabel,
  icon,
  className = '',
  onClick,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs tracking-wider gap-1.5',
    md: 'px-5 py-2.5 text-sm tracking-wide gap-2',
    lg: 'px-7 py-3.5 text-base tracking-wide font-medium gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] border border-purple-400/30',
    secondary:
      'bg-[#121622] text-slate-100 border border-white/10 hover:border-purple-500/40 hover:bg-[#181d2c] shadow-lg',
    outline:
      'bg-transparent text-slate-200 border border-white/20 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-500/5',
    ghost:
      'bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border border-transparent',
    glow:
      'bg-[#0a0d16] text-white border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:border-cyan-400',
  }[variant];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sounds.playClick();
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    sounds.playHover();
  };

  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      data-cursor={cursorLabel}
      className={`group relative inline-flex items-center justify-center rounded-xl font-mono uppercase transition-all duration-300 overflow-hidden select-none cursor-pointer ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {/* Light Sweep Reflection Line */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] pointer-events-none" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="transition-transform group-hover:scale-110 duration-200">{icon}</span>}
        <span>{children}</span>
      </span>
    </motion.button>
  );

  if (magnetic) {
    return <MagneticWrapper strength={0.2}>{buttonContent}</MagneticWrapper>;
  }

  return buttonContent;
};
