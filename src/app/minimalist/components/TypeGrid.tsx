'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface TypeGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const gapStyles = {
  sm: 'gap-4',
  md: 'gap-8',
  lg: 'gap-12',
};

const columnStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

export function TypeGrid({
  children,
  columns = 2,
  gap = 'md',
  className = '',
}: TypeGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`grid ${columnStyles[columns]} ${gapStyles[gap]} ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// Grid section with title
interface TypeGridSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function TypeGridSection({
  title,
  subtitle,
  children,
  className = '',
}: TypeGridSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      className={`py-16 ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Section header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight">
            {title}
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        {subtitle && (
          <p className="text-neutral-500 max-w-xl">{subtitle}</p>
        )}
      </motion.div>

      {/* Content */}
      {children}
    </motion.section>
  );
}
