'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Legend, Category } from '@/lib/types';
import { LegendStar } from './LegendStar';

interface ConstellationMapProps {
  legends: Legend[];
  selectedCategory: Category | 'all';
  onLegendHover: (legend: Legend | null) => void;
  onLegendClick?: (legend: Legend) => void;
  className?: string;
}

interface StarPosition {
  legend: Legend;
  x: number;
  y: number;
}

export function ConstellationMap({
  legends,
  selectedCategory,
  onLegendHover,
  onLegendClick,
  className = '',
}: ConstellationMapProps) {
  const [hoveredLegend, setHoveredLegend] = useState<Legend | null>(null);

  // Generate deterministic positions based on legend id
  const starPositions: StarPosition[] = useMemo(() => {
    const filtered = selectedCategory === 'all'
      ? legends
      : legends.filter(l => l.category === selectedCategory);

    // Create constellation patterns based on category
    const categoryPatterns: Record<string, { baseX: number; baseY: number }> = {
      founders: { baseX: 20, baseY: 25 },
      contributors: { baseX: 65, baseY: 20 },
      achievers: { baseX: 25, baseY: 65 },
      legends: { baseX: 70, baseY: 60 },
    };

    return filtered.map((legend, index) => {
      // Use hash of id for consistent random-looking positions
      const hash = legend.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const pattern = categoryPatterns[legend.category] || { baseX: 50, baseY: 50 };

      // Spread stars around their category's base position
      const angle = (hash % 360) * (Math.PI / 180);
      const radius = 8 + (hash % 15);

      return {
        legend,
        x: Math.max(10, Math.min(90, pattern.baseX + Math.cos(angle) * radius + (index % 3) * 5)),
        y: Math.max(15, Math.min(85, pattern.baseY + Math.sin(angle) * radius + Math.floor(index / 3) * 8)),
      };
    });
  }, [legends, selectedCategory]);

  // Generate constellation lines connecting stars in same category
  const constellationLines = useMemo(() => {
    const lines: { from: StarPosition; to: StarPosition; opacity: number }[] = [];
    const categories = [...new Set(starPositions.map(s => s.legend.category))];

    categories.forEach(category => {
      const categoryStars = starPositions.filter(s => s.legend.category === category);

      // Connect stars in sequence within each category
      for (let i = 0; i < categoryStars.length - 1; i++) {
        const distance = Math.sqrt(
          Math.pow(categoryStars[i + 1].x - categoryStars[i].x, 2) +
          Math.pow(categoryStars[i + 1].y - categoryStars[i].y, 2)
        );

        // Only draw lines for nearby stars
        if (distance < 40) {
          lines.push({
            from: categoryStars[i],
            to: categoryStars[i + 1],
            opacity: Math.max(0.1, 0.4 - distance / 100),
          });
        }
      }
    });

    return lines;
  }, [starPositions]);

  const handleHover = (legend: Legend | null) => {
    setHoveredLegend(legend);
    onLegendHover(legend);
  };

  return (
    <div className={`relative w-full aspect-[16/10] ${className}`}>
      {/* Grid lines (subtle) */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Constellation connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>
        </defs>

        {constellationLines.map((line, index) => {
          const isHighlighted =
            hoveredLegend?.category === line.from.legend.category;

          return (
            <motion.line
              key={`line-${index}`}
              x1={`${line.from.x}%`}
              y1={`${line.from.y}%`}
              x2={`${line.to.x}%`}
              y2={`${line.to.y}%`}
              stroke={isHighlighted ? 'rgba(167, 139, 250, 0.6)' : 'rgba(139, 92, 246, 0.2)'}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: isHighlighted ? 0.8 : line.opacity,
              }}
              transition={{ duration: 1.5, delay: index * 0.1 }}
            />
          );
        })}

        {/* Animated pulse along lines when category is hovered */}
        {hoveredLegend && constellationLines
          .filter(line => line.from.legend.category === hoveredLegend.category)
          .map((line, index) => (
            <motion.circle
              key={`pulse-${index}`}
              r="3"
              fill="rgba(167, 139, 250, 0.8)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                cx: [`${line.from.x}%`, `${line.to.x}%`],
                cy: [`${line.from.y}%`, `${line.to.y}%`],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            />
          ))}
      </svg>

      {/* Legend stars */}
      {starPositions.map((pos) => (
        <LegendStar
          key={pos.legend.id}
          legend={pos.legend}
          x={pos.x}
          y={pos.y}
          size={pos.legend.featured ? 'lg' : 'md'}
          onHover={handleHover}
          onClick={onLegendClick}
          isActive={hoveredLegend?.category === pos.legend.category}
        />
      ))}

      {/* Category labels (positioned near their clusters) */}
      {selectedCategory === 'all' && (
        <>
          <motion.div
            className="absolute text-purple-400/50 text-xs uppercase tracking-widest font-medium"
            style={{ left: '15%', top: '12%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Founders
          </motion.div>
          <motion.div
            className="absolute text-cyan-400/50 text-xs uppercase tracking-widest font-medium"
            style={{ left: '62%', top: '8%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Contributors
          </motion.div>
          <motion.div
            className="absolute text-pink-400/50 text-xs uppercase tracking-widest font-medium"
            style={{ left: '18%', top: '55%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            Achievers
          </motion.div>
          <motion.div
            className="absolute text-yellow-400/50 text-xs uppercase tracking-widest font-medium"
            style={{ left: '65%', top: '50%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            Legends
          </motion.div>
        </>
      )}
    </div>
  );
}
