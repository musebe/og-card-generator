// src/components/AssetStep.tsx
'use client';

import { FC } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadWidget, UploadInfo } from '@/components/UploadWidget';
// import FetchWidget, { OgInfo } from '@/components/FetchWidget';

interface AssetStepProps {
  imageUrl: string;
  onUpload(info: UploadInfo): void;
  onFetch(data: any): void; // Still in props in case it's reused soon
  onNext(): void;
  disabledNext: boolean;
}

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
      <div className='flex items-center gap-2'>
        <UploadWidget onUpload={onUpload} />
        <span className='text-sm text-muted-foreground'>
          Click to upload an image
        </span>
      </div>

      {/*
      <FetchWidget onFetch={onFetch} inline />
      */}
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
