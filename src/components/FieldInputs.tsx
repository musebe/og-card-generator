// src/components/FieldInputs.tsx
'use client';

import { Input } from '@/components/ui/input';

export interface FieldInputsProps {
  title: string;
  subtitle: string;
  onChange(fields: { title: string; subtitle: string }): void;
}

export default function FieldInputs({
  title,
  subtitle,
  onChange,
}: FieldInputsProps) {
  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium'>Title</label>
        <Input
          value={title}
          onChange={(e) => onChange({ title: e.target.value, subtitle })}
        />
      </div>
      <div>
        <label className='block text-sm font-medium'>Subtitle</label>
        <Input
          value={subtitle}
          onChange={(e) => onChange({ title, subtitle: e.target.value })}
        />
      </div>
    </div>
  );
}
