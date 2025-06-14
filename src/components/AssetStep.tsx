// src/components/AssetStep.tsx
'use client';

import { FC } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { UploadWidget, UploadInfo } from '@/components/UploadWidget';
import FetchWidget, { OgInfo } from '@/components/FetchWidget';
import { Button } from '@/components/ui/button';

export interface AssetStepProps {
  /** The currently selected image URL (upload or OG) */
  imageUrl?: string;
  /** Called when the user uploads via Cloudinary */
  onUpload(info: UploadInfo): void;
  /** Called when the user fetches OG metadata */
  onFetch(info: OgInfo): void;
  /** Move to the next step */
  onNext(): void;
  /** Disable “Next” until an asset is chosen */
  disabledNext: boolean;
}

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
        {/* Upload via Cloudinary widget */}
        <UploadWidget onUpload={onUpload} />

        {/* Fetch via URL with toasts & error handling (inline mode) */}
        <FetchWidget onFetch={onFetch} inline />
      </div>

      {/* Live preview of the chosen asset */}
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
