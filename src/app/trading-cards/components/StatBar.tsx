'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  icon?: ReactNode;
  color?: 'amber' | 'cyan' | 'purple' | 'pink' | 'green';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const colorConfig = {
  amber: {
    bg: 'bg-amber-500/20',
    fill: 'bg-gradient-to-r from-amber-500 to-yellow-400',
    glow: 'shadow-amber-500/50',
    text: 'text-amber-300',
  },
  cyan: {
    bg: 'bg-cyan-500/20',
    fill: 'bg-gradient-to-r from-cyan-500 to-blue-400',
    glow: 'shadow-cyan-500/50',
    text: 'text-cyan-300',
  },
  purple: {
    bg: 'bg-purple-500/20',
    fill: 'bg-gradient-to-r from-purple-500 to-pink-400',
    glow: 'shadow-purple-500/50',
    text: 'text-purple-300',
  },
  pink: {
    bg: 'bg-pink-500/20',
    fill: 'bg-gradient-to-r from-pink-500 to-rose-400',
    glow: 'shadow-pink-500/50',
    text: 'text-pink-300',
  },
  green: {
    bg: 'bg-green-500/20',
    fill: 'bg-gradient-to-r from-green-500 to-emerald-400',
    glow: 'shadow-green-500/50',
    text: 'text-green-300',
  },
};

const sizeConfig = {
  sm: { height: 'h-1.5', text: 'text-[10px]', icon: 12 },
  md: { height: 'h-2', text: 'text-xs', icon: 14 },
  lg: { height: 'h-3', text: 'text-sm', icon: 16 },
};

export function StatBar({
  label,
  value,
  maxValue = 100,
  icon,
  color = 'amber',
  size = 'md',
  animated = true,
  className = '',
}: StatBarProps) {
  const colors = colorConfig[color];
  const sizes = sizeConfig[size];
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className={`${className}`}>
      {/* Label row */}
      <div className="flex items-center justify-between mb-1">
        <div className={`flex items-center gap-1.5 ${colors.text}`}>
          {icon && <span className="opacity-80">{icon}</span>}
          <span className={`${sizes.text} font-medium uppercase tracking-wider opacity-80`}>
            {label}
          </span>
        </div>
        <span className={`${sizes.text} font-bold ${colors.text}`}>
          {value}
        </span>
      </div>

      {/* Bar container */}
      <div className={`relative ${sizes.height} rounded-full overflow-hidden ${colors.bg}`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 4px,
            rgba(255,255,255,0.1) 4px,
            rgba(255,255,255,0.1) 8px
          )`,
        }} />

        {/* Fill bar */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${colors.fill}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 1 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Glow at end of bar */}
        {percentage > 10 && (
          <motion.div
            className={`absolute inset-y-0 w-4 rounded-full blur-sm ${colors.fill} ${colors.glow}`}
            initial={{ left: 0 }}
            animate={{ left: `calc(${percentage}% - 8px)` }}
            transition={{
              duration: animated ? 1 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        )}
      </div>
    </div>
  );
}
