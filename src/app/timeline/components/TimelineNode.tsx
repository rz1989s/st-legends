'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Legend, CATEGORIES } from '@/lib/types';
import { Twitter, Github, Globe, Trophy, Calendar } from 'lucide-react';

interface TimelineNodeProps {
  legend: Legend;
  index: number;
  isLeft?: boolean;
  className?: string;
}

export function TimelineNode({ legend, index, isLeft = true, className = '' }: TimelineNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const category = CATEGORIES.find(c => c.value === legend.category);

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} ${className}`}
    >
      {/* Content card */}
      <motion.div
        className={`w-full md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-colors">
          {/* Date badge */}
          <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
            <Calendar size={14} className="text-purple-400" />
            <span className="text-sm text-purple-300">{legend.joinedDate}</span>
          </div>

          {/* Avatar and name */}
          <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-purple-500/30">
              {legend.name.charAt(0)}
            </div>
            <div className={isLeft ? 'md:text-right' : ''}>
              <h3 className="text-lg font-bold text-white">{legend.name}</h3>
              <p className="text-sm text-slate-400">{legend.title}</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-slate-300 text-sm mb-4 line-clamp-2">{legend.bio}</p>

          {/* Category and achievements */}
          <div className={`flex items-center gap-3 flex-wrap ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">
              {category?.emoji} {category?.label}
            </span>
            {legend.achievements.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-yellow-400">
                <Trophy size={12} />
                {legend.achievements.length} achievements
              </span>
            )}
          </div>

          {/* Socials */}
          <div className={`flex gap-2 mt-4 pt-4 border-t border-slate-700/50 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
            {legend.socials.twitter && (
              <a href={`https://twitter.com/${legend.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white transition-colors">
                <Twitter size={14} />
              </a>
            )}
            {legend.socials.github && (
              <a href={`https://github.com/${legend.socials.github}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white transition-colors">
                <Github size={14} />
              </a>
            )}
            {legend.socials.website && (
              <a href={legend.socials.website.startsWith('http') ? legend.socials.website : `https://${legend.socials.website}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white transition-colors">
                <Globe size={14} />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Center node - Hidden on mobile */}
      <motion.div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, type: 'spring' }}
      >
        {/* Connector dot */}
        <div className="relative">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30" />
          <motion.div
            className="absolute -inset-2 rounded-full border-2 border-purple-400/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Empty space on opposite side - Hidden on mobile */}
      <div className="hidden md:block w-[calc(50%-40px)]" />
    </div>
  );
}
