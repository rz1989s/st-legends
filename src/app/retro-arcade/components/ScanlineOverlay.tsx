'use client';

import { motion } from 'framer-motion';

interface ScanlineOverlayProps {
  opacity?: number;
  className?: string;
}

export function ScanlineOverlay({ opacity = 0.1, className = '' }: ScanlineOverlayProps) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ position: 'fixed', inset: 0 }}>
      {/* Scanlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      {/* CRT flicker */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.02)',
        }}
        animate={{ opacity: [0, 0.02, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Moving scanline */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(transparent, rgba(0,255,255,0.1), transparent)',
        }}
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
