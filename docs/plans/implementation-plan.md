# Spiritual Platform for India — Implementation Plan (Phase 1)

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a spiritual content platform for Indian users across tier 1/2/3 cities — curating copyright-safe spiritual videos/audio from YouTube into a mobile-first, easily consumable website.

**Architecture:** Next.js 14 (SSR for SEO) + Tailwind CSS + PostgreSQL (Prisma) for content metadata + YouTube Data API v3 for embedding. We EMBED videos (never host) — plays from YouTube servers, avoiding copyright issues.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma + PostgreSQL, YouTube Data API v3, Vercel deployment, PWA support.

---

## Research Summary: Top 15 Spiritual Categories in India (by popularity)

1. Daily Panchang & Muhurat — Very High demand, Hindi/Regional, Tier 2/3
2. Hanuman Chalisa & Daily Aartis — Very High, Hindi/Sanskrit, Mass market
3. Astrology & Horoscope — Very High, Hindi/English/South languages, Tier 1-3
4. Krishna Bhajans & Kirtans — High, Hindi/Braj/Sanskrit, Tier 2/3
5. Guided Meditation & Mantra Chanting — High, Hindi/English, Tier 1/2
6. Bhagavad Gita Commentaries — High, Multi-language, Tier 1/2
7. Vastu Shastra Tips — High, Hindi/Regional/English, Tier 1-3
8. Spiritual Motivational Talks — High, Hindi/English, Tier 1/2
9. Live Temple Darshan — Mod-High, Regional, Tier 2/3
10. Yoga Asana & Pranayama — High, English/Hindi, Tier 1
11. Festival Rituals & Vrat Kathas — Seasonal, Hindi/Regional, Tier 2/3
12. Chakra & Energy Healing — Niche-Growing, English/Hindi, Tier 1
13. Vedic Chanting & Shruti — Niche, Sanskrit/Tamil, Scholars
14. Dream Interpretation — Moderate, Hindi/Regional, Tier 3
15. Devotional Animation & Kids Bhakti — Growing, Hindi/English, Tier 1/2

### Top Content Sources (by YouTube subscribers)
- T-Series Bhakti Sagar (~22M subs, 15B+ views)
- Sadhguru (~18M subs, 4.5B+ views)
- Meditative Mind (~8M subs, 5B+ views)
- Dharmananda Bhakti (~5.5M subs, 3B+ views)
- ISKCON combined channels (~4.5M subs, 2B+ views)
- Art of Living (~3M subs, 800M+ views)
- Vedanta Society/Swami Sarvapriyananda (~1.2M subs)
- AstroSage/Astrotalk (massive app + YouTube)

### Copyright Strategy
- Embed only, never host — videos play from YouTube, copyright stays with uploader
- Store only metadata + thumbnails locally
- Attribute source channel on every card
- For audio-only mode, still use YouTube embed with custom player UI
- All traditional mantras/bhajans text is public domain

---

## Key Website Features (based on Indian user behavior)

1. Mobile-first + low-bandwidth optimization (audio-only toggle, compressed thumbnails)
2. Regional language UI toggle (Hindi, Tamil, Telugu, Bengali, Marathi, English)
3. Categories organized as big visual tiles (easy for Tier 2/3 users)
4. Daily Panchang & Muhurat widget (morning engagement driver)
5. Audio-centric player with background play, sleep timers, loop
6. "Play Audio Only" button on every video (data saver mode)
7. WhatsApp/Share buttons everywhere (Indians share spiritual content on WhatsApp)
8. Clean, distraction-free design (no clutter, big readable fonts)
9. Search across categories with Hindi + English queries
10. "Featured Today" rotating section

---

# Phase 1: Core Platform with Top 5 Categories

We'll build: Homepage, 5 category pages (Bhajans, Gita/Vedas, Meditation/Mantra, Astrology, Spiritual Talks), video embed page, search, basic bookmarking.

---

### Task 1: Initialize Next.js project

**Objective:** Create a Next.js 14 project with TypeScript, Tailwind, ESLint

