'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Legend } from '@/lib/types';
import { ExternalLink, Twitter, Github } from 'lucide-react';

interface ExhibitFrameProps {
  legend: Legend;
  index?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeConfig = {
  sm: { frame: 'w-64', image: 'h-48', padding: 'p-3' },
  md: { frame: 'w-80', image: 'h-64', padding: 'p-4' },
  lg: { frame: 'w-96', image: 'h-80', padding: 'p-5' },
};

export function ExhibitFrame({ legend, index = 0, size = 'md', className = '' }: ExhibitFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  const config = sizeConfig[size];

  return (
    <motion.div
      ref={ref}
      className={`relative ${config.frame} ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-32 h-40 opacity-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255,215,0,0.3) 0%, transparent 100%)',
          filter: 'blur(20px)',
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Frame container */}
      <motion.div
        className="relative"
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Outer ornate frame */}
        <div className="absolute -inset-4 bg-gradient-to-b from-amber-800 via-yellow-700 to-amber-900 rounded-sm" />
        <div className="absolute -inset-3 bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 rounded-sm" />
        <div className="absolute -inset-2 bg-gradient-to-b from-amber-800 via-amber-900 to-amber-800 rounded-sm" />

        {/* Inner frame with inset effect */}
        <div className="relative bg-gradient-to-b from-amber-950 to-stone-950 rounded-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          {/* Matting */}
          <div className={`${config.padding} bg-gradient-to-b from-stone-100 to-stone-200`}>
            {/* Image container */}
            <div className={`relative ${config.image} bg-slate-800 overflow-hidden`}>
              {/* Placeholder image with initial */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
                <span className="text-6xl font-serif text-slate-600">
                  {legend.name.charAt(0)}
                </span>
              </div>

              {/* Canvas texture overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white/80 text-sm line-clamp-3 mb-3">{legend.bio}</p>
                <div className="flex gap-2">
                  {legend.socials.twitter && (
                    <a
                      href={`https://twitter.com/${legend.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Twitter size={14} className="text-white" />
                    </a>
                  )}
                  {legend.socials.github && (
                    <a
                      href={`https://github.com/${legend.socials.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Github size={14} className="text-white" />
                    </a>
                  )}
                  {legend.socials.website && (
                    <a
                      href={`https://${legend.socials.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink size={14} className="text-white" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Frame corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-600/50" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-600/50" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-600/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-600/50" />
            </div>
          </div>
        </div>

        {/* Frame shadow */}
        <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/20 blur-xl rounded-full" />
      </motion.div>

      {/* Name plate */}
      <motion.div
        className="relative mt-8 mx-auto w-3/4"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      >
        <div className="bg-gradient-to-b from-amber-700 via-amber-600 to-amber-800 rounded-sm p-0.5 shadow-lg">
          <div className="bg-gradient-to-b from-amber-800 to-amber-950 rounded-sm px-4 py-2 text-center">
            <h3 className="font-serif text-amber-100 font-medium text-sm tracking-wide">
              {legend.name}
            </h3>
            <p className="text-amber-400/60 text-xs mt-0.5 tracking-widest uppercase">
              {legend.title}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
