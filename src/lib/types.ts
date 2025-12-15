export type Category = 'founders' | 'contributors' | 'achievers' | 'legends';

export interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  icon?: string;
}

export interface Legend {
  id: string;
  name: string;
  title: string;
  avatar: string;
  category: Category;
  bio: string;
  achievements: Achievement[];
  socials: SocialLinks;
  joinedDate: string;
  featured?: boolean;
  stats?: {
    projects?: number;
    contributions?: number;
    awards?: number;
  };
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  screenshot: string;
  tags: string[];
}

export const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: 'founders', label: 'Founders', emoji: '🚀' },
  { value: 'contributors', label: 'Contributors', emoji: '💻' },
  { value: 'achievers', label: 'Achievers', emoji: '🏆' },
  { value: 'legends', label: 'Legends', emoji: '⭐' },
];
