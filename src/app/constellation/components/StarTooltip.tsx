'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Legend, CATEGORIES } from '@/lib/types';
import { Twitter, Github, Linkedin, Globe, Trophy, Star, Zap } from 'lucide-react';

interface StarTooltipProps {
  legend: Legend | null;
  position?: 'left' | 'right';
  className?: string;
}

export function StarTooltip({ legend, position = 'right', className = '' }: StarTooltipProps) {
  const category = legend ? CATEGORIES.find(c => c.value === legend.category) : null;

  return (
    <AnimatePresence mode="wait">
      {legend && (
        <motion.div
          key={legend.id}
          className={`w-80 ${className}`}
          initial={{ opacity: 0, scale: 0.9, x: position === 'right' ? 20 : -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: position === 'right' ? 20 : -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        >
          {/* Glassmorphic card */}
          <div className="relative overflow-hidden rounded-2xl">
            {/* Background blur layer */}
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xl" />

            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/50 via-transparent to-cyan-500/50">
              <div className="absolute inset-[1px] rounded-2xl bg-slate-900/90" />
            </div>

            {/* Content */}
            <div className="relative p-5">
              {/* Header with avatar and badges */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-purple-500/25">
                    {legend.name.charAt(0)}
                  </div>
                  {legend.featured && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                      <Star className="w-3 h-3 text-yellow-900" fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Name and title */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white truncate">{legend.name}</h3>
                  <p className="text-sm text-purple-300/80 truncate">{legend.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                      {category?.emoji} {category?.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-slate-300/90 leading-relaxed mb-4 line-clamp-2">
                {legend.bio}
              </p>

              {/* Stats row */}
              {legend.stats && (
                <div className="flex gap-4 mb-4 p-3 rounded-xl bg-slate-800/50">
                  {legend.stats.projects && (
                    <div className="flex-1 text-center">
                      <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                        <Star className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-lg font-bold text-white">{legend.stats.projects}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Projects</div>
                    </div>
                  )}
                  {legend.stats.contributions && (
                    <div className="flex-1 text-center border-x border-slate-700/50">
                      <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-lg font-bold text-white">{legend.stats.contributions}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Contrib</div>
                    </div>
                  )}
                  {legend.stats.awards && (
                    <div className="flex-1 text-center">
                      <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                        <Trophy className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-lg font-bold text-white">{legend.stats.awards}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Awards</div>
                    </div>
                  )}
                </div>
              )}

              {/* Achievements preview */}
              {legend.achievements.length > 0 && (
                <div className="mb-4">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Top Achievement</div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20">
                    <Trophy className="w-4 h-4 text-yellow-500 shrink-0" />
                    <span className="text-sm text-yellow-200/90 truncate">
                      {legend.achievements[0].title}
                    </span>
                  </div>
                </div>
              )}

              {/* Social links */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                <div className="flex gap-2">
                  {legend.socials.twitter && (
                    <a
                      href={`https://twitter.com/${legend.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {legend.socials.github && (
                    <a
                      href={`https://github.com/${legend.socials.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {legend.socials.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${legend.socials.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {legend.socials.website && (
                    <a
                      href={legend.socials.website.startsWith('http') ? legend.socials.website : `https://${legend.socials.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <span className="text-xs text-slate-500">Since {legend.joinedDate}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
