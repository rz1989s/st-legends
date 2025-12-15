'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { legends } from '@/lib/data';
import { Category, CATEGORIES } from '@/lib/types';
import {
  GlassCard,
  GlassNav,
  FrostedPanel,
  GlassFilter,
  GlassBackground,
  BlurReveal,
  GlassStat,
} from './components';
import { Sparkles } from 'lucide-react';

export default function GlassmorphismPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredLegends = useMemo(() => {
    if (selectedCategory === 'all') return legends;
    return legends.filter(l => l.category === selectedCategory);
  }, [selectedCategory]);

  const filterOptions = [
    { value: 'all', label: 'All' },
    ...CATEGORIES.map(cat => ({ value: cat.value, label: cat.label })),
  ];

  const totalXP = legends.reduce((sum, l) => sum + l.xp, 0);

  return (
    <div className="min-h-screen text-white">
      {/* Background */}
      <GlassBackground />

      {/* Navigation */}
      <GlassNav />

      {/* Main content */}
      <main className="relative z-10 pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero section */}
          <BlurReveal className="text-center py-16">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="text-purple-400" size={24} />
              <span className="text-white/50 text-sm uppercase tracking-[0.3em]">
                Hall of Fame
              </span>
              <Sparkles className="text-pink-400" size={24} />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Legends
              </span>
            </h1>

            <p className="text-white/60 max-w-xl mx-auto text-lg">
              The extraordinary builders who shaped the Superteam ecosystem through their vision and dedication.
            </p>
          </BlurReveal>

          {/* Stats section */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <GlassStat value={legends.length} label="Legends" delay={0.1} />
            <GlassStat value={totalXP} label="Total XP" delay={0.2} />
            <GlassStat value={4} label="Categories" delay={0.3} />
            <GlassStat value="2021" label="Founded" delay={0.4} />
          </div>

          {/* Filter section */}
          <FrostedPanel className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Browse Legends</h2>
                <p className="text-sm text-white/50">
                  Showing {filteredLegends.length} of {legends.length} legends
                </p>
              </div>
              <GlassFilter
                options={filterOptions}
                selected={selectedCategory}
                onChange={(val) => setSelectedCategory(val as Category | 'all')}
              />
            </div>
          </FrostedPanel>

          {/* Legends grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredLegends.map((legend, index) => (
              <GlassCard
                key={legend.id}
                legend={legend}
                index={index}
              />
            ))}
          </motion.div>

          {/* Footer */}
          <BlurReveal delay={0.5} className="mt-24">
            <FrostedPanel variant="dark" className="text-center">
              <div className="py-8">
                <motion.div
                  className="flex items-center justify-center gap-2 mb-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="text-purple-400" size={16} />
                  <Sparkles className="text-pink-400" size={16} />
                  <Sparkles className="text-cyan-400" size={16} />
                </motion.div>
                <p className="text-white/40 text-sm">
                  Building the future of web3, together.
                </p>
                <p className="text-white/20 text-xs mt-2 uppercase tracking-widest">
                  Superteam &bull; Est. 2021
                </p>
              </div>
            </FrostedPanel>
          </BlurReveal>
        </div>
      </main>
    </div>
  );
}
