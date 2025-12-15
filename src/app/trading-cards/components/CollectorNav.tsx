'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ChevronLeft, Sparkles, Layers } from 'lucide-react';

interface CollectorNavProps {
  cardCount?: number;
  className?: string;
}

export function CollectorNav({ cardCount = 0, className = '' }: CollectorNavProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xl border-b border-amber-500/20" />

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Back button */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/40 transition-all"
          >
            <motion.div
              className="text-amber-400"
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ChevronLeft size={18} />
            </motion.div>
            <span className="text-sm text-amber-200/70 group-hover:text-amber-200 transition-colors">
              Hub
            </span>
          </Link>

          {/* Center: Title */}
          <div className="flex items-center gap-3">
            {/* Animated card icon */}
            <motion.div
              className="relative"
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-6 h-8 rounded bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/30" />
            </motion.div>

            <div className="text-center">
              <h1 className="text-sm font-bold text-amber-200">Trading Cards</h1>
              <p className="text-[10px] text-amber-300/50">Collect & Trade</p>
            </div>

            {/* Sparkles */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="text-amber-400" size={16} />
            </motion.div>
          </div>

          {/* Right: Card count + Home */}
          <div className="flex items-center gap-3">
            {/* Card count badge */}
            {cardCount > 0 && (
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <Layers size={14} className="text-amber-400" />
                <span className="text-xs font-bold text-amber-300">{cardCount}</span>
              </motion.div>
            )}

            <Link
              href="/"
              className="group p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/40 transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Home className="text-amber-300/70 group-hover:text-amber-200 transition-colors" size={18} />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
