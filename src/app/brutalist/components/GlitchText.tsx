'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-red-500 opacity-70"
            style={{ clipPath: 'inset(20% 0 40% 0)' }}
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 0.1, repeat: 2 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-cyan-500 opacity-70"
            style={{ clipPath: 'inset(60% 0 10% 0)' }}
            animate={{ x: [2, -2, 2] }}
            transition={{ duration: 0.1, repeat: 2 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  );
}

// Marquee scrolling text
interface MarqueeTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function MarqueeText({ text, speed = 20, className = '' }: MarqueeTextProps) {
  const repeatedText = Array(5).fill(text).join(' • ');

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: [0, -50 * text.length] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span className="font-black uppercase tracking-tight">{repeatedText}</span>
      </motion.div>
    </div>
  );
}
