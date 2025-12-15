'use client';

import { motion } from 'framer-motion';

interface NebulaGradientProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function NebulaGradient({ className = '', intensity = 'medium' }: NebulaGradientProps) {
  const opacityMap = {
    low: 0.1,
    medium: 0.2,
    high: 0.35,
  };

  const opacity = opacityMap[intensity];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Deep space base */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0a0a1a] to-slate-950" />

      {/* Primary nebula - Purple */}
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{
          width: '60%',
          height: '60%',
          left: '10%',
          top: '5%',
          background: `radial-gradient(ellipse, rgba(139, 92, 246, ${opacity}) 0%, rgba(88, 28, 135, ${opacity * 0.5}) 40%, transparent 70%)`,
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary nebula - Blue */}
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{
          width: '50%',
          height: '50%',
          right: '5%',
          bottom: '10%',
          background: `radial-gradient(ellipse, rgba(59, 130, 246, ${opacity}) 0%, rgba(30, 64, 175, ${opacity * 0.5}) 40%, transparent 70%)`,
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Tertiary nebula - Pink/Magenta */}
      <motion.div
        className="absolute rounded-full blur-[80px]"
        style={{
          width: '40%',
          height: '40%',
          left: '40%',
          top: '30%',
          background: `radial-gradient(ellipse, rgba(236, 72, 153, ${opacity * 0.7}) 0%, rgba(157, 23, 77, ${opacity * 0.3}) 50%, transparent 70%)`,
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Cyan accent */}
      <motion.div
        className="absolute rounded-full blur-[60px]"
        style={{
          width: '25%',
          height: '25%',
          right: '20%',
          top: '15%',
          background: `radial-gradient(ellipse, rgba(34, 211, 238, ${opacity * 0.6}) 0%, transparent 60%)`,
        }}
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Dust particles layer */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />
    </div>
  );
}
