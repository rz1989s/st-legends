'use client';

import { Github, Twitter, Linkedin, Globe } from 'lucide-react';
import { SocialLinks as SocialLinksType } from '@/lib/types';

interface SocialLinksProps {
  socials: SocialLinksType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function SocialLinks({ socials, size = 'md', className = '' }: SocialLinksProps) {
  const iconSize = sizeMap[size];

  const links = [
    { key: 'twitter', icon: Twitter, href: socials.twitter ? `https://twitter.com/${socials.twitter}` : null },
    { key: 'github', icon: Github, href: socials.github ? `https://github.com/${socials.github}` : null },
    { key: 'linkedin', icon: Linkedin, href: socials.linkedin ? `https://linkedin.com/in/${socials.linkedin}` : null },
    { key: 'website', icon: Globe, href: socials.website ? (socials.website.startsWith('http') ? socials.website : `https://${socials.website}`) : null },
  ].filter((l) => l.href);

  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ key, icon: Icon, href }) => (
        <a
          key={key}
          href={href!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
