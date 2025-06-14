// src/components/PreviewStep.tsx
'use client';

import { FC } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import CardPreview from '@/components/CardPreview';
import { Button } from '@/components/ui/button';

export interface PreviewStepProps {
  templateId: string;
  text: { title: string; subtitle: string };
  imageUrl?: string;
  onBack(): void;
}

export const PreviewStep: FC<PreviewStepProps> = ({
  templateId,
  text,
  imageUrl,
  onBack,
}) => (
  <motion.div
    key='preview'
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    className='space-y-8'
  >
    <h2 className='text-xl font-semibold'>3. Preview & Export</h2>

    <Card className='p-6'>
      <CardPreview templateId={templateId} config={{ image: imageUrl, text }} />
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
          /* copy URL logic */
        }}
      >
        Copy OG URL
      </Button>
    </div>

    <Button variant='ghost' onClick={onBack}>
      ← Edit Design
    </Button>
  </motion.div>
);
