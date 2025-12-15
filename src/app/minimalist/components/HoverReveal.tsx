'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { Legend } from '@/lib/types';

interface HoverRevealProps {
  legend: Legend;
  children: ReactNode;
  className?: string;
}

export function HoverReveal({ legend, children, className = '' }: HoverRevealProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-full left-0 right-0 z-20 mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white border border-neutral-200 rounded-lg shadow-xl p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4 pb-4 border-b border-neutral-100">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-lg font-light text-neutral-500">
                  {legend.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">{legend.name}</h4>
                  <p className="text-sm text-neutral-500">{legend.title}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                {legend.bio}
              </p>

              {/* Achievements */}
              {legend.achievements.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Achievements
                  </h5>
                  <ul className="space-y-1">
                    {legend.achievements.slice(0, 3).map((achievement, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-neutral-600">
                        <span className="w-1 h-1 rounded-full bg-neutral-300" />
                        {achievement.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Meta */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100">
                <span className="text-xs text-neutral-400">
                  {legend.category}
                </span>
                <span className="text-xs text-neutral-400">
                  {legend.xp.toLocaleString()} XP
                </span>
                <span className="text-xs text-neutral-400">
                  Since {new Date(legend.joinedDate).getFullYear()}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple name hover effect
interface NameHoverProps {
  name: string;
  className?: string;
}

export function NameHover({ name, className = '' }: NameHoverProps) {
  return (
    <motion.span
      className={`relative inline-block cursor-pointer ${className}`}
      whileHover="hover"
    >
      <span className="relative z-10">{name}</span>
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 origin-left"
        variants={{
          hover: { scaleX: 1 },
        }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.span>
  );
}
