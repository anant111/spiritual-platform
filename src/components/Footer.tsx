const blessings = [
  '"May all beings be happy." — Brihadaranyaka Upanishad',
  '"Yoga is the journey of the self, through the self, to the self." — Bhagavad Gita',
  '"The mind can be controlled through practice and detachment." — Gita 6.35',
  '"When meditation is mastered, the mind is unwavering." — Gita 6.19',
  '"From darkness, lead me to light." — Brihadaranyaka Upanishad',
];

export function Footer() {
  const today = new Date().getDate();
  const blessing = blessings[today % blessings.length];

  return (
    <footer id="site-footer" className="bg-temple border-t border-dusk py-6 mt-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-altar/50 rounded-xl p-3 mb-4 border border-dusk">
          <p className="text-xs text-stone text-center italic">{blessing}</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-ivory">🕉️ Shraddha</p>
          </div>
          <p className="text-[10px] text-moon">Videos from YouTube. Made with devotion.</p>
        </div>
      </div>
    </footer>
  );
}
