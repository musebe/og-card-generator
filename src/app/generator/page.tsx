// src/app/generator/page.tsx
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

export default function GeneratorPage() {
  // 1️⃣ Read initial template from URL
  const params = useSearchParams();
  const initialTemplate = (params.get('template') as string) || 'basic';

  // 2️⃣ Local state
  const [step, setStep] = useState<Step>('asset');
  const [templateId, setTemplateId] = useState<string>(initialTemplate);
  const [uploadedInfo, setUploadedInfo] = useState<UploadInfo | null>(null);
  const [ogData, setOgData] = useState<OgInfo>({});
  const [fields, setFields] = useState({ title: '', subtitle: '' });

  // 3️⃣ Sync URL param when template changes
  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('template', templateId);
    window.history.replaceState(null, '', u);
  }, [templateId]);

  // 4️⃣ Use uploaded image or OG fallback
  const imageUrl = uploadedInfo?.url || ogData.image;

  // 5️⃣ When OG data arrives, seed our text fields
  useEffect(() => {
    setFields({
      title: ogData.title || '',
      subtitle: ogData.description || '',
    });
  }, [ogData]);

  return (
    <div className='container mx-auto px-4 py-12'>
      <AnimatePresence mode='wait'>
        {/* Asset Step */}
        {step === 'asset' && (
          <AssetStep
            imageUrl={imageUrl}
            onUpload={setUploadedInfo}
            onFetch={setOgData}
            onNext={() => setStep('design')}
            disabledNext={!imageUrl}
          />
        )}

        {/* Design Step */}
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

        {/* Preview Step */}
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
