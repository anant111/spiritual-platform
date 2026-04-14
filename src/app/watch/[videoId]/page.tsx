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

        <div className="px-4 py-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-1 text-moon hover:text-ivory transition-colors text-xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>
            <ShareButton url={`/watch/${videoId}`} label="Share" />
          </div>

          <div className="bg-temple border border-dusk rounded-xl p-3 mb-5">
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle className="w-3.5 h-3.5 text-third-eye" />
              <h3 className="text-xs font-semibold text-ivory">What did this mean for you?</h3>
            </div>
            <p className="text-[11px] text-moon">Write one thought, feeling, or question that arose.</p>
            <span className="text-[11px] text-third-eye font-medium">Write a reflection →</span>
          </div>

          {nextVideos.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-ivory mb-2">Continue</h3>
              <div className="grid grid-cols-3 gap-2">
                {nextVideos.map((v: any) => (
                  <Link key={v.id} href={`/watch/${v.id}`} className="group block">
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <p className="text-[11px] font-medium text-ivory line-clamp-2 mt-1 group-hover:text-saffron transition-colors">{v.title}</p>
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
