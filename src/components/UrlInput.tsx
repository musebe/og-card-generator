// src/components/UrlInput.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UrlInputProps {
  onFetch: (url: string) => void;
}

export default function UrlInput({ onFetch }: UrlInputProps) {
  const [value, setValue] = useState('');

  return (
    <div className='space-y-2'>
      <label htmlFor='og-url' className='block text-sm font-medium'>
        Blog or Article URL
      </label>
      <div className='flex gap-2'>
        <Input
          id='og-url'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='https://example.com/your-post'
        />
        <Button onClick={() => onFetch(value)}>Fetch</Button>
      </div>
    </div>
  );
}
