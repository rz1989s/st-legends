'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { legends } from '@/lib/data';
import { Category, CATEGORIES } from '@/lib/types';
import {
  ScrollProgress,
  TimelineNode,
  TimelineLine,
  ChapterDivider,
  TimelineNav,
  ParallaxBackground,
  YearMarker,
} from './components';
import { Clock, Sparkles } from 'lucide-react';

export default function TimelinePage() {
  // Group legends by category and sort by join date
  const groupedLegends = useMemo(() => {
    const groups: Record<Category, typeof legends> = {
      founders: [],
      contributors: [],
      achievers: [],
      legends: [],
    };

    legends.forEach(legend => {
      groups[legend.category].push(legend);
    });

    // Sort each group by date
    Object.keys(groups).forEach(key => {
      groups[key as Category].sort((a, b) =>
        new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime()
      );
    });

    return groups;
  }, []);

  // Get unique years for markers
  const years = useMemo(() => {
    const allYears = legends.map(l => l.joinedDate.split('-')[0]);
    return [...new Set(allYears)].sort();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <TimelineNav />

      {/* Background */}
      <ParallaxBackground />

      {/* Main content */}
      <main className="relative z-10 pt-24 pb-32">
        <div className="max-w-5xl mx-auto px-4">
          {/* Hero section */}
          <motion.section
            className="text-center py-16 md:py-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Clock className="text-purple-400 w-8 h-8" />
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Timeline
                </span>
              </h1>
              <Sparkles className="text-pink-400 w-8 h-8" />
            </motion.div>

            <motion.p
              className="text-lg text-slate-400 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Scroll through Superteam's journey and discover the legendary
              builders who shaped the Solana ecosystem.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              className="flex flex-col items-center gap-2 text-slate-500"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm">Scroll to explore</span>
              <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
                <motion.div
                  className="w-1.5 h-3 rounded-full bg-purple-400"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.section>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <TimelineLine />

            {/* Categories */}
            {CATEGORIES.map((cat, catIndex) => {
              const categoryLegends = groupedLegends[cat.value];
              if (categoryLegends.length === 0) return null;

              return (
                <section key={cat.value}>
                  {/* Chapter divider */}
                  <ChapterDivider
                    category={cat.value}
                    count={categoryLegends.length}
                  />

                  {/* Nodes */}
                  <div className="space-y-8 md:space-y-0">
                    {categoryLegends.map((legend, index) => (
                      <TimelineNode
                        key={legend.id}
                        legend={legend}
                        index={index}
                        isLeft={index % 2 === 0}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* End marker */}
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/30">
              <Sparkles size={18} />
              <span>The journey continues...</span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
