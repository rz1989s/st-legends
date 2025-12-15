'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { legends, getFeaturedLegends } from '@/lib/data';
import { Category } from '@/lib/types';
import {
  GoldPlaque,
  TrophyPedestal,
  SpotlightBeam,
  HallwayNav,
  VelvetBackground,
  CategoryFilter,
} from './components';
import { Trophy, Star, Award, Medal } from 'lucide-react';

export default function TrophyWallPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredLegends = selectedCategory === 'all'
    ? legends
    : legends.filter(l => l.category === selectedCategory);

  const featuredLegends = filteredLegends.filter(l => l.featured).slice(0, 3);
  const otherLegends = filteredLegends.filter(l => !featuredLegends.includes(l));

  // Calculate counts
  const counts = useMemo(() => ({
    all: legends.length,
    founders: legends.filter(l => l.category === 'founders').length,
    contributors: legends.filter(l => l.category === 'contributors').length,
    achievers: legends.filter(l => l.category === 'achievers').length,
    legends: legends.filter(l => l.category === 'legends').length,
  }), []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Navigation */}
      <HallwayNav totalLegends={legends.length} />

      {/* Background */}
      <VelvetBackground />

      {/* Spotlight beams */}
      <SpotlightBeam position="left" color="gold" intensity={0.15} />
      <SpotlightBeam position="center" color="gold" intensity={0.25} />
      <SpotlightBeam position="right" color="gold" intensity={0.15} />

      {/* Main content */}
      <main className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero section */}
          <motion.section
            className="text-center py-12 md:py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Trophy className="text-yellow-400 w-10 h-10" />
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                  Trophy Wall
                </span>
              </h1>
              <Trophy className="text-yellow-400 w-10 h-10" />
            </motion.div>

            <motion.p
              className="text-lg text-yellow-200/60 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              A prestigious hall honoring Superteam's greatest champions.
              Each plaque tells a story of excellence in the Solana ecosystem.
            </motion.p>
          </motion.section>

          {/* Category Filter */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CategoryFilter
              selected={selectedCategory}
              onChange={setSelectedCategory}
              counts={counts}
            />
          </motion.section>

          {/* Champions Podium (Featured Legends) */}
          {featuredLegends.length > 0 && (
            <motion.section
              className="mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-12">
                <Star className="text-yellow-400" />
                <h2 className="text-2xl font-bold text-yellow-200">Hall of Champions</h2>
                <Star className="text-yellow-400" />
              </div>

              {/* Podium layout: 2nd - 1st - 3rd */}
              <div className="flex items-end justify-center gap-4 md:gap-8">
                {featuredLegends[1] && (
                  <TrophyPedestal legend={featuredLegends[1]} rank={2} />
                )}
                {featuredLegends[0] && (
                  <TrophyPedestal legend={featuredLegends[0]} rank={1} />
                )}
                {featuredLegends[2] && (
                  <TrophyPedestal legend={featuredLegends[2]} rank={3} />
                )}
              </div>
            </motion.section>
          )}

          {/* All Honorees */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-yellow-400" />
              <h2 className="text-xl font-bold text-yellow-200">All Honorees</h2>
              <span className="px-2 py-1 rounded-full bg-yellow-600/20 text-yellow-300 text-xs">
                {otherLegends.length} legends
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherLegends.map((legend, index) => (
                <motion.div
                  key={legend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                >
                  <GoldPlaque legend={legend} size="md" />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Stats footer */}
          <motion.section
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {[
              { label: 'Total Honorees', value: legends.length, icon: Trophy },
              { label: 'Featured', value: getFeaturedLegends().length, icon: Star },
              { label: 'Categories', value: 4, icon: Medal },
              { label: 'Achievements', value: legends.reduce((acc, l) => acc + l.achievements.length, 0), icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative p-4 rounded-xl bg-amber-900/30 backdrop-blur-sm border border-yellow-600/20 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(234, 179, 8, 0.4)' }}
              >
                <stat.icon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-200">{stat.value}</div>
                <div className="text-xs text-yellow-300/60 uppercase tracking-wider">
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
