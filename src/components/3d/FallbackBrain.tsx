import React from 'react';
import { motion } from 'framer-motion';

interface FallbackBrainProps {
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const FallbackBrain: React.FC<FallbackBrainProps> = ({
  className = '',
  onClick,
  interactive = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* Outer Atmospheric Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-600/20 to-cyan-500/10 rounded-full blur-3xl" />

      {/* Fallback Brain Reference Image with Enhanced Lighting */}
      <motion.div
        animate={
          interactive
            ? {
                scale: [1, 1.02, 1],
                filter: [
                  'drop-shadow(0 0 25px rgba(139,92,246,0.5))',
                  'drop-shadow(0 0 45px rgba(6,182,212,0.7))',
                  'drop-shadow(0 0 25px rgba(139,92,246,0.5))',
                ],
              }
            : {}
        }
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-full max-w-[480px] aspect-square flex items-center justify-center p-4"
      >
        <img
          src="/brain-reference.jpeg"
          alt="Neural AI Brain Core"
          className="w-full h-full object-contain filter contrast-110 brightness-105"
        />

        {/* Central Pulsing Energy Core Overlay */}
        <motion.div
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full blur-md mix-blend-screen shadow-[0_0_50px_#8b5cf6]"
        />
      </motion.div>
    </div>
  );
};
