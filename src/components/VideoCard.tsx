'use client';

import { ArrowRight, Share2 } from 'lucide-react';
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
}

export function VideoCard({ video }: Props) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/watch/${video.id}`} className="relative block aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
            {video.duration}
          </span>
        )}
      </Link>

      <div className="p-3">
        <Link href={`/watch/${video.id}`}>
          <h3 className="text-sm font-medium text-stone-800 line-clamp-2 mb-1 hover:text-orange-600">
            {video.title}
          </h3>
        </Link>
        <p className="text-xs text-stone-500">{video.channelTitle}</p>
        {video.viewCount && <p className="text-xs text-stone-400">{video.viewCount}</p>}

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
          <Link
            href={`/watch/${video.id}`}
            className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-medium"
          >
            <ArrowRight className="w-3 h-3" /> Continue →
          </Link>
          <button
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(video.title + '\nhttps://youtube.com/watch?v=' + video.id)}`, '_blank')}
            className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
          >
            <Share2 className="w-3 h-3" /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
