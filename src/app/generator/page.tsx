// src/app/generator/page.tsx
import { Suspense } from 'react';
import GeneratorClient from '@/components/GeneratorClient';

export const dynamic = 'force-dynamic'; // always render on-demand

/**
 * 🏁 **`/generator` page** (server component)
 * - Wraps the client-only `<GeneratorClient />` in a `<Suspense>` boundary,
 *   satisfying the “useSearchParams must be inside suspense” rule.
 */
export default function GeneratorPage() {
  return (
    <Suspense fallback={<div className='p-8 text-center'>Loading wizard…</div>}>
      <GeneratorClient />
    </Suspense>
  );
}
