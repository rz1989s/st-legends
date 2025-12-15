'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Category, CATEGORIES } from '@/lib/types';

interface CategoryOrbitProps {
  selected: Category | 'all';
  onChange: (category: Category | 'all') => void;
  legendCounts?: Record<Category | 'all', number>;
  className?: string;
}

const categoryColors: Record<Category | 'all', { bg: string; text: string; glow: string; border: string }> = {
  all: {
    bg: 'bg-white/10',
    text: 'text-white',
    glow: 'shadow-white/20',
    border: 'border-white/20',
  },
  founders: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-300',
    glow: 'shadow-purple-500/30',
    border: 'border-purple-500/30',
  },
  contributors: {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-300',
    glow: 'shadow-cyan-500/30',
    border: 'border-cyan-500/30',
  },
  achievers: {
    bg: 'bg-pink-500/20',
    text: 'text-pink-300',
    glow: 'shadow-pink-500/30',
    border: 'border-pink-500/30',
  },
  legends: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-300',
    glow: 'shadow-yellow-500/30',
    border: 'border-yellow-500/30',
  },
};

export function CategoryOrbit({
  selected,
  onChange,
  legendCounts,
  className = '',
}: CategoryOrbitProps) {
  const allCategories: (Category | 'all')[] = ['all', ...CATEGORIES.map(c => c.value)];

  return (
    <div className={`relative ${className}`}>
      {/* Orbital track */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {allCategories.map((cat, index) => {
          const isSelected = selected === cat;
          const colors = categoryColors[cat];
          const categoryData = cat === 'all' ? null : CATEGORIES.find(c => c.value === cat);
          const count = legendCounts?.[cat];

          return (
            <motion.button
              key={cat}
              onClick={() => onChange(cat)}
              className={`
                relative px-4 py-2.5 rounded-full font-medium text-sm
                border backdrop-blur-sm transition-all duration-300
                ${isSelected
                  ? `${colors.bg} ${colors.text} ${colors.border} shadow-lg ${colors.glow}`
                  : 'bg-slate-900/50 text-white/60 border-white/10 hover:bg-slate-800/50 hover:text-white/80 hover:border-white/20'
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Selection ring animation */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 ${colors.border}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Orbiting dot for selected */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className={`absolute w-1.5 h-1.5 rounded-full ${colors.bg.replace('/20', '')} shadow-lg`}
                      style={{ top: -3, left: '50%', marginLeft: -3 }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content */}
              <span className="relative flex items-center gap-2">
                {cat === 'all' ? (
                  <>
                    <span className="text-base">✦</span>
                    <span>All Stars</span>
                  </>
                ) : (
                  <>
                    <span className="text-base">{categoryData?.emoji}</span>
                    <span>{categoryData?.label}</span>
                  </>
                )}

                {/* Count badge */}
                {count !== undefined && (
                  <motion.span
                    className={`
                      ml-1 px-1.5 py-0.5 text-[10px] rounded-full
                      ${isSelected ? 'bg-white/20' : 'bg-white/10'}
                    `}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {count}
                  </motion.span>
                )}
              </span>

              {/* Glow effect on hover */}
              <motion.div
                className={`absolute inset-0 rounded-full ${colors.bg} blur-xl opacity-0`}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Decorative connection line */}
      <div className="absolute left-1/2 top-full mt-4 w-px h-8 bg-gradient-to-b from-white/20 to-transparent -translate-x-1/2 hidden md:block" />
    </div>
  );
}
