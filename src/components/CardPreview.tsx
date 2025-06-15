// src/components/CardPreview.tsx
'use client';

import { FC, useMemo, useState } from 'react';
import { articleOgUrl, fullOgUrl, oneThirdOgUrl } from '@/lib/ogTemplates';
import type { TemplateId } from '@/lib/templates';

interface CardPreviewProps {
  templateId: TemplateId;
  config: {
    image?: string;
    text?: { title?: string; subtitle?: string };
  };
}

const CardPreview: FC<CardPreviewProps> = ({ templateId, config }) => {
  const [errored, setErrored] = useState(false);

  if (!config.image) {
    return <div className='h-44 bg-gray-200 animate-pulse rounded-lg' />;
  }

  if (/^https?:\/\//.test(config.image)) {
    // This fallback logic for pasted URLs remains the same
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

  const finalUrl = useMemo(() => {
    try {
      const publicId = config.image!;
      const headline = config.text?.title || 'Your Headline Here';
      const body = config.text?.subtitle || 'Your subtitle or body text here';

      let generatedUrl = '';
      switch (templateId) {
        case 'full':
          generatedUrl = fullOgUrl({ publicId, headline, body });
          break;
        case 'one-third':
          generatedUrl = oneThirdOgUrl({ publicId, headline, body });
          break;
        case 'article':
        default:
          // Using the correct logo ID here as well
          const logoPublicId = 'hackit_africa/social_cards/logo';
          generatedUrl = articleOgUrl({
            publicId,
            headline,
            tagline: body,
            logoPublicId,
          });
          break;
      }

      // ✅ LOGGING: See the URL for the live preview on the right
      console.log(`RIGHT SIDE (Live Preview for ${templateId}):`, generatedUrl);

      return generatedUrl;
    } catch (err) {
      console.error('OG URL generation failed:', err);
      setErrored(true);
      return '';
    }
  }, [templateId, config.image, config.text?.title, config.text?.subtitle]);

  if (errored || !finalUrl) {
    return (
      <div className='p-4 bg-red-100 text-red-800 rounded'>
        ⚠️ Failed to generate preview.
      </div>
    );
  }

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
