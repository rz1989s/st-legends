import { Legend, Template } from './types';

export const legends: Legend[] = [
  // FOUNDERS (3)
  {
    id: 'founder-1',
    name: 'Akshay BD',
    title: 'Superteam Co-founder',
    avatar: '/avatars/akshay.jpg',
    category: 'founders',
    bio: 'Building the most vibrant crypto community in emerging markets. Leading Superteam since Day 1.',
    achievements: [
      { title: 'Superteam Launch', description: 'Founded Superteam India', date: '2021-06' },
      { title: 'Global Expansion', description: 'Expanded to 15+ countries', date: '2023-01' },
    ],
    socials: { twitter: 'akshaybd', website: 'superteam.fun' },
    joinedDate: '2021-06',
    featured: true,
    stats: { projects: 50, contributions: 200, awards: 10 },
  },
  {
    id: 'founder-2',
    name: 'Kash Dhanda',
    title: 'Superteam Co-founder',
    avatar: '/avatars/kash.jpg',
    category: 'founders',
    bio: 'Pioneering web3 education and community building across emerging markets.',
    achievements: [
      { title: 'Instagrant Program', description: 'Launched rapid grant program', date: '2022-03' },
      { title: 'Bounty Platform', description: 'Built Superteam Earn', date: '2022-08' },
    ],
    socials: { twitter: 'kashdhanda' },
    joinedDate: '2021-06',
    featured: true,
    stats: { projects: 45, contributions: 180, awards: 8 },
  },
  {
    id: 'founder-3',
    name: 'Tanmay Bhat',
    title: 'Community Builder',
    avatar: '/avatars/tanmay.jpg',
    category: 'founders',
    bio: 'Bringing millions into crypto through content and community engagement.',
    achievements: [
      { title: 'Content Pioneer', description: 'Crypto education content', date: '2021-09' },
      { title: 'Community Growth', description: '100K+ community members', date: '2023-06' },
    ],
    socials: { twitter: 'tanaborat' },
    joinedDate: '2021-09',
    stats: { projects: 30, contributions: 100, awards: 5 },
  },

  // CONTRIBUTORS (3)
  {
    id: 'contributor-1',
    name: 'Soju',
    title: 'Core Developer',
    avatar: '/avatars/soju.jpg',
    category: 'contributors',
    bio: 'Building critical infrastructure for Solana DeFi ecosystem.',
    achievements: [
      { title: 'SDK Contributions', description: 'Major Solana SDK improvements', date: '2022-05' },
      { title: 'Open Source', description: '500+ GitHub contributions', date: '2023-12' },
    ],
    socials: { twitter: 'saborat', github: 'soju-dev' },
    joinedDate: '2022-01',
    featured: true,
    stats: { contributions: 500, projects: 20 },
  },
  {
    id: 'contributor-2',
    name: 'Pratik Saria',
    title: 'Protocol Engineer',
    avatar: '/avatars/pratik.jpg',
    category: 'contributors',
    bio: 'Smart contract security expert and DeFi protocol architect.',
    achievements: [
      { title: 'Security Audit', description: 'Audited 30+ protocols', date: '2023-03' },
      { title: 'Bug Bounties', description: '$100K+ in bounties earned', date: '2023-09' },
    ],
    socials: { twitter: 'pratiksaria', github: 'pratik-sol' },
    joinedDate: '2022-04',
    stats: { contributions: 300, projects: 15 },
  },
  {
    id: 'contributor-3',
    name: 'Yash Agarwal',
    title: 'DevRel Lead',
    avatar: '/avatars/yash.jpg',
    category: 'contributors',
    bio: 'Empowering developers to build on Solana through education and tooling.',
    achievements: [
      { title: 'Tutorial Series', description: 'Solana 101 course', date: '2022-08' },
      { title: 'Hackathon Mentor', description: 'Mentored 50+ teams', date: '2023-05' },
    ],
    socials: { twitter: 'yashagarwal', github: 'yash-sol' },
    joinedDate: '2022-06',
    stats: { contributions: 250, projects: 25 },
  },

  // ACHIEVERS (3)
  {
    id: 'achiever-1',
    name: 'Sahil',
    title: 'Hackathon Champion',
    avatar: '/avatars/sahil.jpg',
    category: 'achievers',
    bio: 'Three-time Solana hackathon winner, building the future of DeFi.',
    achievements: [
      { title: 'Grizzlython Winner', description: '1st place DeFi track', date: '2023-03' },
      { title: 'Hyperdrive Winner', description: 'Grand prize winner', date: '2023-10' },
    ],
    socials: { twitter: 'sahilsolana' },
    joinedDate: '2022-08',
    featured: true,
    stats: { awards: 7, projects: 12 },
  },
  {
    id: 'achiever-2',
    name: 'Priya Sharma',
    title: 'Grant Recipient',
    avatar: '/avatars/priya.jpg',
    category: 'achievers',
    bio: 'Built a cross-chain bridge that processes $1M+ daily volume.',
    achievements: [
      { title: 'Instagrant', description: '$10K grant for bridge development', date: '2022-11' },
      { title: 'Product Launch', description: 'Launched to mainnet', date: '2023-04' },
    ],
    socials: { twitter: 'priyabuilds', linkedin: 'priya-sharma-sol' },
    joinedDate: '2022-09',
    stats: { awards: 4, projects: 8 },
  },
  {
    id: 'achiever-3',
    name: 'Raj Patel',
    title: 'NFT Artist',
    avatar: '/avatars/raj.jpg',
    category: 'achievers',
    bio: 'Creating generative art that has earned 10K+ SOL in sales.',
    achievements: [
      { title: 'Collection Launch', description: 'Sold out 5K NFT collection', date: '2022-07' },
      { title: 'Art Basel', description: 'Featured at Solana Art Basel', date: '2023-12' },
    ],
    socials: { twitter: 'rajnft', website: 'rajart.xyz' },
    joinedDate: '2022-05',
    stats: { awards: 5, projects: 6 },
  },

  // LEGENDS (3)
  {
    id: 'legend-1',
    name: 'Anatoly Yakovenko',
    title: 'Solana Founder',
    avatar: '/avatars/anatoly.jpg',
    category: 'legends',
    bio: 'Creator of Solana blockchain, revolutionizing blockchain scalability.',
    achievements: [
      { title: 'Solana Launch', description: 'Launched Solana mainnet', date: '2020-03' },
      { title: 'Firedancer', description: 'New validator client announcement', date: '2023-02' },
    ],
    socials: { twitter: 'aaborat', github: 'anatoly-sol' },
    joinedDate: '2020-03',
    featured: true,
    stats: { contributions: 1000, projects: 100, awards: 20 },
  },
  {
    id: 'legend-2',
    name: 'Raj Gokal',
    title: 'Solana Co-founder',
    avatar: '/avatars/rajgokal.jpg',
    category: 'legends',
    bio: 'Building the most performant blockchain for mainstream adoption.',
    achievements: [
      { title: 'Series B', description: '$314M funding round', date: '2021-06' },
      { title: 'Ecosystem Growth', description: '1000+ projects on Solana', date: '2023-01' },
    ],
    socials: { twitter: 'rajgokal' },
    joinedDate: '2020-03',
    stats: { projects: 80, awards: 15 },
  },
  {
    id: 'legend-3',
    name: 'Armani Ferrante',
    title: 'Anchor Creator',
    avatar: '/avatars/armani.jpg',
    category: 'legends',
    bio: 'Created Anchor framework, powering 90% of Solana programs.',
    achievements: [
      { title: 'Anchor Launch', description: 'Released Anchor framework', date: '2021-04' },
      { title: 'Coral Founding', description: 'Founded Coral (Backpack)', date: '2022-01' },
    ],
    socials: { twitter: 'armanif', github: 'armaniferrante' },
    joinedDate: '2021-01',
    featured: true,
    stats: { contributions: 800, projects: 50, awards: 12 },
  },
];

