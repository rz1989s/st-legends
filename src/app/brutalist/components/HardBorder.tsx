'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface HardBorderProps {
  children: ReactNode;
  thickness?: 2 | 4 | 6 | 8;
  offset?: boolean;
  className?: string;
}

export function HardBorder({
  children,
  thickness = 4,
  offset = true,
  className = '',
}: HardBorderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      {/* Offset shadow */}
      {offset && (
        <div
          className="absolute bg-black"
          style={{
            top: thickness,
            left: thickness,
            right: -thickness,
            bottom: -thickness,
          }}
        />
      )}

      {/* Main container */}
      <div
        className="relative bg-white"
        style={{ border: `${thickness}px solid black` }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Simple divider line
interface BrutalDividerProps {
  className?: string;
}

export function BrutalDivider({ className = '' }: BrutalDividerProps) {
  return (
    <motion.div
      className={`h-1 bg-black ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ transformOrigin: 'left' }}
    />
  );
}

// Corner brackets decoration
interface CornerBracketsProps {
  children: ReactNode;
  className?: string;
}

export function CornerBrackets({ children, className = '' }: CornerBracketsProps) {
  return (
    <div className={`relative p-8 ${className}`}>
      {/* Top left */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-black" />
      {/* Top right */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-black" />
      {/* Bottom left */}
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-black" />
      {/* Bottom right */}
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-black" />

      {children}
    </div>
  );
}
