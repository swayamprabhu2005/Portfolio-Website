import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/[0.03] pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
};
