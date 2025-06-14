// src/components/GeneratorClient.tsx
'use client';

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
 * 🎛️ **GeneratorClient** – 3-step wizard (runs only in the browser)
 */
export default function GeneratorClient() {
  /* 1️⃣ read ?template= from URL (safe on client) */
  const params = useSearchParams();
  const initialTemplate = (params.get('template') as string) || 'basic';

  /* 2️⃣ local state */
  const [step, setStep] = useState<Step>('asset');
  const [templateId, setTemplateId] = useState(initialTemplate);
  const [uploadedInfo, setUploadedInfo] = useState<UploadInfo | null>(null);
  const [ogData, setOgData] = useState<OgInfo>({});
  const [fields, setFields] = useState({ title: '', subtitle: '' });

  /* 3️⃣ sync ?template param */
  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('template', templateId);
    window.history.replaceState(null, '', u);
  }, [templateId]);

  /* 4️⃣ single image src */
  const imageUrl = uploadedInfo?.url || ogData.image || '';

  /* 5️⃣ seed title/subtitle when OG data arrives */
  useEffect(() => {
    setFields({
      title: ogData.title || '',
      subtitle: ogData.description || '',
    });
  }, [ogData]);

  /* 6️⃣ render step */
  return (
    <div className='container mx-auto max-w-screen-lg px-4 py-8 overflow-y-auto'>
      <AnimatePresence mode='wait'>
        {step === 'asset' && (
          <AssetStep
            imageUrl={imageUrl}
            onUpload={setUploadedInfo}
            onFetch={setOgData}
            onNext={() => setStep('design')}
            disabledNext={!imageUrl}
          />
        )}
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
