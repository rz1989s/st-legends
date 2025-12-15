'use client';

import { motion } from 'framer-motion';

interface SpotlightBeamProps {
  position?: 'left' | 'center' | 'right';
  color?: 'gold' | 'silver' | 'bronze';
  intensity?: number;
  className?: string;
}

export function SpotlightBeam({
  position = 'center',
  color = 'gold',
  intensity = 0.3,
  className = '',
}: SpotlightBeamProps) {
  const positionConfig = {
    left: { x: '20%', angle: '15deg' },
    center: { x: '50%', angle: '0deg' },
    right: { x: '80%', angle: '-15deg' },
  };

  const colorConfig = {
    gold: 'rgba(251, 191, 36, VAR)',
    silver: 'rgba(192, 192, 192, VAR)',
    bronze: 'rgba(205, 127, 50, VAR)',
  };

  const pos = positionConfig[position];
  const beamColor = colorConfig[color].replace('VAR', String(intensity));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Main beam */}
      <motion.div
        className="absolute top-0"
        style={{
          left: pos.x,
          width: 200,
          height: '100%',
          background: `linear-gradient(
            to bottom,
            ${beamColor} 0%,
            ${beamColor.replace(String(intensity), String(intensity * 0.5))} 30%,
            transparent 80%
          )`,
          clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
          transform: `translateX(-50%) rotate(${pos.angle})`,
          transformOrigin: 'top center',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary glow */}
      <motion.div
        className="absolute top-0"
        style={{
          left: pos.x,
          width: 300,
          height: '60%',
          background: `radial-gradient(
            ellipse at top,
            ${beamColor.replace(String(intensity), String(intensity * 0.3))} 0%,
            transparent 70%
          )`,
          transform: 'translateX(-50%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Dust particles in beam */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full"
          style={{
            left: `calc(${pos.x} + ${(Math.random() - 0.5) * 60}px)`,
            top: `${20 + Math.random() * 50}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
