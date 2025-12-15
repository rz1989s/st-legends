'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ArcadeScreenProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function ArcadeScreen({ children, title, className = '' }: ArcadeScreenProps) {
  return (
    <div className={`relative ${className}`}>
      {/* CRT monitor frame */}
      <div className="relative bg-slate-800 rounded-lg p-4 border-4 border-slate-700">
        {/* Monitor bezel */}
        <div className="absolute inset-2 rounded border-4 border-slate-600" />

        {/* Screen */}
        <div className="relative bg-slate-950 rounded overflow-hidden">
          {/* Screen glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 100px rgba(0, 255, 200, 0.1)',
            }}
          />

          {/* Title bar */}
          {title && (
            <div className="bg-slate-900 border-b-2 border-cyan-500 px-4 py-2">
              <span className="font-mono text-cyan-400 text-sm uppercase tracking-wider">
                {title}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="relative p-4">
            {children}
          </div>

          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
            }}
          />

          {/* CRT curve effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.3) 100%)',
            }}
          />

          {/* Screen flicker */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-white"
            animate={{ opacity: [0, 0.02, 0] }}
            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
          />
        </div>

        {/* Monitor controls */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700" />
          <div className="w-3 h-3 rounded-full bg-green-500 border border-green-700" />
          <div className="w-8 h-2 rounded-full bg-slate-600" />
        </div>
      </div>

      {/* Monitor stand */}
      <div className="flex justify-center">
        <div className="w-24 h-4 bg-slate-700 rounded-b-lg" />
      </div>
      <div className="flex justify-center">
        <div className="w-32 h-2 bg-slate-600 rounded-b" />
      </div>
    </div>
  );
}
