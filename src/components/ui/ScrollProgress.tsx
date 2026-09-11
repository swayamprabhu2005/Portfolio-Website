import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#00D2FF] via-[#FFD700] to-[#DC143C] shadow-[0_0_8px_rgba(0,210,255,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
};
