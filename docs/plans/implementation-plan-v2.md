# Spiritual Platform for India — Implementation Plan (Phase 1)

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a spiritual content platform for Indian users that goes beyond content listing — it helps users discover what they need, go deeper on their journey, and find real spiritual solutions to life's problems.

**Architecture:** Next.js 14 (SSR for SEO) + Tailwind CSS + PostgreSQL (Prisma) + YouTube Data API v3 for embedding. We EMBED videos (never host).

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma + PostgreSQL, YouTube Data API v3.

---

## 4 CORE USER OBJECTIVES (driving every design decision)

### Objective 1: Discovery — "Show me what I need right now"
- Homepage surfaces content based on time of day, mood, and intent
- "What resonates with you today?" — an intent selector (peace, strength, devotion, wisdom, healing)
- Curated "Featured Today" that rotates meaningfully, not randomly
- Search works with emotional queries ("feeling lost", "need peace", "can't sleep")

### Objective 2: Deeper Journey — "What's my next step?"
- Every video/page has a "Next Step" section below it
- Progressive learning paths: Start → Practice → Deepen → Master
- Curated series/collections (e.g., "Gita Chapter 1-18 journey", "7 days of Hanuman devotion")
- No dead ends — every page leads somewhere deeper

### Objective 3: Problem-Solution — "I need real help, not superficial tips"
- "Find Spiritual Help" section maps real problems to specific practices
- Categories like: Stress/Anxiety, Grief/Loss, Sleep issues, Focus problems, Relationship conflict, Health anxiety, Career confusion, Anger, Fear, Loneliness
- Each problem page gives: (a) what tradition says about this, (b) a specific practice/technique, (c) how to do it step-by-step, (d) a guided video/audio
- Not "just watch this video" — actual spiritual guidance with depth

### Objective 4: Fulfillment — "I came seeking, I leave fulfilled"
- After consuming content: reflection prompt ("What did this teaching mean for you?")
- Sense of completion, not endless scrolling
- Clean, peaceful, distraction-free design
- Every visit feels like a genuine spiritual experience, not content consumption
- Footer blessing/message that leaves users uplifted

---

# PHASE 1 IMPLEMENTATION TASKS

---

### Task 1: Initialize Next.js project

**Objective:** Create a Next.js 14 project with TypeScript, Tailwind, ESLint

**Run:**
```bash
npx create-next-app@latest spiritual-platform --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd spiritual-platform
npm install lucide-react prisma @prisma/client
```

**Verify:**
```bash
npm run dev
```
Visit localhost:3000 — should show default Next.js page.

---

### Task 2: Define core data types

**Objective:** Create TypeScript types that support the 4 objectives

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
}

export interface Category {
  id: string;
  name: string;
  nameHindi: string;
  icon: string;
  description: string;
  youtubeQuery: string;
  color: string;
}

export interface SpiritualNeed {
  id: string;
  icon: string;
  title: string;
  titleHindi: string;
  description: string;
  youtubeQuery: string;
}

export interface JourneyPath {
  id: string;
  title: string;
  description: string;
  steps: JourneyStep[];
}

export interface JourneyStep {
  number: number;
  title: string;
  description: string;
  youtubeQuery: string;
  level: 'start' | 'practice' | 'deepen'| 'master';
}

export interface ProblemSolution {
  id: string;
  problem: string;
  problemHindi: string;
  icon: string;
  description: string;
  traditionContext: string; // What Hindu/Buddhist/Yogic tradition says
  practice: string; // The actual technique/practice
  practiceSteps: string[]; // Step-by-step instructions
  youtubeQuery: string; // Video to guide the practice
}
```

---

### Task 3: Create categories data

**Objective:** Define the 5 core categories with meaningful descriptions

**Create: `src/lib/categories.ts`**
```typescript
import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'bhajans',
    name: 'Bhajans & Aartis',
    nameHindi: 'भजन और आरती',
    icon: '🙏',
    description: 'Devotional songs and daily prayers from Krishna, Shiva, Hanuman, and Devi traditions',
    youtubeQuery: 'hanuman chalisa krishna bhajan shiva aarti morning aarti daily devotional',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'gita',
    name: 'Gita & Vedic Wisdom',
    nameHindi: 'गीता और वैदिक ज्ञान',
    icon: '📖',
    description: 'Bhagavad Gita chapter-by-chapter, Vedic teachings, and Upanishad discourses',
    youtubeQuery: 'bhagavad gita chapter explained vedic wisdom upanishad swami sarvapriyananda',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'meditation',
    name: 'Meditation & Mantra',
    nameHindi: 'ध्यान और मंत्र',
    icon: '🧘',
    description: 'Guided meditation, om chanting, mantra japa, and sleep mantras for inner peace',
    youtubeQuery: 'guided meditation hindi om chanting mantra meditation deep relaxation',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'astrology',
    name: 'Jyotish & Panchang',
    nameHindi: 'ज्योतिष और पंचांग',
    icon: '⭐',
    description: 'Vedic astrology guidance, daily panchang, rashi predictions, and muhurat timings',
    youtubeQuery: 'vedic astrology daily panchang rashi muhurat guidance today',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'talks',
    name: 'Guru Wisdom',
    nameHindi: 'गुरु वाणी',
    icon: '💬',
    description: 'Life wisdom from Sadhguru, Sri Sri Ravi Shankar, and other spiritual masters',
    youtubeQuery: 'sadhguru spiritual wisdom life guidance guru sri sri ravi shankar',
    color: 'from-emerald-500 to-teal-600',
  },
];
```

---

### Task 4: Create "Spiritual Needs" data (discovery by intent)

**Objective:** Support Objective 1 — let users discover content by what they resonate with

**Create: `src/lib/spiritual-needs.ts`**
```typescript
import { SpiritualNeed } from './types';

