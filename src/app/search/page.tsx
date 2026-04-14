import { searchByQuery } from '@/lib/youtube';
import { ContentRail } from '@/components/ContentRail';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: query } = await searchParams;
  let videos: any[] = [];

  if (query) {
    try { videos = await searchByQuery(query, 20); } catch {}
  }

  return (
    <div className="py-4">
      {query ? (
        <ContentRail title={`Results for "${query}"`} videos={videos} />
      ) : (
        <div className="px-4 py-12 text-center">
          <p className="text-stone">Search for content that resonates with you</p>
        </div>
      )}
    </div>
  );
}
