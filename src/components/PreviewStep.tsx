// src/components/PreviewStep.tsx
'use client';

import { FC, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CardPreview from '@/components/CardPreview';

export interface PreviewStepProps {
  /** ID of the selected template */
  templateId: string;
  /** User‐entered text fields */
  text: { title: string; subtitle: string };
  /** Either a full URL or Cloudinary public ID */
  imageUrl?: string;
  /** Called when user wants to go back to Design step */
  onBack(): void;
}

/**
 * Step 3: Render the final Preview + Export controls
 *
 * - Uses **CardPreview** to generate the same live preview as in Design
 * - Builds a fully‐qualified URL (Cloudinary or passthrough)
 * - Download via blob + `<a download>`
 * - Copy URL to clipboard
 */
export const PreviewStep: FC<PreviewStepProps> = ({
  templateId,
  text,
  imageUrl,
  onBack,
}) => {
  // derive final URL: if it's already a full URL, use it; else build Cloudinary URL
  const finalUrl = imageUrl
    ? /^https?:\/\//.test(imageUrl)
      ? imageUrl
      : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageUrl}.png`
    : '';

  // Copy final URL to clipboard
  const handleCopy = async () => {
    if (!finalUrl) return;
    try {
      await navigator.clipboard.writeText(finalUrl);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Download final image as PNG
  const handleDownload = async () => {
    if (!finalUrl) return;
    try {
      const res = await fetch(finalUrl);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'social-card.png';
      a.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <motion.div
      key='preview'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className='space-y-8'
    >
      {/* Heading */}
      <h2 className='text-xl font-semibold'>3. Preview & Export</h2>

      {/* Preview container */}
      <Card className='p-6'>
        {finalUrl ? (
          <CardPreview
            templateId={templateId}
            config={{ image: finalUrl, text }}
          />
        ) : (
          /* Loading skeleton */
          <div className='h-48 bg-gray-800 animate-pulse rounded-lg' />
        )}
      </Card>

      {/* Action buttons */}
      <div className='flex gap-4'>
        <Button onClick={handleDownload} disabled={!finalUrl}>
          Download PNG
        </Button>
        <Button variant='outline' onClick={handleCopy} disabled={!finalUrl}>
          Copy OG URL
        </Button>
      </div>

      {/* Back link */}
      <Button variant='ghost' onClick={onBack}>
        ← Edit Design
      </Button>
    </motion.div>
  );
};
