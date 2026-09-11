import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer and no reduced motion
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isPointerFine || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      const clickableTarget = target.closest('button, a, input, textarea, select, [role="button"]');

      if (cursorTarget && cursorTarget.getAttribute('data-cursor')) {
        setCursorText(cursorTarget.getAttribute('data-cursor'));
        setIsHovered(true);
      } else if (clickableTarget) {
        setCursorText(null);
        setIsHovered(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Ring / Label */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 100 : isHovered ? 36 : 22,
          height: cursorText ? 30 : isHovered ? 36 : 22,
          borderRadius: cursorText ? '15px' : '50%',
          backgroundColor: cursorText
            ? 'rgba(11, 19, 43, 0.95)'
            : isHovered
            ? 'rgba(0, 210, 255, 0.15)'
            : 'transparent',
          borderColor: cursorText
            ? 'rgba(0, 210, 255, 0.5)'
            : isHovered
            ? 'rgba(0, 210, 255, 0.6)'
            : 'rgba(255, 255, 255, 0.3)',
          borderWidth: '1px',
          scale: isClicking ? 0.92 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] uppercase font-mono tracking-wider font-semibold text-[#00D2FF] px-2 whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Center Dot */}
      {!cursorText && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none bg-[#00D2FF]"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovered ? 0 : 1,
            backgroundColor: '#00D2FF',
          }}
        />
      )}
    </div>
  );
};
