import { problemSolutions } from '@/lib/problem-solutions';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-ivory mb-1">Find Spiritual Help</h1>
      <p className="text-sm text-stone mb-6">Real problems. Real practices. Deep wisdom from ancient traditions.</p>

      <div className="space-y-2">
        {problemSolutions.map((sol) => (
          <Link
            key={sol.id}
            href={`/help/${sol.id}`}
            className="flex items-center gap-3 bg-temple border border-dusk rounded-xl p-4 hover:border-saffron/50 transition-colors"
          >
            <span className="text-2xl shrink-0">{sol.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ivory">{sol.problem}</p>
              <p className="text-xs text-moon truncate">{sol.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-moon shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
