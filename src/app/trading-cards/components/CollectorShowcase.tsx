'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Legend, Category, CATEGORIES } from '@/lib/types';
import { HolographicCard } from './HolographicCard';
import { Filter, Grid, Layers } from 'lucide-react';

interface CollectorShowcaseProps {
  legends: Legend[];
  className?: string;
  onSelect?: (legend: Legend) => void;
}

export function CollectorShowcase({ legends, className = '', onSelect }: CollectorShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'stack'>('grid');

  const filteredLegends = selectedCategory === 'all'
    ? legends
    : legends.filter(l => l.category === selectedCategory);

  // Count by rarity
  const legendaryCount = filteredLegends.filter(l => l.featured).length;
  const rareCount = filteredLegends.filter(l => !l.featured).length;

  return (
    <div className={className}>
      {/* Showcase header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Collection stats */}
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-amber-200">Collection</h2>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-300 text-xs font-bold">
              {legendaryCount} LEGENDARY
            </span>
            <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-bold">
              {rareCount} RARE
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center bg-stone-800/50 rounded-lg p-1 border border-amber-500/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'text-amber-300/50 hover:text-amber-300'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('stack')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'stack'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'text-amber-300/50 hover:text-amber-300'
              }`}
            >
              <Layers size={16} />
            </button>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1 bg-stone-800/50 rounded-lg p-1 border border-amber-500/20">
            <Filter size={14} className="text-amber-400 ml-2" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
              className="bg-transparent text-amber-200 text-sm py-1.5 px-2 pr-6 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-stone-900">All Cards</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value} className="bg-stone-900">
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cards display */}
      {viewMode === 'grid' ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {filteredLegends.map((legend, index) => (
            <motion.div
              key={legend.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              onClick={() => onSelect?.(legend)}
              className="cursor-pointer"
            >
              <HolographicCard legend={legend} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // Stack view - cards slightly overlapping
        <div className="relative flex justify-center items-center min-h-[500px]">
          <div className="relative" style={{ width: 280 }}>
            {filteredLegends.map((legend, index) => (
              <motion.div
                key={legend.id}
                className="absolute top-0 left-0 w-full cursor-pointer"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: 1,
                  x: index * 30,
                  y: index * 10,
                  rotate: (index - filteredLegends.length / 2) * 3,
                  zIndex: filteredLegends.length - index,
                }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: index * 10 - 20,
                  zIndex: 100,
                  rotate: 0,
                }}
                onClick={() => onSelect?.(legend)}
              >
                <HolographicCard legend={legend} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredLegends.length === 0 && (
        <div className="text-center py-16">
          <Layers className="w-16 h-16 text-amber-500/30 mx-auto mb-4" />
          <p className="text-amber-200/50">No cards in this category</p>
        </div>
      )}
    </div>
  );
}
