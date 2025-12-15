'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Star, Sparkles, Download, FileImage } from 'lucide-react';
import { templates } from '@/lib/data';

export default function HubPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="text-yellow-400" size={24} />
              <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
                Superteam Bounty Entry
              </span>
              <Sparkles className="text-yellow-400" size={24} />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              ST Legends
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-8">
              Hall of Fame Design Candidates
            </p>
            <p className="text-zinc-500 max-w-xl mx-auto mb-8">
              10 unique design templates celebrating Superteam member achievements
              in the Solana ecosystem. Click any template to preview.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/figma/all-templates.fig"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors"
              >
                <Download size={18} />
                Download All (Figma)
              </a>
              <a
                href="https://github.com/rz1989s/st-legends"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors"
              >
                <ExternalLink size={18} />
                View Source
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Template Gallery */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Star className="text-yellow-400" size={20} />
          <h2 className="text-2xl font-bold">Design Templates</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-zinc-800 rounded-full">
            {templates.length} candidates
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative">
                <Link href={`/${template.slug}`} className="block">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-purple-500/50 transition-all">
                    {/* Screenshot image */}
                    <Image
                      src={`/screenshots/${template.slug}.png`}
                      alt={template.name}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="flex items-center gap-2 text-white font-medium">
                        <ExternalLink size={18} />
                        Preview Template
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Download Figma Button */}
                <a
                  href={`/figma/${template.slug}.fig`}
                  download
                  className="absolute top-3 right-3 p-2 bg-black/80 hover:bg-purple-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100 z-10"
                  title="Download Figma file"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FileImage size={16} className="text-white" />
                </a>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <Link href={`/${template.slug}`}>
                    <h3 className="font-semibold text-white hover:text-purple-300 transition-colors">
                      {template.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <a
                      href={`/figma/${template.slug}.fig`}
                      download
                      className="text-xs text-zinc-500 hover:text-purple-400 transition-colors"
                    >
                      .fig
                    </a>
                    <span className="text-xs text-zinc-600">|</span>
                    <span className="text-xs text-zinc-500">#{index + 1}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 line-clamp-2">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs bg-zinc-800 text-zinc-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Export Section */}
        <motion.section
          className="mt-20 p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Download className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold">Export Options</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/figma/all-templates.fig"
              download
              className="flex items-center gap-4 p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors group"
            >
              <div className="p-3 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                <FileImage className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-white">All Templates</h3>
                <p className="text-sm text-zinc-500">Complete Figma file</p>
              </div>
            </a>

            <a
              href="https://github.com/rz1989s/st-legends/archive/refs/heads/dev.zip"
              download
              className="flex items-center gap-4 p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors group"
            >
              <div className="p-3 bg-green-600/20 rounded-lg group-hover:bg-green-600/30 transition-colors">
                <Download className="text-green-400" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-white">Source Code</h3>
                <p className="text-sm text-zinc-500">Next.js + Tailwind</p>
              </div>
            </a>

            <a
              href="https://github.com/rz1989s/st-legends"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors group"
            >
              <div className="p-3 bg-zinc-600/20 rounded-lg group-hover:bg-zinc-600/30 transition-colors">
                <ExternalLink className="text-zinc-400" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-white">GitHub Repo</h3>
                <p className="text-sm text-zinc-500">Star & Fork</p>
              </div>
            </a>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-zinc-500 text-sm">
            Built for{' '}
            <a
              href="https://earn.superteam.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              Superteam Earn
            </a>{' '}
            · Hall of Fame Bounty
          </p>
        </div>
      </footer>
    </div>
  );
}
