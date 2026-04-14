import { Home, BookOpen, HelpCircle, Layers, Search } from 'lucide-react';

export function BottomNav() {
  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/journey', icon: Layers, label: 'Journeys' },
    { href: '/help', icon: HelpCircle, label: 'Help' },
    { href: '/gita', icon: BookOpen, label: 'Gita' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 md:hidden z-50">
      <div className="flex justify-around py-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.href} href={link.href} className="flex flex-col items-center gap-0.5 py-1 px-2 text-stone-500 hover:text-orange-600">
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{link.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
