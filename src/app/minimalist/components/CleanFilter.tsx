'use client';

import { motion } from 'framer-motion';
import { Category, CATEGORIES } from '@/lib/types';

interface CleanFilterProps {
  selected: Category | 'all';
  onChange: (category: Category | 'all') => void;
  className?: string;
}

export function CleanFilter({ selected, onChange, className = '' }: CleanFilterProps) {
  const options: Array<{ value: Category | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    ...CATEGORIES.map(cat => ({ value: cat.value, label: cat.label })),
  ];

  return (
    <motion.div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {options.map((option, index) => (
        <motion.button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative px-4 py-2 text-sm transition-colors duration-200 ${
            selected === option.value
              ? 'text-neutral-900'
              : 'text-neutral-400 hover:text-neutral-600'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          {option.label}

          {/* Active indicator */}
          {selected === option.value && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-neutral-900"
              layoutId="filterIndicator"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}

      {/* Count indicator */}
      <span className="ml-4 text-xs text-neutral-300 font-mono">
        {selected === 'all' ? '12' : '3'} results
      </span>
    </motion.div>
  );
}

// Minimal search input
interface CleanSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CleanSearch({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: CleanSearchProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-0 py-2 text-neutral-900 placeholder-neutral-300 bg-transparent border-b border-neutral-200 focus:border-neutral-900 focus:outline-none transition-colors"
      />

      {/* Clear button */}
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => onChange('')}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
