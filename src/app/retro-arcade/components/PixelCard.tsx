'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Legend } from '@/lib/types';

interface PixelCardProps {
  legend: Legend;
  index?: number;
  className?: string;
}

export function PixelCard({ legend, index = 0, className = '' }: PixelCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  const colors = [
    { bg: 'bg-red-500', border: 'border-red-400', shadow: 'shadow-red-500/50' },
    { bg: 'bg-cyan-500', border: 'border-cyan-400', shadow: 'shadow-cyan-500/50' },
    { bg: 'bg-yellow-400', border: 'border-yellow-300', shadow: 'shadow-yellow-400/50' },
    { bg: 'bg-green-500', border: 'border-green-400', shadow: 'shadow-green-500/50' },
    { bg: 'bg-pink-500', border: 'border-pink-400', shadow: 'shadow-pink-500/50' },
    { bg: 'bg-purple-500', border: 'border-purple-400', shadow: 'shadow-purple-500/50' },
  ];

  const color = colors[index % colors.length];

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Pixel shadow */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black/50" />

      {/* Main card */}
      <motion.div
        className={`relative ${color.bg} border-4 border-black p-1`}
        animate={{ y: isHovered ? -4 : 0 }}
        transition={{ duration: 0.1 }}
      >
        {/* Inner border */}
        <div className={`border-2 ${color.border} p-4`}>
          {/* Header with pixel avatar */}
          <div className="flex items-start gap-4 mb-4">
            {/* Pixel avatar */}
            <div className="w-16 h-16 bg-slate-900 border-2 border-white flex items-center justify-center">
              <span className="text-2xl font-bold text-white font-mono">
                {legend.name.charAt(0)}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black font-mono uppercase tracking-tight">
                {legend.name}
              </h3>
              <p className="text-xs font-mono text-black/70 uppercase">
                {legend.title}
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="bg-black/20 p-2 mb-3">
            <div className="flex items-center justify-between font-mono text-xs text-black">
              <span>XP:</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-3 ${
                      i < Math.ceil((legend.xp / 50000) * 5)
                        ? 'bg-yellow-300 border border-yellow-600'
                        : 'bg-black/30'
                    }`}
                  />
                ))}
                <span className="ml-2">{legend.xp.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Category badge */}
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 bg-black text-white font-mono text-xs uppercase">
              {legend.category}
            </span>
            <span className="font-mono text-xs text-black">
              {legend.achievements.length} BADGES
            </span>
          </div>

          {/* Hover effect - coin animation */}
          {isHovered && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 border-2 border-yellow-600 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 360], y: [0, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-bold">$</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
