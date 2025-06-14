// src/app/generator/page.tsx
'use client';                       // page runs on the browser
export const dynamic = 'force-dynamic'; // ⬅️ skip prerender during build



import GeneratorClient from '@/components/GeneratorClient';

export default function GeneratorPage() {
  return <GeneratorClient />;
}
