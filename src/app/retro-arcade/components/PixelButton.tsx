'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PixelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: 'cyan' | 'pink' | 'yellow' | 'green' | 'red';
  active?: boolean;
  className?: string;
}

const colorStyles = {
  cyan: {
    bg: 'bg-cyan-500',
    hover: 'hover:bg-cyan-400',
    border: 'border-cyan-700',
    shadow: 'shadow-cyan-500/50',
  },
  pink: {
    bg: 'bg-pink-500',
    hover: 'hover:bg-pink-400',
    border: 'border-pink-700',
    shadow: 'shadow-pink-500/50',
  },
  yellow: {
    bg: 'bg-yellow-400',
    hover: 'hover:bg-yellow-300',
    border: 'border-yellow-600',
    shadow: 'shadow-yellow-400/50',
  },
  green: {
    bg: 'bg-green-500',
    hover: 'hover:bg-green-400',
    border: 'border-green-700',
    shadow: 'shadow-green-500/50',
  },
  red: {
    bg: 'bg-red-500',
    hover: 'hover:bg-red-400',
    border: 'border-red-700',
    shadow: 'shadow-red-500/50',
  },
};

export function PixelButton({
  children,
  onClick,
  color = 'cyan',
  active = false,
  className = '',
}: PixelButtonProps) {
  const style = colorStyles[color];

  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2 font-mono font-bold uppercase text-sm text-white border-4 ${style.bg} ${style.hover} ${style.border} transition-colors ${className}`}
      whileTap={{ y: 2 }}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Pixel shadow */}
      <div className="absolute -bottom-1 -right-1 inset-0 bg-black/30 -z-10" />

      {/* Active indicator */}
      {active && (
        <motion.div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}

      {children}
    </motion.button>
  );
}
