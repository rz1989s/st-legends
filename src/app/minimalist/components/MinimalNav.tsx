'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface MinimalNavProps {
  className?: string;
}

export function MinimalNav({ className = '' }: MinimalNavProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm border-b border-neutral-100" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-4 mt-1">
        <div className="flex items-center justify-between">
          {/* Left: Back link */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowLeft size={16} />
            </motion.div>
            <span className="text-sm tracking-wide">Back</span>
          </Link>

          {/* Center: Title */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-[0.2em]">
              Minimalist
            </span>
          </div>

          {/* Right: Page indicator */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-400">
              Hall of Fame
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
