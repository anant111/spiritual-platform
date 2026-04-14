import type { Metadata } from 'next';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pb-24">{children}</main>
        <BottomNav />
        <Footer />
      </body>
    </html>
  );
}