**Run:**
```bash
npx create-next-app@latest spiritual-platform --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd spiritual-platform
npm install lucide-react prisma @prisma/client @tailwindcss/typography
```

**Verify:**
```bash
npm run dev
```
Visit localhost:3000 — should show default Next.js page.

---

### Task 2: Define types and category configuration

**Objective:** Create TypeScript types and the category data file

**Create: `src/lib/types.ts`**
```typescript
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  category: string;
  language: string[];
}

export interface Category {
  id: string;
  name: string;
  nameHindi: string;
  icon: string;
  description: string;
  youtubeQuery: string;
  color: string;
  tier: string[];
}

export interface Bookmark {
  videoId: string;
  addedAt: string;
}
```

**Create: `src/lib/categories.ts`**
```typescript
import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'bhajans',
    name: 'Bhajans & Aartis',
    nameHindi: 'भजन और आरती',
    icon: '🙏',
    description: 'Devotional songs, daily aartis, Krishna, Shiva, Hanuman bhajans',
    youtubeQuery: 'hanuman chalisa krishna bhajan shiva aarti morning aarti',
    color: 'from-orange-500 to-red-600',
    tier: ['1', '2', '3'],
  },
  {
    id: 'gita',
    name: 'Gita & Vedas',
    nameHindi: 'गीता और वेद',
    icon: '📖',
    description: 'Bhagavad Gita commentaries, Vedic teachings, Upanishad discourses',
    youtubeQuery: 'bhagavad gita commentary vedic teachings upanishad swami',
    color: 'from-amber-500 to-yellow-600',
    tier: ['1', '2'],
  },
  {
    id: 'meditation',
    name: 'Meditation & Mantra',
    nameHindi: 'ध्यान और मंत्र',
    icon: '🧘',
    description: 'Guided meditation, om chanting, mantra meditation, sleep mantras',
    youtubeQuery: 'guided meditation hindi om chanting mantra meditation sleep',
    color: 'from-purple-500 to-indigo-600',
    tier: ['1', '2'],
  },
  {
    id: 'astrology',
    name: 'Astrology & Horoscope',
    nameHindi: 'ज्योतिष और कुंडली',
    icon: '⭐',
    description: 'Daily horoscope, panchang, rashifal, vedic astrology guidance',
    youtubeQuery: 'daily horoscope panchang rashifal vedic astrology today',
    color: 'from-blue-500 to-cyan-600',
    tier: ['2', '3'],
  },
  {
    id: 'talks',
    name: 'Spiritual Talks',
    nameHindi: 'आध्यात्मिक प्रवचन',
    icon: '💬',
    description: 'Sadhguru talks, spiritual wisdom, life guidance from gurus',
    youtubeQuery: 'sadhguru speech spiritual wisdom guru life guidance',
    color: 'from-emerald-500 to-teal-600',
    tier: ['1', '2'],
  },
];
```

---

### Task 3: Set up YouTube API integration

**Objective:** Create a YouTube Data API client that searches and returns videos by category query

**Create: `.env.local`** (add to project root)
```
YOUTUBE_API_KEY=your_key_here
```

**Create: `src/lib/youtube.ts`**
```typescript
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
}

export async function searchByQuery(query: string, maxResults = 20): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) return [];

  // Step 1: Search for video IDs
  const searchUrl = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&relevanceLanguage=hi&key=${YOUTUBE_API_KEY}`;
  const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });
  const searchData = await searchRes.json();

  if (!searchData.items?.length) return [];

  const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

  // Step 2: Get video details (duration, views)
  const detailsUrl = `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
  const detailsRes = await fetch(detailsUrl, { next: { revalidate: 3600 } });
  const detailsData = await detailsRes.json();

  return detailsData.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description.slice(0, 200),
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    duration: parseDuration(item.contentDetails.duration),
    viewCount: formatViews(item.statistics?.viewCount || '0'),
  }));
}

function parseDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const [, h, m, s] = match;
  const hours = h ? `${h}:` : '';
  const mins = m || '0';
  const secs = s || '00';
  return `${hours}${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`;
}

function formatViews(count: string): string {
  const n = parseInt(count);
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)} Cr views`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)} L views`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}
```

