import { journeyPaths } from '@/lib/journey-paths';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function JourneysPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-lg font-bold text-ivory mb-1">Journeys</h1>
      <p className="text-xs text-stone mb-5">Step-by-step paths to go deeper.</p>

      <div className="space-y-2">
        {journeyPaths.map((journey) => (
          <Link
            key={journey.id}
            href={`/journey/${journey.id}`}
            className="flex items-center justify-between bg-temple border border-dusk rounded-xl p-3 hover:border-saffron/50 transition-colors"
          >
            <div>
              <h2 className="text-sm font-medium text-ivory">{journey.title}</h2>
              <p className="text-[11px] text-moon">{journey.steps.length} steps</p>
            </div>
            <ArrowRight className="w-4 h-4 text-moon" />
          </Link>
        ))}
      </div>
    </div>
  );
}
