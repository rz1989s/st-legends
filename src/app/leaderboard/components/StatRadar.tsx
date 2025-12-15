'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Legend } from '@/lib/types';

interface StatRadarProps {
  legend: Legend;
  className?: string;
}

const STATS = [
  { key: 'xp', label: 'XP', max: 30000 },
  { key: 'achievements', label: 'Badges', max: 10 },
  { key: 'contributions', label: 'Contrib', max: 100 },
  { key: 'influence', label: 'Impact', max: 100 },
  { key: 'activity', label: 'Activity', max: 100 },
  { key: 'reputation', label: 'Rep', max: 100 },
];

export function StatRadar({ legend, className = '' }: StatRadarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const size = 200;
  const center = size / 2;
  const radius = 70;
  const angleStep = (Math.PI * 2) / STATS.length;

  // Generate stat values (some derived from legend data)
  const statValues = useMemo(() => {
    return STATS.map((stat, index) => {
      let value: number;
      switch (stat.key) {
        case 'xp':
          value = legend.xp / stat.max;
          break;
        case 'achievements':
          value = legend.achievements.length / stat.max;
          break;
        case 'contributions':
          value = 0.5 + Math.random() * 0.4; // Simulated
          break;
        case 'influence':
          value = legend.category === 'founders' ? 0.9 : legend.category === 'legends' ? 0.8 : 0.6;
          break;
        case 'activity':
          value = 0.6 + Math.random() * 0.3; // Simulated
          break;
        case 'reputation':
          value = 0.7 + Math.random() * 0.25; // Simulated
          break;
        default:
          value = 0.5;
      }
      return Math.min(value, 1);
    });
  }, [legend]);

  // Generate polygon points
  const getPolygonPoints = (values: number[], scale: number = 1) => {
    return values
      .map((value, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x = center + Math.cos(angle) * radius * value * scale;
        const y = center + Math.sin(angle) * radius * value * scale;
        return `${x},${y}`;
      })
      .join(' ');
  };

  // Background grid levels
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
        style={{ maxWidth: size, maxHeight: size }}
      >
        {/* Background grid */}
        {gridLevels.map((level, index) => (
          <motion.polygon
            key={level}
            points={getPolygonPoints(Array(STATS.length).fill(level))}
            fill="none"
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 }}
          />
        ))}

        {/* Axis lines */}
        {STATS.map((_, index) => {
          const angle = angleStep * index - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          return (
            <motion.line
              key={index}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
            />
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(6, 182, 212)" />
            <stop offset="50%" stopColor="rgb(147, 51, 234)" />
            <stop offset="100%" stopColor="rgb(236, 72, 153)" />
          </linearGradient>
        </defs>

        {/* Data polygon fill */}
        <motion.polygon
          points={getPolygonPoints(statValues)}
          fill="url(#radarGradient)"
          fillOpacity="0.3"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Data polygon stroke */}
        <motion.polygon
          points={getPolygonPoints(statValues)}
          fill="none"
          stroke="url(#radarStroke)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        {/* Data points */}
        {statValues.map((value, index) => {
          const angle = angleStep * index - Math.PI / 2;
          const x = center + Math.cos(angle) * radius * value;
          const y = center + Math.sin(angle) * radius * value;
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="white"
              stroke="url(#radarStroke)"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
            />
          );
        })}

        {/* Labels */}
        {STATS.map((stat, index) => {
          const angle = angleStep * index - Math.PI / 2;
          const labelRadius = radius + 25;
          const x = center + Math.cos(angle) * labelRadius;
          const y = center + Math.sin(angle) * labelRadius;
          return (
            <motion.text
              key={stat.key}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-medium fill-slate-400"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 + index * 0.05 }}
            >
              {stat.label}
            </motion.text>
          );
        })}
      </svg>

      {/* Center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-lg"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}
