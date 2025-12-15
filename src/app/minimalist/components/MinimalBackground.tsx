'use client';

import { motion } from 'framer-motion';

interface MinimalBackgroundProps {
  variant?: 'light' | 'subtle' | 'warm';
  className?: string;
}

export function MinimalBackground({ variant = 'light', className = '' }: MinimalBackgroundProps) {
  const backgrounds = {
    light: 'bg-white',
    subtle: 'bg-neutral-50',
    warm: 'bg-stone-50',
  };

  return (
    <div className={`fixed inset-0 ${backgrounds[variant]} ${className}`}>
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(neutral 1px, transparent 1px),
                           linear-gradient(90deg, neutral 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Very subtle gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, transparent 0%, rgba(0,0,0,0.02) 100%)',
        }}
      />

      {/* Subtle floating shapes for visual interest */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.02), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[5%] w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.015), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
