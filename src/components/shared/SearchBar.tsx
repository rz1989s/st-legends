'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type SearchTheme =
  | 'dark'
  | 'light'
  | 'glass'
  | 'brutalist'
  | 'arcade'
  | 'museum'
  | 'constellation'
  | 'trading-card'
  | 'trophy'
  | 'timeline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  theme?: SearchTheme;
  className?: string;
}

const themeStyles: Record<SearchTheme, {
  container: string;
  input: string;
  icon: string;
  clearBtn: string;
}> = {
  dark: {
    container: 'bg-slate-800/50 border border-slate-700 focus-within:border-purple-500',
    input: 'text-white placeholder:text-slate-500',
    icon: 'text-slate-500',
    clearBtn: 'text-slate-400 hover:text-white',
  },
  light: {
    container: 'bg-white border border-neutral-200 focus-within:border-neutral-400',
    input: 'text-neutral-900 placeholder:text-neutral-400',
    icon: 'text-neutral-400',
    clearBtn: 'text-neutral-400 hover:text-neutral-600',
  },
  glass: {
    container: 'bg-white/10 backdrop-blur-xl border border-white/20 focus-within:border-white/40',
    input: 'text-white placeholder:text-white/50',
    icon: 'text-white/50',
    clearBtn: 'text-white/50 hover:text-white',
  },
  brutalist: {
    container: 'bg-white border-4 border-black focus-within:bg-yellow-100',
    input: 'text-black placeholder:text-black/50 font-mono uppercase',
    icon: 'text-black',
    clearBtn: 'text-black hover:text-red-600',
  },
  arcade: {
    container: 'bg-black border-2 border-cyan-500 focus-within:shadow-[0_0_15px_rgba(0,255,255,0.5)]',
    input: 'text-cyan-300 placeholder:text-cyan-600 font-mono',
    icon: 'text-cyan-500',
    clearBtn: 'text-pink-500 hover:text-pink-400',
  },
  museum: {
    container: 'bg-stone-800/50 border border-amber-600/30 focus-within:border-amber-500/50',
    input: 'text-stone-100 placeholder:text-stone-500 font-serif',
    icon: 'text-amber-600/50',
    clearBtn: 'text-amber-500/50 hover:text-amber-400',
  },
  constellation: {
    container: 'bg-indigo-950/50 border border-indigo-500/30 focus-within:border-indigo-400/50',
    input: 'text-indigo-100 placeholder:text-indigo-400/50',
    icon: 'text-indigo-500/50',
    clearBtn: 'text-indigo-400/50 hover:text-indigo-300',
  },
  'trading-card': {
    container: 'bg-slate-800/50 border border-amber-500/30 focus-within:border-amber-400/50',
    input: 'text-slate-100 placeholder:text-slate-500',
    icon: 'text-amber-500/50',
    clearBtn: 'text-amber-400/50 hover:text-amber-300',
  },
  trophy: {
    container: 'bg-amber-900/30 border border-amber-400/30 focus-within:border-amber-400/50',
    input: 'text-amber-100 placeholder:text-amber-300/50',
    icon: 'text-amber-500/50',
    clearBtn: 'text-amber-400/50 hover:text-amber-300',
  },
  timeline: {
    container: 'bg-slate-800/50 border border-purple-500/30 focus-within:border-purple-400/50',
    input: 'text-slate-100 placeholder:text-slate-500',
    icon: 'text-purple-500/50',
    clearBtn: 'text-purple-400/50 hover:text-purple-300',
  },
};

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search legends...',
  theme = 'dark',
  className = ''
}: SearchBarProps) {
  const styles = themeStyles[theme];
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${styles.container}`}>
        <Search size={18} className={styles.icon} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent outline-none text-sm ${styles.input}`}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className={`p-1 rounded-full transition-colors ${styles.clearBtn}`}
            >
              <X size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
