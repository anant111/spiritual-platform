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
    <section className="mb-8">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-base font-semibold text-ivory">{title}</h2>
        {href && (
          <Link href={href} className="flex items-center gap-1 text-xs text-saffron hover:text-saffron-deep font-medium transition-colors">
            See all <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 scroll-smooth snap-x snap-mandatory pb-1">
        {videos.map((video: any) => (
          <div key={video.id} className="snap-start shrink-0 w-[140px]">
            <VideoCard video={video} variant="square" />
          </div>
        ))}
      </div>
    </section>
  );
}
