'use client';

import { motion } from 'framer-motion';
import { Legend, CATEGORIES } from '@/lib/types';
import { SocialLinks } from './SocialLinks';

interface LegendCardProps {
  legend: Legend;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function LegendCard({ legend, variant = 'default', className = '' }: LegendCardProps) {
  const category = CATEGORIES.find((c) => c.value === legend.category);

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-zinc-900 rounded-xl p-4 flex items-center gap-4 ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
          {legend.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{legend.name}</h3>
          <p className="text-sm text-zinc-400 truncate">{legend.title}</p>
        </div>
        <span className="text-lg">{category?.emoji}</span>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/20 ${className}`}
      >
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold shrink-0">
            {legend.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                {category?.emoji} {category?.label}
              </span>
              {legend.featured && (
                <span className="text-sm px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">
                  ⭐ Featured
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{legend.name}</h2>
            <p className="text-zinc-400 mb-3">{legend.title}</p>
            <p className="text-zinc-300 text-sm mb-4 line-clamp-2">{legend.bio}</p>
            <SocialLinks socials={legend.socials} size="sm" />
          </div>
        </div>
        {legend.stats && (
          <div className="flex gap-6 mt-6 pt-6 border-t border-zinc-700">
            {legend.stats.projects && (
              <div>
                <div className="text-2xl font-bold text-white">{legend.stats.projects}</div>
                <div className="text-xs text-zinc-400">Projects</div>
              </div>
            )}
            {legend.stats.contributions && (
              <div>
                <div className="text-2xl font-bold text-white">{legend.stats.contributions}</div>
                <div className="text-xs text-zinc-400">Contributions</div>
              </div>
            )}
            {legend.stats.awards && (
              <div>
                <div className="text-2xl font-bold text-white">{legend.stats.awards}</div>
                <div className="text-xs text-zinc-400">Awards</div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors ${className}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
          {legend.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">{legend.name}</h3>
          <p className="text-sm text-zinc-400 truncate">{legend.title}</p>
        </div>
      </div>
      <p className="text-zinc-300 text-sm mb-4 line-clamp-3">{legend.bio}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">
          {category?.emoji} {category?.label}
        </span>
        <SocialLinks socials={legend.socials} size="sm" />
      </div>
    </motion.div>
  );
}
