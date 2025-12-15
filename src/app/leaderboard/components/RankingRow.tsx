'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, TrendingDown, Minus, Zap, Star, Shield } from 'lucide-react';
import { Legend } from '@/lib/types';

interface RankingRowProps {
  legend: Legend;
  rank: number;
  previousRank?: number;
  className?: string;
}

const tierColors: Record<string, { bg: string; border: string; text: string }> = {
  founders: { bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-400' },
  contributors: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400' },
  achievers: { bg: 'bg-amber-500/20', border: 'border-amber-500/50', text: 'text-amber-400' },
  legends: { bg: 'bg-pink-500/20', border: 'border-pink-500/50', text: 'text-pink-400' },
};

export function RankingRow({ legend, rank, previousRank, className = '' }: RankingRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const rankChange = previousRank ? previousRank - rank : 0;
  const tier = tierColors[legend.category] || tierColors.contributors;

  const getRankChangeIcon = () => {
    if (rankChange > 0) return <TrendingUp className="text-green-400\" size={14} />;
    if (rankChange < 0) return <TrendingDown className="text-red-400" size={14} />;
    return <Minus className="text-slate-500" size={14} />;
  };

  const getRankBadgeStyle = () => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900';
    if (rank === 2) return 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-900';
    if (rank === 3) return 'bg-gradient-to-br from-amber-600 to-amber-700 text-white';
    return 'bg-slate-800 text-slate-300';
  };

  return (
    <motion.div
      ref={ref}
      className={`group relative ${className}`}
      initial={{ x: -50, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: rank * 0.05 }}
      whileHover={{ scale: 1.02, x: 10 }}
    >
      {/* Background glow on hover */}
      <motion.div
        className={`absolute inset-0 ${tier.bg} rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity`}
      />

      {/* Main row */}
      <div
        className={`relative flex items-center gap-4 px-4 py-3 rounded-xl bg-slate-900/80 border ${tier.border} group-hover:border-opacity-100 border-opacity-30 backdrop-blur-sm transition-all`}
      >
        {/* Rank badge */}
        <motion.div
          className={`flex-shrink-0 w-10 h-10 rounded-lg ${getRankBadgeStyle()} flex items-center justify-center font-bold text-lg shadow-lg`}
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.3 }}
        >
          {rank}
        </motion.div>

        {/* Rank change indicator */}
        <div className="flex flex-col items-center w-8">
          {getRankChangeIcon()}
          {rankChange !== 0 && (
            <span className={`text-[10px] font-mono ${rankChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(rankChange)}
            </span>
          )}
        </div>

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tier.bg} ${tier.border} border-2 flex items-center justify-center overflow-hidden`}>
            <span className={`text-lg font-bold ${tier.text}`}>
              {legend.name.charAt(0)}
            </span>
          </div>

          {/* Online indicator */}
          <motion.div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-slate-900"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold truncate">{legend.name}</h3>
            {rank <= 3 && (
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Star className="text-yellow-400" size={14} fill="currentColor" />
              </motion.div>
            )}
          </div>
          <p className={`text-sm ${tier.text} truncate`}>{legend.title}</p>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-6">
          {/* XP */}
          <div className="text-center">
            <div className="flex items-center gap-1 text-cyan-400">
              <Zap size={14} />
              <span className="font-mono font-bold">{legend.xp.toLocaleString()}</span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase">XP</span>
          </div>

          {/* Achievements */}
          <div className="text-center">
            <div className="flex items-center gap-1 text-amber-400">
              <Shield size={14} />
              <span className="font-mono font-bold">{legend.achievements.length}</span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase">Badges</span>
          </div>
        </div>

        {/* XP bar */}
        <div className="hidden lg:block w-32">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r from-cyan-500 to-purple-500`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${Math.min((legend.xp / 30000) * 100, 100)}%` } : {}}
              transition={{ duration: 1, delay: 0.5 + rank * 0.05 }}
            />
          </div>
        </div>

        {/* Hover arrow */}
        <motion.div
          className="text-slate-600 group-hover:text-white transition-colors"
          initial={{ x: 0, opacity: 0 }}
          whileHover={{ x: 5 }}
          animate={{ opacity: 1 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
