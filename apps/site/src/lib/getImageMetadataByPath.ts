import type { ImageMetadata } from 'astro';

const projectImages = import.meta.glob('@images/projects/**/*', { eager: true });
const teamImages = import.meta.glob('@images/team/**/*', { eager: true });

const allImages = {
    ...projectImages,
    ...teamImages,
};

// General purpose image helper
export function getImageMetadataByPath(
    path: string,
): ImageMetadata | null {

    // Determine the correct key for the allImages map based on the input path format
    let lookupKey: string;
    if (path.startsWith('/src/assets/images/')) {
        lookupKey = path;
    } else if (path.startsWith('/images/')) {
        lookupKey = `/src/assets${path}`;
    } else {
        lookupKey = `/src/assets/images/${path.replace(/^\//, '')}`;
        console.warn(`Image path "${path}" has an unexpected format. Assuming it's relative to /src/assets/images/ and resolved to "${lookupKey}".`);
    }

    const imageModule = allImages[lookupKey];

    if (!imageModule) {
        console.warn(`Image module not found for path: "${path}" (resolved to key: "${lookupKey}")`);
        // console.log('Available image keys:', Object.keys(allImages).join('\n'));
        return null;
    }

    return (imageModule as { default: ImageMetadata }).default;
}
