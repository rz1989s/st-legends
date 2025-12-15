'use client';

import { motion } from 'framer-motion';

interface VelvetRopeProps {
  width?: string;
  className?: string;
}

export function VelvetRope({ width = 'w-full', className = '' }: VelvetRopeProps) {
  return (
    <div className={`relative ${width} h-16 ${className}`}>
      {/* Left stanchion */}
      <div className="absolute left-0 bottom-0 flex flex-col items-center">
        {/* Gold ball top */}
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-lg">
          <div className="absolute inset-1 rounded-full bg-gradient-to-tl from-transparent to-white/30" />
        </div>

        {/* Pole */}
        <div className="w-2 h-12 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 rounded-sm">
          <div className="absolute inset-0 w-0.5 bg-white/20 rounded-l-sm" />
        </div>

        {/* Base */}
        <div className="w-8 h-2 bg-gradient-to-b from-amber-600 to-amber-800 rounded-sm shadow-lg">
          <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>

      {/* Right stanchion */}
      <div className="absolute right-0 bottom-0 flex flex-col items-center">
        {/* Gold ball top */}
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-lg">
          <div className="absolute inset-1 rounded-full bg-gradient-to-tl from-transparent to-white/30" />
        </div>

        {/* Pole */}
        <div className="w-2 h-12 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 rounded-sm">
          <div className="absolute inset-0 w-0.5 bg-white/20 rounded-l-sm" />
        </div>

        {/* Base */}
        <div className="w-8 h-2 bg-gradient-to-b from-amber-600 to-amber-800 rounded-sm shadow-lg">
          <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>

      {/* Velvet rope */}
      <motion.div
        className="absolute left-6 right-6 top-3"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Rope */}
        <motion.div
          className="relative h-3 rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #7f1d1d, #dc2626, #991b1b, #7f1d1d)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)',
          }}
          animate={{
            y: [0, 2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Velvet texture */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              )`,
            }}
          />

          {/* Highlight */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />

          {/* Gold rings */}
          <div className="absolute left-2 inset-y-0 w-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 rounded-full" />
          <div className="absolute right-2 inset-y-0 w-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 rounded-full" />
        </motion.div>

        {/* Rope shadow */}
        <div
          className="absolute top-full left-2 right-2 h-2 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, black, transparent)',
            filter: 'blur(4px)',
          }}
        />
      </motion.div>

      {/* Catenary curve effect - subtle sag in the middle */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <path
          d="M 5 5 Q 50 15, 95 5"
          fill="none"
          stroke="url(#ropeGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
