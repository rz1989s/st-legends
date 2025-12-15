'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SpotlightProps {
  children: ReactNode;
  active?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'warm' | 'cool' | 'neutral';
  className?: string;
}

const intensityConfig = {
  low: { opacity: 0.3, blur: 40, size: 200 },
  medium: { opacity: 0.5, blur: 60, size: 300 },
  high: { opacity: 0.7, blur: 80, size: 400 },
};

const colorConfig = {
  warm: 'rgba(255, 215, 0, VAR)',
  cool: 'rgba(200, 220, 255, VAR)',
  neutral: 'rgba(255, 255, 255, VAR)',
};

export function Spotlight({
  children,
  active = true,
  intensity = 'medium',
  color = 'warm',
  className = '',
}: SpotlightProps) {
  const config = intensityConfig[intensity];
  const spotColor = colorConfig[color].replace('VAR', String(config.opacity));

  return (
    <div className={`relative ${className}`}>
      {/* Ceiling mount */}
      <motion.div
        className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        {/* Track rail */}
        <div className="w-20 h-1 bg-gradient-to-b from-stone-600 to-stone-800 rounded-full" />

        {/* Light fixture */}
        <div className="relative">
          <div className="w-3 h-8 bg-gradient-to-b from-stone-700 to-stone-800" />
          <div className="w-8 h-6 bg-gradient-to-b from-stone-700 to-stone-900 rounded-b-lg -mt-1">
            {/* Bulb glow */}
            {active && (
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
                style={{ backgroundColor: spotColor, filter: 'blur(4px)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Light cone */}
      {active && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Main cone */}
          <div
            className="relative"
            style={{
              width: config.size,
              height: config.size * 1.5,
              marginLeft: -config.size / 2,
              background: `linear-gradient(
                180deg,
                ${spotColor} 0%,
                transparent 100%
              )`,
              clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
              filter: `blur(${config.blur}px)`,
            }}
          />

          {/* Floor pool */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: config.size * 0.8,
              height: config.size * 0.2,
              bottom: -config.size * 0.1,
              background: `radial-gradient(ellipse, ${spotColor} 0%, transparent 70%)`,
              filter: `blur(${config.blur / 2}px)`,
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      )}

      {/* Dust particles in light */}
      {active && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-64 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-white/40"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, -200],
                x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10"
        animate={{
          filter: active ? 'brightness(1.1)' : 'brightness(0.8)',
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
