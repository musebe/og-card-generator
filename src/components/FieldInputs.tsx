// src/components/FieldInputs.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface FieldInputsProps {
  templateId: string;
  initial: {
    background?: string;
    title?: string;
    subtitle?: string;
    [key: string]: any;
  };
}

export default function FieldInputs({ templateId, initial }: FieldInputsProps) {
  const [title, setTitle] = useState(initial.title || '');
  const [subtitle, setSubtitle] = useState(initial.subtitle || '');

  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium'>Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className='block text-sm font-medium'>Subtitle</label>
        <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      </div>
    </div>
  );
}
