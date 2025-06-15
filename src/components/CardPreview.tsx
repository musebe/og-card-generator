// src/components/CardPreview.tsx
'use client';

import { FC, useMemo, useState, useEffect } from 'react'; // Import useEffect
import { articleOgUrl, fullOgUrl, oneThirdOgUrl } from '@/lib/ogTemplates';
import type { TemplateId } from '@/lib/templates';

interface CardPreviewProps {
  templateId: TemplateId;
  config: {
    image?: string;
    text?: { title?: string; subtitle?: string };
  };
  // ✅ FIX: Add a prop to send the generated URL back up to the parent.
  onUrlGenerated: (url: string) => void;
}

const CardPreview: FC<CardPreviewProps> = ({
  templateId,
  config,
  onUrlGenerated,
}) => {
  const [errored, setErrored] = useState(false);

  // The logic for the component itself remains the same as your working version.
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
          const logoPublicId = 'hackit_africa/social_cards/logo';
          generatedUrl = articleOgUrl({
            publicId,
            headline,
            tagline: body,
            logoPublicId,
          });
          break;
      }
      return generatedUrl;
    } catch (err) {
      console.error('OG URL generation failed in CardPreview:', err);
      setErrored(true);
      return '';
    }
  }, [templateId, config.image, config.text?.title, config.text?.subtitle]);

  // ✅ FIX: This new hook watches for changes to finalUrl.
  // When a new URL is generated, it sends it to the parent component.
  useEffect(() => {
    if (finalUrl && !errored) {
      onUrlGenerated(finalUrl);
    }
  }, [finalUrl, errored, onUrlGenerated]);

  // The rest of the component's rendering logic is the same.
  if (errored || !finalUrl) {
    return (
      <div className='p-4 bg-red-100 text-red-800 rounded'>
        {' '}
        ⚠️ Failed to generate preview.{' '}
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
