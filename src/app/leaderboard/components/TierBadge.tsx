'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type Tier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master' | 'grandmaster';

interface TierBadgeProps {
  tier: Tier;
  xp: number;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tierConfig: Record<Tier, {
  label: string;
  minXP: number;
  maxXP: number;
  colors: string;
  bgColors: string;
  icon: string;
  glowColor: string;
}> = {
  bronze: {
    label: 'Bronze',
    minXP: 0,
    maxXP: 5000,
    colors: 'from-amber-700 to-amber-900',
    bgColors: 'from-amber-700/20 to-amber-900/20',
    icon: '🥉',
    glowColor: 'rgba(180, 83, 9, 0.4)',
  },
  silver: {
    label: 'Silver',
    minXP: 5000,
    maxXP: 10000,
    colors: 'from-slate-300 to-slate-500',
    bgColors: 'from-slate-300/20 to-slate-500/20',
    icon: '🥈',
    glowColor: 'rgba(148, 163, 184, 0.4)',
  },
  gold: {
    label: 'Gold',
    minXP: 10000,
    maxXP: 18000,
    colors: 'from-yellow-400 to-amber-500',
    bgColors: 'from-yellow-400/20 to-amber-500/20',
    icon: '🥇',
    glowColor: 'rgba(250, 204, 21, 0.4)',
  },
  platinum: {
    label: 'Platinum',
    minXP: 18000,
    maxXP: 25000,
    colors: 'from-cyan-300 to-cyan-500',
    bgColors: 'from-cyan-300/20 to-cyan-500/20',
    icon: '💎',
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  diamond: {
    label: 'Diamond',
    minXP: 25000,
    maxXP: 35000,
    colors: 'from-purple-400 to-pink-500',
    bgColors: 'from-purple-400/20 to-pink-500/20',
    icon: '💠',
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  master: {
    label: 'Master',
    minXP: 35000,
    maxXP: 50000,
    colors: 'from-red-500 to-orange-500',
    bgColors: 'from-red-500/20 to-orange-500/20',
    icon: '🔥',
    glowColor: 'rgba(239, 68, 68, 0.4)',
  },
  grandmaster: {
    label: 'Grandmaster',
    minXP: 50000,
    maxXP: 100000,
    colors: 'from-violet-500 via-purple-500 to-fuchsia-500',
    bgColors: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
    icon: '👑',
    glowColor: 'rgba(139, 92, 246, 0.5)',
  },
};

const sizeConfig = {
  sm: { badge: 'w-12 h-12', text: 'text-xs', icon: 'text-lg' },
  md: { badge: 'w-16 h-16', text: 'text-sm', icon: 'text-2xl' },
  lg: { badge: 'w-24 h-24', text: 'text-base', icon: 'text-4xl' },
};

export function getTierFromXP(xp: number): Tier {
  if (xp >= 50000) return 'grandmaster';
  if (xp >= 35000) return 'master';
  if (xp >= 25000) return 'diamond';
  if (xp >= 18000) return 'platinum';
  if (xp >= 10000) return 'gold';
  if (xp >= 5000) return 'silver';
  return 'bronze';
}

export function TierBadge({
  tier,
  xp,
  showProgress = true,
  size = 'md',
  className = '',
}: TierBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  const config = tierConfig[tier];
  const sizeStyles = sizeConfig[size];

  // Calculate progress to next tier
  const progress = Math.min(
    ((xp - config.minXP) / (config.maxXP - config.minXP)) * 100,
    100
  );

  return (
    <motion.div
      ref={ref}
      className={`relative inline-flex flex-col items-center ${className}`}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', damping: 12 }}
    >
      {/* Badge container */}
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-2 rounded-full blur-xl`}
          style={{ background: config.glowColor }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Badge */}
        <motion.div
          className={`relative ${sizeStyles.badge} rounded-full bg-gradient-to-br ${config.colors} p-0.5 shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* Inner circle */}
          <div className={`w-full h-full rounded-full bg-slate-900 flex items-center justify-center`}>
            <motion.span
              className={sizeStyles.icon}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {config.icon}
            </motion.span>
          </div>

          {/* Ring animation */}
          <motion.div
            className={`absolute inset-0 rounded-full border-2 ${config.colors.includes('yellow') ? 'border-yellow-400/50' : 'border-white/30'}`}
            animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Sparkles for high tiers */}
        {['diamond', 'master', 'grandmaster'].includes(tier) && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 4) * 30,
                  y: Math.sin((i * Math.PI * 2) / 4) * 30,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Label */}
      <motion.p
        className={`mt-2 font-bold ${sizeStyles.text} bg-gradient-to-r ${config.colors} bg-clip-text text-transparent`}
        initial={{ opacity: 0, y: 5 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        {config.label}
      </motion.p>

      {/* Progress bar */}
      {showProgress && (
        <div className="mt-2 w-full max-w-[80px]">
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${config.colors}`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${progress}%` } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-1">
            {xp.toLocaleString()} / {config.maxXP.toLocaleString()}
          </p>
        </div>
      )}
    </motion.div>
  );
}
