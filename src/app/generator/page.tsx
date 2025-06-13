// src/app/generator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { UploadWidget } from '@/components/UploadWidget';
import UrlInput from '@/components/UrlInput';
import TemplateSelector from '@/components/TemplateSelector';
import FieldInputs from '@/components/FieldInputs';
import OverlayControls from '@/components/OverlayControls';
import { Card } from '@/components/ui/card';
import CardPreview from '@/components/CardPreview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';

type Step = 'asset' | 'design' | 'preview';

export default function GeneratorPage() {
  // 1️⃣ get initial template from URL
  const searchParams = useSearchParams();
  const initialTemplate = searchParams.get('template') || 'basic';

  // 2️⃣ local state
  const [step, setStep] = useState<Step>('asset');
  const [templateId, setTemplateId] = useState(initialTemplate);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [ogData, setOgData] = useState<{
    title?: string;
    description?: string;
    image?: string;
  }>({});

  // keep URL in sync if user switches templates mid-flow
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('template', templateId);
    window.history.replaceState(null, '', url);
  }, [templateId]);

  // fetch OG metadata from a blog link
  const fetchOg = async (url: string) => {
    const res = await fetch(`/api/og-metadata?url=${encodeURIComponent(url)}`);
    setOgData(await res.json());
  };

  return (
    <div className='container mx-auto px-4 py-12'>
      {/* Step Tabs */}
      <Tabs
        value={step}
        // annotate v to the same union:
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
        {/* Asset Selection */}
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
              <UploadWidget onUpload={setUploadedImage} />
              <UrlInput onFetch={fetchOg} />
            </Card>

            <div className='flex justify-end'>
              <Button onClick={() => setStep('design')}>Next: Design →</Button>
            </div>
          </motion.div>
        )}

        {/* Design */}
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
              <Card className='p-6 space-y-6'>
                <TemplateSelector
                  selected={templateId}
                  onChange={setTemplateId}
                />

                <FieldInputs
                  templateId={templateId}
                  initial={{
                    background: uploadedImage || ogData.image,
                    title: ogData.title,
                    subtitle: ogData.description,
                  }}
                />

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant='outline'>Overlay Controls ⚙️</Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className='mt-4'>
                    <OverlayControls />
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              <div className='flex items-center justify-center'>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <CardPreview
                    templateId={templateId}
                    config={{
                      image: uploadedImage || ogData.image,
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

        {/* Preview & Export */}
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
                  image: uploadedImage || ogData.image,
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
                  /* download logic here, e.g. creating an <a download> link */
                }}
              >
                Download PNG
              </Button>

              <Button
                variant='outline'
                onClick={() => {
                  /* copy URL logic here, e.g. clipboard.writeText(...) */
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
