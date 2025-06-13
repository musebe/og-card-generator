// src/components/TemplateSelector.tsx
'use client';

import templates, { Template } from '@/lib/templates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'motion/react';

interface TemplateSelectorProps {
  selected: string;
  onChange: (id: string) => void;
}

export default function TemplateSelector({
  selected,
  onChange,
}: TemplateSelectorProps) {
  return (
    <div className='space-y-2'>
      <h3 className='text-sm font-medium'>Choose a template</h3>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
        {templates.map((t) => (
          <motion.div key={t.id} whileHover={{ scale: 1.03 }}>
            <Card
              className={`cursor-pointer ${
                selected === t.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onChange(t.id)}
            >
              <CardHeader>
                <CardTitle className='text-sm'>{t.name}</CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <img
                  src={t.previewUrl}
                  alt={t.name}
                  className='w-full h-24 object-cover'
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
