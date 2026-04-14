'use client';

import { usePathname } from 'next/navigation';
import { Home, BookOpen, HelpCircle, Layers, Search } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/journey', icon: Layers, label: 'Journeys' },
    { href: '/help', icon: HelpCircle, label: 'Help' },
    { href: '/gita', icon: BookOpen, label: 'Gita' },
  ];

  return (
    <nav id="bottom-nav" className="fixed bottom-0 left-0 right-0 bg-void/95 backdrop-blur-md border-t border-dusk md:hidden z-50">
      <div className="flex justify-around py-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <a key={link.href} href={link.href} className={`flex flex-col items-center gap-0.5 py-1 px-3 transition-colors ${isActive ? 'text-saffron' : 'text-moon hover:text-ivory'}`}>
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{link.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
