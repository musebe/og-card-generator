// src/app/generator/page.tsx
'use client'; // page now runs entirely on the client
export const dynamic = 'force-dynamic'; // skip prerender at build time

/**
 * 🏁 **GeneratorPage** – thin wrapper that renders the client-only wizard.
 * Rendered dynamically to satisfy Next.js CSR-bailout rules.
 */

import GeneratorClient from '@/components/GeneratorClient';

export default function GeneratorPage() {
  return <GeneratorClient />;
}
