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

  // ✅ FIX: The default template is now 'article', which exists in our new templates.ts
  const raw = params.get('template');
  const initialTemplate: TemplateId = templates.some((t) => t.id === raw)
    ? (raw as TemplateId)
    : 'article';

  const [step, setStep] = useState<Step>('asset');
  const [templateId, setTemplateId] = useState<TemplateId>(initialTemplate);
  const [uploadedInfo, setUploadedInfo] = useState<UploadInfo | null>(null);
  const [ogData, setOgData] = useState<OgInfo>({});

  // ✅ FIX: Initialize with default text for a better user experience.
  const [fields, setFields] = useState({
    title: 'High-Performance Image & Video Delivery',
    subtitle: 'Get the power of Cloudinary in your Next.js project',
  });

  // Keep the `?template=` param in sync
  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('template', templateId);
    window.history.replaceState(null, '', u);
  }, [templateId]);

  // Seed title/sub when OG metadata arrives from fetching a URL
  useEffect(() => {
    if (ogData.title || ogData.description) {
      setFields({
        title: ogData.title || '',
        subtitle: ogData.description || '',
      });
    }
  }, [ogData]);

  // ✅ FIX: Use a robust handler to reset state on new uploads.
  const handleUpload = (info: UploadInfo | null) => {
    setUploadedInfo(info);
    setOgData({}); // Clear any old fetched data
    // Set default fields when a new image is uploaded
    setFields({
      title: 'High-Performance Image & Video Delivery',
      subtitle: 'Get the power of Cloudinary in your Next.js project',
    });
  };

  const publicId = uploadedInfo?.publicId;
  const fallbackUrl = uploadedInfo?.url || ogData.image || '';

  return (
    <div className='container mx-auto max-w-screen-lg px-4 py-8 overflow-y-auto'>
      <AnimatePresence mode='wait'>
        {step === 'asset' && (
          <AssetStep
            imageUrl={fallbackUrl}
            onUpload={handleUpload} // <-- Use the new handler
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
