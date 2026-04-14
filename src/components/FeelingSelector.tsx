'use client';

import { useState } from 'react';
import { feelings } from '@/lib/feelings';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export function FeelingSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const selectedFeeling = feelings.find(f => f.id === selected);

  if (selectedFeeling) {
    return (
      <div className="px-4 mb-6">
        <p className="text-xs text-stone mb-2">What&apos;s behind this feeling?</p>
        <div className="space-y-1.5">
          {selectedFeeling.causes.map((cause) => (
            <button
              key={cause.id}
              onClick={() => router.push(`/feeling/${selectedFeeling.id}?cause=${cause.id}`)}
              className="w-full flex items-center justify-between bg-temple border border-dusk rounded-lg px-3 py-2.5 text-left hover:border-saffron/50 transition-colors"
            >
              <span className="text-xs text-ivory">{cause.label}</span>
              <ArrowRight className="w-3 h-3 text-moon" />
            </button>
          ))}
        </div>
        <button
          onClick={() => router.push(`/feeling/${selectedFeeling.id}`)}
          className="w-full mt-2 bg-saffron/10 border border-saffron/30 rounded-lg px-3 py-2.5 text-center text-xs font-medium text-saffron hover:bg-saffron/20 transition-colors"
        >
          Watch now
        </button>
        <button
          onClick={() => setSelected(null)}
          className="w-full mt-2 text-[11px] text-moon text-center hover:text-ivory transition-colors"
        >
          Change feeling
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 mb-6">
      <p className="text-xs text-stone mb-2">How are you feeling?</p>
      <div className="grid grid-cols-3 gap-1.5">
        {feelings.map((feeling) => (
          <button
            key={feeling.id}
            onClick={() => setSelected(feeling.id)}
            className="flex flex-col items-center gap-0.5 bg-temple border border-dusk rounded-lg py-3 hover:border-saffron/50 transition-colors"
          >
            <span className="text-lg">{feeling.emoji}</span>
            <span className="text-[10px] text-ivory font-medium">{feeling.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
