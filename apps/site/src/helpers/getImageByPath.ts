import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

// Import all images from different collections
const projectImages = import.meta.glob('@images/projects/**/*', { eager: true });
const teamImages = import.meta.glob('@images/team/**/*', { eager: true });

// Combine all collections
const allImages = {
    ...projectImages,
    ...teamImages,
};

type ProcessedImageResult = {
    htmlImage: string; // Changed from HTMLImageElement to string
    src: string;
    attributes: {
        width: number;
        height: number;
        sizes?: string;
        srcset?: string;
    };
};

type ImageOptions = {
    width?: number;
    height?: number;
    alt?: string;
    format?: string;
    fit?: string;
    position?: string;
    quality?: number;
    densities?: (number | `${number}x`)[];
    widths?: number[];
};

// Default options constant
const DEFAULT_IMAGE_OPTIONS: ImageOptions = {
    width: 1920,
    height: 1080,
    format: 'webp',
    fit: 'contain',
    position: 'center',
    quality: 80,
    densities: [1],
    widths: [1920],
};

// General purpose image helper
export async function getImageByPath(
    path: string,
    alt?: string,
    options: ImageOptions = {},
): Promise<ProcessedImageResult | null> {
    // Merge provided options with defaults
    const optionsConfig = { ...DEFAULT_IMAGE_OPTIONS, ...options };

    // Determine the correct key for the allImages map based on the input path format
    let lookupKey: string;
    if (path.startsWith('/src/assets/images/')) {
        // Path already matches the expected glob key format
        lookupKey = path;
    } else if (path.startsWith('/images/')) {
        // Path starts with /images/, prepend /src/assets to match the glob key format
        lookupKey = `/src/assets${path}`;
    } else {
        // Handle other potential formats or log a warning
        // Assuming it might be relative to '/src/assets/images/' if no known prefix is found
        lookupKey = `/src/assets/images/${path.replace(/^\//, '')}`; // Remove leading slash if present before prepending
        console.warn(`Image path "${path}" has an unexpected format. Assuming it's relative to /src/assets/images/ and resolved to "${lookupKey}".`);
    }

    const imageModule = allImages[lookupKey];

    if (!imageModule) {
        console.warn(`Image module not found for path: "${path}" (resolved to key: "${lookupKey}")`);
        console.log('Available image keys:', Object.keys(allImages).join('\n'));
        return null;
    }

    const width = optionsConfig.width;
    const height = optionsConfig.height;

    const processedImage = await getImage({
        src: (imageModule as { default: ImageMetadata }).default,
        alt: alt || '',
        width,
        height,
        format: optionsConfig.format,
        fit: optionsConfig.fit,
        inferSize: true,
        position: optionsConfig.position,
        quality: optionsConfig.quality,
        widths: [...optionsConfig.widths],
    });

    // Create HTML image string
    const imgAttributes = processedImage.attributes;
    const htmlString = `<img src="${processedImage.src}" alt="${imgAttributes.alt || ''}" width="${imgAttributes.width}" height="${imgAttributes.height}" ${imgAttributes.srcset ? `srcset="${imgAttributes.srcset}"` : ''} ${imgAttributes.sizes ? `sizes="${imgAttributes.sizes}"` : ''}>`;

    // Ensure we return the exact shape expected by ProcessedImageResult
    return {
        htmlImage: htmlString,
        src: processedImage.src,
        attributes: {
            width: imgAttributes.width as number,
            height: imgAttributes.height as number,
            sizes: imgAttributes.sizes,
            srcset: imgAttributes.srcset,
        },
    };
}
