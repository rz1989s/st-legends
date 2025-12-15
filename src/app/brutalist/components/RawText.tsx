'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface RawTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  delay?: number;
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
  xl: 'text-4xl md:text-6xl',
  '2xl': 'text-6xl md:text-8xl',
};

export function RawText({
  children,
  as: Tag = 'p',
  size = 'md',
  className = '',
  delay = 0,
}: RawTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      // @ts-ignore
      ref={ref}
      initial={{ opacity: 0, y: 30, skewY: 3 }}
      animate={isInView ? { opacity: 1, y: 0, skewY: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <Tag
        className={`font-black uppercase tracking-tight ${sizeStyles[size]} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}

// Strikethrough text for emphasis
interface StrikeTextProps {
  children: ReactNode;
  className?: string;
}

export function StrikeText({ children, className = '' }: StrikeTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute left-0 right-0 top-1/2 h-1 bg-black"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ transformOrigin: 'left' }}
      />
    </span>
  );
}

// Highlight text
interface HighlightTextProps {
  children: ReactNode;
  className?: string;
}

export function HighlightText({ children, className = '' }: HighlightTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span
        className="absolute inset-0 bg-black -rotate-1"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
      <span className="relative z-10 text-white px-2">{children}</span>
    </span>
  );
}
