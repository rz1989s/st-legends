'use client';

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
}

export function NoiseOverlay({ opacity = 0.05, className = '' }: NoiseOverlayProps) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        position: 'fixed',
        inset: 0,
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'multiply',
      }}
    />
  );
}

// Halftone pattern overlay
interface HalftoneOverlayProps {
  opacity?: number;
  className?: string;
}

export function HalftoneOverlay({ opacity = 0.03, className = '' }: HalftoneOverlayProps) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        position: 'fixed',
        inset: 0,
        opacity,
        backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
        backgroundSize: '4px 4px',
      }}
    />
  );
}
