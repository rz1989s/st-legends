'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Legend } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';

interface BrutalCardProps {
  legend: Legend;
  index?: number;
  className?: string;
}

export function BrutalCard({ legend, index = 0, className = '' }: BrutalCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      className={`group relative ${className}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Offset shadow */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{
          x: isHovered ? 8 : 4,
          y: isHovered ? 8 : 4,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Main card */}
      <div className="relative bg-white border-4 border-black">
        {/* Number badge */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center font-mono text-xl font-black">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Content */}
        <div className="p-6 pt-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-black">
                {legend.name}
              </h3>
              <p className="text-sm font-mono uppercase text-black/60 mt-1">
                {legend.title}
              </p>
            </div>

            <motion.div
              className="p-2 bg-black text-white"
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-1 bg-black mb-4" />

          {/* Bio */}
          <p className="text-black/80 font-mono text-sm leading-relaxed mb-4">
            {legend.bio}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 font-mono text-sm">
            <div className="px-3 py-1 border-2 border-black">
              <span className="font-black">{legend.xp.toLocaleString()}</span>
              <span className="text-black/60 ml-1">XP</span>
            </div>
            <div className="px-3 py-1 border-2 border-black">
              <span className="font-black">{legend.achievements.length}</span>
              <span className="text-black/60 ml-1">AWARDS</span>
            </div>
          </div>

          {/* Category */}
          <div className="mt-4 pt-4 border-t-2 border-black">
            <span className="text-xs font-mono uppercase tracking-widest text-black/50">
              {legend.category}
            </span>
          </div>
        </div>

        {/* Hover fill effect */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 0.03 : 0 }}
          style={{ transformOrigin: 'bottom' }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.article>
  );
}
