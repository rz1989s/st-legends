'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { legends } from '@/lib/data';
import { Category, Legend } from '@/lib/types';
import {
  InteractiveStarField,
  NebulaGradient,
  ConstellationMap,
  StarTooltip,
  GalacticNav,
  CategoryOrbit,
} from './components';

export default function ConstellationPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [hoveredLegend, setHoveredLegend] = useState<Legend | null>(null);

  // Calculate legend counts per category
  const legendCounts = useMemo(() => {
    const counts: Record<Category | 'all', number> = {
      all: legends.length,
      founders: legends.filter(l => l.category === 'founders').length,
      contributors: legends.filter(l => l.category === 'contributors').length,
      achievers: legends.filter(l => l.category === 'achievers').length,
      legends: legends.filter(l => l.category === 'legends').length,
    };
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Navigation */}
      <GalacticNav
        title="Constellation Hall"
        subtitle="Navigate the Superteam Galaxy"
      />

      {/* Background layers */}
      <div className="fixed inset-0">
        <NebulaGradient intensity="medium" />
        <InteractiveStarField starCount={150} speed={0.3} interactive />
      </div>

      {/* Main content */}
      <main className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero section */}
          <motion.section
            className="text-center py-12 md:py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Constellation Hall
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Each legend shines as a star in the Superteam galaxy.
              Explore the cosmos and discover the brilliant minds building on Solana.
            </motion.p>

            <motion.p
              className="text-sm text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Hover over stars to reveal their story • Click for details
            </motion.p>
          </motion.section>

          {/* Category Filter */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CategoryOrbit
              selected={selectedCategory}
              onChange={setSelectedCategory}
              legendCounts={legendCounts}
              className="flex justify-center"
            />
          </motion.section>

          {/* Star Map Container */}
          <motion.section
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            {/* Glassmorphic container */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Border glow */}
              <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/30">
                <div className="absolute inset-[1px] rounded-3xl bg-slate-950/50 backdrop-blur-sm" />
              </div>

              {/* Inner container */}
              <div className="relative bg-slate-900/30 backdrop-blur-md rounded-3xl border border-white/5">
                {/* Map area */}
                <div className="relative min-h-[500px] md:min-h-[600px]">
                  <ConstellationMap
                    legends={legends}
                    selectedCategory={selectedCategory}
                    onLegendHover={setHoveredLegend}
                    className="w-full h-full"
                  />

                  {/* Tooltip positioned on the side */}
                  <div className="absolute top-4 right-4 z-20">
                    <StarTooltip legend={hoveredLegend} position="right" />
                  </div>
                </div>

                {/* Footer info */}
                <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/30" />
                      <span className="text-xs text-white/50">Featured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg shadow-purple-500/30" />
                      <span className="text-xs text-white/50">Legend</span>
                    </div>
                  </div>

                  <div className="text-xs text-white/30">
                    {legends.length} stars in the galaxy
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Stats section */}
          <motion.section
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {[
              { label: 'Founders', count: legendCounts.founders, color: 'purple', emoji: '🚀' },
              { label: 'Contributors', count: legendCounts.contributors, color: 'cyan', emoji: '💻' },
              { label: 'Achievers', count: legendCounts.achievers, color: 'pink', emoji: '🏆' },
              { label: 'Legends', count: legendCounts.legends, color: 'yellow', emoji: '⭐' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative p-4 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/5 text-center group hover:border-white/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <span className="text-2xl mb-2 block">{stat.emoji}</span>
                <div className={`text-3xl font-bold text-${stat.color}-400 mb-1`}>
                  {stat.count}
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.section>
        </div>
      </main>
    </div>
  );
}
