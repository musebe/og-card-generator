// src/components/AssetStep.tsx

'use client';

import { FC } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadWidget, UploadInfo } from '@/components/UploadWidget';
import FetchWidget, { OgInfo } from '@/components/FetchWidget';

export interface AssetStepProps {
  /** Currently selected image URL (upload or OG fallback) */
  imageUrl?: string;
  /** Called on successful Cloudinary upload */
  onUpload(info: UploadInfo): void;
  /** Called on successful OG fetch */
  onFetch(info: OgInfo): void;
  /** Advance to Design step */
  onNext(): void;
  /** Disable “Next” until asset is chosen */
  disabledNext: boolean;
}

/**
 * Step 1: asset selection
 * - UploadWidget => Cloudinary
 * - FetchWidget  => OG metadata
 * - Preview image
 */
export const AssetStep: FC<AssetStepProps> = ({
  imageUrl,
  onUpload,
  onFetch,
  onNext,
  disabledNext,
}) => (
  <motion.div
    key='asset'
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    className='space-y-6'
  >
    <Card className='p-6 space-y-4'>
      <h2 className='text-xl font-semibold'>1. Asset Selection</h2>

      <div className='flex items-center gap-4'>
        {/* Upload via Cloudinary */}
        <UploadWidget onUpload={onUpload} />

        {/* Fetch OG metadata by URL */}
        <FetchWidget onFetch={onFetch} inline />
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt='Selected asset'
          className='mt-4 w-full max-w-xl rounded-lg shadow'
        />
      )}
    </Card>

    <div className='flex justify-end'>
      <Button onClick={onNext} disabled={disabledNext}>
        Next: Design →
      </Button>
    </div>
  </motion.div>
);
