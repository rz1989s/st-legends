'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ArenaBackgroundProps {
  className?: string;
}

export function ArenaBackground({ className = '' }: ArenaBackgroundProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div ref={containerRef} className={`fixed inset-0 overflow-hidden ${className}`}>
      {/* Base gradient - dark arena */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Arena floor gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: `radial-gradient(ellipse 150% 80% at 50% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 60%)`,
        }}
      />

      {/* Spotlight beams */}
      <motion.div
        className="absolute top-0 left-[10%] w-96 h-[150%]"
        style={{
          background: `linear-gradient(180deg, rgba(147, 51, 234, 0.15) 0%, transparent 60%)`,
          transform: 'rotate(-15deg)',
          transformOrigin: 'top center',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150%]"
        style={{
          background: `linear-gradient(180deg, rgba(6, 182, 212, 0.2) 0%, transparent 50%)`,
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-0 right-[10%] w-96 h-[150%]"
        style={{
          background: `linear-gradient(180deg, rgba(236, 72, 153, 0.15) 0%, transparent 60%)`,
          transform: 'rotate(15deg)',
          transformOrigin: 'top center',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Stadium lights (top) */}
      <div className="absolute top-0 left-0 right-0 h-4">
        <div className="flex justify-around">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white"
              animate={{
                opacity: [0.3, 1, 0.3],
                boxShadow: [
                  '0 0 10px rgba(255,255,255,0.3)',
                  '0 0 30px rgba(255,255,255,0.8)',
                  '0 0 10px rgba(255,255,255,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
          style={{ left: `${particle.x}%` }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Hexagon grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2306b6d4' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Side glow bars */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-pink-500 via-cyan-500 to-purple-500"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: `linear-gradient(to top, rgba(6, 182, 212, 0.1), transparent)`,
        }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
