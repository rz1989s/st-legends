'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Trophy, ChevronLeft, Flame, Zap } from 'lucide-react';

interface CompetitiveNavProps {
  className?: string;
}

export function CompetitiveNav({ className = '' }: CompetitiveNavProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      {/* Background with cyber effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
        {/* Bottom border glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        {/* Animated scan */}
        <motion.div
          className="absolute bottom-0 left-0 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ x: ['0%', '300%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-3 mt-1">
        <div className="flex items-center justify-between">
          {/* Left: Back button */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-700/50 hover:border-cyan-500/50 transition-all"
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ChevronLeft className="text-cyan-400" size={18} />
            </motion.div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
              Hub
            </span>
          </Link>

          {/* Center: Title with icon */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Flame className="text-orange-500" size={20} />
            </motion.div>

            <div className="relative">
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg rounded-lg"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative text-center">
                <h1 className="text-lg font-black">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    LEADERBOARD
                  </span>
                </h1>
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500">
                  <Zap size={10} className="text-yellow-400" />
                  <span>LIVE RANKINGS</span>
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>

            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="text-yellow-500" size={20} />
            </motion.div>
          </div>

          {/* Right: Home button */}
          <Link
            href="/"
            className="group p-2.5 rounded-lg bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-700/50 hover:border-cyan-500/50 transition-all"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Home className="text-slate-300 group-hover:text-white transition-colors" size={18} />
            </motion.div>
          </Link>
        </div>

        {/* Season indicator */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-4 py-1 rounded-b-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-[10px] font-bold text-white"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          SEASON 1
        </motion.div>
      </div>
    </motion.nav>
  );
}
