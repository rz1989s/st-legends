'use client';

import { motion } from 'framer-motion';
import { Legend, CATEGORIES } from '@/lib/types';
import { Twitter, Github, Globe, Trophy, Star } from 'lucide-react';

interface GoldPlaqueProps {
  legend: Legend;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GoldPlaque({ legend, size = 'md', className = '' }: GoldPlaqueProps) {
  const category = CATEGORIES.find(c => c.value === legend.category);

  const sizeConfig = {
    sm: { padding: 'p-4', avatar: 'w-12 h-12', title: 'text-base', subtitle: 'text-xs' },
    md: { padding: 'p-5', avatar: 'w-16 h-16', title: 'text-lg', subtitle: 'text-sm' },
    lg: { padding: 'p-6', avatar: 'w-20 h-20', title: 'text-xl', subtitle: 'text-base' },
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
    >
      {/* Outer frame - wood-like */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-900 via-yellow-900 to-amber-950 shadow-2xl" />

      {/* Gold border */}
      <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500" />

      {/* Inner gold border */}
      <div className="absolute inset-2 rounded-lg bg-gradient-to-br from-yellow-600 via-amber-500 to-yellow-700" />

      {/* Main plaque surface */}
      <div className={`relative m-3 rounded-lg bg-gradient-to-br from-amber-800 via-yellow-700 to-amber-800 ${config.padding}`}>
        {/* Embossed texture */}
        <div className="absolute inset-0 rounded-lg opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.3'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Featured badge */}
        {legend.featured && (
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full flex items-center justify-center shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-4 h-4 text-amber-900" fill="currentColor" />
          </motion.div>
        )}

        {/* Content */}
        <div className="relative text-center">
          {/* Avatar */}
          <div className={`${config.avatar} mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-inner`}>
            <span className="text-2xl font-bold text-amber-900">
              {legend.name.charAt(0)}
            </span>
          </div>

          {/* Engraved name plate */}
          <div className="relative py-2 px-4 mb-2 rounded bg-gradient-to-b from-yellow-600/50 to-amber-700/50">
            <div className="absolute inset-0 rounded" style={{
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1)',
            }} />
            <h3 className={`${config.title} font-bold text-yellow-100 relative`} style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.5), 0 -1px 1px rgba(255,255,255,0.1)',
            }}>
              {legend.name}
            </h3>
          </div>

          {/* Title */}
          <p className={`${config.subtitle} text-yellow-200/80 mb-2`}>{legend.title}</p>

          {/* Category */}
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-600/30 text-yellow-200 text-xs">
            {category?.emoji} {category?.label}
          </span>

          {/* Stats */}
          {legend.stats && (
            <div className="flex justify-center gap-4 mt-3 pt-3 border-t border-yellow-600/30">
              {legend.stats.projects && (
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-200">{legend.stats.projects}</div>
                  <div className="text-[10px] text-yellow-300/60 uppercase">Projects</div>
                </div>
              )}
              {legend.stats.awards && (
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-200">{legend.stats.awards}</div>
                  <div className="text-[10px] text-yellow-300/60 uppercase">Awards</div>
                </div>
              )}
            </div>
          )}

          {/* Socials */}
          <div className="flex justify-center gap-2 mt-3">
            {legend.socials.twitter && (
              <a href={`https://twitter.com/${legend.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-yellow-600/30 text-yellow-200/70 hover:text-yellow-100 transition-colors">
                <Twitter size={14} />
              </a>
            )}
            {legend.socials.github && (
              <a href={`https://github.com/${legend.socials.github}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-yellow-600/30 text-yellow-200/70 hover:text-yellow-100 transition-colors">
                <Github size={14} />
              </a>
            )}
            {legend.socials.website && (
              <a href={legend.socials.website.startsWith('http') ? legend.socials.website : `https://${legend.socials.website}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-yellow-600/30 text-yellow-200/70 hover:text-yellow-100 transition-colors">
                <Globe size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
