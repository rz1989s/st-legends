'use client';

import { motion } from 'framer-motion';

interface GradientOrbProps {
  color?: 'purple' | 'pink' | 'cyan' | 'orange';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: { top?: string; bottom?: string; left?: string; right?: string };
  blur?: number;
  className?: string;
}

const colorConfig = {
  purple: 'from-violet-600 to-purple-600',
  pink: 'from-pink-500 to-rose-500',
  cyan: 'from-cyan-400 to-blue-500',
  orange: 'from-orange-400 to-amber-500',
};

const sizeConfig = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
  xl: 'w-96 h-96',
};

export function GradientOrb({
  color = 'purple',
  size = 'md',
  position = {},
  blur = 80,
  className = '',
}: GradientOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br ${colorConfig[color]} ${sizeConfig[size]} ${className}`}
      style={{
        ...position,
        filter: `blur(${blur}px)`,
        opacity: 0.6,
      }}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Multiple orbs background component
interface OrbFieldProps {
  className?: string;
}

export function OrbField({ className = '' }: OrbFieldProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <GradientOrb
        color="purple"
        size="xl"
        position={{ top: '-10%', left: '-5%' }}
        blur={100}
      />
      <GradientOrb
        color="pink"
        size="lg"
        position={{ top: '20%', right: '-10%' }}
        blur={90}
      />
      <GradientOrb
        color="cyan"
        size="md"
        position={{ bottom: '20%', left: '10%' }}
        blur={70}
      />
      <GradientOrb
        color="orange"
        size="lg"
        position={{ bottom: '-10%', right: '20%' }}
        blur={80}
      />
      <GradientOrb
        color="purple"
        size="md"
        position={{ top: '50%', left: '40%' }}
        blur={60}
      />
    </div>
  );
}
