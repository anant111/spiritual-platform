import { categories } from '@/lib/categories';
import { spiritualNeeds } from '@/lib/spiritual-needs';
import { problemSolutions } from '@/lib/problem-solutions';
import { journeyPaths } from '@/lib/journey-paths';
import { ContentRail } from '@/components/ContentRail';
import { HeroCarousel } from '@/components/HeroCarousel';
import { searchByQuery } from '@/lib/youtube';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

async function getCarouselSlides() {
  const slides = [];
  for (const need of spiritualNeeds) {
    let thumbnail = '';
    try {
      const videos = await searchByQuery(need.youtubeQuery, 1);
      if (videos[0]) thumbnail = videos[0].thumbnail;
    } catch {}
    slides.push({
      id: need.id,
      title: need.title,
      description: need.description,
      thumbnail,
      youtubeQuery: need.youtubeQuery,
      icon: need.icon,
    });
  }
  return slides;
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
      {/* Hero Carousel */}
      <HeroCarousel slides={slides} />

      {/* Greeting */}
      <div className="px-4 mt-5 mb-3">
        <h1 className="text-lg font-bold text-ivory">{greeting}</h1>
      </div>

      {/* Quick Intent */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 mb-6">
        {spiritualNeeds.map((need) => (
          <Link
            key={need.id}
            href={`/search?q=${encodeURIComponent(need.youtubeQuery)}`}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-temple border border-dusk rounded-full text-xs font-medium text-ivory hover:border-saffron hover:text-saffron transition-colors"
          >
            <span>{need.icon}</span> {need.title}
          </Link>
        ))}
      </div>

      {/* Find Help */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-ivory mb-2">Need help?</h2>
        <div className="grid grid-cols-1 gap-2">
          {problemSolutions.slice(0, 3).map((sol) => (
            <Link
              key={sol.id}
              href={`/help/${sol.id}`}
              className="flex items-center gap-3 bg-temple border border-dusk rounded-xl p-3 hover:border-saffron/50 transition-colors"
            >
              <span className="text-xl shrink-0">{sol.icon}</span>
              <p className="text-sm font-medium text-ivory flex-1">{sol.problem}</p>
              <ArrowRight className="w-4 h-4 text-moon shrink-0" />
            </Link>
          ))}
        </div>
        <Link href="/help" className="flex items-center gap-1 text-xs text-saffron mt-2 hover:text-saffron-deep font-medium">
          See all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-ivory mb-2">Explore</h2>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.id}`}
              className="bg-temple border border-dusk rounded-xl p-3 text-center hover:border-saffron/30 transition-colors"
            >
              <span className="text-xl block mb-0.5">{cat.icon}</span>
              <span className="text-[11px] font-medium text-ivory block">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Journeys */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-ivory mb-2">Journeys</h2>
        <div className="space-y-2">
          {journeyPaths.map((journey) => (
            <Link
              key={journey.id}
              href={`/journey/${journey.id}`}
              className="flex items-center justify-between bg-temple border border-dusk rounded-xl p-3 hover:border-saffron/50 transition-colors"
            >
              <div>
                <h3 className="text-sm font-medium text-ivory">{journey.title}</h3>
                <p className="text-[11px] text-moon">{journey.steps.length} steps</p>
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
