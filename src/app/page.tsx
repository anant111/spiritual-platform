import { categories } from '@/lib/categories';
import { problemSolutions } from '@/lib/problem-solutions';
import { journeyPaths } from '@/lib/journey-paths';
import { ContentRail } from '@/components/ContentRail';
import { HeroCarousel } from '@/components/HeroCarousel';
import { FeelingSelector } from '@/components/FeelingSelector';
import { searchByQuery } from '@/lib/youtube';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

async function getCarouselSlides() {
  let videos: any[] = [];
  try { videos = await searchByQuery('hanuman chalisa OR gayatri mantra OR om namah shivaya', 6); } catch {}
  return videos.map((v) => ({
    id: v.id,
    title: v.title,
    thumbnail: v.thumbnail,
    videoId: v.id,
  }));
}

async function getRails() {
  const [featured, bhajans, meditation, gita, talks] = await Promise.all([
    searchByQuery('hanuman chalisa OR om namah shivaya OR gayatri mantra', 15).catch(() => []),
    searchByQuery('hanuman chalisa OR krishna bhajan OR aarti hindi', 15).catch(() => []),
    searchByQuery('om meditation guided OR yoga nidra OR mantra chanting', 15).catch(() => []),
    searchByQuery('bhagavad gita chapter explanation hindi OR vedanta teaching', 15).catch(() => []),
    searchByQuery('sadhguru wisdom OR swami vivekananda OR sri sri ravi shankar', 15).catch(() => []),
  ]);

  return [
    { title: 'Featured', videos: featured, href: '/search?q=spiritual+wisdom' },
    { title: 'Bhajans', videos: bhajans, href: '/bhajans' },
    { title: 'Meditation', videos: meditation, href: '/meditation' },
    { title: 'Gita', videos: gita, href: '/gita' },
    { title: 'Wisdom', videos: talks, href: '/talks' },
  ];
}

export default async function HomePage() {
  const slides = await getCarouselSlides();
  const rails = await getRails();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div>
      {/* Greeting */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-lg font-bold text-ivory">{greeting}</h1>
      </div>

      {/* How are you feeling? */}
      <FeelingSelector />

      {/* 1:1 Carousel */}
      <HeroCarousel slides={slides} />

      {/* Guide me for — 2x2 grid of 4 problems + See all */}
      <div className="px-4 mt-6 mb-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-ivory">Guide me for</h2>
          <Link href="/help" className="flex items-center gap-0.5 text-[11px] text-saffron hover:text-saffron-deep font-medium transition-colors">
            See all <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {problemSolutions.slice(0, 4).map((sol) => (
            <Link
              key={sol.id}
              href={`/help/${sol.id}`}
              className="bg-temple border border-dusk rounded-xl p-3 text-center hover:border-saffron/30 transition-colors"
            >
              <span className="text-xl block mb-0.5">{sol.icon}</span>
              <span className="text-[11px] font-medium text-ivory block">{sol.problem}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Explore — 3x2 grid */}
      <div className="px-4 mb-5">
        <h2 className="text-sm font-semibold text-ivory mb-2">Explore</h2>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.id}`}
              className="bg-temple border border-dusk rounded-xl p-2.5 text-center hover:border-saffron/30 transition-colors"
            >
              <span className="text-lg block mb-0.5">{cat.icon}</span>
              <span className="text-[10px] font-medium text-ivory block">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Journeys — horizontal banners */}
      <div className="px-4 mb-5">
        <h2 className="text-sm font-semibold text-ivory mb-2">Journeys</h2>
        <div className="space-y-2">
          {journeyPaths.map((journey) => (
            <Link
              key={journey.id}
              href={`/journey/${journey.id}`}
              className="flex items-center gap-3 bg-temple border border-dusk rounded-xl p-3 hover:border-saffron/50 transition-colors"
            >
              <span className="text-2xl shrink-0">{journey.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-medium text-ivory">{journey.title}</h3>
                <p className="text-[10px] text-moon">{journey.steps.length} steps</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-moon shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Content Rails */}
      {rails.map((rail) => (
        <ContentRail key={rail.title} title={rail.title} videos={rail.videos} href={rail.href} />
      ))}
    </div>
  );
}
