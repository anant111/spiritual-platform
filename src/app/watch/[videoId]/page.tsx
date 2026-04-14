import { ArrowLeft, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { searchByQuery } from '@/lib/youtube';
import { WhatsAppShareButton } from '@/components/WhatsAppShareButton';

export default async function WatchPage({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = await params;

  let nextVideos: any[] = [];
  try {
    nextVideos = await searchByQuery('bhagavad gita next chapter OR meditation deeper OR spiritual wisdom continuation', 3);
  } catch {}

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-orange-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="aspect-video rounded-xl overflow-hidden bg-black mb-4">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex gap-3 mb-6">
        <WhatsAppShareButton url={`https://youtube.com/watch?v=${videoId}`} label="Share on WhatsApp" />
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-semibold text-purple-800">What did this teaching mean for you?</h3>
        </div>
        <p className="text-xs text-stone-600 mb-3">Take a moment. Write one thought, one feeling, or one question that arose.</p>
        <span className="text-xs text-purple-600 font-medium">
          Write a reflection →
        </span>
      </div>

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
