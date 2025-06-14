'use client';

import React, { FC, useMemo } from 'react';
import templates, { Template } from '@/lib/templates';

interface CardPreviewProps {
  /** Which template to render */
  templateId: string;
  /**
   * Rendering config:
   * - image: Cloudinary publicId (e.g. "folder/my_img") or full URL
   * - text: title/subtitle to overlay
   */
  config: {
    image?: string;
    text?: { title?: string; subtitle?: string };
  };
}

/**
 * Renders a responsive preview:
 * 1️⃣ If `config.image` missing → skeleton
 * 2️⃣ Otherwise builds a URL and shows a normal <img>
 * 3️⃣ Overlays title & subtitle using CSS
 */
const CardPreview: FC<CardPreviewProps> = ({ templateId, config }) => {
  // 1. Find template settings (for dimensions if you need them)
  const template = useMemo<Template | undefined>(
    () => templates.find((t) => t.id === templateId),
    [templateId]
  );
  if (!template) {
    console.error(`Invalid templateId "${templateId}"`);
    return (
      <div className='p-4 bg-red-100 text-red-800 rounded-lg'>
        ⚠️ Invalid template: {templateId}
      </div>
    );
  }

  // 2. Show skeleton while user hasn't selected/fetched an image
  if (!config.image) {
    return <div className='h-44 bg-gray-200 animate-pulse rounded-lg' />;
  }

  // 3. Derive final URL
  const url = /^https?:\/\//.test(config.image)
    ? config.image
    : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${config.image}.png`;

  return (
    // Container sized responsively; you can swap w-full max-w-md for your layout
    <div className='relative w-full max-w-md overflow-hidden rounded-lg shadow-lg'>
      <img
        src={url}
        alt={config.text?.title || 'Preview'}
        className='block w-full h-auto object-cover'
      />

      {/* CSS overlay */}
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 p-4 text-center'>
        {config.text?.title && (
          <h3 className='text-2xl font-bold text-white'>{config.text.title}</h3>
        )}
        {config.text?.subtitle && (
          <p className='mt-2 text-base text-white'>{config.text.subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default CardPreview;
