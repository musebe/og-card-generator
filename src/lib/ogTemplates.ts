/* ------------------------------------------------------------------
   src/lib/ogTemplates.ts
   ------------------------------------------------------------------ */
import { getCldOgImageUrl } from 'next-cloudinary';

const SIZE = { width: 1200, height: 630 } as const;

/* ==========  1. Article Template (from Docs)  ====================== */
export function articleOgUrl(opts: {
    publicId: string;
    headline: string;
    tagline: string;
    logoPublicId: string;
}) {
    return getCldOgImageUrl({
        src: opts.publicId, // The base src is the user's image
        ...SIZE,
        effects: [
            { background: 'rgb:010A44' },
            { color: 'rgb:2A005F', colorize: '100' },
            { gradientFade: 'symmetric' },
        ],
        overlays: [
            { publicId: opts.publicId, ...SIZE, crop: 'fill', effects: [{ opacity: 20 }] },
            {
                width: 1000,
                crop: 'fit',
                text: { color: 'white', fontFamily: 'Merriweather', fontSize: 58, fontWeight: 'bold', lineSpacing: 10, text: opts.headline },
                position: { x: 100, y: 100, gravity: 'north_west' },
            },
            {
                // Underline - using the main publicId as the base as per the docs
                publicId: opts.publicId,
                width: 1000,
                height: 2,
                effects: [{ colorize: '100,co_white', opacity: 70 }],
                position: { x: 100, y: 175, gravity: 'south_west' },
            },
            { publicId: opts.logoPublicId, width: 60, crop: 'fit', position: { x: 100, y: 102, gravity: 'south_west' } },
            {
                text: { color: 'white', fontFamily: 'Lato', fontSize: 37, fontWeight: 'bold', text: opts.tagline },
                position: { x: 180, y: 100, gravity: 'south_west' },
            },
        ],
    });
}

/* ==========  2. Full Template (the one that works)  ================ */
export function fullOgUrl(opts: {
    publicId: string;
    headline: string;
    body: string;
}) {
    return getCldOgImageUrl({
        src: opts.publicId,
        ...SIZE,
        effects: [{ colorize: '80,co_black' }],
        overlays: [
            { width: 900, crop: 'fit', text: { fontFamily: 'Source Sans Pro', fontSize: 80, fontWeight: 'bold', color: 'white', alignment: 'center', text: opts.headline }, position: { y: -50 } },
            { width: 900, crop: 'fit', text: { fontFamily: 'Source Sans Pro', fontSize: 42, color: 'white', alignment: 'center', text: opts.body }, position: { y: 80 } },
        ],
    });
}

/* ==========  3. One Third Template (from Docs)  ==================== */
export function oneThirdOgUrl(opts: {
    publicId: string;
    headline: string;
    body: string;
}) {
    return getCldOgImageUrl({
        src: opts.publicId, // The base src is the user's image
        ...SIZE,
        effects: [{ colorize: '100,co_white' }], // This creates the white background
        overlays: [
            {
                publicId: opts.publicId, // The user's image is added back on top
                position: { gravity: 'north_east' },
                effects: [{ crop: 'fill', gravity: 'auto', width: '0.33', height: '1.0' }],
                flags: ['relative'],
            },
            {
                width: 625,
                crop: 'fit',
                text: { color: 'black', fontFamily: 'Source Sans Pro', fontSize: 80, fontWeight: 'bold', text: opts.headline },
                position: { x: 125, y: -50, gravity: 'west' },
            },
            {
                width: 625,
                crop: 'fit',
                text: { color: 'black', fontFamily: 'Source Sans Pro', fontSize: 37, text: opts.body },
                position: { x: 125, y: 50, gravity: 'west' },
            },
        ],
    });
   }