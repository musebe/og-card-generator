// src/components/PreviewStep.tsx
'use client';

import { FC } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import type { UploadInfo } from '@/components/UploadWidget';
import type { TemplateId } from '@/lib/templates';

export interface PreviewStepProps {
  templateId: TemplateId;
  fields: { title: string; subtitle: string };
  uploadInfo: UploadInfo | null;
  fallbackUrl?: string;
  onBack(): void;
  finalImageUrl: string;
}

export const PreviewStep: FC<PreviewStepProps> = ({
  fields,
  fallbackUrl = '',
  onBack,
  finalImageUrl,
}) => {
  const { title, subtitle } = fields;
  const displayUrl = finalImageUrl || fallbackUrl;

  const handleDownload = async () => {
    if (!displayUrl) return;
    try {
      const response = await fetch(displayUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'social-card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download started!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error(
        'Download failed. You can try right-clicking the image to save.'
      );
    }
  };

  const handleCopy = async () => {
    if (!displayUrl) return;
    try {
      await navigator.clipboard.writeText(displayUrl);
      toast.success('URL copied to clipboard!');
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('Copy failed.');
    }
  };

  // ✅ This is the final, corrected save function.
  const handleSave = async () => {
    if (!displayUrl) {
      toast.error('Cannot save an empty image URL.');
      return;
    }

    // 1. Capture the ID when the loading toast is created
    const toastId = toast.loading('Saving template...');

    const cardToSave = {
      url: displayUrl,
      headline: title,
      tagline: subtitle,
    };

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardToSave),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      // 2. Use the ID to update the toast to a "Success" message
      toast.success('Template saved successfully!', {
        id: toastId,
      });
    } catch (error) {
      // 3. Use the ID to update the toast to an "Error" message
      toast.error('Failed to save template.', {
        id: toastId,
      });
      console.error('Save failed:', error);
    }
  };

  return (
    <motion.div
      key='preview'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className='space-y-8'
    >
      <div className='text-center'>
        <h2 className='text-xl font-semibold'>3. Preview & Export</h2>
        <p className='text-gray-400 mt-1'>Your final social card is ready.</p>
      </div>
      <div className='max-w-2xl mx-auto'>
        <Card className='p-2 sm:p-4 shadow-lg overflow-hidden bg-gray-800/50'>
          {displayUrl ? (
            <div className='aspect-[1.91/1] w-full'>
              <img
                src={displayUrl}
                alt={title || 'Preview'}
                className='w-full h-full object-contain rounded-md'
              />
            </div>
          ) : (
            <div className='aspect-[1.91/1] w-full bg-gray-700 animate-pulse rounded-lg' />
          )}
        </Card>
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
        <Button size='lg' onClick={handleSave} disabled={!displayUrl}>
          Save Template
        </Button>
        <Button size='lg' onClick={handleDownload} disabled={!displayUrl}>
          Download PNG
        </Button>
        <Button
          size='lg'
          variant='outline'
          onClick={handleCopy}
          disabled={!displayUrl}
        >
          Copy URL
        </Button>
      </div>
      <div className='text-center'>
        <Button variant='ghost' onClick={onBack}>
          ← Back to Design
        </Button>
      </div>
    </motion.div>
  );
};

export default PreviewStep;
