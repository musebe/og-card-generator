// src/components/DesignStep.tsx
'use client';

import { FC } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import TemplateSelector from '@/components/TemplateSelector';
import FieldInputs from '@/components/FieldInputs';
import OverlayControls from '@/components/OverlayControls';
import CardPreview from '@/components/CardPreview';

import type { UploadInfo } from '@/components/UploadWidget';
import type { TemplateId } from '@/lib/templates';

export interface DesignStepProps {
  templateId: TemplateId;
  uploadInfo: UploadInfo | null;
  fields: { title: string; subtitle: string };
  onTemplateChange(id: TemplateId): void;
  onFieldsChange(fields: { title: string; subtitle: string }): void;
  onBack(): void;
  onNext(): void;
  // ✅ FIX: Add the new prop to pass the callback function.
  onUrlGenerated(url: string): void;
}

const DesignStep: FC<DesignStepProps> = ({
  templateId,
  uploadInfo,
  fields,
  onTemplateChange,
  onFieldsChange,
  onBack,
  onNext,
  onUrlGenerated, // ✅ FIX: Receive the new prop.
}) => {
  const imagePublicId = uploadInfo?.publicId ?? '';

  return (
    <motion.div
      key='design'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className='space-y-6'
    >
      <h2 className='text-xl font-semibold'>2. Design</h2>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <Card className='p-6 space-y-6'>
          <TemplateSelector selected={templateId} onChange={onTemplateChange} />
          <FieldInputs
            title={fields.title}
            subtitle={fields.subtitle}
            onChange={onFieldsChange}
          />
          <OverlayControls />
        </Card>

        <Card className='p-4 flex items-center justify-center'>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CardPreview
              templateId={templateId}
              config={{
                image: imagePublicId,
                text: { title: fields.title, subtitle: fields.subtitle },
              }}
              // ✅ FIX: Pass the function down to CardPreview.
              onUrlGenerated={onUrlGenerated}
            />
          </motion.div>
        </Card>
      </div>

      <div className='flex justify-between'>
        <Button variant='outline' onClick={onBack}>
          {' '}
          ← Back{' '}
        </Button>
        <Button onClick={onNext}>Next: Preview →</Button>
      </div>
    </motion.div>
  );
};

export default DesignStep;
