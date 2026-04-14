import { problemSolutions } from '@/lib/problem-solutions';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-stone-800 mb-1">Find Spiritual Help</h1>
      <p className="text-sm text-stone-500 mb-6">Real problems. Real practices. Deep wisdom from ancient traditions.</p>

      <div className="space-y-3">
        {problemSolutions.map((sol) => (
          <Link
            key={sol.id}
            href={`/help/${sol.id}`}
            className="block bg-white rounded-xl border border-stone-200 p-4 hover:border-orange-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{sol.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-800">{sol.problem}</p>
                <p className="text-xs text-stone-500">{sol.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
