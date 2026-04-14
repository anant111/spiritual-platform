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
        <p className="text-stone-500 mt-1 text-sm">Where would you like your journey to go today?</p>
      </section>

      {/* Intent Selector */}
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

      {/* Problem-Solver */}
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

      {/* Journey Paths */}
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
