'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { legends } from '@/lib/data';
import { Category, CATEGORIES } from '@/lib/types';
import {
  BrutalCard,
  RawText,
  HighlightText,
  BrutalNav,
  HardBorder,
  BrutalDivider,
  CornerBrackets,
  BrutalBackground,
  GlitchText,
  MarqueeText,
} from './components';

export default function BrutalistPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredLegends = useMemo(() => {
    if (selectedCategory === 'all') return legends;
    return legends.filter(l => l.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen text-black">
      {/* Background */}
      <BrutalBackground variant="grid" />

      {/* Navigation */}
      <BrutalNav />

      {/* Main content */}
      <main className="relative z-10 pt-24 pb-24">
        {/* Marquee */}
        <div className="border-y-4 border-black py-4 bg-black text-white mb-16 overflow-hidden">
          <MarqueeText text="HALL OF FAME • SUPERTEAM LEGENDS" speed={25} />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          {/* Hero section */}
          <section className="py-16">
            <RawText as="h1" size="2xl" className="text-black mb-4">
              <GlitchText text="LEGENDS" />
            </RawText>

            <RawText as="p" size="lg" className="text-black/60 max-w-xl" delay={0.2}>
              THE <HighlightText>BUILDERS</HighlightText> WHO SHAPED THE ECOSYSTEM
            </RawText>

            <BrutalDivider className="mt-8 max-w-xs" />

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <HardBorder thickness={4} className="inline-block">
                <div className="px-6 py-4">
                  <span className="text-4xl font-black">{legends.length}</span>
                  <span className="text-sm font-mono uppercase ml-2 text-black/60">LEGENDS</span>
                </div>
              </HardBorder>
              <HardBorder thickness={4} className="inline-block">
                <div className="px-6 py-4">
                  <span className="text-4xl font-black">4</span>
                  <span className="text-sm font-mono uppercase ml-2 text-black/60">CATEGORIES</span>
                </div>
              </HardBorder>
              <HardBorder thickness={4} className="inline-block">
                <div className="px-6 py-4">
                  <span className="text-4xl font-black">2021</span>
                  <span className="text-sm font-mono uppercase ml-2 text-black/60">FOUNDED</span>
                </div>
              </HardBorder>
            </motion.div>
          </section>

          {/* Filter section */}
          <section className="mb-12">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 font-mono text-sm font-bold uppercase border-4 border-black transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                ALL [{legends.length}]
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 font-mono text-sm font-bold uppercase border-4 border-black transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {cat.label} [{legends.filter(l => l.category === cat.value).length}]
                </button>
              ))}
            </div>
          </section>

          {/* Legends grid */}
          <section>
            <div className="grid md:grid-cols-2 gap-8">
              {filteredLegends.map((legend, index) => (
                <BrutalCard
                  key={legend.id}
                  legend={legend}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Footer */}
          <section className="mt-24">
            <CornerBrackets className="text-center">
              <p className="font-mono text-sm uppercase tracking-widest text-black/40 mb-2">
                Superteam
              </p>
              <p className="font-black text-2xl uppercase">
                RAW. BOLD. REAL.
              </p>
            </CornerBrackets>
          </section>
        </div>
      </main>
    </div>
  );
}
