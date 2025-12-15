'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Home, Gamepad2 } from 'lucide-react';

interface RetroNavProps {
  className?: string;
}

export function RetroNav({ className = '' }: RetroNavProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 ${className}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900 border-b-4 border-cyan-500" />

      {/* Pixel pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,255,255,0.1) 4px, rgba(0,255,255,0.1) 8px)',
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-3 mt-1">
        <div className="flex items-center justify-between">
          {/* Left: Back button */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-400 border-4 border-pink-700 text-white font-mono font-bold uppercase text-sm transition-colors"
          >
            <motion.div whileHover={{ x: -3 }}>
              <ChevronLeft size={16} />
            </motion.div>
            <span>EXIT</span>
          </Link>

          {/* Center: Title */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Gamepad2 className="text-cyan-400" size={24} />
            </motion.div>

            <div className="text-center">
              <h1 className="font-mono text-lg font-bold text-cyan-400 uppercase tracking-wider">
                RETRO ARCADE
              </h1>
              <div className="flex items-center justify-center gap-1">
                {['●', '●', '●'].map((dot, i) => (
                  <motion.span
                    key={i}
                    className="text-yellow-400 text-xs"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.5, delay: i * 0.2, repeat: Infinity }}
                  >
                    {dot}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            >
              <Gamepad2 className="text-pink-400" size={24} />
            </motion.div>
          </div>

          {/* Right: Home button */}
          <Link
            href="/"
            className="group p-3 bg-cyan-500 hover:bg-cyan-400 border-4 border-cyan-700 transition-colors"
          >
            <Home className="text-white" size={16} />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
