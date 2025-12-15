'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { Legend, CATEGORIES } from '@/lib/types';
import { Star, Zap, Trophy, Twitter, Github, Globe } from 'lucide-react';

interface HolographicCardProps {
  legend: Legend;
  onFlip?: () => void;
  className?: string;
}

export function HolographicCard({ legend, onFlip, className = '' }: HolographicCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg']);

  // Holographic gradient position
  const gradientX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const gradientY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const category = CATEGORIES.find(c => c.value === legend.category);
  const rarity = legend.featured ? 'LEGENDARY' : 'RARE';
  const rarityGradient = legend.featured
    ? 'from-yellow-400 via-amber-300 to-yellow-500'
    : 'from-purple-400 via-pink-400 to-purple-500';

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative w-full aspect-[2.5/3.5] cursor-pointer ${className}`}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', damping: 20 }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Card base */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950">
            {/* Holographic overlay */}
            <motion.div
              className="absolute inset-0 opacity-60 mix-blend-overlay"
              style={{
                background: `linear-gradient(
                  135deg,
                  rgba(255, 0, 128, 0.3) 0%,
                  rgba(0, 255, 255, 0.3) 25%,
                  rgba(255, 255, 0, 0.3) 50%,
                  rgba(0, 128, 255, 0.3) 75%,
                  rgba(255, 0, 128, 0.3) 100%
                )`,
                backgroundSize: '200% 200%',
                backgroundPosition: `${gradientX.get()} ${gradientY.get()}`,
              }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(
                  circle at ${gradientX.get()} ${gradientY.get()},
                  rgba(255, 255, 255, 0.3) 0%,
                  transparent 50%
                )`,
              }}
            />
          </div>

          {/* Border frame */}
          <div className={`absolute inset-0 rounded-2xl p-1 bg-gradient-to-br ${rarityGradient}`}>
            <div className="absolute inset-[4px] rounded-xl bg-stone-900" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col p-4">
            {/* Rarity badge */}
            <div className="flex justify-between items-start mb-3">
              <span className={`px-2 py-1 rounded text-[10px] font-black tracking-wider bg-gradient-to-r ${rarityGradient} text-stone-900`}>
                {rarity}
              </span>
              <span className="text-xs text-amber-400/60 font-mono">
                #{legend.id.split('-')[1]?.padStart(3, '0') || '001'}
              </span>
            </div>

            {/* Avatar */}
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="relative">
                <motion.div
                  className={`w-28 h-28 rounded-xl bg-gradient-to-br ${rarityGradient} flex items-center justify-center shadow-2xl`}
                  style={{
                    boxShadow: legend.featured
                      ? '0 0 40px rgba(251, 191, 36, 0.4)'
                      : '0 0 30px rgba(168, 85, 247, 0.3)',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-5xl font-bold text-stone-900">
                    {legend.name.charAt(0)}
                  </span>
                </motion.div>

                {/* Floating particles */}
                {legend.featured && (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
                        style={{
                          top: '50%',
                          left: '50%',
                        }}
                        animate={{
                          x: [0, Math.cos(i * 90 * Math.PI / 180) * 50],
                          y: [0, Math.sin(i * 90 * Math.PI / 180) * 50],
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Info section */}
            <div className="bg-stone-950/50 rounded-xl p-3 backdrop-blur-sm border border-amber-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{category?.emoji}</span>
                <span className="text-[10px] text-amber-400/80 uppercase tracking-wider">
                  {category?.label}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-0.5 truncate">{legend.name}</h3>
              <p className="text-sm text-amber-200/60 truncate">{legend.title}</p>

              {/* Stats */}
              {legend.stats && (
                <div className="flex gap-3 mt-3 pt-3 border-t border-amber-500/20">
                  {legend.stats.projects && (
                    <div className="flex items-center gap-1 text-amber-300/80">
                      <Star size={12} />
                      <span className="text-xs font-bold">{legend.stats.projects}</span>
                    </div>
                  )}
                  {legend.stats.contributions && (
                    <div className="flex items-center gap-1 text-cyan-300/80">
                      <Zap size={12} />
                      <span className="text-xs font-bold">{legend.stats.contributions}</span>
                    </div>
                  )}
                  {legend.stats.awards && (
                    <div className="flex items-center gap-1 text-yellow-300/80">
                      <Trophy size={12} />
                      <span className="text-xs font-bold">{legend.stats.awards}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Flip hint */}
            <p className="text-[10px] text-center text-amber-200/30 mt-2">Click to flip</p>
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Back design */}
          <div className={`absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-950`}>
            {/* Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Border */}
          <div className={`absolute inset-0 rounded-2xl p-1 bg-gradient-to-br ${rarityGradient}`}>
            <div className="absolute inset-[4px] rounded-xl bg-stone-900" />
          </div>

          {/* Back content */}
          <div className="relative h-full flex flex-col p-4">
            <h3 className="text-lg font-bold text-amber-200 mb-2">{legend.name}</h3>

            <p className="text-sm text-amber-100/70 flex-1 line-clamp-4 mb-4">
              {legend.bio}
            </p>

            {/* Achievements */}
            <div className="mb-4">
              <h4 className="text-[10px] text-amber-400/60 uppercase tracking-wider mb-2">Achievements</h4>
              <div className="space-y-1.5">
                {legend.achievements.slice(0, 2).map((ach, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Trophy className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-amber-100/80">{ach.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2 pt-3 border-t border-amber-500/20">
              {legend.socials.twitter && (
                <a href={`https://twitter.com/${legend.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-amber-500/10 text-amber-300/70 hover:text-amber-200 transition-colors">
                  <Twitter size={14} />
                </a>
              )}
              {legend.socials.github && (
                <a href={`https://github.com/${legend.socials.github}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-amber-500/10 text-amber-300/70 hover:text-amber-200 transition-colors">
                  <Github size={14} />
                </a>
              )}
              {legend.socials.website && (
                <a href={legend.socials.website.startsWith('http') ? legend.socials.website : `https://${legend.socials.website}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-amber-500/10 text-amber-300/70 hover:text-amber-200 transition-colors">
                  <Globe size={14} />
                </a>
              )}
            </div>

            <p className="text-[10px] text-center text-amber-200/30 mt-3">Since {legend.joinedDate}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
