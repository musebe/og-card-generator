// src/app/components/UploadWidget.tsx

'use client';
import { CldUploadWidget } from 'next-cloudinary';

export function UploadWidget({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
      options={{ folder: 'hackit_africa/social_cards' }}
      onUpload={(result) => {
        if (result.info.secure_url) onUpload(result.info.secure_url);
      }}
    >
      {({ open }) => (
        <button onClick={() => open()}>Upload background image</button>
      )}
    </CldUploadWidget>
  );
}
