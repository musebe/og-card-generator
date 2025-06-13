// src/app/layout.tsx
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { Providers } from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import type { ReactNode } from 'react';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SocialCardGen',
  description:
    'Generate real-time Open Graph images with customizable templates, dynamic overlays, and CMS integration.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className={`${spaceGrotesk.className} ${jetbrainsMono.className}`}
      suppressHydrationWarning
    >
      <body className='antialiased flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
        {/* Providers now wraps everything that needs theming & animations */}
        <Providers>
          <Navbar />

          <main className='flex-grow pt-16 px-4 sm:px-6 lg:px-8'>
            {children}
          </main>

          <Footer />
          <Toaster position='bottom-right' />
        </Providers>
      </body>
    </html>
  );
}
