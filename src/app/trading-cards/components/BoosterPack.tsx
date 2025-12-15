'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Legend, CATEGORIES } from '@/lib/types';
import { Sparkles, Package } from 'lucide-react';

interface BoosterPackProps {
  legends: Legend[];
  onReveal?: (legend: Legend) => void;
  className?: string;
}

export function BoosterPack({ legends, onReveal, className = '' }: BoosterPackProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [revealedIndex, setRevealedIndex] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const currentLegend = legends[revealedIndex];
  const category = CATEGORIES.find(c => c.value === currentLegend?.category);

  const handleOpen = async () => {
    if (isOpening || isOpened) return;

    setIsOpening(true);

    // Create explosion particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
    }));
    setParticles(newParticles);

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 800));

    setIsOpened(true);
    setIsOpening(false);
    onReveal?.(currentLegend);
  };

  const handleNext = () => {
    if (revealedIndex < legends.length - 1) {
      setRevealedIndex(revealedIndex + 1);
      onReveal?.(legends[revealedIndex + 1]);
    }
  };

  const handleReset = () => {
    setIsOpened(false);
    setRevealedIndex(0);
    setParticles([]);
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ top: '50%', left: '50%' }}
          />
        ))}
      </AnimatePresence>

      {/* Unopened pack */}
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="pack"
            className="relative cursor-pointer"
            onClick={handleOpen}
            initial={{ scale: 1 }}
            animate={{
              scale: isOpening ? [1, 1.1, 0] : 1,
              rotate: isOpening ? [0, -5, 5, -5, 0] : 0,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: isOpening ? 0.8 : 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Pack glow */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-br from-amber-500/30 via-yellow-500/20 to-amber-500/30 rounded-3xl blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Pack body */}
            <div className="relative w-48 h-64 rounded-2xl bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-600 p-1 shadow-2xl shadow-amber-500/30">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                {/* Foil pattern */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(255,255,255,0.1) 10px,
                    rgba(255,255,255,0.1) 20px
                  )`,
                }} />
              </div>

              <div className="relative h-full rounded-xl bg-gradient-to-br from-stone-800 to-stone-900 flex flex-col items-center justify-center p-4">
                {/* Logo/brand */}
                <div className="text-center mb-4">
                  <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-amber-200">ST LEGENDS</h3>
                  <p className="text-xs text-amber-300/60">BOOSTER PACK</p>
                </div>

                {/* Card count */}
                <div className="px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30">
                  <span className="text-sm font-bold text-amber-300">
                    {legends.length} CARDS
                  </span>
                </div>

                {/* Open hint */}
                <motion.p
                  className="text-xs text-amber-200/50 mt-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to open
                </motion.p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative"
          >
            {/* Revealed card */}
            <div className="relative w-64 aspect-[2.5/3.5] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900 border-4 border-amber-500/50 shadow-2xl shadow-amber-500/20">
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: [0, 1, 0], x: 200 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Card content */}
              <div className="relative h-full flex flex-col p-4">
                {/* Rarity */}
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded text-[10px] font-black ${
                    currentLegend?.featured
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-900'
                      : 'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
                  }`}>
                    {currentLegend?.featured ? 'LEGENDARY' : 'RARE'}
                  </span>
                </div>

                {/* Avatar */}
                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    className={`w-24 h-24 rounded-xl flex items-center justify-center text-4xl font-bold shadow-lg ${
                      currentLegend?.featured
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-900'
                        : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                    }`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    {currentLegend?.name.charAt(0)}
                  </motion.div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <p className="text-sm text-amber-300/60">{category?.emoji} {category?.label}</p>
                  <h3 className="text-xl font-bold text-white">{currentLegend?.name}</h3>
                  <p className="text-sm text-amber-200/60">{currentLegend?.title}</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4 text-center">
              <p className="text-sm text-amber-200/60 mb-3">
                Card {revealedIndex + 1} of {legends.length}
              </p>

              <div className="flex gap-2 justify-center">
                {revealedIndex < legends.length - 1 ? (
                  <motion.button
                    onClick={handleNext}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-900 font-bold text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next Card
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleReset}
                    className="px-6 py-2 rounded-full bg-stone-700 text-amber-200 font-bold text-sm border border-amber-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Open Another Pack
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
