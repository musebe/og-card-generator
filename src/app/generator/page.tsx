// src/app/generator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

import { UploadWidget, UploadInfo } from '@/components/UploadWidget';
import FetchWidget, { OgInfo } from '@/components/FetchWidget';
import TemplateSelector from '@/components/TemplateSelector';
import FieldInputs from '@/components/FieldInputs';
import OverlayControls from '@/components/OverlayControls';

import { Card } from '@/components/ui/card';
import CardPreview from '@/components/CardPreview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';

type Step = 'asset' | 'design' | 'preview';

export default function GeneratorPage() {
  // 1️⃣ Read the initial template from URL (e.g. ?template=basic)
  const params = useSearchParams();
  const initialTemplate = (params.get('template') as string) || 'basic';

  // 2️⃣ Local component state
  const [step, setStep] = useState<Step>('asset');
  const [templateId, setTemplateId] = useState<string>(initialTemplate);
  const [uploadedInfo, setUploadedInfo] = useState<UploadInfo | null>(null);
  const [ogData, setOgData] = useState<OgInfo>({});

  // 3️⃣ Keep the “template” param in sync with state
  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('template', templateId);
    window.history.replaceState(null, '', u);
  }, [templateId]);

  // 4️⃣ Determine which image to show: uploaded first, then OG fallback
  const imageUrl = uploadedInfo?.url || ogData.image;

  return (
    <div className='container mx-auto px-4 py-12'>
      {/* === Step Tabs === */}
      <Tabs
        value={step}
        onValueChange={(v: string) => setStep(v as Step)}
        className='mb-8'
      >
        <TabsList>
          <TabsTrigger value='asset'>1. Asset</TabsTrigger>
          <TabsTrigger value='design'>2. Design</TabsTrigger>
          <TabsTrigger value='preview'>3. Preview</TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence mode='wait'>
        {/* === 1️⃣ ASSET SELECTION === */}
        {step === 'asset' && (
          <motion.div
            key='asset'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className='space-y-6'
          >
            <Card className='p-6 space-y-4'>
              <h2 className='text-xl font-semibold'>Upload or Fetch Image</h2>

              <div className='flex items-center gap-4'>
                {/* 1️⃣ Upload via Cloudinary */}
                <UploadWidget onUpload={setUploadedInfo} />

                {/* 2️⃣ Fetch OG via URL, inline mode */}
                <FetchWidget onFetch={setOgData} inline />
              </div>

              {/* Preview the selected asset */}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt='Selected asset'
                  className='mt-4 w-full max-w-xl rounded-lg shadow'
                />
              )}
            </Card>

            <div className='flex justify-end'>
              <Button onClick={() => setStep('design')} disabled={!imageUrl}>
                Next: Design →
              </Button>
            </div>
          </motion.div>
        )}

        {/* === 2️⃣ DESIGN STEP === */}
        {step === 'design' && (
          <motion.div
            key='design'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className='space-y-6'
          >
            <div className='grid lg:grid-cols-2 gap-8'>
              {/* Left: Controls */}
              <Card className='p-6 space-y-6'>
                {/* Template picker */}
                <TemplateSelector
                  selected={templateId}
                  onChange={setTemplateId}
                />

                {/* Text inputs */}
                <FieldInputs
                  templateId={templateId}
                  initial={{
                    background: imageUrl,
                    title: ogData.title,
                    subtitle: ogData.description,
                  }}
                />

                {/* Overlay controls toggle */}
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant='outline'>Overlay Controls ⚙️</Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className='mt-4'>
                    <OverlayControls />
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Right: Live preview */}
              <div className='flex items-center justify-center'>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <CardPreview
                    templateId={templateId}
                    config={{
                      image: imageUrl,
                      text: {
                        title: ogData.title || '',
                        subtitle: ogData.description || '',
                      },
                    }}
                  />
                </motion.div>
              </div>
            </div>

            <div className='flex justify-between'>
              <Button variant='outline' onClick={() => setStep('asset')}>
                ← Back
              </Button>
              <Button onClick={() => setStep('preview')}>
                Next: Preview →
              </Button>
            </div>
          </motion.div>
        )}

        {/* === 3️⃣ PREVIEW & EXPORT === */}
        {step === 'preview' && (
          <motion.div
            key='preview'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className='space-y-8'
          >
            <Card className='p-6'>
              <CardPreview
                templateId={templateId}
                config={{
                  image: imageUrl,
                  text: {
                    title: ogData.title || '',
                    subtitle: ogData.description || '',
                  },
                }}
              />
            </Card>

            <div className='flex gap-4'>
              <Button
                onClick={() => {
                  /* download logic */
                }}
              >
                Download PNG
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  /* copy URL */
                }}
              >
                Copy OG URL
              </Button>
            </div>

            <Button variant='ghost' onClick={() => setStep('design')}>
              ← Edit Design
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
