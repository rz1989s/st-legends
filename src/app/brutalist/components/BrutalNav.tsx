'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

interface BrutalNavProps {
  className?: string;
}

export function BrutalNav({ className = '' }: BrutalNavProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 ${className}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-white border-b-4 border-black" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-3 mt-1">
        <div className="flex items-center justify-between">
          {/* Left: Back button */}
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-sm font-mono font-bold uppercase">Back</span>
          </Link>

          {/* Center: Title */}
          <div className="text-center">
            <h1 className="text-xl font-black uppercase tracking-tighter">
              BRUTALIST
            </h1>
            <p className="text-[10px] font-mono uppercase tracking-widest text-black/50">
              Raw Design
            </p>
          </div>

          {/* Right: Home button */}
          <Link
            href="/"
            className="group p-3 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
          >
            <Home size={18} />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
