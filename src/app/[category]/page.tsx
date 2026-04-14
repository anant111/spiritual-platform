import { categories } from '@/lib/categories';
import { journeyPaths } from '@/lib/journey-paths';
import { VideoCard } from '@/components/VideoCard';
import { searchByQuery } from '@/lib/youtube';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) return <div className="p-8 text-center text-stone-500">Category not found</div>;

  let videos: any[] = [];
  try { videos = await searchByQuery(cat.youtubeQuery, 12); } catch {}

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
