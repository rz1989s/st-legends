'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  active?: boolean;
}

const variantStyles = {
  primary: {
    bg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))',
    border: 'rgba(255, 255, 255, 0.2)',
    glow: 'rgba(139, 92, 246, 0.4)',
  },
  secondary: {
    bg: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.15)',
    glow: 'rgba(255, 255, 255, 0.2)',
  },
  ghost: {
    bg: 'transparent',
    border: 'rgba(255, 255, 255, 0.1)',
    glow: 'rgba(255, 255, 255, 0.1)',
  },
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function GlowButton({
  children,
  onClick,
  variant = 'secondary',
  size = 'md',
  className = '',
  active = false,
}: GlowButtonProps) {
  const style = variantStyles[variant];

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl font-medium text-white ${sizeStyles[size]} ${className}`}
      style={{
        background: active ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))' : style.bg,
        border: `1px solid ${style.border}`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{ boxShadow: `0 0 30px ${style.glow}` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }}
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Active indicator */}
      {active && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full"
          layoutId="activeIndicator"
        />
      )}
    </motion.button>
  );
}

// Filter pills group
interface GlassFilterProps {
  options: Array<{ value: string; label: string }>;
  selected: string;
  onChange: (value: string) => void;
  className?: string;
}

export function GlassFilter({ options, selected, onChange, className = '' }: GlassFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <GlowButton
          key={option.value}
          variant={selected === option.value ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onChange(option.value)}
          active={selected === option.value}
        >
          {option.label}
        </GlowButton>
      ))}
    </div>
  );
}
