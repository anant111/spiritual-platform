'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Slide {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeQuery: string;
  icon: string;
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
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    <div className="relative w-full">
      <div className="aspect-square w-full overflow-hidden">
        <Link href={`/search?q=${encodeURIComponent(slide.youtubeQuery)}`} className="block w-full h-full relative group">
          <img
            src={slide.thumbnail || ''}
            alt={slide.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="text-3xl block mb-2">{slide.icon}</span>
            <h2 className="text-xl font-bold text-ivory mb-1">{slide.title}</h2>
            <p className="text-sm text-stone">{slide.description}</p>
          </div>
        </Link>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-saffron w-4' : 'bg-ivory/30'}`}
          />
        ))}
      </div>
    </div>
  );
}
