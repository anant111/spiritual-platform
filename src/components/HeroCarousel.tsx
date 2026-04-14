'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Slide {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
}

interface Props {
  slides: Slide[];
}

export function HeroCarousel({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (!slides.length) return null;
  const slide = slides[current];

  return (
    <div className="relative w-full px-4">
      <Link href={`/watch/${slide.videoId}`} className="block w-full relative group">
        <div className="aspect-square w-full overflow-hidden rounded-2xl">
          <img
            src={slide.thumbnail}
            alt={slide.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h2 className="text-sm font-semibold text-ivory line-clamp-2">{slide.title}</h2>
        </div>
      </Link>
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); setCurrent(i); }}
            className={`w-1 h-1 rounded-full transition-all ${i === current ? 'bg-saffron w-3' : 'bg-ivory/30'}`}
          />
        ))}
      </div>
    </div>
  );
}