export const spiritualNeeds: SpiritualNeed[] = [
  {
    id: 'peace',
    icon: '☮️',
    title: 'Inner Peace',
    titleHindi: 'शांति',
    description: 'Find calm in chaos. Meditation, breathing practices, and shanti mantras.',
    youtubeQuery: 'inner peace meditation shanti mantra calm anxiety stress relief',
  },
  {
    id: 'strength',
    icon: '💪',
    title: 'Strength & Courage',
    titleHindi: 'शक्ति और साहस',
    description: 'Hanuman devotion, warrior teachings, and mantras for courage.',
    youtubeQuery: 'hanuman strength courage hanuman chalisa power mantra',
  },
  {
    id: 'devotion',
    icon: '❤️',
    title: 'Devotion & Love',
    titleHindi: 'भक्ति और प्रेम',
    description: 'Krishna bhajans, divine love poetry, and bhakti yoga practices.',
    youtubeQuery: 'krishna devotion bhakti yoga divine love bhajan',
  },
  {
    id: 'wisdom',
    icon: '🕉️',
    title: 'Self-Knowledge',
    titleHindi: 'आत्म ज्ञान',
    description: 'Gita teachings, Vedanta, and wisdom for understanding life\'s big questions.',
    youtubeQuery: 'self knowledge vedanta who am i bhagavad gita teaching enlightenment',
  },
  {
    id: 'healing',
    icon: '🌿',
    title: 'Healing & Recovery',
    titleHindi: 'उपचार और स्वास्थ्य',
    description: 'Mantras for health, healing meditation, and recovery practices.',
    youtubeQuery: 'healing mantra health meditation recovery dhanvantari mantra',
  },
  {
    id: 'gratitude',
    icon: '🙌',
    title: 'Gratitude & Joy',
    titleHindi: 'कृतज्ञता',
    description: 'Morning gratitude practices, gratitude meditation, and joy mantras.',
    youtubeQuery: 'gratitude meditation morning thanksgiving prayer joy mantra',
  },
];
```

---

### Task 5: Create "Problem-Solution" data (Objective 3)

**Objective:** Map real problems to genuine spiritual practices with depth

**Create: `src/lib/problem-solutions.ts`**
```typescript
import { ProblemSolution } from './types';

