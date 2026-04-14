import Link from 'next/link';

interface Props {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    duration: string;
    viewCount: string;
    category?: string;
  };
  variant?: 'square' | 'landscape';
}

export function VideoCard({ video, variant = 'square' }: Props) {
  return (
    <Link href={`/watch/${video.id}`} className="group block">
      <div className={`relative overflow-hidden rounded-lg ${variant === 'square' ? 'aspect-square' : 'aspect-video'}`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {video.duration && (
          <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
            {video.duration}
          </span>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium text-ivory line-clamp-2 leading-snug group-hover:text-saffron transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-moon mt-1">{video.channelTitle}</p>
      </div>
    </Link>
  );
}
