// src/app/api/templates/route.ts
import { NextResponse } from 'next/server';
import { readSavedDb, writeSavedDb, SavedCard } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

// API endpoint to get all saved templates
export async function GET() {
    const cards = await readSavedDb();
    return NextResponse.json(cards);
}

// API endpoint to save a new template
export async function POST(request: Request) {
    try {
        const { url, headline, tagline }: Omit<SavedCard, 'id'> = await request.json();
        if (!url || !headline) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const savedCards = await readSavedDb();
        const newCard: SavedCard = { id: uuidv4(), url, headline, tagline };
        savedCards.unshift(newCard); // Add to the start
        await writeSavedDb(savedCards);
        return NextResponse.json(newCard, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save template' }, { status: 500 });
    }
}