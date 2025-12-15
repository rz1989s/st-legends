'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps {
  className?: string;
}

export function ParallaxBackground({ className = '' }: ParallaxBackgroundProps) {
  const { scrollYProgress } = useScroll();

  // Different parallax speeds for layers
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);

  return (
    <div className={`fixed inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Slow parallax layer - large orbs */}
      <motion.div className="absolute inset-0" style={{ y: y1 }}>
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[60%] right-[15%] w-80 h-80 bg-pink-600/10 rounded-full blur-[80px]" />
      </motion.div>

      {/* Medium parallax layer */}
      <motion.div className="absolute inset-0" style={{ y: y2 }}>
        <div className="absolute top-[30%] right-[20%] w-64 h-64 bg-cyan-600/10 rounded-full blur-[60px]" />
        <div className="absolute top-[70%] left-[25%] w-72 h-72 bg-purple-600/10 rounded-full blur-[70px]" />
      </motion.div>

      {/* Fast parallax layer - small accents */}
      <motion.div className="absolute inset-0" style={{ y: y3 }}>
        <div className="absolute top-[20%] left-[50%] w-32 h-32 bg-pink-500/10 rounded-full blur-[40px]" />
        <div className="absolute top-[50%] right-[30%] w-40 h-40 bg-cyan-500/10 rounded-full blur-[50px]" />
        <div className="absolute top-[80%] left-[40%] w-24 h-24 bg-purple-500/10 rounded-full blur-[30px]" />
      </motion.div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  );
}
