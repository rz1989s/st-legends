'use client';

import { NoiseOverlay, HalftoneOverlay } from './NoiseOverlay';

interface BrutalBackgroundProps {
  variant?: 'white' | 'black' | 'grid';
  className?: string;
}

export function BrutalBackground({ variant = 'white', className = '' }: BrutalBackgroundProps) {
  const backgrounds = {
    white: 'bg-white',
    black: 'bg-black',
    grid: 'bg-white',
  };

  return (
    <div className={`fixed inset-0 ${backgrounds[variant]} ${className}`}>
      {/* Grid pattern for grid variant */}
      {variant === 'grid' && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Diagonal lines for visual interest */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            black 10px,
            black 11px
          )`,
        }}
      />

      {/* Random black blocks */}
      <div className="absolute top-[10%] right-[5%] w-8 h-32 bg-black opacity-5" />
      <div className="absolute bottom-[20%] left-[8%] w-16 h-4 bg-black opacity-5" />
      <div className="absolute top-[60%] right-[15%] w-4 h-24 bg-black opacity-5" />

      {/* Noise overlay */}
      <NoiseOverlay opacity={0.03} />

      {/* Halftone pattern */}
      <HalftoneOverlay opacity={0.02} />
    </div>
  );
}
