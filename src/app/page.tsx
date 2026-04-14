import { categories } from '@/lib/categories';
import { spiritualNeeds } from '@/lib/spiritual-needs';
import { problemSolutions } from '@/lib/problem-solutions';
import { journeyPaths } from '@/lib/journey-paths';
import { VideoCard } from '@/components/VideoCard';
import { ContentRail } from '@/components/ContentRail';
import { HeroCarousel } from '@/components/HeroCarousel';
import { searchByQuery } from '@/lib/youtube';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

async function getCarouselSlides() {
  return spiritualNeeds.map((need) => ({
    id: need.id,
    title: need.title,
    description: need.description,
    thumbnail: '',
    youtubeQuery: need.youtubeQuery,
    icon: need.icon,
  }));
}

async function getRails() {
  const [featured, bhajans, meditation, gita, talks] = await Promise.all([
    searchByQuery('spiritual wisdom morning peace devotion', 15).catch(() => []),
    searchByQuery('hanuman chalisa krishna bhajan devotional', 15).catch(() => []),
    searchByQuery('guided meditation om chanting mantra', 15).catch(() => []),
    searchByQuery('bhagavad gita chapter explained vedanta', 15).catch(() => []),
    searchByQuery('sadhguru spiritual wisdom life guidance', 15).catch(() => []),
  ]);

  return [
    { title: 'Featured for You', videos: featured, href: '/search?q=spiritual+wisdom' },
    { title: 'Bhajans & Devotion', videos: bhajans, href: '/bhajans' },
    { title: 'Meditation & Mantra', videos: meditation, href: '/meditation' },
    { title: 'Gita & Vedic Wisdom', videos: gita, href: '/gita' },
    { title: 'Guru Wisdom', videos: talks, href: '/talks' },
  ];
}

export default async function HomePage() {
  const slides = await getCarouselSlides();
  const rails = await getRails();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div>
      {/* Hero Carousel — edge to edge */}
      <HeroCarousel slides={slides} />

      {/* Greeting */}
      <div className="px-4 mt-6 mb-4">
        <h1 className="text-xl font-bold text-ivory">{greeting}</h1>
        <p className="text-sm text-stone mt-0.5">Where would you like your journey to go today?</p>
      </div>

      {/* Quick Intent Buttons */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 mb-8">
        {spiritualNeeds.map((need) => (
          <Link
            key={need.id}
            href={`/search?q=${encodeURIComponent(need.youtubeQuery)}`}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-temple border border-dusk rounded-full text-sm font-medium text-ivory hover:border-saffron hover:text-saffron transition-colors"
          >
            <span>{need.icon}</span> {need.title}
          </Link>
        ))}
      </div>

      {/* Find Help */}
      <div className="px-4 mb-8">
        <h2 className="text-base font-semibold text-ivory mb-3">Find spiritual help</h2>
        <div className="grid grid-cols-1 gap-2">
          {problemSolutions.slice(0, 3).map((sol) => (
            <Link
              key={sol.id}
              href={`/help/${sol.id}`}
              className="flex items-center gap-3 bg-temple border border-dusk rounded-xl p-3 hover:border-saffron/50 transition-colors"
            >
              <span className="text-2xl shrink-0">{sol.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ivory">{sol.problem}</p>
                <p className="text-xs text-moon truncate">{sol.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-moon shrink-0" />
            </Link>
          ))}
        </div>
        <Link href="/help" className="flex items-center gap-1 text-xs text-saffron mt-2 hover:text-saffron-deep font-medium">
          See all problems <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Category Grid */}
      <div className="px-4 mb-8">
        <h2 className="text-base font-semibold text-ivory mb-3">Explore</h2>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.id}`}
              className="bg-temple border border-dusk rounded-xl p-4 text-center hover:border-saffron/30 transition-colors"
            >
              <span className="text-2xl block mb-1">{cat.icon}</span>
              <span className="text-xs font-semibold text-ivory block">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Journeys */}
      <div className="px-4 mb-8">
        <h2 className="text-base font-semibold text-ivory mb-3">Start a Journey</h2>
        <div className="space-y-2">
          {journeyPaths.map((journey) => (
            <Link
              key={journey.id}
              href={`/journey/${journey.id}`}
              className="flex items-center justify-between bg-temple border border-dusk rounded-xl p-4 hover:border-saffron/50 transition-colors"
            >
              <div>
                <h3 className="text-sm font-semibold text-ivory">{journey.title}</h3>
                <p className="text-xs text-moon mt-0.5">{journey.steps.length} steps</p>
              </div>
              <ArrowRight className="w-4 h-4 text-moon" />
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
