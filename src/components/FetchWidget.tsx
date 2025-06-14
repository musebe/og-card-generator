// src/components/FetchWidget.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export interface OgInfo {
  title?: string;
  description?: string;
  image?: string;
}

interface FetchWidgetProps {
  onFetch(info: OgInfo): void;
  inline?: boolean;
}

export default function FetchWidget({
  onFetch,
  inline = false,
}: FetchWidgetProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/og-metadata?url=${encodeURIComponent(url)}`
      );
      if (!res.ok) throw new Error(res.statusText);
      const info: OgInfo = await res.json();
      onFetch(info);
      toast.success('Metadata fetched!');
      console.log('✅ OG data:', info);
    } catch (err) {
      console.error('❌ OG fetch error', err);
      toast.error('Failed to fetch metadata');
    } finally {
      setLoading(false);
    }
  };

  // Inline version: no label, full-width input
  if (inline) {
    return (
      <div className='flex w-full items-center gap-2'>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Paste article URL…'
          className='flex-1'
          aria-label='Blog or Article URL'
        />
        <Button onClick={handleFetch} disabled={loading}>
          {loading ? '⏳' : 'Fetch'}
        </Button>
      </div>
    );
  }

  // Block version: with label
  return (
    <div className='space-y-2'>
      <label htmlFor='og-url' className='block text-sm font-medium'>
        Blog or Article URL
      </label>
      <div className='flex gap-2'>
        <Input
          id='og-url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='https://example.com/post'
        />
        <Button onClick={handleFetch} disabled={loading}>
          {loading ? '⏳' : 'Fetch'}
        </Button>
      </div>
    </div>
  );
}