export const problemSolutions: ProblemSolution[] = [
  {
    id: 'anxiety',
    problem: 'Anxiety & Overthinking',
    problemHindi: 'चिंता और अधिक सोचना',
    icon: '🌊',
    description: 'When your mind won\'t stop, these ancient techniques help you find stillness.',
    traditionContext:
      'In the Bhagavad Gita (Ch 6, Verse 34), Arjuna asks Krishna: "The mind is restless, turbulent, powerful, and obstinate." Krishna replies that through practice (abhyasa) and detachment (vairagya), the mind can be steadied. Patanjali\'s Yoga Sutras (1.2) state: "Yoga chitta vritti nirodha" — yoga is the calming of the fluctuations of the mind. The tradition teaches that anxiety is not a flaw; it is the mind\'s natural restlessness that can be trained, like a muscle.',
    practice: 'Nadi Shodhana (Alternate Nostril Breathing) + Shanti Mantra',
    practiceSteps: [
      'Sit comfortably with spine straight. Close your eyes.',
      'Place your right thumb on your right nostril. Gently close it.',
      'Inhale deeply through the left nostril (count to 4).',
      'Close the left nostril with your ring finger. Release the right.',
      'Exhale slowly through the right nostril (count to 6).',
      'Inhale through the right nostril (count to 4), close it.',
      'Exhale through the left nostril (count to 6). This is one cycle.',
      'Repeat for 7-10 cycles.',
      'Afterwards, silently chant: "Om Shanti Shanti Shanti" 3 times, feeling peace in mind, body, and spirit.',
      'Sit in silence for 2 minutes. Notice the difference in your mental state.',
    ],
    youtubeQuery: 'nadi shodhana pranayama anxiety relief alternate nostril breathing guided',
  },
  {
    id: 'grief',
    problem: 'Grief & Loss',
    problemHindi: 'शोक और हानि',
    icon: '🕊️',
    description: 'When you have lost someone or something irreplaceable.',
    traditionContext:
      ' Krishna\'s teaching to Arjuna in the Gita (Ch 2, Verse 22): "As a person sheds worn-out garments and wears new ones, the soul sheds worn-out bodies and enters new ones." The tradition does not ask you to "get over" grief — it offers a larger frame of understanding. The Gita teaches that the Atman (soul) is eternal and cannot be destroyed. Grief is the mind\'s attachment, not the soul\'s reality. Practices like tarpan, lighting a diya for the departed, and reading the Gita\'s teachings on the eternal self provide genuine comfort.',
    practice: 'Lighting a Diya + Gita Ch 2 Reading + Tarpan',
    practiceSteps: [
      'At sunset, light a diya (lamp/clay lamp with ghee or oil) in a quiet space.',
      'Sit before the flame. Place hands folded in chin mudra (thumb and index finger touching).',
      'Read or listen to Bhagavad Gita Chapter 2 (verses 11-30) — Krishna\'s teaching that the soul never dies.',
      'Offer a small cup of water to the departed, silently speaking their name. Say: "May you find peace wherever you are."',
      'Sit with the flame for 10 minutes. Let yourself feel. Tears are welcome.',
      'Chant: "Om Purnamadah Purnamidam..." (the peace mantra from Brihadaranyaka Upanishad that speaks of wholeness beyond loss).',
      'This practice can be done daily for 21 days during acute grief.',
    ],
    youtubeQuery: 'bhagavad gita chapter 2 explained soul never dies grief comfort',
  },
  {
    id: 'sleep',
    problem: 'Sleep Issues',
    problemHindi: 'नींद न आना',
    icon: '🌙',
    description: 'When you lie awake despite being exhausted.',
    traditionContext:
      'Yogic tradition recognizes sleep disturbances as a sign of Vata imbalance (movement energy gone wild) and rajasic (overactive) mind. The Gita (Ch 14) discusses the three gunas — and recommends sattvic (pure, calm) practices before bed. Yoga Nidra ("yogic sleep") is a 5,000-year-old technique specifically for deep rest and sleep issues. Hanuman Chalisa before bed is a traditional practice millions of Indians swear by for peaceful sleep.',
    practice: 'Yoga Nidra + Hanuman Chalisa (Bedtime Version)',
    practiceSteps: [
      '1 hour before bed, put away phone and screens.',
      'Lie down in Shavasana (flat on back, arms at sides, palms up).',
      'Listen to a guided Yoga Nidra for sleep (video below). This takes 15-30 minutes.',
      'After Yoga Nidra, sit up and chant or play Hanuman Chalisa once quietly.',
      'Lie back down. Chant "Om Namah Shivaya" 9 times slowly.',
      'Focus only on your breath. Nothing else.',
      'If thoughts come, gently return to breath. This is the practice.',
      'You will naturally fall asleep during this process.',
    ],
    youtubeQuery: 'yoga nidra sleep guided hanuman chalisa before bed peaceful',
  },
  {
    id: 'focus',
    problem: 'Lack of Focus',
    problemHindi: 'ध्यान नहीं लगना',
    icon: '🎯',
    description: 'When you can\'t concentrate on work, study, or anything important.',
    traditionContext:
      'Gita Ch 6, Verse 26: "Yato yato niscalati manas cancalam asthiram. Tatas tato niyamyaitad atmany eva vasam nayet" — "Wherever this restless, unsteady mind wanders, bring it back and focus it on the Self." Patanjali\'s Yoga Sutras describe Dharana (concentration) as the 6th limb of yoga — the practice of binding awareness to a single point. Trataka (gazing meditation) is the traditional yogic technique for training focus.',
    practice: 'Trataka (Candle Gazing) + Gita Ch 6 Mind Discipline',
    practiceSteps: [
      'Place a candle at eye level, arm\'s length away.',
      'Sit comfortably. Light the candle.',
      'Gaze at the flame without blinking for as long as comfortable.',
      'When eyes tire, close them and visualize the flame at the third eye point (between eyebrows).',
      'When the image fades, open eyes and gaze again.',
      'Do this for 10-15 minutes.',
      'Afterwards, read Gita Chapter 6, Verses 25-26 (about controlling the mind).',
      'Practice this daily. Focus will noticeably improve within 2 weeks.',
    ],
    youtubeQuery: 'trataka meditation candle gazing concentration focus technique guided',
  },
  {
    id: 'anger',
    problem: 'Anger & Frustration',
    problemHindi: 'क्रोध और निराशा',
    icon: '🔥',
    description: 'When anger gets the better of you and you regret it later.',
    traditionContext:
      'Gita Ch 2, Verse 63: "Krodhad bhavati sammohah sammohat smriti-vibhramah" — "From anger comes delusion, from delusion comes loss of memory, from loss of memory comes destruction of intelligence." The tradition teaches that anger is born of unfulfilled desire (kama) and attachment to outcomes. The prescription is not suppression — it is substitution. When anger arises, shift awareness to breath and chant a cooling mantra. Shiva is the transformer of anger into awareness.',
    practice: 'Sitali Pranayama (Cooling Breath) + Shiva Mantra',
    practiceSteps: [
      'When you feel anger rising, stop. Step away if possible.',
      'Roll your tongue into a tube (if you can\'t, purse your lips instead).',
      'Inhale slowly and deeply through the rolled tongue (the air will feel cool).',
      'Close mouth. Exhale slowly through the nose.',
      'Repeat 10-15 breaths. The coolness physically calms the nervous system.',
      'Now chant silently: "Om Namah Shivaya" 21 times.',
      'When the chant is done, ask yourself: "What am I really angry about?" The answer is rarely what triggered it.',
      'This practice rewires the anger response over time.',
    ],
    youtubeQuery: 'sitali pranayama cooling breath anger management shiva mantra',
  },
  {
    id: 'loneliness',
    problem: 'Loneliness',
    problemHindi: 'अकेलापन',
    icon: '🌑',
    description: 'When you feel no one truly understands or is with you.',
    traditionContext:
      'The Upanishads teach that the deepest loneliness comes from forgetting that the Atman (your true self) is never alone — it is one with Brahman (the infinite). Gita Ch 6, Verse 29: "One who sees the Self in all beings, and all beings in the Self, sees the same everywhere." Devotion practices reframe loneliness as the longing of the soul for the divine — this is actually a spiritual blessing in disguise. Bhakti saints like Meera Bai and Tulsidas channeled loneliness into the most beautiful devotional poetry India has produced.',
    practice: 'Bhakti (Devotional Singing) + Self-Inquiry',
    practiceSteps: [
      'Put on a Krishna bhajan or Hanuman chalisa video (below).',
      'Sing along — even if quietly. The voice is a bridge between isolation and connection.',
      'After singing, sit quietly for 5 minutes.',
      'Ask yourself gently: "Am I truly alone? Who is aware of this loneliness?"',
      'Don\'t answer with words. Just feel the awareness that is always present.',
      'That awareness has never been lonely.',
      'This practice, done daily, transforms loneliness from burden into spiritual fuel.',
    ],
    youtubeQuery: 'krishna bhajan devotional singing loneliness meera bhaiji bhajan',
  },
];
```

---

### Task 6: Create "Journey Paths" data (Objective 2)

**Objective:** Define progressive learning paths so every page has a "next step"

**Create: `src/lib/journey-paths.ts`**
```typescript
import { JourneyPath } from './types';

