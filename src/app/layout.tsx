import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shraddha — Your Spiritual Journey',
  description: 'Find spiritual wisdom. Bhajans, Gita, Meditation, Astrology — curated for your journey.',
};

export const viewport: Viewport = {
  themeColor: '#0D0B1A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-void text-ivory`}>
        <Header />
        <main id="main-content" className="min-h-screen pb-20">{children}</main>
        <BottomNav />
        <Footer />
      </body>
    </html>
  );
}
