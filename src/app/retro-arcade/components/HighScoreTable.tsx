'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Legend } from '@/lib/types';

interface HighScoreTableProps {
  legends: Legend[];
  className?: string;
}

export function HighScoreTable({ legends, className = '' }: HighScoreTableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const sortedLegends = [...legends].sort((a, b) => b.xp - a.xp);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Table header */}
      <div className="bg-cyan-500 border-4 border-cyan-700 px-4 py-2 mb-2">
        <div className="flex items-center justify-between font-mono text-sm font-bold text-white uppercase">
          <span>RANK</span>
          <span>NAME</span>
          <span>SCORE</span>
        </div>
      </div>

      {/* Table rows */}
      <div className="space-y-1">
        {sortedLegends.slice(0, 10).map((legend, index) => (
          <motion.div
            key={legend.id}
            className={`relative flex items-center justify-between px-4 py-2 font-mono text-sm border-2 ${
              index === 0
                ? 'bg-yellow-400 border-yellow-600 text-black'
                : index === 1
                ? 'bg-slate-300 border-slate-500 text-black'
                : index === 2
                ? 'bg-orange-400 border-orange-600 text-black'
                : 'bg-slate-800 border-slate-700 text-cyan-400'
            }`}
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.1 }}
          >
            {/* Rank */}
            <span className="w-12 font-bold">
              {index + 1}.
            </span>

            {/* Name with blink effect for top 3 */}
            <motion.span
              className="flex-1 uppercase tracking-wider"
              animate={index < 3 ? { opacity: [1, 0.7, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {legend.name.substring(0, 10).toUpperCase()}
            </motion.span>

            {/* Score */}
            <span className="font-bold tabular-nums">
              {legend.xp.toLocaleString().padStart(8, ' ')}
            </span>

            {/* Crown for #1 */}
            {index === 0 && (
              <motion.span
                className="absolute -top-2 -right-2 text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                👑
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Blinking cursor */}
      <motion.div
        className="mt-4 font-mono text-cyan-400"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        PRESS START_
      </motion.div>
    </motion.div>
  );
}
