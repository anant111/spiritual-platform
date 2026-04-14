import { problemSolutions } from '@/lib/problem-solutions';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-lg font-bold text-ivory mb-1">Spiritual Help</h1>
      <p className="text-xs text-stone mb-5">Ancient practices for real problems.</p>

      <div className="space-y-2">
        {problemSolutions.map((sol) => (
          <Link
            key={sol.id}
            href={`/help/${sol.id}`}
            className="flex items-center gap-3 bg-temple border border-dusk rounded-xl p-3 hover:border-saffron/50 transition-colors"
          >
            <span className="text-xl shrink-0">{sol.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ivory">{sol.problem}</p>
              <p className="text-[11px] text-moon truncate">{sol.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-moon shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
