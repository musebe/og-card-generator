// src/lib/db.ts
import fs from 'fs/promises';
import path from 'path';

// This defines what a "Saved Card" looks like in our database
export interface SavedCard {
    id: string;
    url: string; // The final, generated OG Image URL
    headline: string;
    tagline: string;
}

const dbPath = path.join(process.cwd(), 'src/lib', 'cardData.json');

export async function readSavedDb(): Promise<SavedCard[]> {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return [];
        throw error;
    }
}

export async function writeSavedDb(data: SavedCard[]): Promise<void> {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}