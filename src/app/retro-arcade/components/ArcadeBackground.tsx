'use client';

import { motion } from 'framer-motion';
import { ScanlineOverlay } from './ScanlineOverlay';

interface ArcadeBackgroundProps {
  className?: string;
}

export function ArcadeBackground({ className = '' }: ArcadeBackgroundProps) {
  return (
    <div className={`fixed inset-0 ${className}`}>
      {/* Base dark background */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Neon glow effects */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(250, 204, 21, 0.15), transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      />

      {/* Grid floor effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(transparent 60%, rgba(6, 182, 212, 0.1) 100%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Scanline overlay */}
      <ScanlineOverlay opacity={0.05} />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </div>
  );
}
