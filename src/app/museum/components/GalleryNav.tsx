'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ChevronLeft, Landmark, Palette } from 'lucide-react';

interface GalleryNavProps {
  className?: string;
}

export function GalleryNav({ className = '' }: GalleryNavProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-xl" />
        {/* Bottom border - elegant gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-4 mt-1">
        <div className="flex items-center justify-between">
          {/* Left: Back button */}
          <Link
            href="/"
            className="group flex items-center gap-3 px-4 py-2 rounded-sm bg-stone-900/50 hover:bg-stone-800/80 border border-amber-900/30 hover:border-amber-700/50 transition-all"
          >
            <motion.div
              className="text-amber-600"
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ChevronLeft size={18} />
            </motion.div>
            <span className="text-sm font-medium text-stone-300 group-hover:text-white transition-colors tracking-wide">
              Return to Lobby
            </span>
          </Link>

          {/* Center: Museum title */}
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Landmark className="text-amber-600" size={20} />
            </motion.div>

            <div className="text-center">
              <h1 className="text-lg font-serif text-stone-100 tracking-wider">
                Museum of Legends
              </h1>
              <div className="flex items-center justify-center gap-2 mt-0.5">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-600/50" />
                <p className="text-[10px] text-amber-600/60 uppercase tracking-[0.2em]">
                  Est. 2021
                </p>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-600/50" />
              </div>
            </div>

            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            >
              <Palette className="text-amber-600" size={20} />
            </motion.div>
          </div>

          {/* Right: Home button */}
          <Link
            href="/"
            className="group p-3 rounded-sm bg-stone-900/50 hover:bg-stone-800/80 border border-amber-900/30 hover:border-amber-700/50 transition-all"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Home className="text-stone-400 group-hover:text-amber-500 transition-colors" size={18} />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-0 left-4 w-8 h-4">
        <div className="absolute bottom-0 left-0 w-full h-px bg-amber-600/30" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-amber-600/30" />
      </div>
      <div className="absolute bottom-0 right-4 w-8 h-4">
        <div className="absolute bottom-0 right-0 w-full h-px bg-amber-600/30" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-amber-600/30" />
      </div>
    </motion.nav>
  );
}
