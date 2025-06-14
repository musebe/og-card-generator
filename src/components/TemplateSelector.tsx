// src/components/TemplateSelector.tsx

'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import templates, { Template } from '@/lib/templates';

interface TemplateSelectorProps {
  /** Currently selected template ID */
  selected: string;
  /** Called when the user clicks a template */
  onChange(id: string): void;
}

/**
 * Renders a horizontal list of available templates.
 * Highlights the currently selected one and notifies parent on click.
 */
const TemplateSelector: FC<TemplateSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Choose a template</p>

      <div className="flex gap-4 overflow-x-auto py-2">
        {templates.map((t: Template) => {
          const isSelected = t.id === selected;
          return (
            <motion.div
              key={t.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 w-40"
            >
              <div
                role="button"
                aria-pressed={isSelected}
                onClick={() => onChange(t.id)}
                className={`
                  cursor-pointer
                  border rounded-lg overflow-hidden
                  ${isSelected ? 'border-pink-400 ring-2 ring-pink-400' : 'border-gray-600'}
                  transition-colors
                `}
              >
                <div className="bg-gray-800 p-2 text-xs text-center text-gray-200">
                  {t.name}
                </div>
                <Image
                  src={t.previewUrl}
                  alt={t.name}
                  width={360}
                  height={180}
                  className="object-cover w-full h-24"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
