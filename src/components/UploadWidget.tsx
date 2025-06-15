// src/components/UploadWidget.tsx
'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface UploadInfo {
  publicId: string;
  url: string;
  width: number;
  height: number;
}

interface UploadWidgetProps {
  /** Called when an upload succeeds, receives the UploadInfo */
  onUpload(info: UploadInfo): void;
  /** Disable the button while uploading or otherwise */
  disabled?: boolean;
  /** Additional classname for the button wrapper */
  className?: string;
}

/**
 * UploadWidget
 *
 * - Renders a Cloudinary upload button
 * - Shows success/error toasts via Sonner
 * - Returns secure_url + public_id + dimensions
 */
export function UploadWidget({
  onUpload,
  disabled = false,
  className = '',
}: UploadWidgetProps) {
  return (
    <CldUploadWidget
      // no `cloudName` prop here: read from NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
      options={{
        folder: 'hackit_africa/social_cards',
        sources: ['local', 'url', 'camera'],
        multiple: false,
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
        maxFileSize: 5_000_000,
      }}
      onError={(error) => {
        console.error('Cloudinary upload error:', error);
        toast.error('Upload failed. Please try again.');
      }}
      onSuccess={(res) => {
        // Cloudinary may return a string or an object
        if (!res.info || typeof res.info === 'string') return;
        const { public_id, secure_url, width, height } = res.info;
        const info: UploadInfo = {
          publicId: public_id,
          url: secure_url,
          width,
          height,
        };
        console.log('✅ uploaded:', info);
        toast.success('Image uploaded successfully!');
        onUpload(info);
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