export const templates: Template[] = [
  {
    id: 'constellation',
    name: 'Constellation Hall',
    slug: 'constellation',
    description: 'Interactive star map where each legend is a star in the Superteam galaxy',
    screenshot: '/screenshots/constellation.png',
    tags: ['interactive', 'space', 'dark'],
  },
  {
    id: 'trading-cards',
    name: 'Trading Cards',
    slug: 'trading-cards',
    description: 'Collectible trading card aesthetic with holographic effects',
    screenshot: '/screenshots/trading-cards.png',
    tags: ['collectible', 'animated', 'retro'],
  },
  {
    id: 'trophy-wall',
    name: 'Trophy Wall Classic',
    slug: 'trophy-wall',
    description: 'Traditional hall of fame with golden trophies and plaques',
    screenshot: '/screenshots/trophy-wall.png',
    tags: ['classic', 'gold', 'prestigious'],
  },
  {
    id: 'timeline',
    name: 'Scrollytelling Timeline',
    slug: 'timeline',
    description: 'Scroll-driven narrative journey through Superteam history',
    screenshot: '/screenshots/timeline.png',
    tags: ['narrative', 'scroll', 'storytelling'],
  },
  {
    id: 'leaderboard',
    name: 'Leaderboard Arena',
    slug: 'leaderboard',
    description: 'Gamified rankings with XP, levels, and achievements',
    screenshot: '/screenshots/leaderboard.png',
    tags: ['gamified', 'competitive', 'stats'],
  },
  {
    id: 'museum',
    name: 'Museum Exhibit',
    slug: 'museum',
    description: '3D museum-style rooms with curated legend exhibits',
    screenshot: '/screenshots/museum.png',
    tags: ['3d', 'immersive', 'elegant'],
  },
  {
    id: 'minimalist',
    name: 'Minimalist Grid',
    slug: 'minimalist',
    description: 'Clean, typography-focused design with subtle interactions',
    screenshot: '/screenshots/minimalist.png',
    tags: ['clean', 'typography', 'modern'],
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    slug: 'glassmorphism',
    description: 'Frosted glass cards with vibrant gradient backgrounds',
    screenshot: '/screenshots/glassmorphism.png',
    tags: ['modern', 'glass', 'gradient'],
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    slug: 'brutalist',
    description: 'Raw, bold typography with stark black and white contrast',
    screenshot: '/screenshots/brutalist.png',
    tags: ['bold', 'raw', 'typography'],
  },
  {
    id: 'retro-arcade',
    name: 'Retro Arcade',
    slug: 'retro-arcade',
    description: 'Pixel art 8-bit aesthetic with arcade game vibes',
    screenshot: '/screenshots/retro-arcade.png',
    tags: ['pixel', 'retro', 'gaming'],
  },
];

// Helper functions
export const getLegendsByCategory = (category: string) =>
  legends.filter((l) => l.category === category);

export const getFeaturedLegends = () => legends.filter((l) => l.featured);

export const getLegendById = (id: string) => legends.find((l) => l.id === id);

export const getTemplateBySlug = (slug: string) =>
  templates.find((t) => t.slug === slug);
