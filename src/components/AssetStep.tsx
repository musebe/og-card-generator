// src/components/AssetStep.tsx
'use client';

import { FC } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadWidget, UploadInfo } from '@/components/UploadWidget';
import FetchWidget, { OgInfo } from '@/components/FetchWidget';

interface AssetStepProps {
  /** Current image URL (either uploaded or OG‐fetched) */
  imageUrl: string;
  /** Called with UploadInfo when user uploads */
  onUpload(info: UploadInfo): void;
  /** Called with OG metadata when user fetches via URL */
  onFetch(data: OgInfo): void;
  /** Advance to next step */
  onNext(): void;
  /** Disable Next button until we have an image */
  disabledNext: boolean;
}

/**
 * Step 1: Asset selection
 * — Upload via Cloudinary or fetch OG metadata from a link
 */
export const AssetStep: FC<AssetStepProps> = ({
  imageUrl,
  onUpload,
  onFetch,
  onNext,
  disabledNext,
}) => (
  <Card className='p-6 space-y-4'>
    <h2 className='text-xl font-semibold'>1. Asset</h2>

    <div className='flex items-center gap-4'>
      <UploadWidget onUpload={onUpload} />
      <FetchWidget onFetch={onFetch} inline />
    </div>

    {imageUrl && (
      <img
        src={imageUrl}
        alt='Selected asset'
        className='mt-4 w-full max-w-md rounded-lg shadow'
      />
    )}

    <div className='flex justify-end'>
      <Button onClick={onNext} disabled={disabledNext}>
        Next: Design →
      </Button>
    </div>
  </Card>
);
