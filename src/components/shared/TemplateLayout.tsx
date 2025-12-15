'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { ReactNode } from 'react';

interface TemplateLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function TemplateLayout({ children, title, description, className = '' }: TemplateLayoutProps) {
  return (
    <div className={`min-h-screen ${className}`}>
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">Back to Hub</span>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-sm font-semibold text-white">{title}</h1>
            {description && (
              <p className="text-xs text-white/50">{description}</p>
            )}
          </div>
          <Link
            href="/"
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <Home size={18} />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-14">
        {children}
      </main>
    </div>
  );
}
