'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AwardRibbonProps {
  label: string;
  color?: 'gold' | 'silver' | 'bronze' | 'blue' | 'red';
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorConfig = {
  gold: {
    main: 'from-yellow-400 via-amber-300 to-yellow-500',
    dark: 'from-yellow-600 to-amber-700',
    text: 'text-amber-900',
    shadow: 'shadow-yellow-500/30',
  },
  silver: {
    main: 'from-gray-300 via-gray-200 to-gray-400',
    dark: 'from-gray-500 to-gray-600',
    text: 'text-gray-800',
    shadow: 'shadow-gray-400/30',
  },
  bronze: {
    main: 'from-amber-600 via-amber-500 to-amber-700',
    dark: 'from-amber-800 to-amber-900',
    text: 'text-amber-950',
    shadow: 'shadow-amber-600/30',
  },
  blue: {
    main: 'from-blue-500 via-blue-400 to-blue-600',
    dark: 'from-blue-700 to-blue-800',
    text: 'text-blue-950',
    shadow: 'shadow-blue-500/30',
  },
  red: {
    main: 'from-red-500 via-red-400 to-red-600',
    dark: 'from-red-700 to-red-800',
    text: 'text-red-950',
    shadow: 'shadow-red-500/30',
  },
};

const sizeConfig = {
  sm: { width: 'w-16', height: 'h-20', text: 'text-[8px]', iconSize: 12 },
  md: { width: 'w-20', height: 'h-24', text: 'text-[10px]', iconSize: 16 },
  lg: { width: 'w-24', height: 'h-28', text: 'text-xs', iconSize: 20 },
};

export function AwardRibbon({
  label,
  color = 'gold',
  icon,
  size = 'md',
  className = '',
}: AwardRibbonProps) {
  const colors = colorConfig[color];
  const sizes = sizeConfig[size];

  return (
    <motion.div
      className={`relative ${sizes.width} ${className}`}
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', damping: 12 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      {/* Main ribbon body */}
      <div className={`relative ${sizes.height} flex flex-col items-center`}>
        {/* Medal/Badge circle */}
        <div className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${colors.main} shadow-lg ${colors.shadow} flex items-center justify-center`}>
          {/* Inner circle */}
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${colors.dark} flex items-center justify-center`}>
            {icon ? (
              <span className={colors.text}>{icon}</span>
            ) : (
              <span className={`${sizes.text} font-black ${colors.text} uppercase`}>
                {label.slice(0, 2)}
              </span>
            )}
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent"
              style={{ transform: 'rotate(-45deg)' }}
            />
          </div>
        </div>

        {/* Ribbon tails */}
        <div className="absolute top-8 flex gap-1">
          {/* Left tail */}
          <motion.div
            className={`w-5 h-14 bg-gradient-to-b ${colors.main} rounded-b-sm`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
              transform: 'rotate(-15deg)',
              transformOrigin: 'top center',
            }}
            animate={{ rotate: [-15, -12, -15] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Right tail */}
          <motion.div
            className={`w-5 h-14 bg-gradient-to-b ${colors.main} rounded-b-sm`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
              transform: 'rotate(15deg)',
              transformOrigin: 'top center',
            }}
            animate={{ rotate: [15, 12, 15] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Label */}
      <div className="text-center mt-1">
        <span className={`${sizes.text} font-bold text-yellow-200 uppercase tracking-wider`}>
          {label}
        </span>
      </div>
    </motion.div>
  );
}
