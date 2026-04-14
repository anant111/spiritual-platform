import { journeyPaths } from '@/lib/journey-paths';
import { searchByQuery } from '@/lib/youtube';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const levelLabels: Record<string, string> = {
  start: 'Start Here',
  practice: 'Practice',
  deepen: 'Deepen',
  master: 'Master',
};

const levelColors: Record<string, string> = {
  start: 'bg-green-100 text-green-700',
  practice: 'bg-blue-100 text-blue-700',
  deepen: 'bg-purple-100 text-purple-700',
  master: 'bg-amber-100 text-amber-700',
};

export default async function JourneyPage({ params }: { params: Promise<{ journeyId: string }> }) {
  const { journeyId } = await params;
  const journey = journeyPaths.find(j => j.id === journeyId);
  if (!journey) return <div className="p-8 text-center text-stone-500">Journey not found</div>;

  const stepVideos: any[] = [];
  for (const step of journey.steps) {
    try {
      const vids = await searchByQuery(step.youtubeQuery, 1);
      stepVideos.push(vids[0] || null);
    } catch {
      stepVideos.push(null);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/journey" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-orange-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> All Journeys
      </Link>

      <h1 className="text-xl font-bold text-stone-800 mb-1">{journey.title}</h1>
      <p className="text-sm text-stone-500 mb-8">{journey.description}</p>

      <div className="space-y-3">
        {journey.steps.map((step, i) => {
          const video = stepVideos[i];
          return (
            <div key={step.number} className="bg-white rounded-xl border border-stone-200 p-4">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${levelColors[step.level] || 'bg-stone-100 text-stone-700'}`}>
                    {levelLabels[step.level] || step.level}
                  </span>
                  <span className="text-lg font-bold text-stone-800 mt-2">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-stone-800">{step.title}</h3>
                  <p className="text-xs text-stone-500 mt-1">{step.description}</p>

                  {video && (
                    <Link
                      href={`/watch/${video.id}`}
                      className="mt-3 flex items-center gap-1 text-xs text-orange-600 font-medium hover:text-orange-700"
                    >
                      Watch → <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {journey.steps.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mt-6 text-center">
          <p className="text-sm text-amber-800 font-medium">Complete all steps to go deep in this practice</p>
          <p className="text-xs text-stone-600 mt-1">A true spiritual journey takes time. One step at a time.</p>
        </div>
      )}
    </div>
  );
}
