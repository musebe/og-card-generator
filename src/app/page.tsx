// src/app/page.tsx
import Link from 'next/link';
import templates from '@/lib/templates';
import { TemplateCard } from '@/components/TemplateCard';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className='container mx-auto px-4 py-16 space-y-12'>
      {/* Hero */}
      <section className='text-center space-y-4'>
        <h1 className='text-5xl font-extrabold'>
          Generate Dynamic Social Cards in Seconds
        </h1>
        <p className='max-w-xl mx-auto text-lg'>
          Pick a template, upload your image or paste a blog link, and instantly
          get a shareable, media-rich preview.
        </p>

        {/* Use Button with asChild to wrap Link */}
        <Button size='lg' asChild>
          <Link href='/generator'>Get Started</Link>
        </Button>
      </section>

      {/* Templates Gallery */}
      <section>
        <h2 className='text-3xl font-bold mb-6'>Choose a Template</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {templates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      </section>
    </main>
  );
}
