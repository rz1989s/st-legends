'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Twitter, Github, Linkedin, Globe, Trophy, Calendar, Zap, FolderKanban, Award, GitCommitHorizontal } from 'lucide-react';
import { Legend, CATEGORIES } from '@/lib/types';

export type ModalTheme =
  | 'dark'
  | 'light'
  | 'glass'
  | 'brutalist'
  | 'arcade'
  | 'museum'
  | 'constellation'
  | 'trading-card'
  | 'trophy'
  | 'timeline';

interface LegendDetailModalProps {
  legend: Legend | null;
  isOpen: boolean;
  onClose: () => void;
  theme?: ModalTheme;
}

const themeStyles: Record<ModalTheme, {
  overlay: string;
  container: string;
  header: string;
  title: string;
  subtitle: string;
  badge: string;
  text: string;
  muted: string;
  accent: string;
  card: string;
  border: string;
  closeBtn: string;
}> = {
  dark: {
    overlay: 'bg-black/80 backdrop-blur-sm',
    container: 'bg-slate-900 border border-slate-700',
    header: 'bg-gradient-to-r from-purple-600 to-pink-600',
    title: 'text-white',
    subtitle: 'text-slate-300',
    badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    text: 'text-slate-200',
    muted: 'text-slate-400',
    accent: 'text-purple-400',
    card: 'bg-slate-800/50 border border-slate-700/50',
    border: 'border-slate-700',
    closeBtn: 'bg-white/10 hover:bg-white/20 text-white',
  },
  light: {
    overlay: 'bg-black/40 backdrop-blur-sm',
    container: 'bg-white border border-neutral-200',
    header: 'bg-gradient-to-r from-neutral-100 to-neutral-50',
    title: 'text-neutral-900',
    subtitle: 'text-neutral-600',
    badge: 'bg-neutral-100 text-neutral-600 border border-neutral-200',
    text: 'text-neutral-700',
    muted: 'text-neutral-500',
    accent: 'text-neutral-900',
    card: 'bg-neutral-50 border border-neutral-200',
    border: 'border-neutral-200',
    closeBtn: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600',
  },
  glass: {
    overlay: 'bg-black/60 backdrop-blur-md',
    container: 'bg-white/10 backdrop-blur-xl border border-white/20',
    header: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20',
    title: 'text-white',
    subtitle: 'text-white/80',
    badge: 'bg-white/10 text-white border border-white/20',
    text: 'text-white/90',
    muted: 'text-white/60',
    accent: 'text-cyan-400',
    card: 'bg-white/5 border border-white/10',
    border: 'border-white/20',
    closeBtn: 'bg-white/10 hover:bg-white/20 text-white',
  },
  brutalist: {
    overlay: 'bg-white/90',
    container: 'bg-white border-4 border-black',
    header: 'bg-black',
    title: 'text-white font-mono uppercase',
    subtitle: 'text-white/80 font-mono',
    badge: 'bg-black text-white border-2 border-black font-mono uppercase',
    text: 'text-black font-mono',
    muted: 'text-black/60 font-mono',
    accent: 'text-black font-bold',
    card: 'bg-white border-2 border-black',
    border: 'border-black border-2',
    closeBtn: 'bg-black hover:bg-gray-800 text-white',
  },
  arcade: {
    overlay: 'bg-black/90',
    container: 'bg-gray-900 border-4 border-cyan-500 shadow-[0_0_30px_rgba(0,255,255,0.3)]',
    header: 'bg-gradient-to-r from-pink-600 to-cyan-500',
    title: 'text-white font-mono uppercase tracking-wider',
    subtitle: 'text-cyan-300 font-mono',
    badge: 'bg-pink-500/20 text-pink-300 border-2 border-pink-500 font-mono uppercase',
    text: 'text-cyan-100 font-mono',
    muted: 'text-cyan-400/60 font-mono',
    accent: 'text-yellow-400 font-mono',
    card: 'bg-black/50 border-2 border-cyan-500/50',
    border: 'border-cyan-500',
    closeBtn: 'bg-pink-600 hover:bg-pink-500 text-white',
  },
  museum: {
    overlay: 'bg-stone-900/90 backdrop-blur-sm',
    container: 'bg-gradient-to-b from-stone-800 to-stone-900 border border-amber-600/30',
    header: 'bg-gradient-to-r from-amber-900/50 to-stone-800',
    title: 'text-stone-100 font-serif',
    subtitle: 'text-amber-200/80 font-serif italic',
    badge: 'bg-amber-600/20 text-amber-300 border border-amber-600/30',
    text: 'text-stone-200',
    muted: 'text-stone-400',
    accent: 'text-amber-400',
    card: 'bg-stone-800/50 border border-amber-600/20',
    border: 'border-amber-600/30',
    closeBtn: 'bg-amber-600/20 hover:bg-amber-600/30 text-amber-200',
  },
  constellation: {
    overlay: 'bg-indigo-950/90 backdrop-blur-sm',
    container: 'bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-xl',
    header: 'bg-gradient-to-r from-indigo-600/50 to-purple-600/50',
    title: 'text-white',
    subtitle: 'text-indigo-200',
    badge: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    text: 'text-indigo-100',
    muted: 'text-indigo-300/60',
    accent: 'text-yellow-400',
    card: 'bg-indigo-900/30 border border-indigo-500/20',
    border: 'border-indigo-500/30',
    closeBtn: 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200',
  },
  'trading-card': {
    overlay: 'bg-slate-900/90 backdrop-blur-sm',
    container: 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-2 border-amber-500/50',
    header: 'bg-gradient-to-r from-amber-600 to-orange-500',
    title: 'text-white font-bold',
    subtitle: 'text-amber-100',
    badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/50',
    text: 'text-slate-200',
    muted: 'text-slate-400',
    accent: 'text-amber-400',
    card: 'bg-slate-800/50 border border-amber-500/30',
    border: 'border-amber-500/30',
    closeBtn: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200',
  },
  trophy: {
    overlay: 'bg-amber-950/90 backdrop-blur-sm',
    container: 'bg-gradient-to-b from-amber-900/90 to-stone-900 border border-amber-400/30',
    header: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    title: 'text-amber-950 font-bold',
    subtitle: 'text-amber-900',
    badge: 'bg-amber-400/20 text-amber-200 border border-amber-400/30',
    text: 'text-amber-100',
    muted: 'text-amber-200/60',
    accent: 'text-yellow-400',
    card: 'bg-amber-900/30 border border-amber-400/20',
    border: 'border-amber-400/30',
    closeBtn: 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-200',
  },
  timeline: {
    overlay: 'bg-slate-900/90 backdrop-blur-sm',
    container: 'bg-slate-900 border border-purple-500/30',
    header: 'bg-gradient-to-r from-purple-600 to-blue-600',
    title: 'text-white',
    subtitle: 'text-purple-200',
    badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    text: 'text-slate-200',
    muted: 'text-slate-400',
    accent: 'text-purple-400',
    card: 'bg-slate-800/50 border border-purple-500/20',
    border: 'border-purple-500/30',
    closeBtn: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-200',
  },
};

