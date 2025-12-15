'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { legends } from '@/lib/data';
import {
  CollectorNav,
  CollectorShowcase,
  BoosterPack,
  CardStack,
} from './components';
import { Sparkles, Package, Layers } from 'lucide-react';

type ViewMode = 'showcase' | 'booster' | 'stack';

export default function TradingCardsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('showcase');

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-amber-950/20 to-stone-950">
      {/* Navigation */}
      <CollectorNav cardCount={legends.length} />

      {/* Background pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Main content */}
      <main className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero section */}
          <motion.section
            className="text-center py-12 md:py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent drop-shadow-lg">
                  Trading Cards
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-lg text-amber-200/60 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Collect rare Superteam legend cards with holographic effects.
              Each card tells a unique story of builders in the Solana ecosystem.
            </motion.p>

            {/* View mode selector */}
            <motion.div
              className="flex justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { mode: 'showcase' as ViewMode, icon: Layers, label: 'Collection' },
                { mode: 'booster' as ViewMode, icon: Package, label: 'Open Pack' },
                { mode: 'stack' as ViewMode, icon: Sparkles, label: 'Browse' },
              ].map(({ mode, icon: Icon, label }) => (
                <motion.button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    viewMode === mode
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-900 shadow-lg shadow-amber-500/30'
                      : 'bg-stone-800/50 text-amber-200/70 border border-amber-500/20 hover:bg-stone-800 hover:text-amber-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                  {label}
                </motion.button>
              ))}
            </motion.div>
          </motion.section>

          {/* Content area */}
          <motion.section
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {viewMode === 'showcase' && (
              <CollectorShowcase legends={legends} />
            )}

            {viewMode === 'booster' && (
              <div className="flex justify-center py-8">
                <BoosterPack
                  legends={legends.slice(0, 5)}
                  onReveal={(legend) => console.log('Revealed:', legend.name)}
                />
              </div>
            )}

            {viewMode === 'stack' && (
              <div className="flex justify-center py-8">
                <CardStack legends={legends} />
              </div>
            )}
          </motion.section>

          {/* Stats footer */}
          <motion.section
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {[
              { label: 'Total Cards', value: legends.length, color: 'amber' },
              { label: 'Legendary', value: legends.filter(l => l.featured).length, color: 'yellow' },
              { label: 'Rare', value: legends.filter(l => !l.featured).length, color: 'purple' },
              { label: 'Categories', value: 4, color: 'cyan' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative p-4 rounded-2xl bg-stone-900/50 backdrop-blur-sm border border-amber-500/20 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(251, 191, 36, 0.4)' }}
              >
                <div className={`text-3xl font-bold text-${stat.color}-400 mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs text-amber-200/50 uppercase tracking-wider">
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
