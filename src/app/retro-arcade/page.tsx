'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { legends } from '@/lib/data';
import {
  ArcadeBackground,
  RetroNav,
  ScanlineOverlay,
  HighScoreTable,
  PixelCard,
  ArcadeScreen,
  PixelButton,
} from './components';

export default function RetroArcadePage() {
  const [selectedLegend, setSelectedLegend] = useState(legends[0]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = ['founders', 'contributors', 'achievers', 'legends'];

  const filteredLegends = activeCategory
    ? legends.filter((l) => l.category === activeCategory)
    : legends;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Arcade Background */}
      <ArcadeBackground />

      {/* Navigation */}
      <RetroNav />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-mono text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4">
              <span className="text-cyan-400">SUPER</span>
              <span className="text-pink-500">TEAM</span>
            </h1>
            <motion.p
              className="font-mono text-yellow-400 text-lg"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ★ HALL OF FAME ★
            </motion.p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <motion.span
                className="text-cyan-400 font-mono"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                INSERT COIN_
              </motion.span>
            </div>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <PixelButton
              color="cyan"
              active={activeCategory === null}
              onClick={() => setActiveCategory(null)}
            >
              ALL
            </PixelButton>
            {categories.map((cat) => (
              <PixelButton
                key={cat}
                color={
                  cat === 'founders'
                    ? 'yellow'
                    : cat === 'contributors'
                    ? 'green'
                    : cat === 'achievers'
                    ? 'pink'
                    : 'cyan'
                }
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.toUpperCase()}
              </PixelButton>
            ))}
          </div>

          {/* Main Layout: Featured Screen + High Scores */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Legend Screen */}
            <div className="lg:col-span-2">
              <ArcadeScreen title="NOW PLAYING">
                <div className="space-y-4">
                  {/* Player Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-pink-500 border-4 border-cyan-400 flex items-center justify-center">
                      <span className="font-mono text-3xl font-bold text-white">
                        {selectedLegend.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-mono text-2xl font-bold text-cyan-400 uppercase">
                        {selectedLegend.name}
                      </h3>
                      <p className="font-mono text-pink-400 text-sm uppercase">
                        {selectedLegend.title}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-mono text-yellow-400 text-lg">
                          {selectedLegend.xp.toLocaleString()} XP
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'PROJECTS', value: selectedLegend.stats?.projects || 0 },
                      { label: 'CONTRIB', value: selectedLegend.stats?.contributions || 0 },
                      { label: 'AWARDS', value: selectedLegend.stats?.awards || 0 },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-slate-900 border-2 border-cyan-500 px-3 py-2 text-center"
                      >
                        <span className="font-mono text-xs text-slate-400">{stat.label}</span>
                        <p className="font-mono text-xl font-bold text-cyan-400">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bio */}
                  <div className="bg-slate-900 border-2 border-pink-500 p-3">
                    <p className="font-mono text-sm text-slate-300 leading-relaxed">
                      {selectedLegend.bio}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-yellow-400 uppercase">Achievements:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedLegend.achievements.slice(0, 3).map((ach, i) => (
                        <motion.span
                          key={i}
                          className="px-2 py-1 bg-yellow-500/20 border border-yellow-500 font-mono text-xs text-yellow-400"
                          animate={{ opacity: [1, 0.7, 1] }}
                          transition={{ duration: 0.5, delay: i * 0.2, repeat: Infinity }}
                        >
                          {ach.title}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </ArcadeScreen>
            </div>

            {/* High Score Table */}
            <div className="lg:col-span-1">
              <HighScoreTable legends={legends} />
            </div>
          </div>

          {/* Legend Cards Grid */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="h-1 flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
              />
              <h2 className="font-mono text-cyan-400 text-xl uppercase tracking-wider">
                SELECT PLAYER
              </h2>
              <motion.div
                className="h-1 flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLegends.map((legend, index) => (
                <motion.div
                  key={legend.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedLegend(legend)}
                  className={`cursor-pointer ${
                    selectedLegend.id === legend.id ? 'ring-4 ring-cyan-400 ring-offset-2 ring-offset-slate-950' : ''
                  }`}
                >
                  <PixelCard legend={legend} index={index} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Credits */}
          <motion.div
            className="text-center pt-8 border-t-4 border-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              {['1UP', '2UP', '3UP'].map((player, i) => (
                <motion.span
                  key={player}
                  className={`font-mono text-sm ${
                    i === 0 ? 'text-cyan-400' : i === 1 ? 'text-pink-400' : 'text-yellow-400'
                  }`}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 0.5, delay: i * 0.2, repeat: Infinity }}
                >
                  {player}
                </motion.span>
              ))}
            </div>
            <p className="font-mono text-slate-600 text-xs uppercase tracking-wider">
              © 2024 SUPERTEAM ARCADE • ALL RIGHTS RESERVED
            </p>
            <motion.p
              className="font-mono text-pink-500 text-xs mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              GAME OVER? NEVER!
            </motion.p>
          </motion.div>
        </div>
      </main>

      {/* Global Scanline Overlay */}
      <ScanlineOverlay opacity={0.03} />
    </div>
  );
}