export function LegendDetailModal({ legend, isOpen, onClose, theme = 'dark' }: LegendDetailModalProps) {
  const styles = themeStyles[theme];
  const category = CATEGORIES.find(c => c.value === legend?.category);

  if (!legend) return null;

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${styles.overlay}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl ${styles.container}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${styles.closeBtn}`}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className={`px-6 py-8 ${styles.header}`}>
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold text-white border-4 border-white/30 shrink-0">
                  {legend.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.badge}`}>
                      {category?.emoji} {category?.label}
                    </span>
                    {legend.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className={`text-2xl md:text-3xl font-bold mb-1 ${styles.title}`}>
                    {legend.name}
                  </h2>
                  <p className={`text-lg ${styles.subtitle}`}>{legend.title}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 overflow-y-auto max-h-[50vh] space-y-6">
              {/* Bio */}
              <div>
                <p className={`text-base leading-relaxed ${styles.text}`}>{legend.bio}</p>
              </div>

              {/* Stats Row */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4`}>
                <div className={`p-4 rounded-xl ${styles.card}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={16} className={styles.accent} />
                    <span className={`text-xs uppercase tracking-wider ${styles.muted}`}>XP</span>
                  </div>
                  <p className={`text-2xl font-bold ${styles.accent}`}>
                    {legend.xp.toLocaleString()}
                  </p>
                </div>
                {legend.stats?.projects && (
                  <div className={`p-4 rounded-xl ${styles.card}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <FolderKanban size={16} className={styles.accent} />
                      <span className={`text-xs uppercase tracking-wider ${styles.muted}`}>Projects</span>
                    </div>
                    <p className={`text-2xl font-bold ${styles.accent}`}>{legend.stats.projects}</p>
                  </div>
                )}
                {legend.stats?.contributions && (
                  <div className={`p-4 rounded-xl ${styles.card}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <GitCommitHorizontal size={16} className={styles.accent} />
                      <span className={`text-xs uppercase tracking-wider ${styles.muted}`}>Commits</span>
                    </div>
                    <p className={`text-2xl font-bold ${styles.accent}`}>{legend.stats.contributions}</p>
                  </div>
                )}
                {legend.stats?.awards && (
                  <div className={`p-4 rounded-xl ${styles.card}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Award size={16} className={styles.accent} />
                      <span className={`text-xs uppercase tracking-wider ${styles.muted}`}>Awards</span>
                    </div>
                    <p className={`text-2xl font-bold ${styles.accent}`}>{legend.stats.awards}</p>
                  </div>
                )}
              </div>

              {/* Achievements */}
              <div>
                <h3 className={`text-sm uppercase tracking-wider mb-3 flex items-center gap-2 ${styles.muted}`}>
                  <Trophy size={16} />
                  Achievements
                </h3>
                <div className="space-y-3">
                  {legend.achievements.map((achievement, i) => (
                    <div key={i} className={`p-4 rounded-xl ${styles.card}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className={`font-semibold ${styles.text}`}>{achievement.title}</h4>
                          <p className={`text-sm mt-1 ${styles.muted}`}>{achievement.description}</p>
                        </div>
                        <span className={`text-xs whitespace-nowrap ${styles.muted}`}>
                          {formatDate(achievement.date)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links & Join Date */}
              <div className={`flex flex-wrap items-center justify-between gap-4 pt-4 border-t ${styles.border}`}>
                <div className="flex items-center gap-3">
                  {legend.socials.twitter && (
                    <a
                      href={`https://twitter.com/${legend.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-colors ${styles.card} hover:opacity-80`}
                    >
                      <Twitter size={18} className={styles.accent} />
                    </a>
                  )}
                  {legend.socials.github && (
                    <a
                      href={`https://github.com/${legend.socials.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-colors ${styles.card} hover:opacity-80`}
                    >
                      <Github size={18} className={styles.accent} />
                    </a>
                  )}
                  {legend.socials.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${legend.socials.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-colors ${styles.card} hover:opacity-80`}
                    >
                      <Linkedin size={18} className={styles.accent} />
                    </a>
                  )}
                  {legend.socials.website && (
                    <a
                      href={`https://${legend.socials.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-colors ${styles.card} hover:opacity-80`}
                    >
                      <Globe size={18} className={styles.accent} />
                    </a>
                  )}
                </div>
                <div className={`flex items-center gap-2 text-sm ${styles.muted}`}>
                  <Calendar size={16} />
                  <span>Joined {formatDate(legend.joinedDate)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