export const journeyPaths: JourneyPath[] = [
  {
    id: 'gita-journey',
    title: 'Bhagavad Gita — Complete Journey',
    description: 'Go through the Gita chapter by chapter with guided explanations',
    steps: [
      { number: 1, title: 'Arjuna\'s Despair (Ch 1)', description: 'Understanding the crisis that leads to spiritual seeking', youtubeQuery: 'bhagavad gita chapter 1 explained arjuna vishada yoga', level: 'start' },
      { number: 2, title: 'The Eternal Soul (Ch 2)', description: 'Krishna\'s first teaching: the soul never dies', youtubeQuery: 'bhagavad gita chapter 2 sankhya yoga soul eternal', level: 'practice' },
      { number: 3, title: 'Karma Yoga (Ch 3)', description: 'How to act without attachment to results', youtubeQuery: 'bhagavad gita chapter 3 karma yoga action without attachment', level: 'deepen' },
      { number: 4, title: 'Wisdom & Detachment (Ch 4)', description: 'The meaning of sacrifice and divine knowledge', youtubeQuery: 'bhagavad gita chapter 4 jnana karma sanyasa yoga', level: 'deepen' },
      { number: 5, title: 'Renunciation (Ch 5)', description: 'True renunciation vs external withdrawal', youtubeQuery: 'bhagavad gita chapter 5 karma sanyasa yoga explained', level: 'deepen' },
      { number: 6, title: 'Meditation (Ch 6)', description: 'The discipline of the mind', youtubeQuery: 'bhagavad gita chapter 6 dhyana yoga meditation explained', level: 'master' },
    ],
  },
  {
    id: 'meditation-journey',
    title: 'Meditation — From Beginner to Deep Practice',
    description: 'A progressive meditation path — start with 5 minutes, grow to deep practice',
    steps: [
      { number: 1, title: 'Breath Awareness', description: 'Start with 5 minutes of simply watching your breath', youtubeQuery: 'beginner meditation breath awareness 5 minutes hindi', level: 'start' },
      { number: 2, title: 'Om Chanting Meditation', description: 'Using sound vibration to quiet the mind', youtubeQuery: 'om chanting meditation guided 15 minutes hindi', level: 'practice' },
      { number: 3, title: 'Mantra Japa', description: 'Repeating a sacred mantra with a mala', youtubeQuery: 'mantra meditation japa mala technique explained hindi', level: 'deepen' },
      { number: 4, title: 'Vipassana Introduction', description: 'Insight meditation — observing sensations', youtubeQuery: 'vipassana meditation introduction body scanning goenka', level: 'deepen' },
      { number: 5, title: 'Yoga Nidra (Deep Rest)', description: 'The practice of conscious sleep', youtubeQuery: 'yoga nidra deep rest guided 30 minutes hindi', level: 'master' },
    ],
  },
  {
    id: 'hanuman-devotion',
    title: 'Hanuman Sadhana — 7 Days of Devotion',
    description: 'A weekly practice to build strength, courage, and devotion through Hanuman worship',
    steps: [
      { number: 1, title: 'Day 1: Understanding Hanuman', description: 'Who is Hanuman and why is he the god of strength and devotion?', youtubeQuery: 'hanuman ji story significance who is hanuman hindi', level: 'start' },
      { number: 2, title: 'Day 2: Hanuman Chalisa', description: 'Learn and recite the Hanuman Chalisa with meaning', youtubeQuery: 'hanuman chalisa with meaning explained hindi', level: 'practice' },
      { number: 3, title: 'Day 3: Tuesday Vrat', description: 'The practice of fasting on Tuesdays for Hanuman', youtubeQuery: 'hanuman tuesday vrat how to perform hindi', level: 'practice' },
      { number: 4, title: 'Day 4: Sunderkand', description: 'The most powerful chapter of Ramayana', youtubeQuery: 'sunderkand explained significance why it is powerful', level: 'deepen' },
      { number: 5, title: 'Day 5: Bajrang Baan', description: 'Hanuman\'s powerful prayer for protection', youtubeQuery: 'bajrang baan benefits how to recite hindi', level: 'deepen' },
      { number: 6, title: 'Day 6: Panchmukhi Hanuman', description: 'The five-faced Hanuman and its significance', youtubeQuery: 'panchmukhi hanuman significance five faces hindi', level: 'deepen' },
      { number: 7, title: 'Day 7: Complete Sadhana', description: 'Putting it all together — a daily Hanuman practice', youtubeQuery: 'daily hanuman puja vidhi morning routine hindi', level: 'master' },
    ],
  },
];
```

---

### Task 7: Create the database schema

**Objective:** Set up Prisma with PostgreSQL for bookmarks and user reflections

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
  createdAt DateTime @default(now())

  @@index([videoId])
}

model Reflection {
  id        String   @id @default(cuid())
  content   String
  videoId   String?
  createdAt DateTime @default(now())
}
```

