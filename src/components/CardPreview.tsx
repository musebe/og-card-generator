// src/components/CardPreview.tsx
'use client';

import { CldOgImage } from 'next-cloudinary';
import type { ReactNode } from 'react';

interface CardPreviewProps {
  templateId: string;
  config: {
    image?: string;
    text?: Record<string, string>;
  };
}

export default function CardPreview({ templateId, config }: CardPreviewProps) {
  if (!config.image) {
    return <div className='h-44 bg-gray-200 animate-pulse rounded' />;
  }

  return (
    <div className='overflow-hidden rounded-lg shadow-lg'>
      <CldOgImage
        src={config.image}
        width={1200}
        height={630}
        alt='Live preview'
        overlays={[
          {
            text: {
              color: 'white',
              fontFamily: 'Arial',
              fontSize: 60,
              fontWeight: 'bold',
              text: config.text?.title || '',
            },
            position: {
              gravity: 'north_west',
              x: 50,
              y: 50,
            },
          },
        ]}
      />
    </div>
  );
}
