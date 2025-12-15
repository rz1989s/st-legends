'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy, Medal } from 'lucide-react';
import { Legend } from '@/lib/types';

interface LeaderboardPodiumProps {
  legends: Legend[];
  className?: string;
}

const podiumConfig = [
  { place: 2, height: 'h-32', color: 'from-slate-400 to-slate-500', icon: Medal, label: '2ND' },
  { place: 1, height: 'h-44', color: 'from-yellow-400 to-amber-500', icon: Crown, label: '1ST' },
  { place: 3, height: 'h-24', color: 'from-amber-600 to-amber-700', icon: Trophy, label: '3RD' },
];

export function LeaderboardPodium({ legends, className = '' }: LeaderboardPodiumProps) {
  // Reorder for display: 2nd, 1st, 3rd
  const orderedLegends = [legends[1], legends[0], legends[2]].filter(Boolean);

  return (
    <div className={`relative ${className}`}>
      {/* Spotlight effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-32 h-96 bg-gradient-to-b from-yellow-400/20 to-transparent blur-2xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-96 bg-gradient-to-b from-yellow-300/30 to-transparent blur-2xl"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-32 h-96 bg-gradient-to-b from-amber-400/20 to-transparent blur-2xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Podiums */}
      <div className="relative flex items-end justify-center gap-4 md:gap-8 pt-32 pb-8">
        {podiumConfig.map((config, index) => {
          const legend = orderedLegends[index];
          if (!legend) return null;

          const Icon = config.icon;

          return (
            <motion.div
              key={config.place}
              className="flex flex-col items-center"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, type: 'spring', damping: 15 }}
            >
              {/* Avatar */}
              <motion.div
                className="relative mb-4"
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Glow ring */}
                {config.place === 1 && (
                  <motion.div
                    className="absolute -inset-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 opacity-50 blur-md"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Avatar image */}
                <div
                  className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${config.color} p-1`}
                >
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {legend.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Place badge */}
                <motion.div
                  className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}
                  animate={config.place === 1 ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon size={16} className="text-white" />
                </motion.div>
              </motion.div>

              {/* Name */}
              <motion.p
                className="text-white font-bold text-sm md:text-base mb-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {legend.name}
              </motion.p>

              {/* XP Badge */}
              <motion.div
                className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
              >
                <span className="text-xs font-mono text-cyan-400">{legend.xp.toLocaleString()} XP</span>
              </motion.div>

              {/* Podium block */}
              <motion.div
                className={`relative ${config.height} w-24 md:w-32 bg-gradient-to-b ${config.color} rounded-t-lg`}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.5, type: 'spring' }}
              >
                {/* Podium shine */}
                <div className="absolute inset-0 rounded-t-lg bg-gradient-to-r from-white/20 via-transparent to-transparent" />

                {/* Place label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-black text-white/30">
                    {config.label}
                  </span>
                </div>

                {/* Podium edge */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20 rounded-b-sm" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Confetti particles for 1st place */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-yellow-400' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-pink-400'
            }`}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((i * Math.PI * 2) / 12) * (100 + Math.random() * 50),
              y: Math.sin((i * Math.PI * 2) / 12) * (50 + Math.random() * 30) + 50,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
