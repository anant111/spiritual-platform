import { searchByQuery } from '@/lib/youtube';
import { VideoCard } from '@/components/VideoCard';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: query } = await searchParams;
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
