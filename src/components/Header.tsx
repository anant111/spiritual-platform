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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🕉️</span>
            <span className="text-xl font-bold text-orange-600">Shraddha</span>
          </a>
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or describe what you feel..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-stone-100 border border-stone-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none text-sm"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
