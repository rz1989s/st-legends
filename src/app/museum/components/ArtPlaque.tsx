'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Legend } from '@/lib/types';
import { Calendar, Award, MapPin } from 'lucide-react';

interface ArtPlaqueProps {
  legend: Legend;
  variant?: 'brass' | 'silver' | 'bronze';
  className?: string;
}

const variantStyles = {
  brass: {
    outer: 'from-amber-700 via-yellow-600 to-amber-800',
    inner: 'from-amber-900 to-stone-950',
    text: 'text-amber-100',
    accent: 'text-amber-400',
    border: 'border-amber-700/50',
  },
  silver: {
    outer: 'from-slate-400 via-slate-300 to-slate-500',
    inner: 'from-slate-800 to-slate-950',
    text: 'text-slate-100',
    accent: 'text-slate-400',
    border: 'border-slate-600/50',
  },
  bronze: {
    outer: 'from-amber-800 via-orange-700 to-amber-900',
    inner: 'from-stone-900 to-stone-950',
    text: 'text-orange-100',
    accent: 'text-orange-400',
    border: 'border-orange-800/50',
  },
};

export function ArtPlaque({ legend, variant = 'brass', className = '' }: ArtPlaqueProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const style = variantStyles[variant];

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Shadow */}
      <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/30 blur-md rounded-sm" />

      {/* Plaque frame */}
      <div className={`relative bg-gradient-to-b ${style.outer} p-1 rounded-sm shadow-lg`}>
        {/* Engraved border effect */}
        <div className={`absolute inset-1 border ${style.border} rounded-sm opacity-50`} />

        {/* Inner plate */}
        <div className={`relative bg-gradient-to-b ${style.inner} p-6 rounded-sm`}>
          {/* Brushed metal texture */}
          <div
            className="absolute inset-0 opacity-10 rounded-sm"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 1px,
                rgba(255,255,255,0.03) 1px,
                rgba(255,255,255,0.03) 2px
              )`,
            }}
          />

          {/* Content */}
          <div className="relative space-y-4">
            {/* Title */}
            <div className="text-center border-b border-white/10 pb-4">
              <h3 className={`font-serif text-xl ${style.text} tracking-wider`}>
                {legend.name}
              </h3>
              <p className={`text-sm ${style.accent} mt-1 uppercase tracking-widest`}>
                {legend.title}
              </p>
            </div>

            {/* Bio */}
            <p className={`text-sm ${style.text} opacity-80 leading-relaxed text-center italic`}>
              "{legend.bio}"
            </p>

            {/* Metadata */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <div className={`flex items-center gap-1.5 ${style.accent}`}>
                <Calendar size={14} />
                <span className="text-xs font-mono">
                  {new Date(legend.joinedDate).getFullYear()}
                </span>
              </div>
              <div className={`flex items-center gap-1.5 ${style.accent}`}>
                <Award size={14} />
                <span className="text-xs font-mono">
                  {legend.achievements.length} Awards
                </span>
              </div>
            </div>

            {/* Achievements list */}
            {legend.achievements.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <h4 className={`text-xs ${style.accent} uppercase tracking-wider mb-2 text-center`}>
                  Notable Achievements
                </h4>
                <ul className="space-y-1">
                  {legend.achievements.slice(0, 2).map((achievement, idx) => (
                    <li key={idx} className={`text-xs ${style.text} opacity-70 text-center`}>
                      • {achievement.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Category badge */}
            <div className="flex justify-center pt-2">
              <span className={`px-3 py-1 text-xs ${style.accent} border ${style.border} rounded-sm uppercase tracking-wider`}>
                {legend.category}
              </span>
            </div>
          </div>

          {/* Corner accents */}
          <div className={`absolute top-2 left-2 w-3 h-3 border-t border-l ${style.border}`} />
          <div className={`absolute top-2 right-2 w-3 h-3 border-t border-r ${style.border}`} />
          <div className={`absolute bottom-2 left-2 w-3 h-3 border-b border-l ${style.border}`} />
          <div className={`absolute bottom-2 right-2 w-3 h-3 border-b border-r ${style.border}`} />
        </div>
      </div>

      {/* Mounting screws */}
      <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 shadow-inner" />
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 shadow-inner" />
      <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 shadow-inner" />
      <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 shadow-inner" />
    </motion.div>
  );
}
