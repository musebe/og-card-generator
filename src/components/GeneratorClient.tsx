// src/components/GeneratorClient.tsx

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'motion/react';

import { AssetStep } from '@/components/AssetStep';
import DesignStep from '@/components/DesignStep';
import PreviewStep from '@/components/PreviewStep';

import type { UploadInfo } from '@/components/UploadWidget';
import type { OgInfo } from '@/components/FetchWidget';
import templates, { TemplateId } from '@/lib/templates';

type Step = 'asset' | 'design' | 'preview';

/**
 * 🎛️ **GeneratorClient** – 3-step wizard (client-only):
 */
export default function GeneratorClient() {
  const params = useSearchParams();
  const raw = params.get('template');
  const initialTemplate: TemplateId = templates.some((t) => t.id === raw)
    ? (raw as TemplateId)
    : 'article';

  const [step, setStep] = useState<Step>('asset');
  const [templateId, setTemplateId] = useState<TemplateId>(initialTemplate);
  const [uploadedInfo, setUploadedInfo] = useState<UploadInfo | null>(null);
  const [ogData, setOgData] = useState<OgInfo>({});
  const [fields, setFields] = useState({
    title: 'Content Strategies That Work in 2025',
    subtitle: 'Engage smarter with SEO and AI-driven tools',
  });

  const [generatedCardUrl, setGeneratedCardUrl] = useState('');

  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('template', templateId);
    window.history.replaceState(null, '', u);
  }, [templateId]);

  const fallbackUrl = uploadedInfo?.url || ogData.image || '';

  useEffect(() => {
    if (ogData.title || ogData.description) {
      setFields({
        title: ogData.title || '',
        subtitle: ogData.description || '',
      });
    }
  }, [ogData]);

  return (
    <div className='container mx-auto max-w-screen-lg px-4 py-8 overflow-y-auto'>
      <AnimatePresence mode='wait'>
        {step === 'asset' && (
          <AssetStep
            onUpload={setUploadedInfo}
            onFetch={setOgData}
            onNext={() => setStep('design')}
            imageUrl={fallbackUrl}
            disabledNext={!fallbackUrl}
          />
        )}

        {step === 'design' && (
          <DesignStep
            templateId={templateId}
            uploadInfo={uploadedInfo}
            fields={fields}
            onTemplateChange={setTemplateId}
            onFieldsChange={setFields}
            onBack={() => setStep('asset')}
            onNext={() => setStep('preview')}
            onUrlGenerated={setGeneratedCardUrl}
          />
        )}

        {step === 'preview' && (
          <PreviewStep
            templateId={templateId}
            fields={fields}
            // ✅ FIX: Corrected typo from `uploadInfo` to `uploadedInfo`
            uploadInfo={uploadedInfo}
            fallbackUrl={fallbackUrl}
            onBack={() => setStep('design')}
            finalImageUrl={generatedCardUrl}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
