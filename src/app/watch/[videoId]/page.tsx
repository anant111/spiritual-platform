import { ArrowLeft, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { searchByQuery } from '@/lib/youtube';
import { ShareButton } from '@/components/WhatsAppShareButton';

export default async function WatchPage({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = await params;

  let nextVideos: any[] = [];
  try {
    nextVideos = await searchByQuery('bhagavad gita teaching OR hanuman chalisa OR om meditation OR spiritual wisdom india', 6);
  } catch {}

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #site-header, #bottom-nav, #site-footer { display: none !important; }
        #main-content { padding-bottom: 0 !important; }
      `}} />
      <div className="min-h-screen bg-void">
        {/* Edge-to-edge player */}
        <div className="w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Content below player */}
        <div className="px-4 py-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-1 text-moon hover:text-ivory transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <ShareButton url={`/watch/${videoId}`} label="Share" />
          </div>

          {/* Reflection */}
          <div className="bg-temple border border-dusk rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-third-eye" />
              <h3 className="text-sm font-semibold text-ivory">What did this teaching mean for you?</h3>
            </div>
            <p className="text-xs text-stone mb-2">Take a moment. Write one thought, one feeling, or one question that arose.</p>
            <span className="text-xs text-third-eye font-medium">Write a reflection →</span>
          </div>

          {/* Next Steps */}
          {nextVideos.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-ivory mb-3">Continue your journey</h3>
              <div className="grid grid-cols-3 gap-2">
                {nextVideos.map((v: any) => (
                  <Link
                    key={v.id}
                    href={`/watch/${v.id}`}
                    className="group block"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs font-medium text-ivory line-clamp-2 mt-1.5 group-hover:text-saffron transition-colors">{v.title}</p>
                    <p className="text-[10px] text-moon mt-0.5">{v.channelTitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
