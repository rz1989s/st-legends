'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Legend } from '@/lib/types';

interface StatRadarProps {
  legend: Legend;
  className?: string;
}

const STATS = [
  { key: 'xp', label: 'XP', max: 50000 },
  { key: 'achievements', label: 'Badges', max: 5 },
  { key: 'contributions', label: 'Contrib', max: 1000 },
  { key: 'projects', label: 'Projects', max: 100 },
  { key: 'awards', label: 'Awards', max: 20 },
  { key: 'influence', label: 'Impact', max: 100 },
];

export function StatRadar({ legend, className = '' }: StatRadarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const size = 200;
  const center = size / 2;
  const radius = 70;
  const angleStep = (Math.PI * 2) / STATS.length;

  // Generate stat values from actual legend data (deterministic)
  const statValues = useMemo(() => {
    return STATS.map((stat) => {
      let value: number;
      switch (stat.key) {
        case 'xp':
          value = legend.xp / stat.max;
          break;
        case 'achievements':
          value = legend.achievements.length / stat.max;
          break;
        case 'contributions':
          // Use actual contributions from stats, or derive from XP
          value = (legend.stats?.contributions || Math.floor(legend.xp / 100)) / stat.max;
          break;
        case 'projects':
          // Use actual projects from stats
          value = (legend.stats?.projects || Math.floor(legend.xp / 500)) / stat.max;
          break;
        case 'awards':
          // Use actual awards from stats
          value = (legend.stats?.awards || legend.achievements.length) / stat.max;
          break;
        case 'influence':
          // Category-based influence score (deterministic)
          const influenceMap: Record<string, number> = {
            founders: 90,
            legends: 85,
            contributors: 70,
            achievers: 60,
          };
          value = (influenceMap[legend.category] || 50) / stat.max;
          break;
        default:
          value = 0.5;
      }
      return Math.min(Math.max(value, 0.1), 1); // Clamp between 0.1 and 1
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
