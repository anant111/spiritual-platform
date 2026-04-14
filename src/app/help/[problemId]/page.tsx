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
      <Link href="/help" className="inline-flex items-center gap-1 text-sm text-moon hover:text-ivory transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to all problems
      </Link>

      <div className="mb-8">
        <span className="text-3xl block mb-2">{sol.icon}</span>
        <h1 className="text-xl font-bold text-ivory">{sol.problem}</h1>
        <p className="text-sm text-stone mt-2">{sol.description}</p>
      </div>

      <section className="bg-temple border border-dusk rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-saffron mb-2">What the tradition teaches</h2>
        <p className="text-sm text-stone leading-relaxed">{sol.traditionContext}</p>
      </section>

      <section className="bg-temple border border-dusk rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-ivory mb-1">Try this practice</h2>
        <p className="text-sm text-saffron font-medium mb-4">{sol.practice}</p>
        <ol className="space-y-3">
          {sol.practiceSteps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-saffron/20 text-saffron text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <p className="text-sm text-stone">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {videos.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-ivory mb-3">Guided session</h2>
          <div className="aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videos[0].id}?rel=0&modestbranding=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {videos.length > 1 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {videos.slice(1).map((v: any) => (
                <Link key={v.id} href={`/watch/${v.id}`} className="group block">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <p className="text-xs font-medium text-ivory line-clamp-2 mt-1">{v.title}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="bg-temple border border-dusk rounded-xl p-4 mb-6">
        <p className="text-sm text-ivory font-medium mb-1">After trying this practice</p>
        <p className="text-xs text-stone">Sit quietly for 2 minutes. Notice what changed inside you. Even a small shift is progress.</p>
      </div>

      <Link
        href={`/help/${nextSol.id}`}
        className="flex items-center justify-between bg-temple border border-dusk rounded-xl p-4 hover:border-saffron/50 transition-colors"
      >
        <div>
          <p className="text-xs text-moon">Next explore</p>
          <p className="text-sm font-semibold text-ivory">{nextSol.icon} {nextSol.problem}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-moon" />
      </Link>
    </div>
  );
}
