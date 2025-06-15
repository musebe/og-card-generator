// src/lib/savedTemplates.ts
'use client'; // This code runs only in the browser

export interface SavedCard {
    id: string;
    url: string; // The final, generated Cloudinary URL
    headline: string;
    tagline: string;
}

const STORAGE_KEY = 'savedSocialCards';

// Function to get all saved cards from localStorage
export function getSavedTemplates(): SavedCard[] {
    // Make sure this code only runs in the browser
    if (typeof window === 'undefined') {
        return [];
    }
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

// Function to save a new card
export function saveTemplate(card: Omit<SavedCard, 'id'>) {
    const saved = getSavedTemplates();
    const newCard: SavedCard = {
        id: new Date().toISOString(), // Use a timestamp for a simple unique ID
        ...card,
    };
    // Add the new card to the list
    const updated = [newCard, ...saved];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}