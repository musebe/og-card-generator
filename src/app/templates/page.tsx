// src/app/templates/page.tsx

import { TemplateGrid } from '@/components/TemplateGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';

export default function TemplatesPage() {
  return (
    <div className='container mx-auto max-w-screen-xl px-4 py-12'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl'>
          Saved Templates
        </h1>
        <p className='mt-4 text-lg text-gray-400'>
          Browse your collection of saved designs or create a new one.
        </p>
        <div className='mt-6'>
          <Link href='/generator'>
            <Button size='lg'>Create New Card →</Button>
          </Link>
        </div>
      </div>

      {/* Suspense is helpful for components that fetch data */}
      <Suspense
        fallback={
          <div className='text-center text-gray-400'>Loading Templates...</div>
        }
      >
        <TemplateGrid />
      </Suspense>
    </div>
  );
}
