// src/app/generator/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'motion/react';

import { UploadInfo } from '@/components/UploadWidget';
import { OgInfo } from '@/components/FetchWidget';
import { AssetStep } from '@/components/AssetStep';
import { DesignStep } from '@/components/DesignStep';
import { PreviewStep } from '@/components/PreviewStep';

type Step = 'asset' | 'design' | 'preview';

/**
 * GeneratorPage orchestrates the 3‐step wizard:
 * 1️⃣ AssetStep  → upload or fetch image
 * 2️⃣ DesignStep → pick template & live preview
 * 3️⃣ PreviewStep→ final preview + download/copy
 */
export default function GeneratorPage() {
  // 1️⃣ Read initial `?template=` from URL
  const params = useSearchParams();
  const initialTemplate = (params.get('template') as string) || 'basic';

  // 2️⃣ Page‐level state
  const [step, setStep] = useState<Step>('asset');
  const [templateId, setTemplateId] = useState(initialTemplate);
  const [uploadedInfo, setUploadedInfo] = useState<UploadInfo | null>(null);
  const [ogData, setOgData] = useState<OgInfo>({});
  const [fields, setFields] = useState({ title: '', subtitle: '' });

  // 3️⃣ Keep `?template` param in sync with state
  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('template', templateId);
    window.history.replaceState(null, '', u);
  }, [templateId]);

  // 4️⃣ Compute a single image URL for both Design & Preview
  //    (favor upload, then OG, else empty string)
  const imageUrl = uploadedInfo?.url || ogData.image || '';

  // 5️⃣ Seed title/subtitle when OG data arrives
  useEffect(() => {
    setFields({
      title: ogData.title || '',
      subtitle: ogData.description || '',
    });
  }, [ogData]);

  return (
    <div className='container mx-auto max-w-screen-lg px-4 py-8 overflow-y-auto'>
      <AnimatePresence mode='wait'>
        {/* STEP 1: Asset Selection */}
        {step === 'asset' && (
          <AssetStep
            imageUrl={imageUrl}
            onUpload={setUploadedInfo}
            onFetch={setOgData}
            onNext={() => setStep('design')}
            disabledNext={!imageUrl}
          />
        )}

        {/* STEP 2: Design */}
        {step === 'design' && (
          <DesignStep
            templateId={templateId}
            fields={fields}
            onTemplateChange={setTemplateId}
            onFieldsChange={setFields}
            imageUrl={imageUrl}
            onBack={() => setStep('asset')}
            onNext={() => setStep('preview')}
          />
        )}

        {/* STEP 3: Preview & Export */}
        {step === 'preview' && (
          <PreviewStep
            templateId={templateId}
            text={fields}
            imageUrl={imageUrl}
            onBack={() => setStep('design')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
