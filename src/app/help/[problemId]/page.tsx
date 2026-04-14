import { problemSolutions } from '@/lib/problem-solutions';
import { searchByQuery } from '@/lib/youtube';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default async function ProblemPage({ params }: { params: Promise<{ problemId: string }> }) {
  const { problemId } = await params;
  const sol = problemSolutions.find(s => s.id === problemId);
  if (!sol) return <div className="p-8 text-center text-stone">Not found</div>;

  let videos: any[] = [];
  try { videos = await searchByQuery(sol.youtubeQuery, 4); } catch {}

  const currentIndex = problemSolutions.findIndex(s => s.id === problemId);
  const nextSol = problemSolutions[(currentIndex + 1) % problemSolutions.length];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/help" className="inline-flex items-center gap-1 text-xs text-moon hover:text-ivory transition-colors mb-5">
        <ArrowLeft className="w-3 h-3" /> Back
      </Link>

      <div className="mb-6">
        <span className="text-2xl block mb-1">{sol.icon}</span>
        <h1 className="text-lg font-bold text-ivory">{sol.problem}</h1>
        <p className="text-xs text-stone mt-1">{sol.description}</p>
      </div>

      <section className="bg-temple border border-dusk rounded-xl p-4 mb-4">
        <h2 className="text-xs font-semibold text-saffron mb-2">Tradition teaches</h2>
        <p className="text-xs text-stone leading-relaxed">{sol.traditionContext}</p>
      </section>

      <section className="bg-temple border border-dusk rounded-xl p-4 mb-4">
        <h2 className="text-xs font-semibold text-ivory mb-1">Practice: {sol.practice}</h2>
        <ol className="space-y-2 mt-3">
          {sol.practiceSteps.map((step, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="w-5 h-5 rounded-full bg-saffron/20 text-saffron text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <p className="text-xs text-stone">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {videos.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-semibold text-ivory mb-2">Guided session</h2>
          <div className="aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videos[0].id}?rel=0&modestbranding=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {videos.length > 1 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {videos.slice(1).map((v: any) => (
                <Link key={v.id} href={`/watch/${v.id}`} className="group block">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <p className="text-[10px] font-medium text-ivory line-clamp-2 mt-1">{v.title}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="bg-temple border border-dusk rounded-xl p-3 mb-4">
        <p className="text-xs text-ivory font-medium">After this practice</p>
        <p className="text-[11px] text-moon">Sit quietly for 2 minutes. Notice what changed inside.</p>
      </div>

      <Link
        href={`/help/${nextSol.id}`}
        className="flex items-center justify-between bg-temple border border-dusk rounded-xl p-3 hover:border-saffron/50 transition-colors"
      >
        <div>
          <p className="text-[10px] text-moon">Next</p>
          <p className="text-xs font-medium text-ivory">{nextSol.icon} {nextSol.problem}</p>
        </div>
        <ArrowRight className="w-3 h-3 text-moon" />
      </Link>
    </div>
  );
}
