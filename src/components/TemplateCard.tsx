// src/components/TemplateCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Template } from '@/lib/templates';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link href={`/generator?template=${template.id}`}>
      <motion.div whileHover={{ scale: 1.03 }} className='cursor-pointer'>
        <Card className='overflow-hidden'>
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='w-full overflow-hidden rounded-b'>
              <Image
                src={template.previewUrl}
                alt={template.name}
                width={400}
                height={210}
                className='object-cover w-full h-auto'
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
