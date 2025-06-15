// src/components/PreviewStep.tsx
'use client';

import { FC, useMemo } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CldImage } from 'next-cloudinary';
import { toast } from 'sonner';

// ✅ FIX: Import the new template functions
import { articleOgUrl, fullOgUrl, oneThirdOgUrl } from '@/lib/ogTemplates';
import type { UploadInfo } from '@/components/UploadWidget';
import type { TemplateId } from '@/lib/templates';

export interface PreviewStepProps {
  // ✅ FIX: Updated comment to reflect new template names
  /** Which template to use: 'article' | 'full' | 'one-third' */
  templateId: TemplateId;
  /** The finalized title & subtitle from step 2 */
  fields: { title: string; subtitle: string };
  /** Info about the uploaded image (Cloudinary publicId + URL + dims) */
  uploadInfo: UploadInfo | null;
  /** A fallback HTTP URL (e.g. OG‐fetched) if no publicId */
  fallbackUrl?: string;
  /** Go back to Design step */
  onBack(): void;
}

/**
 * 🚀 **PreviewStep** – step 3 of the wizard
 */
export const PreviewStep: FC<PreviewStepProps> = ({
  templateId,
  fields,
  uploadInfo,
  fallbackUrl = '',
  onBack,
}) => {
  const { title, subtitle } = fields;
  const publicId = uploadInfo?.publicId;

  const finalUrl = useMemo(() => {
    if (!publicId) return '';

    // This object provides all the necessary data for any of the templates
    const opts = {
      publicId,
      headline: title,
      body: subtitle,
      tagline: subtitle, // for templates that expect 'tagline'
    };

    // ✅ FIX: The switch statement now uses the new template IDs and calls the new functions
    switch (templateId) {
      case 'full':
        return fullOgUrl(opts);
      case 'one-third':
        return oneThirdOgUrl(opts);
      case 'article':
      default:
        // The 'article' template needs a logo, which we get from an env var or hardcode
        const logoPublicId =
          process.env.NEXT_PUBLIC_CLOUDINARY_LOGO_PUBLIC_ID ||
          'images/cloudinary-logo-white';
        return articleOgUrl({
          ...opts,
          logoPublicId,
        });
    }
  }, [publicId, title, subtitle, templateId]);

  const displayUrl = finalUrl || fallbackUrl;
  const isGenerated = Boolean(finalUrl);

  const handleDownload = async () => {
    if (!displayUrl) return;
    try {
      const res = await fetch(displayUrl);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'social-card.png';
      a.click();
      toast.success('Downloaded!');
    } catch {
      toast.error('Download failed');
    }
  };

  const handleCopy = async () => {
    if (!displayUrl) return;
    try {
      await navigator.clipboard.writeText(displayUrl);
      toast.success('URL copied!');
    } catch {
      toast.error('Copy failed');
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
      <h2 className='text-xl font-semibold'>3. Preview & Export</h2>

      <Card className='p-6'>
        {displayUrl ? (
          isGenerated ? (
            <CldImage
              src={displayUrl}
              width={1200}
              height={630}
              alt={title || 'Preview'}
              unoptimized
              className='w-full h-auto object-cover'
            />
          ) : (
            <img
              src={displayUrl}
              alt={title || 'Preview'}
              className='w-full h-auto object-cover rounded-lg shadow'
            />
          )
        ) : (
          <div className='h-48 bg-gray-200 animate-pulse rounded-lg' />
        )}
      </Card>

      <div className='flex gap-4'>
        <Button onClick={handleDownload} disabled={!displayUrl}>
          Download PNG
        </Button>
        <Button variant='outline' onClick={handleCopy} disabled={!displayUrl}>
          Copy OG URL
        </Button>
      </div>

      <Button variant='ghost' onClick={onBack}>
        ← Edit Design
      </Button>
    </motion.div>
  );
};

export default PreviewStep;
