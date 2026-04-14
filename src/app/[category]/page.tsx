import { categories } from '@/lib/categories';
import { ContentRail } from '@/components/ContentRail';
import { searchByQuery } from '@/lib/youtube';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) return <div className="p-8 text-center text-stone">Not found</div>;

  let videos: any[] = [];
  try { videos = await searchByQuery(cat.youtubeQuery, 20); } catch {}

  const rail1 = videos.slice(0, 10);
  const rail2 = videos.slice(10, 20);

  return (
    <div className="pb-4">
      <div className="px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-moon hover:text-ivory transition-colors mb-2">
          <ArrowLeft className="w-3 h-3" /> Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{cat.icon}</span>
          <div>
            <h1 className="text-lg font-bold text-ivory">{cat.name}</h1>
            <p className="text-xs text-stone">{cat.description}</p>
          </div>
        </div>
      </div>

      <ContentRail title="Popular" videos={rail1} />
      {rail2.length > 0 && <ContentRail title="More" videos={rail2} />}
    </div>
  );
}
