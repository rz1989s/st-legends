'use client';

import { motion } from 'framer-motion';

interface VelvetBackgroundProps {
  className?: string;
}

export function VelvetBackground({ className = '' }: VelvetBackgroundProps) {
  return (
    <div className={`fixed inset-0 ${className}`}>
      {/* Base gradient - deep red/maroon velvet */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950 via-amber-950 to-stone-950" />

      {/* Velvet texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Vertical stripes (curtain folds) */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-[5%]"
            style={{
              left: `${i * 5}%`,
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(255,255,255,0.05) 30%,
                rgba(0,0,0,0.1) 70%,
                transparent 100%
              )`,
            }}
          />
        ))}
      </div>

      {/* Ambient lighting from top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Side vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Wood floor gradient at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(92, 64, 51, 0.5), transparent)',
        }}
      />
    </div>
  );
}
