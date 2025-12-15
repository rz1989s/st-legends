'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Legend } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';

interface MinimalCardProps {
  legend: Legend;
  index?: number;
  className?: string;
}

export function MinimalCard({ legend, index = 0, className = '' }: MinimalCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      className={`group relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card */}
      <div className="relative p-8 border-b border-neutral-200 hover:bg-neutral-50 transition-colors duration-300">
        {/* Number */}
        <span className="absolute top-8 right-8 text-xs font-mono text-neutral-300">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Main content */}
        <div className="flex items-start gap-6">
          {/* Avatar placeholder */}
          <motion.div
            className="relative flex-shrink-0 w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl font-light text-neutral-400">
              {legend.name.charAt(0)}
            </span>
            <motion.div
              className="absolute inset-0 bg-neutral-900"
              initial={{ y: '100%' }}
              animate={{ y: isHovered ? '0%' : '100%' }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute text-2xl font-light text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {legend.name.charAt(0)}
            </motion.span>
          </motion.div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            {/* Name and link */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-medium text-neutral-900 tracking-tight">
                {legend.name}
              </h3>
              <motion.div
                animate={{
                  x: isHovered ? 0 : -5,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight size={16} className="text-neutral-400" />
              </motion.div>
            </div>

            {/* Title */}
            <p className="text-sm text-neutral-500 mb-3">{legend.title}</p>

            {/* Bio - truncated */}
            <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
              {legend.bio}
            </p>

            {/* Meta row */}
            <motion.div
              className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs text-neutral-400 uppercase tracking-wider">
                {legend.category}
              </span>
              <span className="text-xs text-neutral-300">•</span>
              <span className="text-xs text-neutral-400">
                Since {new Date(legend.joinedDate).getFullYear()}
              </span>
              <span className="text-xs text-neutral-300">•</span>
              <span className="text-xs text-neutral-400">
                {legend.achievements.length} achievements
              </span>
            </motion.div>
          </div>
        </div>

        {/* Hover indicator line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-900"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.article>
  );
}
