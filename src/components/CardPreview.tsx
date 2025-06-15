// src/components/CardPreview.tsx
'use client';

import { FC, useMemo, useState } from 'react';
import { basicOgUrl, splitOgUrl, badgeOgUrl } from '@/lib/ogTemplates';
import type { TemplateId } from '@/lib/templates';

interface CardPreviewProps {
  templateId: TemplateId; // 'basic' | 'split' | 'badge'
  config: {
    image?: string; // publicId   OR https URL
    text?: { title?: string; subtitle?: string };
  };
}

const CardPreview: FC<CardPreviewProps> = ({ templateId, config }) => {
  const [errored, setErrored] = useState(false);

  /* ------------------------------------------------------------------ *
   * 1.  Show a grey skeleton until the user has either uploaded or     *
   *     pasted an image                                                *
   * ------------------------------------------------------------------ */
  if (!config.image) {
    return <div className='h-44 bg-gray-200 animate-pulse rounded-lg' />;
  }

  /* ------------------------------------------------------------------ *
   * 2.  If the asset is an arbitrary HTTPS URL, keep using the simple  *
   *     CSS-overlay fallback                                           *
   * ------------------------------------------------------------------ */
  if (/^https?:\/\//.test(config.image)) {
    return (
      <div className='relative w-full max-w-md overflow-hidden rounded-lg shadow-lg'>
        <img
          src={config.image}
          alt={config.text?.title || 'Preview'}
          className='block w-full h-auto object-cover'
        />
        <div className='absolute inset-0 bg-black/40' />
        <div className='absolute inset-0 flex flex-col items-center justify-center p-4 text-center'>
          {config.text?.title && (
            <h3 className='text-2xl font-bold text-white'>
              {config.text.title}
            </h3>
          )}
          {config.text?.subtitle && (
            <p className='mt-2 text-base text-white'>{config.text.subtitle}</p>
          )}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ *
   * 3.  Build the final Cloudinary OG-image URL for a **publicId**      *
   * ------------------------------------------------------------------ */
  const finalUrl = useMemo(() => {
    try {
      const publicId = config.image!; // we know it exists here
      const headline = config.text?.title || '';
      const body = config.text?.subtitle || '';

      switch (templateId) {
        case 'split':
          return splitOgUrl({ publicId, headline, body });

        case 'badge':
          return badgeOgUrl({ publicId, headline, body });

        /* basic (and default fall-through) */
        default: {
          const logoPublicId =
            process.env.NEXT_PUBLIC_CLOUDINARY_LOGO_PUBLIC_ID || '';
          return basicOgUrl({
            publicId,
            headline,
            tagline: body,
            logoPublicId,
          });
        }
      }
    } catch (err) {
      console.error('OG URL generation failed:', err);
      setErrored(true);
      return '';
    }
  }, [templateId, config.image, config.text?.title, config.text?.subtitle]);

  /* ------------------------------------------------------------------ *
   * 4.  Show an error banner if something went wrong                   *
   * ------------------------------------------------------------------ */
  if (errored || !finalUrl) {
    return (
      <div className='p-4 bg-red-100 text-red-800 rounded'>
        ⚠️ Failed to generate preview.
      </div>
    );
  }

  /* ------------------------------------------------------------------ *
   * 5.  Render the **finished** URL with a plain <img>. Nothing else   *
   *     is added, so the Cloudinary overlays appear exactly as coded   *
   * ------------------------------------------------------------------ */
  return (
    <div className='w-full overflow-hidden rounded-lg shadow-lg'>
      <img
        src={finalUrl}
        alt={config.text?.title || 'Live preview'}
        className='block w-full h-auto object-cover'
      />
    </div>
  );
};

export default CardPreview;
