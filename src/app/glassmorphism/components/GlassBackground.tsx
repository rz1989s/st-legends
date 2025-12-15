'use client';

import { motion } from 'framer-motion';
import { OrbField } from './GradientOrb';

interface GlassBackgroundProps {
  className?: string;
}

export function GlassBackground({ className = '' }: GlassBackgroundProps) {
  return (
    <div className={`fixed inset-0 ${className}`}>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
        }}
      />

      {/* Animated gradient orbs */}
      <OrbField />

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(at 40% 20%, rgba(139, 92, 246, 0.3) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(236, 72, 153, 0.2) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(6, 182, 212, 0.2) 0px, transparent 50%),
            radial-gradient(at 80% 50%, rgba(251, 146, 60, 0.15) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
            radial-gradient(at 80% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 50%)
          `,
        }}
      />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
