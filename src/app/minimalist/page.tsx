'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { legends } from '@/lib/data';
import { Category } from '@/lib/types';
import {
  MinimalCard,
  TypeGridSection,
  MinimalNav,
  CleanFilter,
  MinimalBackground,
  LineReveal,
  StaggerText,
} from './components';

export default function MinimalistPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredLegends = useMemo(() => {
    if (selectedCategory === 'all') return legends;
    return legends.filter(l => l.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen text-neutral-900">
      {/* Background */}
      <MinimalBackground variant="light" />

      {/* Navigation */}
      <MinimalNav />

      {/* Main content */}
      <main className="relative z-10 pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero section */}
          <section className="py-20">
            <LineReveal className="mb-4">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-[0.2em]">
                Superteam Hall of Fame
              </span>
            </LineReveal>

            <LineReveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-light text-neutral-900 tracking-tight leading-[1.1]">
                The people who
                <br />
                <span className="italic">built</span> this.
              </h1>
            </LineReveal>

            <motion.div
              className="mt-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <StaggerText
                text="Celebrating the extraordinary individuals who shaped the Superteam ecosystem through their dedication, innovation, and community spirit."
                className="text-neutral-500 leading-relaxed"
                delay={0.5}
              />
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex items-center gap-12 mt-12 pt-8 border-t border-neutral-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div>
                <span className="text-4xl font-light text-neutral-900">{legends.length}</span>
                <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Legends</p>
              </div>
              <div>
                <span className="text-4xl font-light text-neutral-900">4</span>
                <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Categories</p>
              </div>
              <div>
                <span className="text-4xl font-light text-neutral-900">2021</span>
                <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Founded</p>
              </div>
            </motion.div>
          </section>

          {/* Filter section */}
          <motion.section
            className="py-8 sticky top-16 bg-white/80 backdrop-blur-sm z-20 border-b border-neutral-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <CleanFilter
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </motion.section>

          {/* Legends list */}
          <TypeGridSection
            title="Directory"
            subtitle={`Showing ${filteredLegends.length} legends`}
          >
            <div className="border-t border-neutral-200">
              {filteredLegends.map((legend, index) => (
                <MinimalCard
                  key={legend.id}
                  legend={legend}
                  index={index}
                />
              ))}
            </div>
          </TypeGridSection>

          {/* Footer */}
          <motion.footer
            className="py-16 border-t border-neutral-100 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">
              Superteam
            </p>
            <p className="text-neutral-300 text-sm">
              Building the future, together.
            </p>
          </motion.footer>
        </div>
      </main>
    </div>
  );
}
