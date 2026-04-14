const blessings = [
  '"May all beings be happy. May all beings be free from illness." — Brihadaranyaka Upanishad',
  '"Yoga is the journey of the self, through the self, to the self." — Bhagavad Gita',
  '"The mind is restless, but with practice, it can be controlled." — Bhagavad Gita 6.35',
  '"When meditation is mastered, the mind is unwavering like a lamp in a windless place." — Bhagavad Gita 6.19',
  '"From untruth lead me to truth. From darkness lead me to light. From death lead me to immortality." — Brihadaranyaka Upanishad',
];

export function Footer() {
  const today = new Date().getDate();
  const blessing = blessings[today % blessings.length];

  return (
    <footer id="site-footer" className="bg-temple border-t border-dusk py-8 mt-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-altar/50 rounded-xl p-4 mb-6 border border-dusk">
          <p className="text-sm text-stone text-center italic">{blessing}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-lg font-semibold text-ivory">🕉️ Shraddha</p>
            <p className="text-xs text-moon mt-1">Your Spiritual Journey</p>
          </div>
          <div className="text-center text-xs text-moon">
            <p>All videos embedded from YouTube. Copyright belongs to original creators.</p>
            <p className="mt-1">Made with devotion for seekers everywhere.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
