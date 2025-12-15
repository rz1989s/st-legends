'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Legend } from '@/lib/types';
import { HolographicCard } from './HolographicCard';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface CardStackProps {
  legends: Legend[];
  className?: string;
  onSelect?: (legend: Legend) => void;
}

export function CardStack({ legends, className = '', onSelect }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      zIndex: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return legends.length - 1;
      if (next >= legends.length) return 0;
      return next;
    });
  };

  const currentLegend = legends[currentIndex];

  // Get surrounding cards for stack effect
  const prevIndex = currentIndex === 0 ? legends.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === legends.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className={`relative ${className}`}>
      {/* Card stack area */}
      <div className="relative h-[450px] flex items-center justify-center" style={{ perspective: 1000 }}>
        {/* Background stack cards (decorative) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Back card */}
          <motion.div
            className="absolute w-64 opacity-20"
            style={{
              transform: 'translateX(-30px) translateZ(-60px) rotateY(-10deg)',
            }}
          >
            <div className="aspect-[2.5/3.5] rounded-2xl bg-stone-800 border border-amber-500/20" />
          </motion.div>

          {/* Another back card */}
          <motion.div
            className="absolute w-64 opacity-30"
            style={{
              transform: 'translateX(30px) translateZ(-30px) rotateY(5deg)',
            }}
          >
            <div className="aspect-[2.5/3.5] rounded-2xl bg-stone-800 border border-amber-500/30" />
          </motion.div>
        </div>

        {/* Main card */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 },
              rotateY: { duration: 0.4 },
            }}
            className="w-64 cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={() => onSelect?.(currentLegend)}
          >
            <HolographicCard legend={currentLegend} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <motion.button
          onClick={() => paginate(-1)}
          className="p-3 rounded-full bg-stone-800/80 border border-amber-500/30 text-amber-300 hover:bg-stone-700 hover:border-amber-500/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={20} />
        </motion.button>

        {/* Card counter */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-stone-800/50 border border-amber-500/20">
          <Layers size={16} className="text-amber-400" />
          <span className="text-amber-200 font-mono text-sm">
            {currentIndex + 1} / {legends.length}
          </span>
        </div>

        <motion.button
          onClick={() => paginate(1)}
          className="p-3 rounded-full bg-stone-800/80 border border-amber-500/30 text-amber-300 hover:bg-stone-700 hover:border-amber-500/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {legends.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-amber-400 w-6'
                : 'bg-stone-600 hover:bg-stone-500'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}
