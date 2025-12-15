'use client';

import { motion } from 'framer-motion';
import { Category, CATEGORIES } from '@/lib/types';
import { Trophy } from 'lucide-react';

interface CategoryFilterProps {
  selected: Category | 'all';
  onChange: (category: Category | 'all') => void;
  counts?: Record<Category | 'all', number>;
  className?: string;
}

export function CategoryFilter({
  selected,
  onChange,
  counts,
  className = '',
}: CategoryFilterProps) {
  const allCategories: (Category | 'all')[] = ['all', ...CATEGORIES.map(c => c.value)];

  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {allCategories.map((cat) => {
        const isSelected = selected === cat;
        const categoryData = cat === 'all' ? null : CATEGORIES.find(c => c.value === cat);
        const count = counts?.[cat];

        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            className={`
              relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all
              ${isSelected
                ? 'bg-gradient-to-br from-yellow-600 to-amber-700 text-yellow-100 shadow-lg shadow-yellow-600/30 border border-yellow-500/50'
                : 'bg-amber-900/50 text-yellow-200/70 border border-yellow-600/20 hover:bg-amber-900/70 hover:text-yellow-200 hover:border-yellow-600/40'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              {cat === 'all' ? (
                <>
                  <Trophy size={14} />
                  <span>All Champions</span>
                </>
              ) : (
                <>
                  <span>{categoryData?.emoji}</span>
                  <span>{categoryData?.label}</span>
                </>
              )}

              {count !== undefined && (
                <span className={`
                  ml-1 px-1.5 py-0.5 text-[10px] rounded-full
                  ${isSelected ? 'bg-yellow-500/30' : 'bg-yellow-600/20'}
                `}>
                  {count}
                </span>
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
