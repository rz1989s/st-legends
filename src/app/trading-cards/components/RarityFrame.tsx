'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type RarityLevel = 'common' | 'rare' | 'epic' | 'legendary';

interface RarityFrameProps {
  rarity: RarityLevel;
  children: ReactNode;
  animated?: boolean;
  className?: string;
}

const rarityConfig: Record<RarityLevel, {
  gradient: string;
  glow: string;
  glowColor: string;
  borderWidth: number;
}> = {
  common: {
    gradient: 'from-zinc-400 via-zinc-300 to-zinc-400',
    glow: 'shadow-zinc-400/20',
    glowColor: 'rgba(161, 161, 170, 0.3)',
    borderWidth: 2,
  },
  rare: {
    gradient: 'from-blue-500 via-cyan-400 to-blue-500',
    glow: 'shadow-blue-400/30',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    borderWidth: 3,
  },
  epic: {
    gradient: 'from-purple-500 via-pink-400 to-purple-500',
    glow: 'shadow-purple-400/40',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    borderWidth: 4,
  },
  legendary: {
    gradient: 'from-yellow-400 via-amber-300 to-yellow-500',
    glow: 'shadow-yellow-400/50',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    borderWidth: 4,
  },
};

export function RarityFrame({
  rarity,
  children,
  animated = true,
  className = '',
}: RarityFrameProps) {
  const config = rarityConfig[rarity];

  return (
    <div className={`relative ${className}`}>
      {/* Outer glow */}
      {animated && (
        <motion.div
          className={`absolute -inset-1 rounded-2xl blur-md ${config.glow}`}
          style={{ background: config.glowColor }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Gradient border */}
      <div className={`relative rounded-2xl p-[${config.borderWidth}px] bg-gradient-to-br ${config.gradient}`}>
        {/* Animated shine effect */}
        {animated && (rarity === 'epic' || rarity === 'legendary') && (
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ width: '50%' }}
              animate={{
                x: ['-100%', '300%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )}

        {/* Inner container */}
        <div className="relative rounded-xl overflow-hidden bg-stone-900">
          {children}
        </div>
      </div>

      {/* Corner accents for legendary */}
      {rarity === 'legendary' && (
        <>
          <motion.div
            className="absolute -top-1 -left-1 w-4 h-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg shadow-yellow-400/50" />
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg shadow-yellow-400/50" />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -left-1 w-4 h-4"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg shadow-yellow-400/50" />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-4 h-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg shadow-yellow-400/50" />
          </motion.div>
        </>
      )}
    </div>
  );
}
