'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Legend } from '@/lib/types';

interface LegendStarProps {
  legend: Legend;
  x: number;
  y: number;
  size?: 'sm' | 'md' | 'lg';
  onHover?: (legend: Legend | null) => void;
  onClick?: (legend: Legend) => void;
  isActive?: boolean;
}

const sizeConfig = {
  sm: { star: 8, glow: 20, pulse: 30 },
  md: { star: 12, glow: 30, pulse: 45 },
  lg: { star: 16, glow: 40, pulse: 60 },
};

export function LegendStar({
  legend,
  x,
  y,
  size = 'md',
  onHover,
  onClick,
  isActive = false,
}: LegendStarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = sizeConfig[size];

  const isFeatured = legend.featured;
  const starColor = isFeatured ? '#fbbf24' : '#a78bfa';
  const glowColor = isFeatured ? 'rgba(251, 191, 36, 0.6)' : 'rgba(167, 139, 250, 0.5)';

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(legend);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(null);
  };

  return (
    <motion.button
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none group"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick?.(legend)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
    >
      {/* Pulse ring animation */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: config.pulse,
          height: config.pulse,
          left: '50%',
          top: '50%',
          marginLeft: -config.pulse / 2,
          marginTop: -config.pulse / 2,
          border: `1px solid ${glowColor}`,
        }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />

      {/* Secondary pulse (offset timing) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: config.pulse,
          height: config.pulse,
          left: '50%',
          top: '50%',
          marginLeft: -config.pulse / 2,
          marginTop: -config.pulse / 2,
          border: `1px solid ${glowColor}`,
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 1.5,
        }}
      />

      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full blur-md"
        style={{
          width: config.glow,
          height: config.glow,
          left: '50%',
          top: '50%',
          marginLeft: -config.glow / 2,
          marginTop: -config.glow / 2,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
        animate={{
          scale: isHovered || isActive ? 1.5 : 1,
          opacity: isHovered || isActive ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Star core with gradient */}
      <motion.div
        className="relative rounded-full shadow-lg"
        style={{
          width: config.star,
          height: config.star,
          background: `radial-gradient(circle at 30% 30%, ${isFeatured ? '#fff5cc' : '#e0d4ff'}, ${starColor})`,
          boxShadow: `0 0 ${config.star}px ${glowColor}, 0 0 ${config.star * 2}px ${glowColor}`,
        }}
        animate={{
          scale: isHovered || isActive ? 1.3 : 1,
        }}
        transition={{ type: 'spring', damping: 10, stiffness: 400 }}
      />

      {/* Star sparkle effect */}
      <AnimatePresence>
        {(isHovered || isActive) && (
          <>
            {[0, 45, 90, 135].map((rotation) => (
              <motion.div
                key={rotation}
                className="absolute"
                style={{
                  width: 2,
                  height: config.star * 2,
                  left: '50%',
                  top: '50%',
                  marginLeft: -1,
                  marginTop: -config.star,
                  background: `linear-gradient(to bottom, transparent, ${starColor}, transparent)`,
                  transformOrigin: 'center center',
                  transform: `rotate(${rotation}deg)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Name label on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
            style={{ top: config.star + 12 }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            <span className="text-xs font-medium text-white/90 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
              {legend.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
