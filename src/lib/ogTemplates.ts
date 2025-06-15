/* ------------------------------------------------------------------
   src/lib/ogTemplates.ts
   ------------------------------------------------------------------ */
import { getCldOgImageUrl } from 'next-cloudinary';

/* ==========  shared helpers  ===================================== */

const SIZE = { width: 1200, height: 630 } as const;

function font(
    px: number,
    weight: 'normal' | 'bold' = 'normal',
    color = 'white'
) {
    return { fontFamily: 'arial', fontSize: px, fontWeight: weight, color };
}

/* ==========  1. Basic – full-bleed, headline, logo + tagline  ===== */

export function basicOgUrl(opts: {
    publicId: string;
    headline: string;
    tagline: string;
    logoPublicId?: string; // ok if ‘’ – we guard for it
}) {
    const { publicId, headline, tagline, logoPublicId } = opts;

    const overlays: any[] = [
        /* background – 20 % opacity   */
        {
            publicId,
            ...SIZE,
            crop: 'fill',
            effects: [{ opacity: 20 }],
        },
        /* headline                    */
        {
            crop: 'fit',
            width: 1000,
            text: { ...font(56, 'bold'), lineSpacing: 8, text: headline },
            position: { gravity: 'north_west', x: 100, y: 90 },
        },
        /* underline (needs publicId!) */
        {
            publicId,                     //  ✅  fixes the “missing publicId” error
            width: 1000,
            height: 2,
            crop: 'fill',
            effects: [{ colorize: '100,co_white' }, { opacity: 70 }],
            position: { gravity: 'north_west', x: 100, y: 185 },
        },
        /* tagline                     */
        {
            crop: 'fit',
            width: 1000,
            text: { ...font(36, 'bold'), text: tagline },
            position: { gravity: 'south_west', x: 180, y: 110 },
        },
    ];

    /* optional logo (60 px) */
    if (logoPublicId) {
        overlays.splice(3, 0, {
            publicId: logoPublicId,
            crop: 'fit',
            width: 60,
            position: { gravity: 'south_west', x: 100, y: 110 },
        });
    }

    return getCldOgImageUrl({
        src: publicId,
        ...SIZE,
        effects: [
            { background: 'rgb:010A44' },
            { color: 'rgb:2A005F', colorize: '100' },
            { gradientFade: 'symmetric' },
        ],
        overlays,
    });
}

/* ==========  2. Split – 35 % strip on the right  ================== */

export function splitOgUrl(opts: {
    publicId: string;
    headline: string;
    body: string;
}) {
    const { publicId, headline, body } = opts;

    return getCldOgImageUrl({
        src: publicId,
        ...SIZE,
        effects: [{ colorize: '100,co_white' }],
        overlays: [
            /* photo strip (0 .35 × 1 .0)  — tighten / loosen with width % */
            {
                publicId,
                flags: ['relative'],
                position: { gravity: 'north_east' },
                effects: [
                    { crop: 'fill', gravity: 'auto', width: '0.35', height: '1.0' },
                ],
            },
            /* headline — adjust x / y or fontSize if it wraps too much      */
            {
                crop: 'fit',
                width: 680,
                text: { ...font(68, 'bold', 'black'), text: headline },
                position: { gravity: 'west', x: 90, y: 50 },
            },
            /* body                                                           */
            {
                crop: 'fit',
                width: 680,
                text: { ...font(34, 'normal', 'black'), text: body },
                position: { gravity: 'west', x: 90, y: 220 },
            },
        ],
    });
}

/* ==========  3. Badge – centred content, dark tint  =============== */

export function badgeOgUrl(opts: {
    publicId: string;
    headline: string;
    body: string;
}) {
    const { publicId, headline, body } = opts;

    /* quick helper so we can “centre” things */
    const centerY = Math.round((SIZE.height - 250) / 2); // (630-250)/2 ≈ 190

    return getCldOgImageUrl({
        src: publicId,
        ...SIZE,
        effects: [{ colorize: '80,co_black' }],
        overlays: [
            /* badge thumb -------------------------------------------------- */
            {
                publicId,
                width: 250,
                height: 250,
                crop: 'fill',
                effects: [{ radius: 12 }],
                position: { gravity: 'north_west', x: 100, y: centerY },
            },
            /* headline ----------------------------------------------------- */
            {
                crop: 'fit',
                width: 780,
                text: { ...font(60, 'bold'), text: headline },
                position: { gravity: 'north_west', x: 380, y: centerY + 10 },
            },
            /* body --------------------------------------------------------- */
            {
                crop: 'fit',
                width: 780,
                text: { ...font(38), text: body },
                position: { gravity: 'north_west', x: 380, y: centerY + 140 },
            },
        ],
    });
}

/* ------------------------------------------------------------------
   Tweaking positions later?
   ------------------------------------------------------------------
   – BASIC   : edit the `position` objects right below the declaration
               (north_west x/y for headline, underline & tagline).
 
   – SPLIT   : change the `width:` of the “photo strip” overlay
               (0 .35 == 35 %), or nudge the two text overlays.
 
   – BADGE   : bump `centerY`, or x-offsets (100 / 380) to move
               everything horizontally. Font sizes are the first
               parameter in the `font()` helper.
   ------------------------------------------------------------------ */
   