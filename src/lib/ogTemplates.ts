/* ------------------------------------------------------------------
   src/lib/ogTemplates.ts
   ------------------------------------------------------------------ */
import { getCldOgImageUrl } from 'next-cloudinary';

const SIZE = { width: 1200, height: 630 } as const;

/* ==========  1. Article Template (Final, Stable Version)  =========== */
export function articleOgUrl(opts: {
    publicId: string;
    headline: string;
    tagline: string;
    logoPublicId: string;
}) {
    // This is a stable, existing image from your account that will act as a
    // "canvas" for the background effects.
    const canvasPublicId = 'hackit_africa/social_cards/galaxy';

    return getCldOgImageUrl({
        // 1. The SRC is now the stable canvas, not the dynamic image.
        src: canvasPublicId,
        width: 1200,
        height: 630,
        // 2. The complex effects are applied safely to this stable canvas.
        effects: [
            { background: 'rgb:010A44' },
            { color: 'rgb:2A005F', colorize: '100' },
            { gradientFade: 'symmetric' },
        ],
        // 3. Your dynamic image and all text are placed on top as overlays.
        overlays: [
            { publicId: opts.publicId, width: 1200, height: 630, crop: 'fill', effects: [{ opacity: 20 }] },
            {
                width: 1000,
                crop: 'fit',
                text: {
                    color: 'white',
                    fontFamily: 'Merriweather',
                    fontSize: 58,
                    fontWeight: 'bold',
                    lineSpacing: 10,
                    text: opts.headline,
                },
                position: { x: 100, y: 100, gravity: 'north_west' },
            },
            {
                publicId: canvasPublicId, // Underline can also use the canvas asset
                width: 1000,
                height: 2,
                effects: [{ colorize: '100,co_white', opacity: 70 }],
                position: { x: 100, y: 175, gravity: 'south_west' },
            },
            { publicId: opts.logoPublicId, width: 60, crop: 'fit', position: { x: 100, y: 102, gravity: 'south_west' } },
            {
                text: {
                    color: 'white',
                    fontFamily: 'Lato',
                    fontSize: 37,
                    fontWeight: 'bold',
                    text: opts.tagline,
                },
                position: { x: 180, y: 100, gravity: 'south_west' },
            },
        ],
    });
}

/* ==========  2. Full Template (Working Version)  ==================== */
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

/* ==========  3. One Third Template (Final Polished Layout) ======== */
export function oneThirdOgUrl(opts: {
    publicId: string;
    headline: string;
    body: string;
}) {
    return getCldOgImageUrl({
        // Base is the user's image, tinted white for the text background
        src: opts.publicId,
        width: 1200,
        height: 630,
        effects: [{ colorize: '100,co_white' }],
        overlays: [
            // 1. Image on the RIGHT 65% (This part is correct)
            {
                publicId: opts.publicId,
                position: { gravity: 'east' },
                effects: [
                    {
                        crop: 'fill',
                        gravity: 'auto',
                        width: '0.65',
                        height: '1.0'
                    }
                ],
                flags: ['relative'],
            },
            // 2. The headline, with final font size and spacing
            {
                width: 380, // Text area width in the 35% space
                crop: 'fit',
                text: {
                    color: 'black',
                    fontFamily: 'Source Sans Pro',
                    // ✅ FIX: Increased font size for visibility
                    fontSize: 50,
                    fontWeight: 'bold',
                    lineSpacing: -10,
                    text: opts.headline
                },
                position: {
                    gravity: 'west', // Anchored to the vertical center of the left edge
                    x: 40,
                    // ✅ FIX: Adjusted Y position for better spacing
                    y: -60,
                },
            },
            // 3. The body text, with final font size and spacing
            {
                width: 380,
                crop: 'fit',
                text: {
                    color: 'rgb:6b7280', // Dark grey
                    fontFamily: 'Source Sans Pro',
                    // ✅ FIX: Increased font size for readability
                    fontSize: 29,
                    lineSpacing: 5,
                    text: opts.body
                },
                position: {
                    gravity: 'west',
                    x: 40,
                    // ✅ FIX: Adjusted Y position for better spacing
                    y: 80,
                },
            },
        ],
    });
}