import React from 'react';
import { motion } from 'framer-motion';

interface BrainCanvasProps {
  className?: string;
  imageSrc?: string;
  altText?: string;
  accentColor?: string;
  interactive?: boolean;
}

// Synaptic micro-node coordinates (percentage x, y across the visual)
const SYNAPTIC_NODES = [
  // Left Side Nodes
  { x: 36, y: 24, color: '#A855F7', delay: 0.2, size: 6 },
  { x: 26, y: 34, color: '#C084FC', delay: 1.1, size: 8 },
  { x: 22, y: 46, color: '#9333EA', delay: 0.7, size: 7 },
  { x: 30, y: 52, color: '#E879F9', delay: 1.6, size: 9 },
  { x: 38, y: 66, color: '#A855F7', delay: 2.1, size: 7 },
  { x: 28, y: 74, color: '#C084FC', delay: 0.5, size: 8 },

  // Center Core
  { x: 50, y: 50, color: '#FFFFFF', delay: 0, size: 12, isCore: true },
  { x: 50, y: 38, color: '#E0F2FE', delay: 0.8, size: 7 },
  { x: 50, y: 62, color: '#E0F2FE', delay: 1.5, size: 7 },

  // Right Side Nodes
  { x: 64, y: 24, color: '#00D2FF', delay: 0.4, size: 6 },
  { x: 74, y: 34, color: '#38BDF8', delay: 1.3, size: 8 },
  { x: 78, y: 46, color: '#00D2FF', delay: 0.9, size: 7 },
  { x: 70, y: 52, color: '#67E8F9', delay: 1.8, size: 9 },
  { x: 62, y: 66, color: '#38BDF8', delay: 2.0, size: 8 },
  { x: 72, y: 74, color: '#00D2FF', delay: 2.5, size: 6 },
];

export const NeuralBrainScene: React.FC<BrainCanvasProps> = ({
  className = '',
  imageSrc = 'architecture/arch-agentic-brain.webp',
  altText = 'Architecture Holographic Visual',
  accentColor = '#00D2FF',
  interactive = true,
}) => {
  const fullImageUrl = `${import.meta.env.BASE_URL}${imageSrc}`;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* 1. Atmospheric Ambient Radial Glow Aura */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at center, ${accentColor}22 0%, rgba(14,23,56,0) 70%)`,
        }}
      />

      {/* 2. Floating Thematic Visual Container */}
      <motion.div
        animate={
          interactive
            ? {
                y: [-8, 8, -8],
                rotateZ: [-0.6, 0.6, -0.6],
              }
            : {}
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full max-w-[480px] aspect-square flex items-center justify-center p-4 group"
      >
        {/* Transparent Holographic Visual Asset */}
        <img
          src={fullImageUrl}
          alt={altText}
          draggable={false}
          className="w-full h-full object-contain filter contrast-[1.08] brightness-[1.05] drop-shadow-[0_0_35px_rgba(0,210,255,0.3)] transition-all duration-700 pointer-events-none"
        />

        {/* Central Luminous Flare Overlay */}
        <motion.div
          animate={{
            scale: [0.85, 1.25, 0.85],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-2xl mix-blend-screen pointer-events-none"
          style={{
            background: `radial-gradient(circle, #ffffff 0%, ${accentColor} 60%, transparent 100%)`,
          }}
        />

        {/* 3. Sparkling Micro-Nodes Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {SYNAPTIC_NODES.map((node, idx) => (
            <motion.div
              key={idx}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                backgroundColor: node.isCore ? '#FFFFFF' : node.color,
                boxShadow: `0 0 ${node.size * 2}px ${node.color}`,
              }}
              animate={{
                scale: node.isCore ? [1, 1.4, 1] : [0.6, 1.3, 0.6],
                opacity: [0.35, 0.95, 0.35],
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
