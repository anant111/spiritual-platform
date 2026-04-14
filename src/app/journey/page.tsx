import { journeyPaths } from '@/lib/journey-paths';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function JourneysPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-stone-800 mb-1">Spiritual Journeys</h1>
      <p className="text-sm text-stone-500 mb-6">Step-by-step paths to go deeper in your practice.</p>

      <div className="space-y-4">
        {journeyPaths.map((journey) => (
          <Link
            key={journey.id}
            href={`/journey/${journey.id}`}
            className="block bg-white rounded-xl border border-stone-200 p-5 hover:border-orange-300 hover:shadow-sm transition-all"
          >
            <h2 className="text-base font-semibold text-stone-800">{journey.title}</h2>
            <p className="text-sm text-stone-500 mt-1">{journey.description}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-orange-600 font-medium">
              {journey.steps.length} steps <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
