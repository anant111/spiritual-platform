import { VideoCard } from './VideoCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  title: string;
  videos: any[];
  href?: string;
}

export function ContentRail({ title, videos, href }: Props) {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between px-4 mb-2">
        <h2 className="text-sm font-semibold text-ivory">{title}</h2>
        {href && (
          <Link href={href} className="flex items-center gap-0.5 text-[11px] text-saffron hover:text-saffron-deep font-medium transition-colors">
            See all <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        )}
      </div>
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-4 scroll-smooth snap-x snap-mandatory pb-1">
        {videos.map((video: any) => (
          <div key={video.id} className="snap-start shrink-0 w-[130px]">
            <VideoCard video={video} variant="square" />
          </div>
        ))}
      </div>
    </section>
  );
}
