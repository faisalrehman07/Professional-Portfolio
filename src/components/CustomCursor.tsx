import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
        setIsHovered(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMouse, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer Magnetic Precision Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border"
        animate={{
          x: mousePosition.x - (isHovered ? 20 : isClicking ? 12 : 14),
          y: mousePosition.y - (isHovered ? 20 : isClicking ? 12 : 14),
          width: isHovered ? 40 : isClicking ? 24 : 28,
          height: isHovered ? 40 : isClicking ? 24 : 28,
          backgroundColor: isHovered ? 'rgba(37, 99, 235, 0.08)' : 'rgba(37, 99, 235, 0.03)',
          borderColor: isHovered ? 'rgba(37, 99, 235, 0.6)' : 'rgba(148, 163, 184, 0.5)',
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 420,
          mass: 0.35,
        }}
      />

      {/* Central Precision Point */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-blue-600"
        animate={{
          x: mousePosition.x - (isHovered ? 3.5 : 2.5),
          y: mousePosition.y - (isHovered ? 3.5 : 2.5),
          width: isHovered ? 7 : 5,
          height: isHovered ? 7 : 5,
          scale: isClicking ? 1.5 : isHovered ? 1.25 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 900,
        }}
      />
    </>
  );
};