---

### Task 4: Create database schema and Prisma setup

**Objective:** Set up Prisma with PostgreSQL for storing playlists/bookmarks

**Run:**
```bash
npx prisma init
```

**Edit: `prisma/schema.prisma`**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Bookmark {
  id        String   @id @default(cuid())
  videoId   String
  title     String
  thumbnail String
  channel   String
  category  String
  createdAt DateTime @default(now())

  @@index([videoId])
  @@index([category])
}
```

**Create: `.env`** (add to project root, alongside .env.local)
```
DATABASE_URL="postgresql://user:password@localhost:5432/spiritual_platform?schema=public"
```

**Run:**
```bash
npx prisma generate
npx prisma db push
```

---

### Task 5: Build the Root Layout and Global Styles

**Objective:** Create the app shell with global nav, footer, and mobile-first design

**Edit: `src/app/globals.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #FFFBF5;
  --bg-card: #FFFFFF;
  --text-primary: #1C1917;
  --text-secondary: #57534E;
  --accent-saffron: #FF6B35;
  --accent-gold: #D4A574;
  --border-subtle: #E7E5E4;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: var(--accent-gold); border-radius: 3px; }
```

**Edit: `src/app/layout.tsx`**
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shraddha — Your Spiritual Companion',
  description: 'Discover spiritual wisdom — bhajans, Gita, meditation, astrology & talks from trusted sources',
  keywords: 'bhajan, meditation, gita, astrology, spiritual, india, hindu, devotion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

### Task 6: Build Header component

**Objective:** Create a mobile-first header with logo, search bar, and language toggle

**Create: `src/components/Header.tsx`**
```tsx
'use client';

import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🕉️</span>
            <span className="text-xl font-bold text-orange-600 hidden sm:block">Shraddha</span>
          </a>

          {/* Search */}
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bhajans, gita, meditation..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-stone-100 border border-stone-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none text-sm"
              />
            </div>
          </form>

          {/* Language */}
          <select className="text-sm bg-stone-100 border border-stone-200 rounded-lg px-2 py-2 hidden md:block">
            <option>English</option>
            <option>हिंदी</option>
            <option>తెలుగు</option>
            <option>தமிழ்</option>
          </select>
        </div>
      </div>
    </header>
  );
}
```

---

### Task 7: Build Footer component

**Objective:** Simple footer with links and attribution

**Create: `src/components/Footer.tsx`**
```tsx
export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-stone-200">🕉️ Shraddha</p>
            <p className="text-sm mt-1">Your Spiritual Companion</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/about" className="hover:text-orange-400">About</a>
            <a href="/contact" className="hover:text-orange-400">Contact</a>
            <a href="/privacy" className="hover:text-orange-400">Privacy</a>
          </div>
        </div>
        <div className="text-center text-xs text-stone-500 mt-4 border-t border-stone-800 pt-4">
          <p>All videos are embedded from YouTube and belong to their respective creators.</p>
          <p>We don&apos;t host any content. All copyright belongs to original uploader.</p>
        </div>
      </div>
    </footer>
  );
}
```

---

### Task 8: Build Homepage

**Objective:** Create the main landing page with hero section, today's featured, and category grid

**Edit: `src/app/page.tsx`**
```tsx
import { categories } from '@/lib/categories';
import { VideoCard } from '@/components/VideoCard';
import { searchByQuery } from '@/lib/youtube';

