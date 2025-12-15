'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { legends } from '@/lib/data';
import { CATEGORIES } from '@/lib/types';
import {
  ExhibitFrame,
  MuseumHall,
  ArtPlaque,
  Spotlight,
  GalleryNav,
  VelvetRope,
  MuseumBackground,
} from './components';

export default function MuseumPage() {
  const [selectedLegend, setSelectedLegend] = useState(legends[0]);

  // Group legends by category
  const legendsByCategory = CATEGORIES.map(cat => ({
    category: cat,
    legends: legends.filter(l => l.category === cat.value),
  }));

  return (
    <div className="min-h-screen">
      {/* Background */}
      <MuseumBackground />

      {/* Navigation */}
      <GalleryNav />

      {/* Main content */}
      <main className="relative z-10 pt-28 pb-24">
        {/* Hero section */}
        <motion.section
          className="text-center py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/50" />
            <span className="text-amber-600/60 text-sm uppercase tracking-[0.3em]">Welcome to the</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/50" />
          </motion.div>

          <h1 className="font-serif text-5xl md:text-6xl text-stone-100 tracking-wide mb-4">
            Hall of Legends
          </h1>

          <p className="text-stone-400 max-w-xl mx-auto text-lg">
            A curated collection celebrating the remarkable individuals who shaped the Superteam ecosystem.
          </p>

          {/* Decorative element */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-2 h-2 rotate-45 bg-amber-600/30" />
            <div className="h-px w-24 bg-amber-600/30" />
            <div className="w-3 h-3 rotate-45 bg-amber-600/50" />
            <div className="h-px w-24 bg-amber-600/30" />
            <div className="w-2 h-2 rotate-45 bg-amber-600/30" />
          </motion.div>
        </motion.section>

        {/* Featured exhibit */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <MuseumHall title="Featured Exhibit">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
              {/* Main exhibit */}
              <Spotlight intensity="high" color="warm">
                <ExhibitFrame legend={selectedLegend} size="lg" />
              </Spotlight>

              {/* Info plaque */}
              <div className="w-full max-w-sm">
                <ArtPlaque legend={selectedLegend} variant="brass" />
              </div>
            </div>

            {/* Velvet rope */}
            <div className="mt-12 max-w-2xl mx-auto">
              <VelvetRope />
            </div>
          </MuseumHall>
        </section>

        {/* Gallery sections by category */}
        {legendsByCategory.map(({ category, legends: catLegends }) => (
          <section key={category.value} className="mb-24">
            <MuseumHall title={`${category.emoji} ${category.label} Gallery`}>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {catLegends.map((legend, index) => (
                  <div
                    key={legend.id}
                    onClick={() => setSelectedLegend(legend)}
                    className="cursor-pointer"
                  >
                    <Spotlight
                      active={selectedLegend.id === legend.id}
                      intensity={selectedLegend.id === legend.id ? 'high' : 'low'}
                    >
                      <ExhibitFrame
                        legend={legend}
                        index={index}
                        size="md"
                      />
                    </Spotlight>
                  </div>
                ))}
              </div>
            </MuseumHall>
          </section>
        ))}

        {/* Footer section */}
        <motion.section
          className="text-center py-16 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-amber-600/30" />
            <div className="w-2 h-2 rotate-45 bg-amber-600/50" />
            <div className="h-px w-12 bg-amber-600/30" />
          </div>

          <p className="font-serif text-xl text-stone-400 italic">
            "Every legend was once a dreamer who refused to stop believing."
          </p>

          <p className="text-amber-600/40 text-sm mt-4 uppercase tracking-widest">
            Superteam • Est. 2021
          </p>
        </motion.section>
      </main>
    </div>
  );
}
