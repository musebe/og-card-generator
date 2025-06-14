// src/components/DesignStep.tsx
'use client';

import { FC } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import TemplateSelector from '@/components/TemplateSelector';
import FieldInputs from '@/components/FieldInputs';
import OverlayControls from '@/components/OverlayControls';
import CardPreview from '@/components/CardPreview';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { UploadInfo } from '@/components/UploadWidget';
import { OgInfo } from '@/components/FetchWidget';

export interface DesignStepProps {
  templateId: string;
  fields: { title: string; subtitle: string };
  onTemplateChange(id: string): void;
  onFieldsChange(fields: { title: string; subtitle: string }): void;
  imageUrl?: string;
  onBack(): void;
  onNext(): void;
}

export const DesignStep: FC<DesignStepProps> = ({
  templateId,
  fields,
  onTemplateChange,
  onFieldsChange,
  imageUrl,
  onBack,
  onNext,
}) => (
  <motion.div
    key='design'
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    className='space-y-6'
  >
    <h2 className='text-xl font-semibold'>2. Design</h2>

    <div className='grid lg:grid-cols-2 gap-8'>
      {/* Left: Configuration controls */}
      <Card className='p-6 space-y-6'>
        <TemplateSelector selected={templateId} onChange={onTemplateChange} />

        <FieldInputs
          title={fields.title}
          subtitle={fields.subtitle}
          onChange={onFieldsChange}
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
                title: fields.title,
                subtitle: fields.subtitle,
              },
            }}
          />
        </motion.div>
      </div>
    </div>

    <div className='flex justify-between'>
      <Button variant='outline' onClick={onBack}>
        ← Back
      </Button>
      <Button onClick={onNext}>Next: Preview →</Button>
    </div>
  </motion.div>
);
