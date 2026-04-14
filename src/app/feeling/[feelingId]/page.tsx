import { feelings } from '@/lib/feelings';
import { searchByQuery } from '@/lib/youtube';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function FeelingPage({ params, searchParams }: { params: Promise<{ feelingId: string }>; searchParams: Promise<{ cause?: string }> }) {
  const { feelingId } = await params;
  const { cause } = await searchParams;
  
  const feeling = feelings.find(f => f.id === feelingId);
  if (!feeling) return <div className="p-8 text-center text-stone">Not found</div>;

  const causeData = cause ? feeling.causes.find(c => c.id === cause) : null;
  const query = causeData?.youtubeQuery || feeling.youtubeQuery;

  let videos: any[] = [];
  try { videos = await searchByQuery(query, 20); } catch {}

  return (
    <div>
      <div className="px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-moon hover:text-ivory transition-colors mb-3">
          <ArrowLeft className="w-3 h-3" /> Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{feeling.emoji}</span>
          <h1 className="text-lg font-bold text-ivory">{feeling.label}</h1>
        </div>
        {causeData && <p className="text-xs text-stone mt-0.5">{causeData.label}</p>}
      </div>

      <div className="px-4">
        <div className="grid grid-cols-2 gap-2">
          {videos.map((v: any) => (
            <Link key={v.id} href={`/watch/${v.id}`} className="group block">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                {v.duration && (
                  <span className="relative -mt-5 ml-auto mr-1 block w-fit bg-black/80 text-white text-[9px] px-1 py-0.5 rounded font-medium">{v.duration}</span>
                )}
              </div>
              <p className="text-[11px] font-medium text-ivory line-clamp-2 mt-1 group-hover:text-saffron transition-colors">{v.title}</p>
              <p className="text-[10px] text-moon">{v.channelTitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
