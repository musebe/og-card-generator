// src/lib/templates.ts
import { articleOgUrl, fullOgUrl, oneThirdOgUrl } from './ogTemplates';

export type Template = {
    id: TemplateId;
    name: string;
    previewUrl: string;
    defaultConfig: {
        width: number;
        height: number;
        textPositions: {
            title: { gravity: string; x: number; y: number; };
            subtitle: { gravity: string; x: number; y: number; };
        };
        badgePositions?: Array<{
            name: string;
            gravity: string;
            x: number;
            y: number;
        }>;
    };
};

export type TemplateId = 'article' | 'full' | 'one-third';

// ✅ Using the exact Public IDs you provided
const logoId = 'hackit_africa/social_cards/logo';
const galaxyBgId = 'hackit_africa/social_cards/galaxy';
const mountainBgId = 'hackit_africa/social_cards/mountain';
const dogImageId = 'hackit_africa/social_cards/dog';

const templates: Template[] = [
    {
        id: 'article',
        name: 'Article',
        previewUrl: articleOgUrl({
            publicId: galaxyBgId,
            headline: 'Title Here',
            tagline: 'Next Cloudinary',
            logoPublicId: logoId
        }),
        // ✅ FIX: Added the full default configuration
        defaultConfig: {
            width: 1200,
            height: 630,
            textPositions: {
                title: { gravity: 'north_west', x: 100, y: 100 },
                subtitle: { gravity: 'south_west', x: 180, y: 100 },
            },
            badgePositions: [
                { name: 'logo', gravity: 'south_west', x: 100, y: 102 },
            ],
        },
    },
    {
        id: 'full',
        name: 'Full',
        previewUrl: fullOgUrl({
            publicId: dogImageId,
            headline: 'Title Here',
            body: 'Subtitle Here'
        }),
        // ✅ FIX: Added the full default configuration
        defaultConfig: {
            width: 1200,
            height: 630,
            textPositions: {
                title: { gravity: 'center', x: 0, y: -50 },
                subtitle: { gravity: 'center', x: 0, y: 80 },
            },
            badgePositions: [],
        },
    },
    {
        id: 'one-third',
        name: 'One Third',
        previewUrl: oneThirdOgUrl({
            publicId: mountainBgId,
            headline: 'Title Here',
            body: 'Subtitle Here'
        }),
        // ✅ FIX: Added the full default configuration
        defaultConfig: {
            width: 1200,
            height: 630,
            textPositions: {
                title: { gravity: 'west', x: 125, y: -50 },
                subtitle: { gravity: 'west', x: 125, y: 50 },
            },
            badgePositions: [],
        },
    },
];

export default templates;