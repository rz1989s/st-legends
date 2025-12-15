'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Legend } from '@/lib/types';
import { Twitter, Github, ExternalLink } from 'lucide-react';

interface GlassCardProps {
  legend: Legend;
  index?: number;
  className?: string;
}

export function GlassCard({ legend, index = 0, className = '' }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`group relative ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect behind card */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Glass card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            {/* Avatar */}
            <motion.div
              className="relative w-16 h-16 rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))',
              }}
              animate={{ rotate: isHovered ? 5 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                {legend.name.charAt(0)}
              </div>
              {/* Glass shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">{legend.name}</h3>
              <p className="text-sm text-white/60">{legend.title}</p>
            </div>

            {/* XP Badge */}
            <div
              className="px-3 py-1 rounded-full text-xs font-mono text-white/80"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {legend.xp.toLocaleString()} XP
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-2">
            {legend.bio}
          </p>

          {/* Achievements */}
          <div className="flex flex-wrap gap-2 mb-4">
            {legend.achievements.slice(0, 2).map((achievement, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs text-white/60 rounded-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {achievement.title}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {/* Category */}
            <span className="text-xs text-white/40 uppercase tracking-wider">
              {legend.category}
            </span>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {legend.socials.twitter && (
                <a
                  href={`https://twitter.com/${legend.socials.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Twitter size={14} />
                </a>
              )}
              {legend.socials.github && (
                <a
                  href={`https://github.com/${legend.socials.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Github size={14} />
                </a>
              )}
              {legend.socials.website && (
                <a
                  href={`https://${legend.socials.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Glass reflection */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
