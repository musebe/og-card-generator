// src/lib/templates.ts

export type Template = {
    id: string
    name: string
    previewUrl: string
    defaultConfig: {
        width: number
        height: number
        textPositions: {
            title: { gravity: string; x: number; y: number }
            subtitle: { gravity: string; x: number; y: number }
        }
        badgePositions?: Array<{
            name: string
            gravity: string
            x: number
            y: number
        }>
    }
}

const templates: Template[] = [
    {
        id: 'basic',
        name: 'Basic Card',
        previewUrl: '/templates/basic.png',
        defaultConfig: {
            width: 1200,
            height: 630,
            textPositions: {
                title: {
                    gravity: 'north',
                    x: 0,
                    y: 120,
                },
                subtitle: {
                    gravity: 'north',
                    x: 0,
                    y: 200,
                },
            },
            badgePositions: [
                {
                    name: 'promo',
                    gravity: 'south_west',
                    x: 50,
                    y: 50,
                },
            ],
        },
    },
    {
        id: 'split',
        name: 'Split Layout',
        previewUrl: '/templates/split.png',
        defaultConfig: {
            width: 1200,
            height: 630,
            textPositions: {
                title: {
                    gravity: 'north_east',
                    x: -50,
                    y: 120,
                },
                subtitle: {
                    gravity: 'north_east',
                    x: -50,
                    y: 200,
                },
            },
            // no default badge on this template
        },
    },
    {
        id: 'badge',
        name: 'Badge Style',
        previewUrl: '/templates/badge.png',
        defaultConfig: {
            width: 1200,
            height: 630,
            textPositions: {
                title: {
                    gravity: 'west',
                    x: 50,
                    y: 120,
                },
                subtitle: {
                    gravity: 'west',
                    x: 50,
                    y: 200,
                },
            },
            badgePositions: [
                {
                    name: 'promo',
                    gravity: 'north_east',
                    x: 50,
                    y: 50,
                },
            ],
        },
    },
]

export default templates
  