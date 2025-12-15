'use client';

import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface ScoreCounterProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  color?: 'cyan' | 'purple' | 'pink' | 'amber' | 'green';
  className?: string;
}

const colorStyles = {
  cyan: {
    bg: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/20',
  },
  purple: {
    bg: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/20',
  },
  pink: {
    bg: 'from-pink-500/20 to-pink-500/5',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    glow: 'shadow-pink-500/20',
  },
  amber: {
    bg: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/20',
  },
  green: {
    bg: 'from-green-500/20 to-green-500/5',
    border: 'border-green-500/30',
    text: 'text-green-400',
    glow: 'shadow-green-500/20',
  },
};

export function ScoreCounter({
  value,
  label,
  icon,
  prefix = '',
  suffix = '',
  color = 'cyan',
  className = '',
}: ScoreCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const style = colorStyles[color];

  // Animated spring value
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });

  // Transform to formatted string
  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <motion.div
      ref={ref}
      className={`relative group ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', damping: 15 }}
    >
      {/* Background glow */}
      <motion.div
        className={`absolute -inset-1 rounded-xl bg-gradient-to-b ${style.bg} blur-lg opacity-0 group-hover:opacity-100 transition-opacity`}
      />

      {/* Card */}
      <div
        className={`relative px-6 py-4 rounded-xl bg-slate-900/80 border ${style.border} backdrop-blur-sm shadow-lg ${style.glow}`}
      >
        {/* Icon */}
        {icon && (
          <div className={`${style.text} mb-2`}>
            {icon}
          </div>
        )}

        {/* Value */}
        <div className="flex items-baseline gap-1">
          {prefix && (
            <span className={`text-sm font-medium ${style.text}`}>{prefix}</span>
          )}
          <motion.span
            className={`text-3xl md:text-4xl font-black font-mono ${style.text}`}
          >
            {displayValue}
          </motion.span>
          {suffix && (
            <span className={`text-sm font-medium ${style.text}`}>{suffix}</span>
          )}
        </div>

        {/* Label */}
        <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">
          {label}
        </p>

        {/* Animated bar */}
        <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${style.bg.replace('/20', '/60').replace('/5', '/40')}`}
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-8 h-8 ${style.text}`}>
          <svg viewBox="0 0 32 32" fill="none" className="w-full h-full opacity-30">
            <path
              d="M32 0L32 8L24 8L24 16L16 16L16 24L8 24L8 32L0 32"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Pulse effect on hover */}
      <motion.div
        className={`absolute inset-0 rounded-xl border-2 ${style.border} opacity-0`}
        whileHover={{
          opacity: [0, 0.5, 0],
          scale: [1, 1.05, 1.1],
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
