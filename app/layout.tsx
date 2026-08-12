import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cinzel } from 'next/font/google';
import './globals.css';
import { InnovAIProvider } from './context/InnovAIContext';
import { BackgroundBlobs } from '@/components/BackgroundBlobs';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'InnovAI — AI Avatars for Innovators',
  description: 'A private, judgment-free platform where you can have real conversations with AI personas of history’s greatest minds and modern experts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen bg-[#0D0B1E] text-[#F0F4FF]" suppressHydrationWarning>
        <InnovAIProvider>
          <BackgroundBlobs />
          <Navbar />
          <main className="flex-1 relative z-10 flex flex-col">
            {children}
          </main>
          <Footer />
        </InnovAIProvider>
      </body>
    </html>
  );
}
