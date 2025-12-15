'use client';

import { motion } from 'framer-motion';
import { Legend, CATEGORIES } from '@/lib/types';
import { Trophy, Star, Crown } from 'lucide-react';

interface TrophyPedestalProps {
  legend: Legend;
  rank?: 1 | 2 | 3;
  className?: string;
}

export function TrophyPedestal({ legend, rank = 1, className = '' }: TrophyPedestalProps) {
  const category = CATEGORIES.find(c => c.value === legend.category);

  const rankConfig = {
    1: {
      height: 'h-40',
      color: 'from-yellow-400 via-amber-300 to-yellow-500',
      glow: 'shadow-yellow-500/50',
      icon: Crown,
      label: '1ST',
    },
    2: {
      height: 'h-32',
      color: 'from-gray-300 via-gray-200 to-gray-400',
      glow: 'shadow-gray-400/30',
      icon: Trophy,
      label: '2ND',
    },
    3: {
      height: 'h-24',
      color: 'from-amber-600 via-amber-500 to-amber-700',
      glow: 'shadow-amber-600/30',
      icon: Trophy,
      label: '3RD',
    },
  };

  const config = rankConfig[rank];
  const Icon = config.icon;

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.2 }}
    >
      {/* Spotlight beam */}
      <motion.div
        className="absolute -top-20 w-32 opacity-20"
        style={{
          height: 200,
          background: `linear-gradient(to bottom, rgba(251, 191, 36, 0.5), transparent)`,
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
        }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Trophy icon */}
      <motion.div
        className={`relative mb-4 p-4 rounded-full bg-gradient-to-br ${config.color} shadow-2xl ${config.glow}`}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="w-8 h-8 text-amber-900" />
        {rank === 1 && (
          <motion.div
            className="absolute -inset-2 rounded-full border-2 border-yellow-400/50"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Avatar */}
      <motion.div
        className={`w-20 h-20 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-3xl font-bold text-amber-900 shadow-xl mb-4 ring-4 ring-amber-900/50`}
        whileHover={{ scale: 1.1 }}
      >
        {legend.name.charAt(0)}
      </motion.div>

      {/* Name */}
      <h3 className="text-lg font-bold text-yellow-100 mb-1">{legend.name}</h3>
      <p className="text-sm text-yellow-200/60 mb-2">{legend.title}</p>
      <span className="text-xs px-2 py-1 rounded-full bg-yellow-600/30 text-yellow-200">
        {category?.emoji} {category?.label}
      </span>

      {/* Pedestal */}
      <div className={`relative mt-6 w-full max-w-[180px] ${config.height}`}>
        {/* Pedestal top */}
        <div className={`absolute top-0 inset-x-0 h-4 rounded-t-lg bg-gradient-to-br ${config.color}`} />

        {/* Pedestal body */}
        <div className={`absolute top-4 inset-x-2 bottom-0 bg-gradient-to-b from-amber-800 to-amber-950`}>
          {/* Rank label */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
            <span className={`text-2xl font-black bg-gradient-to-b ${config.color} bg-clip-text text-transparent`}>
              {config.label}
            </span>
          </div>
        </div>

        {/* Pedestal base */}
        <div className="absolute bottom-0 -inset-x-2 h-3 rounded-b-lg bg-amber-950 shadow-lg" />
      </div>
    </motion.div>
  );
}
