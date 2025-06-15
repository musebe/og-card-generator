// src/components/TemplateGrid.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GeneratedCard } from './GeneratedCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { SavedCard } from '@/lib/db'; // Import the correct type

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import Image from 'next/image';

// Helper functions for Download and Copy buttons in the popup
function handleDownload(url?: string) {
  /* ... same as before ... */
}
async function handleCopy(url?: string) {
  /* ... same as before ... */
}

export function TemplateGrid() {
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<SavedCard | null>(null);

  // ✅ FIX: This now fetches data from your API route, which reads cardData.json
  useEffect(() => {
    async function fetchTemplates() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/templates');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
        toast.error('Could not load saved templates.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  if (isLoading) {
    return (
      <div className='text-center text-gray-400'>Loading Templates...</div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className='text-center py-16 px-6 border-2 border-dashed border-gray-700 rounded-lg'>
        <h3 className='text-xl font-semibold text-white'>
          No Templates Saved Yet
        </h3>
        <p className='mt-2 text-gray-400'>
          Go to the generator, create a design, and click "Save as Template" to
          see it here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <GeneratedCard
              cardData={card}
              onCardClick={() => setSelectedCard(card)}
            />
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className='sm:max-w-[800px] bg-gray-900 border-gray-700 text-white'>
          <DialogHeader>
            <DialogTitle className='text-xl'>
              {selectedCard?.headline}
            </DialogTitle>
          </DialogHeader>
          <div className='my-4 aspect-[1.91/1] w-full bg-black rounded-md overflow-hidden'>
            {selectedCard && (
              <Image
                src={selectedCard.url}
                alt={selectedCard.headline}
                width={1200}
                height={630}
                className='w-full h-full object-contain'
              />
            )}
          </div>
          <DialogFooter className='sm:justify-end gap-2'>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Close
              </Button>
            </DialogClose>
            <Button
              variant='outline'
              onClick={() => handleCopy(selectedCard?.url)}
            >
              Copy URL
            </Button>
            <Button onClick={() => handleDownload(selectedCard?.url)}>
              Download PNG
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
