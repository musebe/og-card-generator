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
 * 1️⃣ AssetStep   – upload or fetch image
 * 2️⃣ DesignStep  – pick template & live preview
 * 3️⃣ PreviewStep – render final OG & export
 */
export default function GeneratorClient() {
  const params = useSearchParams();

  // Safely derive a TemplateId from the query, defaulting to 'basic'
  const raw = params.get('template');
  const initialTemplate: TemplateId = templates.some((t) => t.id === raw)
    ? (raw as TemplateId)
    : 'basic';

  const [step, setStep] = useState<Step>('asset');
  const [templateId, setTemplateId] = useState<TemplateId>(initialTemplate);
  const [uploadedInfo, setUploadedInfo] = useState<UploadInfo | null>(null);
  const [ogData, setOgData] = useState<OgInfo>({});
  const [fields, setFields] = useState({ title: '', subtitle: '' });

  // Keep the `?template=` param in sync
  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('template', templateId);
    window.history.replaceState(null, '', u);
  }, [templateId]);

  // publicId (for CldImage builders) & fallbackUrl (for previews)
  const publicId = uploadedInfo?.publicId;
  const fallbackUrl = uploadedInfo?.url || ogData.image || '';

  // Seed title/sub when OG metadata arrives
  useEffect(() => {
    setFields({
      title: ogData.title || '',
      subtitle: ogData.description || '',
    });
  }, [ogData]);

  return (
    <div className='container mx-auto max-w-screen-lg px-4 py-8 overflow-y-auto'>
      <AnimatePresence mode='wait'>
        {step === 'asset' && (
          <AssetStep
            imageUrl={fallbackUrl}
            onUpload={setUploadedInfo}
            onFetch={setOgData}
            onNext={() => setStep('design')}
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
          />
        )}

        {step === 'preview' && (
          <PreviewStep
            templateId={templateId}
            fields={fields}
            uploadInfo={uploadedInfo}
            fallbackUrl={fallbackUrl}
            onBack={() => setStep('design')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
