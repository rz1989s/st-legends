'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ChevronLeft, Trophy, Award } from 'lucide-react';

interface HallwayNavProps {
  totalLegends?: number;
  className?: string;
}

export function HallwayNav({ totalLegends = 0, className = '' }: HallwayNavProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      {/* Background with wood texture feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950 to-amber-900/95 backdrop-blur-md border-b border-yellow-600/30" />

      {/* Gold trim at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Back button */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-600/30 hover:border-yellow-500/50 transition-all"
          >
            <motion.div
              className="text-yellow-400"
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ChevronLeft size={18} />
            </motion.div>
            <span className="text-sm text-yellow-200/70 group-hover:text-yellow-200 transition-colors">
              Hub
            </span>
          </Link>

          {/* Center: Title with trophy */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Trophy className="text-yellow-400" size={20} />
            </motion.div>

            <div className="text-center">
              <h1 className="text-sm font-bold text-yellow-200">Trophy Wall</h1>
              <p className="text-[10px] text-yellow-300/50">Hall of Champions</p>
            </div>

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 1 }}
            >
              <Award className="text-yellow-400" size={20} />
            </motion.div>
          </div>

          {/* Right: Stats + Home */}
          <div className="flex items-center gap-3">
            {totalLegends > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-600/20 border border-yellow-600/30">
                <Trophy size={14} className="text-yellow-400" />
                <span className="text-xs font-bold text-yellow-300">{totalLegends}</span>
              </div>
            )}

            <Link
              href="/"
              className="group p-2.5 rounded-lg bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-600/30 hover:border-yellow-500/50 transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Home className="text-yellow-300/70 group-hover:text-yellow-200 transition-colors" size={18} />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
