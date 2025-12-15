'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { legends } from '@/lib/data';
import { Category, CATEGORIES } from '@/lib/types';
import {
  LeaderboardPodium,
  RankingRow,
  StatRadar,
  ArenaBackground,
  CompetitiveNav,
  ScoreCounter,
  TierBadge,
  getTierFromXP,
} from './components';
import { Trophy, Users, Zap, Target } from 'lucide-react';

export default function LeaderboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedLegend, setSelectedLegend] = useState(legends[0]);

  // Sort legends by XP for rankings
  const rankedLegends = useMemo(() => {
    const filtered = selectedCategory === 'all'
      ? legends
      : legends.filter(l => l.category === selectedCategory);

    return [...filtered].sort((a, b) => b.xp - a.xp);
  }, [selectedCategory]);

  // Get top 3 for podium
  const topThree = rankedLegends.slice(0, 3);

  // Calculate totals
  const totalXP = legends.reduce((sum, l) => sum + l.xp, 0);
  const totalAchievements = legends.reduce((sum, l) => sum + l.achievements.length, 0);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background */}
      <ArenaBackground />

      {/* Navigation */}
      <CompetitiveNav />

      {/* Main content */}
      <main className="relative z-10 pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Stats overview */}
          <motion.section
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ScoreCounter
              value={legends.length}
              label="Total Legends"
              icon={<Users size={20} />}
              color="purple"
            />
            <ScoreCounter
              value={totalXP}
              label="Combined XP"
              icon={<Zap size={20} />}
              color="cyan"
            />
            <ScoreCounter
              value={totalAchievements}
              label="Total Badges"
              icon={<Trophy size={20} />}
              color="amber"
            />
            <ScoreCounter
              value={4}
              label="Categories"
              icon={<Target size={20} />}
              color="pink"
            />
          </motion.section>

          {/* Podium section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-center text-2xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Hall of Champions
              </span>
            </h2>
            <LeaderboardPodium legends={topThree} />
          </motion.section>

          {/* Category filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50'
              }`}
            >
              All Legends
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Rankings list */}
            <motion.section
              className="lg:col-span-2 space-y-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={20} />
                Rankings
              </h3>
              {rankedLegends.map((legend, index) => (
                <div
                  key={legend.id}
                  onClick={() => setSelectedLegend(legend)}
                  className="cursor-pointer"
                >
                  <RankingRow
                    legend={legend}
                    rank={index + 1}
                    previousRank={index + 1 + Math.floor(Math.random() * 3) - 1}
                  />
                </div>
              ))}
            </motion.section>

            {/* Selected legend details */}
            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="text-cyan-400" size={20} />
                Legend Stats
              </h3>

              {/* Selected legend card */}
              <div className="bg-slate-900/80 rounded-xl border border-slate-700/50 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                    {selectedLegend.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{selectedLegend.name}</h4>
                    <p className="text-slate-400 text-sm">{selectedLegend.title}</p>
                  </div>
                </div>

                {/* Tier badge */}
                <div className="flex justify-center mb-6">
                  <TierBadge
                    tier={getTierFromXP(selectedLegend.xp)}
                    xp={selectedLegend.xp}
                    size="lg"
                  />
                </div>

                {/* Radar chart */}
                <div className="flex justify-center">
                  <StatRadar legend={selectedLegend} className="w-48 h-48" />
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700/30">
                  <p className="text-2xl font-bold text-cyan-400 font-mono">
                    {selectedLegend.xp.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">Total XP</p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700/30">
                  <p className="text-2xl font-bold text-amber-400 font-mono">
                    {selectedLegend.achievements.length}
                  </p>
                  <p className="text-xs text-slate-500">Achievements</p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}
