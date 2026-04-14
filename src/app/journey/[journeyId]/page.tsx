import { journeyPaths } from '@/lib/journey-paths';
import { searchByQuery } from '@/lib/youtube';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const levelLabels: Record<string, string> = {
  start: 'Start',
  practice: 'Practice',
  deepen: 'Deepen',
  master: 'Master',
};

const levelColors: Record<string, string> = {
  start: 'bg-sage/20 text-sage',
  practice: 'bg-celestial/20 text-celestial',
  deepen: 'bg-third-eye/20 text-third-eye',
  master: 'bg-saffron/20 text-saffron',
};

export default async function JourneyPage({ params }: { params: Promise<{ journeyId: string }> }) {
  const { journeyId } = await params;
  const journey = journeyPaths.find(j => j.id === journeyId);
  if (!journey) return <div className="p-8 text-center text-stone">Not found</div>;

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
      <Link href="/journey" className="inline-flex items-center gap-1 text-xs text-moon hover:text-ivory transition-colors mb-5">
        <ArrowLeft className="w-3 h-3" /> All Journeys
      </Link>

      <h1 className="text-lg font-bold text-ivory mb-1">{journey.title}</h1>
      <p className="text-xs text-stone mb-6">{journey.description}</p>

      <div className="space-y-2">
        {journey.steps.map((step, i) => {
          const video = stepVideos[i];
          return (
            <div key={step.number} className="bg-temple border border-dusk rounded-xl p-3">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${levelColors[step.level] || 'bg-dusk text-stone'}`}>
                    {levelLabels[step.level] || step.level}
                  </span>
                  <span className="text-base font-bold text-ivory mt-1">{step.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-ivory">{step.title}</h3>
                  <p className="text-[11px] text-moon mt-0.5">{step.description}</p>
                  {video && (
                    <Link href={`/watch/${video.id}`} className="mt-2 flex items-center gap-1 text-[11px] text-saffron font-medium hover:text-saffron-deep transition-colors">
                      Watch <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-temple border border-dusk rounded-xl p-3 mt-4 text-center">
        <p className="text-xs text-saffron font-medium">Complete all steps to deepen this practice</p>
      </div>
    </div>
  );
}
