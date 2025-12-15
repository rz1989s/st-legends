'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Category, CATEGORIES } from '@/lib/types';

interface ChapterDividerProps {
  category: Category;
  count: number;
  className?: string;
}

export function ChapterDivider({ category, count, className = '' }: ChapterDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const categoryData = CATEGORIES.find(c => c.value === category);

  const categoryColors: Record<Category, { bg: string; text: string; glow: string }> = {
    founders: { bg: 'from-purple-600 to-purple-800', text: 'text-purple-200', glow: 'shadow-purple-500/30' },
    contributors: { bg: 'from-cyan-600 to-cyan-800', text: 'text-cyan-200', glow: 'shadow-cyan-500/30' },
    achievers: { bg: 'from-pink-600 to-pink-800', text: 'text-pink-200', glow: 'shadow-pink-500/30' },
    legends: { bg: 'from-yellow-600 to-amber-800', text: 'text-yellow-200', glow: 'shadow-yellow-500/30' },
  };

  const colors = categoryColors[category];

  return (
    <motion.div
      ref={ref}
      className={`relative py-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center">
        {/* Left line */}
        <motion.div
          className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-slate-600"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ originX: 1 }}
        />

        {/* Chapter badge */}
        <motion.div
          className={`relative mx-6 px-8 py-4 rounded-2xl bg-gradient-to-br ${colors.bg} shadow-2xl ${colors.glow}`}
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3, type: 'spring' }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 rounded-2xl opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }} />

          <div className="relative text-center">
            <span className="text-4xl mb-2 block">{categoryData?.emoji}</span>
            <h2 className={`text-2xl font-bold ${colors.text}`}>
              {categoryData?.label}
            </h2>
            <p className="text-white/60 text-sm mt-1">{count} legends</p>
          </div>

          {/* Floating particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/50"
              style={{
                top: `${20 + i * 20}%`,
                left: `${i % 2 === 0 ? -10 : 110}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>

        {/* Right line */}
        <motion.div
          className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-slate-600"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
}