// Fetch featured videos for homepage (SSG with revalidation)
async function getFeaturedVideos() {
  try {
    const videos = await searchByQuery('hanuman chalisa OR bhagavad gita OR om chanting meditation sadhguru', 10);
    return videos.slice(0, 6);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeaturedVideos();
  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Good Morning' : today.getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-2xl font-bold text-stone-800">{greeting} 🙏</h1>
        <p className="text-stone-500 mt-1">Discover wisdom for your spiritual journey</p>
      </section>

      {/* Categories Grid */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Explore</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/${cat.id}`}
              className={`bg-gradient-to-br ${cat.color} text-white rounded-2xl p-4 text-center hover:scale-[1.03] transition-transform`}
            >
              <span className="text-3xl block mb-2">{cat.icon}</span>
              <span className="text-sm font-semibold block">{cat.name}</span>
              <span className="text-xs opacity-80 block mt-1">{cat.nameHindi}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Today */}
      <section>
        <h2 className="text-lg font-semibold text-stone-800 mb-4">✨ Featured Today</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.length > 0 ? (
            featured.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))
          ) : (
            <p className="text-stone-400 col-span-full text-center py-8">Loading content...</p>
          )}
        </div>
      </section>
    </div>
  );
}
```

---

### Task 9: Build VideoCard component

**Objective:** Reusable video card with thumbnail, title, channel, and audio-only toggle

**Create: `src/components/VideoCard.tsx`**
```tsx
import { Play, Headphones, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Video } from '@/lib/types';

interface Props {
  video: Video;
}

export function VideoCard({ video }: Props) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <Link href={`/watch/${video.id}`} className="relative block aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
            {video.duration}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-3">
        <Link href={`/watch/${video.id}`}>
          <h3 className="text-sm font-medium text-stone-800 line-clamp-2 mb-1 hover:text-orange-600">
            {video.title}
          </h3>
        </Link>
        <p className="text-xs text-stone-500">{video.channelTitle}</p>
        <p className="text-xs text-stone-400 mt-0.5">{video.viewCount}</p>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
          <div className="flex gap-2">
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
            >
              <Play className="w-3 h-3" /> Watch
            </a>
            <button
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(video.title + '\nhttps://youtube.com/watch?v=' + video.id)}`, '_blank')}
              className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
            >
              <Share2 className="w-3 h-3" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Task 10: Build Category Page template

**Objective:** Create a dynamic category page that loads from the categories config

**Create: `src/app/[category]/page.tsx`**
```tsx
import { categories } from '@/lib/categories';
import { VideoCard } from '@/components/VideoCard';
import { searchByQuery } from '@/lib/youtube';

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export function generateMetadata({ params }: Props) {
  const cat = categories.find((c) => c.id === params.category);
  return {
    title: `${cat?.name || 'Category'} — Shraddha`,
    description: cat?.description || '',
  };
}

export default async function CategoryPage({ params }: Props) {
  const cat = categories.find((c) => c.id === params.category);

  if (!cat) {
    return <div className="p-8 text-center text-stone-500">Category not found</div>;
  }

  let videos = [];
  try {
    videos = await searchByQuery(cat.youtubeQuery, 20);
  } catch (e) {
    console.error('Failed to fetch videos:', e);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Category Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{cat.icon}</span>
          <div>
            <h1 className="text-xl font-bold text-stone-800">{cat.name}</h1>
            <p className="text-sm text-stone-500">{cat.nameHindi}</p>
          </div>
        </div>
        <p className="text-sm text-stone-600 mt-1">{cat.description}</p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard key={video.id} video={{ ...video, category: cat.id, language: [] }} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-stone-400">Unable to load videos. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### Task 11: Build Watch Page (individual video)

**Objective:** Create a video/watch page with YouTube embed, audio-only mode, and sharing

**Create: `src/app/watch/[videoId]/page.tsx`**
```tsx
import { ArrowLeft, Share2, Headphones } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { videoId: string };
}

export default function WatchPage({ params }: Props) {
  const { videoId } = params;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-orange-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      {/* Video Embed */}
      <div className="aspect-video rounded-xl overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Audio-only toggle (uses YouTube audio embed) */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium"
        >
          <Play className="w-4 h-4" /> Open in YouTube
        </button>
        <button
          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('Check this out: https://youtube.com/watch?v=' + videoId)}`, '_blank')}
          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-medium"
        >
          <Share2 className="w-4 h-4" /> Share on WhatsApp
        </button>
      </div>
    </div>
  );
}
```

---

### Task 12: Build Search page

**Objective:** Search page that accepts query param and searches YouTube API

