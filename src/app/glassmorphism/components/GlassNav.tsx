'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ChevronLeft, Sparkles } from 'lucide-react';

interface GlassNavProps {
  className?: string;
}

export function GlassNav({ className = '' }: GlassNavProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      {/* Glass background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-4 mt-1">
        <div className="flex items-center justify-between">
          {/* Left: Back button */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <motion.div
              className="text-white/60 group-hover:text-white transition-colors"
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ChevronLeft size={18} />
            </motion.div>
            <span className="text-sm text-white/60 group-hover:text-white transition-colors">
              Hub
            </span>
          </Link>

          {/* Center: Title */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="text-purple-400" size={18} />
            </motion.div>

            <div className="text-center">
              <h1 className="text-sm font-semibold text-white">Glassmorphism</h1>
              <p className="text-[10px] text-white/40">Frosted Glass Design</p>
            </div>

            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="text-pink-400" size={18} />
            </motion.div>
          </div>

          {/* Right: Home button */}
          <Link
            href="/"
            className="group p-2.5 rounded-xl transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Home className="text-white/60 group-hover:text-white transition-colors" size={18} />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
