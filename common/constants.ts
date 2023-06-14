import I18nx from "../i18nx/i18n.ts";

export const MAX_POST_SIZE = 1 << 20;
const langpath = './lang/';
export const i18n = new I18nx();
export const REPO = 'https://github.com/NaitLee/mvp';
for await (const entry of Deno.readDir(langpath)) {
    if (!entry.name.endsWith('.json')) continue;
    const lang = entry.name.slice(0, entry.name.lastIndexOf('.'));
    i18n.add(lang);
    i18n.update(lang, JSON.parse(await Deno.readTextFile(langpath + entry.name)));
}
export const DEFAULT_DATA: Metadata = {
    version: 0,
    sources: [],
    index: 0,
    provider: 'MVP',
    provider_intro: 'Metro Video Player',
    theme: {
        fore: '#ffffff',
        theme: '#0075cc',
        descent: 'rgba(0, 117, 204, 0.6)'
    },
    description: '',
    comments: [],
    discover: [],
    source_code_link: 'https://github.com/NaitLee/mvp',
    license: 'CC0',
    license_link: 'https://creativecommons.org/publicdomain/zero/1.0/legalcode',
    origin: ''
};

export const TEST_DATA: Metadata = Object.assign(Object.create(DEFAULT_DATA), {
    version: 0,
    sources: [
        [
            {
                url: '/v/big-buck-bunny.ogg',
                name: 'default',
                title: 'Big Buck Bunny',
                poster: '/p/big-buck-bunny.png',
                authors: ['Blender Foundation']
            }
        ]
    ],
    index: 0,
    theme: {
        fore: '#ffffff',
        theme: '#339933',
        descent: 'rgba(51, 102, 51, 0.6)'
    },
    description: `
This Open movie project had as main targets:

    Developing tools in Blender for editing and rendering hair, fur or grass
    Improve character animation tools for cartoonish motion and deformation
    Test Blender with giant outdoor environments, with large grassy fields and many trees with leaves
    Further validate Blender as a professional animation creation suite

And secondary:

    Create a great and good looking animation short, licensed freely as open content
    Provide content for other artists to learn from or to re-use, including documentation and tutorials

And of course: Have lots of fun!`,
    comments: [
        {
            avatar: '',
            author: 'John',
            content: 'I love it.'
        },
        {
            avatar: '',
            author: 'Rose',
            content: 'Funny and furry!'
        },
    ],
    discover: [
        {
            url: '/v/ocean.ogg',
            poster: '/p/ocean.jpg',
            title: 'Ocean',
            authors: [],
            duration: '0:07'
        }
    ]
});
