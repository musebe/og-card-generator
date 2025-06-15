// src/components/GeneratedCard.tsx
'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { SavedCard } from '@/lib/db'; // Import the correct type

interface GeneratedCardProps {
  cardData: SavedCard;
  onCardClick: () => void;
}

export function GeneratedCard({ cardData, onCardClick }: GeneratedCardProps) {
  return (
    <div onClick={onCardClick} className='cursor-pointer'>
      <Card className='overflow-hidden group border-gray-700 hover:border-pink-400 transition-all duration-300 transform hover:-translate-y-1'>
        <div className='aspect-[1.91/1] w-full bg-gray-900'>
          <Image
            src={cardData.url} // Displays the saved URL directly
            alt={cardData.headline}
            width={1200}
            height={630}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
        </div>
        <div className='p-3 bg-gray-800'>
          <p className='text-sm font-semibold text-white truncate'>
            {cardData.headline}
          </p>
          <p className='text-xs text-gray-400 truncate'>{cardData.tagline}</p>
        </div>
      </Card>
    </div>
  );
}
