'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface FrostedPanelProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'bright' | 'dark';
}

const variantStyles = {
  default: {
    bg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.15)',
    blur: 20,
  },
  bright: {
    bg: 'rgba(255, 255, 255, 0.15)',
    border: 'rgba(255, 255, 255, 0.25)',
    blur: 25,
  },
  dark: {
    bg: 'rgba(0, 0, 0, 0.2)',
    border: 'rgba(255, 255, 255, 0.1)',
    blur: 15,
  },
};

export function FrostedPanel({
  children,
  title,
  className = '',
  variant = 'default',
}: FrostedPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const style = variantStyles[variant];

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Panel */}
      <div
        className="relative overflow-hidden rounded-3xl p-8"
        style={{
          background: style.bg,
          backdropFilter: `blur(${style.blur}px)`,
          WebkitBackdropFilter: `blur(${style.blur}px)`,
          border: `1px solid ${style.border}`,
        }}
      >
        {/* Title */}
        {title && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-white flex items-center gap-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              {title}
            </h2>
          </motion.div>
        )}

        {/* Content */}
        {children}

        {/* Glass shine */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%)',
          }}
        />

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.2), transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  );
}
