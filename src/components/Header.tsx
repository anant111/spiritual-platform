'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header id="site-header" className="sticky top-0 z-40 bg-void/95 backdrop-blur-md border-b border-dusk">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🕉️</span>
            <span className="text-xl font-bold text-saffron">Shraddha</span>
          </a>
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-moon" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or describe what you feel..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-temple border border-dusk focus:border-saffron focus:ring-1 focus:ring-saffron outline-none text-sm text-ivory placeholder:text-moon"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