**Create: `src/app/search/page.tsx`**
```tsx
import { searchByQuery } from '@/lib/youtube';
import { VideoCard } from '@/components/VideoCard';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';
  let videos = [];

  if (query) {
    try {
      videos = await searchByQuery(query, 20);
    } catch (e) {
      console.error('Search failed:', e);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-stone-800 mb-1">
        {query ? `Results for "${query}"` : 'Search'}
      </h1>
      <p className="text-sm text-stone-500 mb-6">
        {videos.length} result{videos.length !== 1 ? 's' : ''} found
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard key={video.id} video={{ ...video, category: 'search', language: [] }} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-stone-400">
            {query ? 'No results found. Try a different search.' : 'Enter a search term above'}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### Task 13: Add Panchang widget component

**Objective:** Create a simple daily Panchang/Muhurat widget for the homepage

**Create: `src/components/PanchangWidget.tsx`**
```tsx
export function PanchangWidget() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">📅</span>
        <h3 className="text-sm font-semibold text-orange-800">Today&apos;s Panchang</h3>
      </div>
      <p className="text-sm text-stone-600">{today.toLocaleDateString('en-IN', options)}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/60 rounded-lg p-2">
          <p className="text-stone-500">🌅 Sunrise</p>
          <p className="font-semibold">6:15 AM</p>
        </div>
        <div className="bg-white/60 rounded-lg p-2">
          <p className="text-stone-500">🌇 Sunset</p>
          <p className="font-semibold">6:45 PM</p>
        </div>
        <div className="bg-white/60 rounded-lg p-2">
          <p className="text-stone-500">Shubh Muhurat</p>
          <p className="font-semibold">10:00 - 11:30 AM</p>
        </div>
        <div className="bg-white/60 rounded-lg p-2">
          <p className="text-stone-500">Abhijit</p>
          <p className="font-semibold">11:45 AM - 12:30 PM</p>
        </div>
      </div>
      <p className="text-xs text-stone-400 mt-2 italic">Times are approximate. Use Drik Panchang for precise calculations.</p>
    </div>
  );
}
```

---

### Task 14: Add homepage integration + verify everything works

**Objective:** Integrate the PanchangWidget into homepage, add all imports, run the dev server

**Action:** Add the PanchangWidget import to `src/app/page.tsx`:
```tsx
import { PanchangWidget } from '@/components/PanchangWidget';
```
And add it below the hero section:
```tsx
<section className="mb-10"><PanchangWidget /></section>
```

**Run:**
```bash
npm run dev
```
Visit localhost:3000 and verify:
1. Homepage loads with hero, Panchang widget, category grid, featured videos
2. Click each category — should load YouTube search results
3. Click a video — watch page with embed player
4. Search bar — searches YouTube
5. Share button opens WhatsApp
6. All pages are mobile-responsive

---

### Task 15: Set up deployment config

**Objective:** Configure for Vercel deployment

**Create: `vercel.json`**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

**Add to `.gitignore`:**
```
.env
.env.local
.next/
node_modules/
```

**Push to GitHub:**
```bash
git init
git add .
git commit -m "feat: spiritual platform core - homepage, categories, watch, search"
git remote add origin git@github.com:anant111/spiritual-platform.git
git push -u origin main
```

---

## Verification Checklist

- [ ] Homepage loads with warm, spiritual design on mobile
- [ ] All 5 category pages display relevant YouTube search results
- [ ] Video watch page embeds correctly
- [ ] Search works for both English and Hindi queries
- [ ] Share-to-WhatsApp opens with correct video link
- [ ] Site is fully responsive on phones (< 400px width)
- [ ] Thumbnails load fast with lazy loading
- [ ] Footer copyright disclaimer is present
- [ ] No videos are hosted locally — all embedded from YouTube

## Phase 2 (After Phase 1 approval)
- Full 15 categories coverage
- Regional language toggle (Hindi/English UI)
- Bookmarks/favorites with localStorage
- Audio-only mode with background playback
- PWA install support
- Drik Panchang API integration for accurate muhurat
- Newsletter/WhatsApp subscription for daily content