**Run:**
```bash
npx prisma generate
npx prisma db push
```

---

### Task 8: YouTube API integration

**Objective:** Create a YouTube Data API client

**Add to `.env.local`:**
```
YOUTUBE_API_KEY=your_key_here
```

**Create: `src/lib/youtube.ts`**
```typescript
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function searchByQuery(query: string, maxResults = 12): Promise<any[]> {
  if (!YOUTUBE_API_KEY) return [];

  const searchRes = await fetch(
    `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&relevanceLanguage=hi&key=${YOUTUBE_API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const searchData = await searchRes.json();
  if (!searchData.items?.length) return [];

  const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
  const detailsRes = await fetch(
    `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const detailsData = await detailsRes.json();

  return detailsData.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description.slice(0, 200),
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || '',
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    duration: parseDuration(item.contentDetails.duration),
    viewCount: formatViews(item.statistics?.viewCount || '0'),
  }));
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const [, h, m, s] = match;
  return h ? `${h}:${(m || '0').padStart(2, '0')}:${(s || '0').padStart(2, '0')}`
           : `${m || '0'}:${(s || '0').padStart(2, '0')}`;
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

### Task 9: Root Layout + Global Styles

**Objective:** Create the app shell with a warm, spiritual, peaceful design

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
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: system-ui, -apple-system, sans-serif;
}
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
  title: 'Shraddha — Your Spiritual Journey',
  description: 'Find spiritual wisdom. Bhajans, Gita, Meditation, Astrology — curated for your journey.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pb-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

### Task 10: Header component

**Objective:** Clean, spiritual header with search and intent selector

**Create: `src/components/Header.tsx`**
```tsx
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🕉️</span>
            <span className="text-xl font-bold text-orange-600">Shraddha</span>
          </a>

          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or describe what you feel..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-stone-100 border border-stone-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none text-sm"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
```

---

### Task 11: Footer component with blessing

**Objective:** Peaceful footer that leaves users feeling uplifted (Objective 4)

**Create: `src/components/Footer.tsx`**
```tsx
const blessings = [
  '"May all beings be happy. May all beings be free from illness. May all see what is auspicious." — Brihadaranyaka Upanishad',
  '"Yoga is the journey of the self, through the self, to the self." — Bhagavad Gita',
  '"The mind is restless, but with practice, it can be controlled." — Bhagavad Gita 6.35',
  '"When meditation is mastered, the mind is unwavering like a lamp in a windless place." — Bhagavad Gita 6.19',
  '"From untruth lead me to truth. From darkness lead me to light. From death lead me to immortality." — Brihadaranyaka Upanishad',
];

export function Footer() {
  const today = new Date().getDate();
  const blessing = blessings[today % blessings.length];

  return (
    <footer className="bg-stone-900 text-stone-400 py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-stone-800/50 rounded-xl p-4 mb-6 border border-stone-700">
          <p className="text-sm text-stone-300 text-center italic">{blessing}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-lg font-semibold text-stone-200">🕉️ Shraddha</p>
            <p className="text-xs text-stone-500 mt-1">Your Spiritual Journey</p>
          </div>
          <div className="text-center text-xs text-stone-500">
            <p>All videos embedded from YouTube. Copyright belongs to original creators.</p>
            <p className="mt-1">Made with devotion for seekers everywhere.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

### Task 12: VideoCard component with "Next Step" (Objective 2)

**Objective:** Video card that suggests a "next step" — never a dead end

**Create: `src/components/VideoCard.tsx`**
```tsx
import { Play, ArrowRight, Share2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    duration: string;
    viewCount: string;
    category?: string;
  };
}

export function VideoCard({ video }: Props) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
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

      <div className="p-3">
        <Link href={`/watch/${video.id}`}>
          <h3 className="text-sm font-medium text-stone-800 line-clamp-2 mb-1 hover:text-orange-600">
            {video.title}
          </h3>
        </Link>
        <p className="text-xs text-stone-500">{video.channelTitle}</p>
        {video.viewCount && <p className="text-xs text-stone-400">{video.viewCount}</p>}

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
          <Link
            href={`/watch/${video.id}`}
            className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-medium"
          >
            <ArrowRight className="w-3 h-3" /> Continue →
          </Link>
          <button
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(video.title + '\nhttps://youtube.com/watch?v=' + video.id)}`, '_blank')}
            className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
          >
            <Share2 className="w-3 h-3" /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### Task 13: Homepage (Objective 1 — Discovery)

**Objective:** Homepage designed for discovery — time-based greeting, intent selector, problem-solver, featured content

**Edit: `src/app/page.tsx`**
```tsx
import { categories } from '@/lib/categories';
import { spiritualNeeds } from '@/lib/spiritual-needs';
import { problemSolutions } from '@/lib/problem-solutions';
import { journeyPaths } from '@/lib/journey-paths';
import { VideoCard } from '@/components/VideoCard';
import { searchByQuery } from '@/lib/youtube';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

async function getFeatured() {
  try {
    return await searchByQuery('hanuman chalisa morning OR bhagavad gita chapter 1 OR om chanting meditation', 6);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeatured();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Suprabhat 🌅' : hour < 17 ? 'Namaste ☀️' : 'Shubh Sandhya 🌙';

  const todaySolutions = problemSolutions.slice(0, 3);
  const todayJourney = journeyPaths[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Greeting */}
      <section className="mb-10">
        <h1 className="text-2xl font-bold text-stone-800">{greeting}</h1>
        <p className="text-stone-500 mt-1 text-sm">Where would you like your journey go today?</p>
      </section>

      {/* Objective 1: Intent Selector */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-stone-800 mb-3">What resonates with you today?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {spiritualNeeds.map((need) => (
            <Link
              key={need.id}
              href={`/search?q=${encodeURIComponent(need.youtubeQuery)}`}
              className="bg-white rounded-xl border border-stone-200 p-3 text-center hover:border-orange-300 hover:shadow-sm transition-all"
            >
              <span className="text-2xl block mb-1">{need.icon}</span>
              <span className="text-xs font-medium block">{need.title}</span>
              <span className="text-xs text-stone-400 block">{need.titleHindi}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Objective 3: Problem-Solver */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-stone-800 mb-3">Find spiritual help for</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {todaySolutions.map((sol) => (
            <Link
              key={sol.id}
              href={`/help/${sol.id}`}
              className="bg-white rounded-xl border border-stone-200 p-4 hover:border-orange-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{sol.icon}</span>
                <div>
                  <p className="text-sm font-medium text-stone-800">{sol.problem}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{sol.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/help" className="flex items-center gap-1 text-xs text-orange-600 mt-3 hover:text-orange-700">
          See all problems and solutions <ArrowRight className="w-3 h-3" />
        </Link>
      </section>

      {/* Explore Categories */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-stone-800 mb-3">Explore</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.id}`}
              className={`bg-gradient-to-br ${cat.color} text-white rounded-xl p-4 text-center hover:scale-[1.03] transition-transform`}
            >
              <span className="text-2xl block mb-1">{cat.icon}</span>
              <span className="text-sm font-semibold block">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Objective 2: Journey Paths */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-stone-800 mb-3">Start a Journey</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {journeyPaths.map((journey) => (
            <Link
              key={journey.id}
              href={`/journey/${journey.id}`}
              className="bg-white rounded-xl border border-stone-200 p-4 hover:border-orange-300 hover:shadow-sm transition-all"
            >
              <h3 className="text-sm font-semibold text-stone-800">{journey.title}</h3>
              <p className="text-xs text-stone-500 mt-1">{journey.description}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-orange-600">
                {journey.steps.length} steps <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Today */}
      <section>
        <h2 className="text-base font-semibold text-stone-800 mb-3">✨ Featured for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.length > 0 ? (
            featured.map((video: any) => (
              <VideoCard key={video.id} video={video} />
            ))
          ) : (
            <p className="text-stone-400 col-span-full text-center py-8">Loading...</p>
          )}
        </div>
      </section>
    </div>
  );
}
```

---

### Task 14: Category page

**Objective:** Category with "next step" suggestions at the bottom (Objective 2)

**Create: `src/app/[category]/page.tsx`**
```tsx
import { categories } from '@/lib/categories';
import { journeyPaths } from '@/lib/journey-paths';
import { VideoCard } from '@/components/VideoCard';
import { searchByQuery } from '@/lib/youtube';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const cat = categories.find((c) => c.id === params.category);
  if (!cat) return <div className="p-8 text-center text-stone-500">Category not found</div>;

  let videos: any[] = [];
  try { videos = await searchByQuery(cat.youtubeQuery, 12); } catch {}

  // Find a related journey path
  const relatedJourney = journeyPaths.find(j => {
    const keywords = cat.id === 'bhajans' ? 'hanuman' : cat.id === 'gita' ? 'gita' : cat.id === 'meditation' ? 'meditation' : '';
    return keywords && j.title.toLowerCase().includes(keywords);
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {videos.length > 0 ? (
          videos.map((v: any) => <VideoCard key={v.id} video={v} />)
        ) : (
          <p className="col-span-full text-center py-12 text-stone-400">Unable to load content. Try refreshing.</p>
        )}
      </div>

      {/* Objective 2: Next Step */}
      {relatedJourney && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-orange-800 mb-1">Deepen your journey →</h3>
          <p className="text-xs text-stone-600 mb-2">{relatedJourney.description}</p>
          <Link href={`/journey/${relatedJourney.id}`} className="flex items-center gap-1 text-xs text-orange-600 font-medium">
            Start: {relatedJourney.title} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
```

---

### Task 15: Watch page with reflection + next steps (Objective 2 + 4)

**Objective:** Watch page that embeds video, offers next steps, and asks for reflection

**Create: `src/app/watch/[videoId]/page.tsx`**
```tsx
import { ArrowLeft, ArrowRight, Share2, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { searchByQuery } from '@/lib/youtube';

export default async function WatchPage({ params }: { params: { videoId: string } }) {
  const { videoId } = params;

  // Find related "next step" videos
  let nextVideos: any[] = [];
  try {
    nextVideos = await searchByQuery('bhagavad gita next chapter OR meditation deeper OR spiritual wisdom continuation', 3);
  } catch {}

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-orange-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      {/* Video Embed */}
      <div className="aspect-video rounded-xl overflow-hidden bg-black mb-4">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('https://youtube.com/watch?v=' + videoId)}`, '_blank')}
          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm"
        >
          <Share2 className="w-4 h-4" /> Share on WhatsApp
        </button>
      </div>

      {/* Objective 4: Reflection */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-semibold text-purple-800">What did this teaching mean for you?</h3>
        </div>
        <p className="text-xs text-stone-600 mb-3">Take a moment. Write one thought, one feeling, or one question that arose.</p>
        <button className="text-xs text-purple-600 font-medium hover:text-purple-700">
          Write a reflection →
        </button>
      </div>

      {/* Objective 2: Next Steps */}
      {nextVideos.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-stone-800 mb-3">Continue your journey →</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nextVideos.map((v: any) => (
              <Link
                key={v.id}
                href={`/watch/${v.id}`}
                className="bg-white rounded-xl border border-stone-200 p-3 hover:border-orange-300 transition-all flex items-start gap-3"
              >
                <img src={v.thumbnail} alt={v.title} className="w-20 h-14 object-cover rounded-lg shrink-0" />
                <div>
                  <p className="text-sm font-medium text-stone-800 line-clamp-2">{v.title}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{v.channelTitle}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-orange-600">
                    Watch next <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### Task 16: Problem-Solution page (Objective 3 — core differentiator)

**Objective:** A page for each life problem that gives genuine spiritual depth — tradition context, practice instructions, step-by-step guidance, and a video

**Create: `src/app/help/page.tsx`** (list all problems)
```tsx
import { problemSolutions } from '@/lib/problem-solutions';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-stone-800 mb-1">Find Spiritual Help</h1>
      <p className="text-sm text-stone-500 mb-6">Real problems. Real practices. Deep wisdom from ancient traditions.</p>

      <div className="space-y-3">
        {problemSolutions.map((sol) => (
          <Link
            key={sol.id}
            href={`/help/${sol.id}`}
            className="block bg-white rounded-xl border border-stone-200 p-4 hover:border-orange-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{sol.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-800">{sol.problem}</p>
                <p className="text-xs text-stone-500">{sol.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Create: `src/app/help/[problemId]/page.tsx`** (individual problem solution)
```tsx
import { problemSolutions } from '@/lib/problem-solutions';
import { searchByQuery } from '@/lib/youtube';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default async function ProblemPage({ params }: { params: { problemId: string } }) {
  const sol = problemSolutions.find(s => s.id === params.problemId);
  if (!sol) return <div className="p-8 text-center text-stone-500">Not found</div>;

  let videos: any[] = [];
  try { videos = await searchByQuery(sol.youtubeQuery, 4); } catch {}

  // Find a "next problem" (the next one in the list for progression)
  const currentIndex = problemSolutions.findIndex(s => s.id === sol.id);
  const nextSol = problemSolutions[(currentIndex + 1) % problemSolutions.length];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/help" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-orange-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to all problems
      </Link>

      {/* Problem Header */}
      <div className="mb-8">
        <span className="text-3xl block mb-2">{sol.icon}</span>
        <h1 className="text-xl font-bold text-stone-800">{sol.problem}</h1>
        <p className="text-sm text-stone-500 mt-1">{sol.problemHindi}</p>
        <p className="text-sm text-stone-600 mt-2">{sol.description}</p>
      </div>

      {/* What Tradition Says */}
      <section className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-amber-800 mb-2">What the tradition teaches</h2>
        <p className="text-sm text-stone-700 leading-relaxed">{sol.traditionContext}</p>
      </section>

      {/* The Practice */}
      <section className="bg-white border border-stone-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-stone-800 mb-1">Try this practice</h2>
        <p className="text-sm text-orange-600 font-medium mb-4">{sol.practice}</p>
        <ol className="space-y-3">
          {sol.practiceSteps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <p className="text-sm text-stone-700">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Guided Video */}
      {videos.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-stone-800 mb-3">Guided session</h2>
          <div className="aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videos[0].id}?rel=0&modestbranding=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {videos.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              {videos.slice(1).map((v: any) => (
                <Link
                  key={v.id}
                  href={`/watch/${v.id}`}
                  className="bg-white rounded-lg border border-stone-200 p-2 hover:border-orange-300 transition-all"
                >
                  <img src={v.thumbnail} alt={v.title} className="w-full h-20 object-cover rounded mb-1" />
                  <p className="text-xs font-medium text-stone-800 line-clamp-2">{v.title}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Reflection */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-indigo-800 font-medium mb-1">After trying this practice</p>
        <p className="text-xs text-stone-600">Sit quietly for 2 minutes. Notice what changed inside you. Even a small shift is progress.</p>
      </div>

      {/* Objective 2: Next Problem to explore */}
      <Link
        href={`/help/${nextSol.id}`}
        className="flex items-center justify-between bg-white rounded-xl border border-stone-200 p-4 hover:border-orange-300 transition-all"
      >
        <div>
          <p className="text-xs text-stone-500">Next explore</p>
          <p className="text-sm font-semibold text-stone-800">{nextSol.icon} {nextSol.problem}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-stone-400" />
      </Link>
    </div>
  );
}
```

---

### Task 17: Journey page (Objective 2 — progressive paths)

**Objective:** Page for each journey path showing steps with progress levels

**Create: `src/app/journey/page.tsx`** (list all journeys)
```tsx
import { journeyPaths } from '@/lib/journey-paths';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function JourneysPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-stone-800 mb-1">Spiritual Journeys</h1>
      <p className="text-sm text-stone-500 mb-6">Step-by-step paths to go deeper in your practice.</p>

      <div className="space-y-4">
        {journeyPaths.map((journey) => (
          <Link
            key={journey.id}
            href={`/journey/${journey.id}`}
            className="block bg-white rounded-xl border border-stone-200 p-5 hover:border-orange-300 hover:shadow-sm transition-all"
          >
            <h2 className="text-base font-semibold text-stone-800">{journey.title}</h2>
            <p className="text-sm text-stone-500 mt-1">{journey.description}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-orange-600 font-medium">
              {journey.steps.length} steps <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Create: `src/app/journey/[journeyId]/page.tsx`**
```tsx
import { journeyPaths } from '@/lib/journey-paths';
import { searchByQuery } from '@/lib/youtube';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const levelLabels = {
  start: 'Start Here',
  practice: 'Practice',
  deepen: 'Deepen',
  master: 'Master',
};

const levelColors = {
  start: 'bg-green-100 text-green-700',
  practice: 'bg-blue-100 text-blue-700',
  deepen: 'bg-purple-100 text-purple-700',
  master: 'bg-amber-100 text-amber-700',
};

export default async function JourneyPage({ params }: { params: { journeyId: string } }) {
  const journey = journeyPaths.find(j => j.id === params.journeyId);
  if (!journey) return <div className="p-8 text-center text-stone-500">Journey not found</div>;

  // Fetch first video for each step (lazy load in prod, but fetch for initial)
  const stepVideos: any[] = [];
  for (const step of journey.steps) {
    try {
      const vids = await searchByQuery(step.youtubeQuery, 1);
      stepVideos.push(vids[0] || null);
    } catch {
      stepVideos.push(null);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/journey" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-orange-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> All Journeys
      </Link>

      <h1 className="text-xl font-bold text-stone-800 mb-1">{journey.title}</h1>
      <p className="text-sm text-stone-500 mb-8">{journey.description}</p>

      <div className="space-y-3">
        {journey.steps.map((step, i) => {
          const video = stepVideos[i];
          return (
            <div key={step.number} className="bg-white rounded-xl border border-stone-200 p-4">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${levelColors[step.level]}`}>
                    {levelLabels[step.level]}
                  </span>
                  <span className="text-lg font-bold text-stone-800 mt-2">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-stone-800">{step.title}</h3>
                  <p className="text-xs text-stone-500 mt-1">{step.description}</p>

                  {video && (
                    <Link
                      href={`/watch/${video.id}`}
                      className="mt-3 flex items-center gap-1 text-xs text-orange-600 font-medium hover:text-orange-700"
                    >
                      Watch → <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete message */}
      {journey.steps.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mt-6 text-center">
          <p className="text-sm text-amber-800 font-medium">Complete all steps to go deep in this practice</p>
          <p className="text-xs text-stone-600 mt-1">A true spiritual journey takes time. One step at a time.</p>
        </div>
      )}
    </div>
  );
}
```

---

### Task 18: Search page

**Objective:** Search with emotional query support

**Create: `src/app/search/page.tsx`**
```tsx
import { searchByQuery } from '@/lib/youtube';
import { VideoCard } from '@/components/VideoCard';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || '';
  let videos: any[] = [];

  if (query) {
    try { videos = await searchByQuery(query, 16); } catch {}
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-lg font-bold text-stone-800 mb-4">
        {query ? `Results for "${query}"` : 'Search'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length > 0
          ? videos.map((v: any) => <VideoCard key={v.id} video={v} />)
          : <div className="col-span-full text-center py-12 text-stone-400">
              {query ? 'No results found. Try searching for peace, strength, or devotion.' : 'Search for content that resonates with you'}
            </div>
        }
      </div>
    </div>
  );
}
```

---

### Task 19: Navigation links in footer / bottom nav

**Objective:** Add a mobile-friendly bottom navigation for quick access

**Create: `src/components/BottomNav.tsx`**
```tsx
import { Home, BookOpen, HelpCircle, Layers, Search } from 'lucide-react';

export function BottomNav() {
  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/journey', icon: Layers, label: 'Journeys' },
    { href: '/help', icon: HelpCircle, label: 'Help' },
    { href: '/gita', icon: BookOpen, label: 'Gita' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 md:hidden z-50">
      <div className="flex justify-around py-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.href} href={link.href} className="flex flex-col items-center gap-0.5 py-1 px-2 text-stone-500 hover:text-orange-600">
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{link.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
```

**Edit `src/app/layout.tsx`** — add BottomNav import and include it:
```tsx
import { BottomNav } from '@/components/BottomNav';
// ...
<body className={inter.className}>
  <Header />
  <main className="min-h-screen pb-24">{children}</main>
  <BottomNav />
  <Footer />
</body>
```

---

### Task 20: Final verification and deployment prep

**Run:**
```bash
npm run build
```

**Deploy to Vercel:**
```bash
git init
git add .
git commit -m "feat: spiritual platform phase 1 — discovery, journeys, problem-solutions"
git remote add origin git@github.com:anant111/spiritual-platform.git
git push -u origin main
```

Then connect the repo to Vercel and add `YOUTUBE_API_KEY` in environment variables.

---

## Verification Checklist (mapped to objectives)

- [ ] **Obj 1:** Homepage surfaces content by time of day + intent selector + problem-solver
- [ ] **Obj 1:** Search works with emotional queries ("need peace", "can't sleep")
- [ ] **Obj 2:** Every category page has a "Next Step" (journey path suggestion)
- [ ] **Obj 2:** Watch page has "Continue your journey" — 3 related videos below
- [ ] **Obj 2:** Journey pages show progressive steps with Start → Practice → Deepen → Master
- [ ] **Obj 3:** `/help` page lists 6 problems (anxiety, grief, sleep, focus, anger, loneliness)
- [ ] **Obj 3:** Each problem page has: tradition context (deep), step-by-step practice, guided video
- [ ] **Obj 3:** Problem-solution has no dead ends — suggests next problem to explore
- [ ] **Obj 4:** Footer has a rotating blessing/Upanishad quote
- [ ] **Obj 4:** Watch page has a reflection prompt after the video
- [ ] **Obj 4:** Footer message: "All videos embedded. Made with devotion for seekers everywhere."
- [ ] Mobile-responsive on phones < 400px
- [ ] Bottom nav works on mobile
- [ ] All content is embedded from YouTube (no copyright issues)
