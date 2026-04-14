'use client';

import { Share2 } from 'lucide-react';

export function ShareButton({ url, label }: { url: string; label?: string }) {
  const shareUrl = url.startsWith('http') ? url : `https://spiritual-platform-seven.vercel.app${url}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shraddha — Your Spiritual Journey',
          url: shareUrl,
        });
      } catch {}
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, '_blank');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-altar text-saffron rounded-lg hover:bg-dusk transition-colors text-sm font-medium"
    >
      <Share2 className="w-4 h-4" /> {label || 'Share'}
    </button>
  );
}
