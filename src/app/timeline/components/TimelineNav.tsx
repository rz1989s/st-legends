'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ChevronLeft, Clock, BookOpen } from 'lucide-react';

interface TimelineNavProps {
  className?: string;
}

export function TimelineNav({ className = '' }: TimelineNavProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl border-b border-slate-700/50" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-3 mt-1">
        <div className="flex items-center justify-between">
          {/* Left: Back button */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/30 transition-all"
          >
            <motion.div
              className="text-purple-400"
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ChevronLeft size={18} />
            </motion.div>
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
              Hub
            </span>
          </Link>

          {/* Center: Title */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Clock className="text-purple-400" size={18} />
            </motion.div>

            <div className="text-center">
              <h1 className="text-sm font-bold text-white">Timeline</h1>
              <p className="text-[10px] text-slate-400">Scroll through history</p>
            </div>

            <BookOpen className="text-pink-400" size={18} />
          </div>

          {/* Right: Home */}
          <Link
            href="/"
            className="group p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/30 transition-all"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Home className="text-slate-300 group-hover:text-white transition-colors" size={18} />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
