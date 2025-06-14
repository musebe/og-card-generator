// src/components/FieldInputs.tsx

'use client';

import { FC } from 'react';
import { Input } from '@/components/ui/input';

export interface FieldInputsProps {
  /** Current title text */
  title: string;
  /** Current subtitle text */
  subtitle: string;
  /** Called whenever title or subtitle changes */
  onChange(fields: { title: string; subtitle: string }): void;
}

/**
 * Controlled inputs for Title and Subtitle.
 * Lifts changes up via `onChange`.
 */
const FieldInputs: FC<FieldInputsProps> = ({ title, subtitle, onChange }) => {
  return (
    <div className='space-y-4'>
      <div>
        <label htmlFor='field-title' className='block text-sm font-medium'>
          Title
        </label>
        <Input
          id='field-title'
          value={title}
          onChange={(e) => onChange({ title: e.target.value, subtitle })}
          placeholder='Enter your title…'
        />
      </div>

      <div>
        <label htmlFor='field-subtitle' className='block text-sm font-medium'>
          Subtitle
        </label>
        <Input
          id='field-subtitle'
          value={subtitle}
          onChange={(e) => onChange({ title, subtitle: e.target.value })}
          placeholder='Enter your subtitle…'
        />
      </div>
    </div>
  );
};

export default FieldInputs;
