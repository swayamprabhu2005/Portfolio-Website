import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { MagneticWrapper } from './MagneticWrapper';

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
  magnetic = false,
  cursorLabel,
  icon,
  className = '',
  onClick,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs tracking-wide gap-1.5 rounded-lg',
    md: 'px-4.5 py-2.5 text-sm tracking-wide gap-2 rounded-xl',
    lg: 'px-6 py-3 text-sm sm:text-base tracking-wide font-medium gap-2.5 rounded-xl',
  }[size];

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#00D2FF] to-[#00A3FF] hover:from-[#33DCFF] hover:to-[#00B4FF] text-[#0B132B] shadow-[0_0_18px_rgba(0,210,255,0.35)] hover:shadow-[0_0_25px_rgba(0,210,255,0.55)] border border-[#00D2FF]/40 font-bold',
    secondary:
      'bg-[#0E1738]/80 hover:bg-[#14214D] text-white border border-white/15 hover:border-[#00D2FF]/40 shadow-sm font-medium',
    outline:
      'bg-transparent text-slate-200 border border-white/20 hover:bg-white/10 hover:text-white font-medium',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-white/10 border border-transparent font-medium',
    glow:
      'bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white shadow-[0_0_20px_rgba(220,20,60,0.4)] hover:shadow-[0_0_25px_rgba(220,20,60,0.6)] border border-[#DC143C] font-bold',
  }[variant];

  const buttonContent = (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      data-cursor={cursorLabel}
      className={`group relative inline-flex items-center justify-center font-sans transition-all duration-200 select-none cursor-pointer focus-editorial ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="transition-transform group-hover:scale-105 duration-200">{icon}</span>}
        <span>{children}</span>
      </span>
    </motion.button>
  );

  if (magnetic) {
    return <MagneticWrapper strength={0.15}>{buttonContent}</MagneticWrapper>;
  }

  return buttonContent;
};
