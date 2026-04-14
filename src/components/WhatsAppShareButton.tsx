'use client';

import { Share2 } from 'lucide-react';

export function WhatsAppShareButton({ url, label }: { url: string; label: string }) {
  return (
    <button
      onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank')}
      className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm"
    >
      <Share2 className="w-4 h-4" /> {label}
    </button>
  );
}
