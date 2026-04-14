import Link from 'next/link';

interface Props {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    duration: string;
    viewCount: string;
  };
  variant?: 'square' | 'landscape' | 'portrait';
}

const aspectMap = {
  square: 'aspect-square',
  landscape: 'aspect-[3/2]',
  portrait: 'aspect-[4/5]',
};

export function VideoCard({ video, variant = 'square' }: Props) {
  return (
    <Link href={`/watch/${video.id}`} className="group block">
      <div className={`relative overflow-hidden rounded-lg ${aspectMap[variant]}`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {video.duration && (
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 py-0.5 rounded font-medium">
            {video.duration}
          </span>
        )}
      </div>
      {variant !== 'portrait' && (
        <div className="mt-1.5">
          <h3 className="text-[11px] font-medium text-ivory line-clamp-2 leading-snug group-hover:text-saffron transition-colors">
            {video.title}
          </h3>
          <p className="text-[10px] text-moon mt-0.5">{video.channelTitle}</p>
        </div>
      )}
    </Link>
  );
}
