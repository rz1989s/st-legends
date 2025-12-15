'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface CardFoilOverlayProps {
  intensity?: 'low' | 'medium' | 'high';
  pattern?: 'rainbow' | 'holographic' | 'prismatic';
  className?: string;
}

export function CardFoilOverlay({
  intensity = 'medium',
  pattern = 'holographic',
  className = '',
}: CardFoilOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const intensityMap = {
    low: 0.3,
    medium: 0.5,
    high: 0.7,
  };

  const opacity = intensityMap[intensity];

  // Transform mouse position to gradient positions
  const gradientX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const gradientY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const getPatternGradient = () => {
    switch (pattern) {
      case 'rainbow':
        return `
          linear-gradient(
            ${45 + mouseX.get() * 90}deg,
            rgba(255, 0, 0, ${opacity}) 0%,
            rgba(255, 127, 0, ${opacity}) 16%,
            rgba(255, 255, 0, ${opacity}) 33%,
            rgba(0, 255, 0, ${opacity}) 50%,
            rgba(0, 0, 255, ${opacity}) 66%,
            rgba(75, 0, 130, ${opacity}) 83%,
            rgba(143, 0, 255, ${opacity}) 100%
          )
        `;
      case 'prismatic':
        return `
          conic-gradient(
            from ${mouseX.get() * 360}deg at ${gradientX.get()} ${gradientY.get()},
            rgba(255, 0, 128, ${opacity}),
            rgba(255, 128, 0, ${opacity}),
            rgba(255, 255, 0, ${opacity}),
            rgba(0, 255, 128, ${opacity}),
            rgba(0, 128, 255, ${opacity}),
            rgba(128, 0, 255, ${opacity}),
            rgba(255, 0, 128, ${opacity})
          )
        `;
      case 'holographic':
      default:
        return `
          linear-gradient(
            ${135 + mouseX.get() * 45}deg,
            rgba(255, 0, 128, ${opacity * 0.8}) 0%,
            rgba(0, 255, 255, ${opacity * 0.8}) 25%,
            rgba(255, 255, 0, ${opacity * 0.8}) 50%,
            rgba(0, 128, 255, ${opacity * 0.8}) 75%,
            rgba(255, 0, 128, ${opacity * 0.8}) 100%
          )
        `;
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base holographic layer */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          background: getPatternGradient(),
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: [
            '0% 0%',
            '100% 100%',
            '0% 100%',
            '100% 0%',
            '0% 0%',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Shimmer highlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            circle at ${gradientX.get()} ${gradientY.get()},
            rgba(255, 255, 255, ${opacity * 0.6}) 0%,
            transparent 40%
          )`,
        }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: opacity * 0.3 }}
      >
        <motion.div
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{
            top: ['-10%', '110%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sparkle particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </motion.div>
  );
}
