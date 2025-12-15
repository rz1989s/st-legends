'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ChevronLeft, Sparkles } from 'lucide-react';

interface GalacticNavProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function GalacticNav({
  title = 'Constellation Hall',
  subtitle = 'Navigate the Superteam Galaxy',
  className = '',
}: GalacticNavProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl border-b border-white/5" />

      {/* Animated stars in nav background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: '50%',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Back button */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <motion.div
              className="text-purple-400 group-hover:text-purple-300"
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ChevronLeft size={18} />
            </motion.div>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
              Hub
            </span>
          </Link>

          {/* Center: Title with orbital animation */}
          <div className="flex items-center gap-3">
            {/* Orbiting sparkle */}
            <div className="relative w-8 h-8">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="text-purple-400" size={16} style={{ transform: 'translateX(8px)' }} />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50" />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-sm font-semibold text-white">{title}</h1>
              <p className="text-[10px] text-white/40">{subtitle}</p>
            </div>

            {/* Orbiting sparkle (mirrored) */}
            <div className="relative w-8 h-8">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="text-cyan-400" size={14} style={{ transform: 'translateX(-8px)' }} />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/50" />
              </div>
            </div>
          </div>

          {/* Right: Home button */}
          <Link
            href="/"
            className="group p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Home className="text-white/70 group-hover:text-white transition-colors" size={18} />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </motion.nav>
  );
}
