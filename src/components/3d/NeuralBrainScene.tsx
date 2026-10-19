import React from 'react';
import { motion } from 'framer-motion';

interface BrainCanvasProps {
  className?: string;
  intensity?: number;
  interactive?: boolean;
}

// Synaptic micro-node coordinates (percentage x, y across the brain hemispheres)
const SYNAPTIC_NODES = [
  // Left Hemisphere (Purple / Magenta / Violet Nodes)
  { x: 38, y: 22, color: '#A855F7', delay: 0.2, size: 6 },
  { x: 28, y: 32, color: '#C084FC', delay: 1.1, size: 8 },
  { x: 20, y: 45, color: '#9333EA', delay: 0.7, size: 7 },
  { x: 32, y: 48, color: '#E879F9', delay: 1.6, size: 9 },
  { x: 42, y: 42, color: '#A855F7', delay: 2.1, size: 7 },
  { x: 25, y: 62, color: '#C084FC', delay: 0.5, size: 8 },
  { x: 36, y: 65, color: '#E879F9', delay: 1.9, size: 10 },
  { x: 40, y: 78, color: '#9333EA', delay: 1.3, size: 7 },
  { x: 30, y: 76, color: '#A855F7', delay: 2.4, size: 6 },
  { x: 44, y: 30, color: '#C084FC', delay: 0.9, size: 6 },

  // Central Core Synaptic Flare (White / Cyan Bridge)
  { x: 50, y: 49, color: '#FFFFFF', delay: 0, size: 14, isCore: true },
  { x: 50, y: 40, color: '#E0F2FE', delay: 0.8, size: 8 },
  { x: 50, y: 60, color: '#E0F2FE', delay: 1.5, size: 8 },

  // Right Hemisphere (Electric Cyan / Sky Blue Nodes)
  { x: 62, y: 22, color: '#00D2FF', delay: 0.4, size: 6 },
  { x: 72, y: 32, color: '#38BDF8', delay: 1.3, size: 8 },
  { x: 80, y: 45, color: '#00D2FF', delay: 0.9, size: 7 },
  { x: 68, y: 48, color: '#67E8F9', delay: 1.8, size: 9 },
  { x: 58, y: 42, color: '#38BDF8', delay: 2.3, size: 7 },
  { x: 75, y: 62, color: '#00D2FF', delay: 0.6, size: 8 },
  { x: 64, y: 65, color: '#67E8F9', delay: 2.0, size: 10 },
  { x: 60, y: 78, color: '#38BDF8', delay: 1.4, size: 7 },
  { x: 70, y: 76, color: '#00D2FF', delay: 2.5, size: 6 },
  { x: 56, y: 30, color: '#67E8F9', delay: 1.0, size: 6 },
];

export const NeuralBrainScene: React.FC<BrainCanvasProps> = ({
  className = '',
  interactive = true,
}) => {
  const brainImageUrl = `${import.meta.env.BASE_URL}ai-brain-core.webp`;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* 1. Atmospheric Ambient Radial Glow Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.12)_0%,rgba(168,85,247,0.08)_40%,transparent_70%)] pointer-events-none" />

      {/* 2. Floating Cybernetic AI Brain Core */}
      <motion.div
        animate={
          interactive
            ? {
                y: [-6, 6, -6],
                rotateZ: [-0.5, 0.5, -0.5],
              }
            : {}
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full max-w-[440px] aspect-square flex items-center justify-center p-3 sm:p-5 group cursor-pointer"
      >
        {/* High-Definition Cybernetic Brain WebP Asset */}
        <img
          src={brainImageUrl}
          alt="Cybernetic AI Neural Core"
          draggable={false}
          className="w-full h-full object-contain filter contrast-[1.05] brightness-[1.03] drop-shadow-[0_0_35px_rgba(0,210,255,0.25)] group-hover:drop-shadow-[0_0_50px_rgba(0,210,255,0.45)] transition-all duration-700 pointer-events-none"
        />

        {/* Central Luminous Synaptic Flare Overlay */}
        <motion.div
          animate={{
            scale: [0.85, 1.25, 0.85],
            opacity: [0.65, 1.0, 0.65],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#A855F7] via-white to-[#00D2FF] rounded-full blur-xl mix-blend-screen pointer-events-none"
        />

        {/* Central High-Intensity Optical Dot */}
        <motion.div
          animate={{
            scale: [0.9, 1.3, 0.9],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_20px_#ffffff,0_0_40px_#00D2FF] pointer-events-none"
        />

        {/* 3. Sparkling Synaptic Micro-Nodes Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {SYNAPTIC_NODES.map((node, idx) => (
            <motion.div
              key={idx}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                backgroundColor: node.color,
                boxShadow: `0 0 ${node.size * 2}px ${node.color}`,
              }}
              animate={{
                scale: node.isCore ? [1, 1.5, 1] : [0.6, 1.4, 0.6],
                opacity: [0.4, 1.0, 0.4],
              }}
              transition={{
                duration: 2.2 + (idx % 3) * 0.4,
                repeat: Infinity,
                delay: node.delay,
                ease: 'easeInOut',
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
