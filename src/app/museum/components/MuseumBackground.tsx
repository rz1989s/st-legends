'use client';

import { motion } from 'framer-motion';

interface MuseumBackgroundProps {
  className?: string;
}

export function MuseumBackground({ className = '' }: MuseumBackgroundProps) {
  return (
    <div className={`fixed inset-0 ${className}`}>
      {/* Base color - warm dark stone */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />

      {/* Marble texture layer */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />

      {/* Marble veins */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="vein1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 30% Q 25% 35%, 50% 25% T 100% 40%"
          stroke="url(#vein1)"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M 0 60% Q 30% 55%, 60% 65% T 100% 55%"
          stroke="url(#vein1)"
          strokeWidth="0.3"
          fill="none"
        />
        <path
          d="M 0 80% Q 40% 85%, 70% 75% T 100% 90%"
          stroke="url(#vein1)"
          strokeWidth="0.4"
          fill="none"
        />
      </svg>

      {/* Wall panels effect */}
      <div className="absolute inset-0">
        {/* Top molding */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-stone-800 to-transparent" />
        <div className="absolute top-4 left-0 right-0 h-1 bg-gradient-to-b from-amber-900/30 to-transparent" />

        {/* Bottom molding */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-stone-950 to-transparent" />

        {/* Side panel borders */}
        <div className="absolute top-0 bottom-0 left-[10%] w-px bg-gradient-to-b from-transparent via-amber-900/20 to-transparent" />
        <div className="absolute top-0 bottom-0 right-[10%] w-px bg-gradient-to-b from-transparent via-amber-900/20 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-gradient-to-b from-transparent via-amber-900/10 to-transparent" />
      </div>

      {/* Ambient lighting */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217, 119, 6, 0.08), transparent 70%)',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217, 119, 6, 0.05), transparent 70%)',
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(161, 98, 7, 0.06), transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, delay: 4 }}
      />

      {/* Floor gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: 'linear-gradient(to top, rgba(41, 37, 36, 0.8), transparent)',
        }}
      />

      {/* Floor shine */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(217, 119, 6, 0.05), transparent)',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
