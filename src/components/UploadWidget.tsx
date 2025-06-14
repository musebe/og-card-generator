// src/components/UploadWidget.tsx
'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface UploadInfo {
  publicId: string;
  url: string;
  width: number;
  height: number;
}

interface UploadWidgetProps {
  onUpload(info: UploadInfo): void;
  disabled?: boolean;
  className?: string;
}

export function UploadWidget({
  onUpload,
  disabled = false,
  className = '',
}: UploadWidgetProps) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
      options={{
        folder: 'hackit_africa/social_cards',
      }}
      onSuccess={(res) => {
        // guard both undefined and string-case
        if (!res.info || typeof res.info === 'string') return;

        const info = res.info;
        const out: UploadInfo = {
          publicId: info.public_id,
          url: info.secure_url,
          width: info.width,
          height: info.height,
        };
        console.log('✅ uploaded:', out);
        onUpload(out);
      }}
    >
      {({ open }) => (
        <Button
          type='button'
          disabled={disabled}
          onClick={() => open()}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 p-0 text-white hover:bg-amber-600',
            className
          )}
        >
          <UploadCloud className='h-4 w-4' />
        </Button>
      )}
    </CldUploadWidget>
  );
}
