'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface MuseumHallProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function MuseumHall({ children, title, className = '' }: MuseumHallProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const perspective = useTransform(scrollYProgress, [0, 0.5, 1], [800, 1200, 800]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <div ref={ref} className={`relative py-20 ${className}`}>
      {/* Hall ambiance */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Ceiling gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-stone-950 to-transparent" />

        {/* Floor gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-stone-950/80 to-transparent" />

        {/* Side shadows for depth */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black/40 to-transparent" />
      </div>

      {/* Hall title */}
      {title && (
        <motion.div
          className="relative text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600" />
            <div className="w-2 h-2 rotate-45 bg-amber-600" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-stone-100 tracking-wide">
            {title}
          </h2>

          {/* Subtitle decoration */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
          </div>
        </motion.div>
      )}

      {/* 3D Hall container */}
      <motion.div
        className="relative"
        style={{
          perspective: perspective,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="relative"
          style={{
            rotateX: rotateX,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Wall panels effect */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left wall panel */}
            <div
              className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-stone-800 to-transparent"
              style={{
                transform: 'translateZ(-50px) rotateY(90deg)',
                transformOrigin: 'left center',
              }}
            />
            {/* Right wall panel */}
            <div
              className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-stone-800 to-transparent"
              style={{
                transform: 'translateZ(-50px) rotateY(-90deg)',
                transformOrigin: 'right center',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative">{children}</div>
        </motion.div>
      </motion.div>

      {/* Floor reflection */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-24 opacity-20">
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.1))',
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          }}
        />
      </div>

      {/* Ambient light spots */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-amber-500/5 blur-[100px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-amber-400/5 blur-[80px]"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
}
