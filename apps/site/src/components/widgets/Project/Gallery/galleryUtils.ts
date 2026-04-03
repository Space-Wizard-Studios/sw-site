export interface GalleryImage {
    src: string;
    width: number;
    height: number;
    title?: string;
    alt?: string;
}

export type ImageCategory = 'desktop' | 'desktop-fullpage' | 'mobile' | 'mobile-fullpage';

export function classifyImage(img: GalleryImage): ImageCategory {
    const ratio = img.height / img.width;

    if (ratio <= 1) return 'desktop';
    if (img.width >= 1400) return 'desktop-fullpage';
    return ratio > 3 ? 'mobile-fullpage' : 'mobile';
}

export function isMobileCategory(cat: ImageCategory): boolean {
    return cat === 'mobile' || cat === 'mobile-fullpage';
}

export type CellSize = 'large' | 'medium' | 'small';

export const desktopCellClasses: Record<CellSize, string> = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-2 row-span-1',
    small: 'col-span-1 row-span-1',
};

function pickCellSize(i: number, cat: ImageCategory, largeCount: number, total: number): CellSize {
    if (i === 0) return 'large';
    if (cat === 'desktop-fullpage') return i % 3 === 0 ? 'large' : 'medium';
    if (largeCount < Math.ceil(total / 5) && i % 4 === 0) return 'large';
    return i % 3 === 0 ? 'medium' : 'small';
}

export function assignDesktopCellSizes(images: GalleryImage[]): CellSize[] {
    const sizes: CellSize[] = [];
    let largeCount = 0;

    for (let i = 0; i < images.length; i++) {
        const size = pickCellSize(i, classifyImage(images[i]), largeCount, images.length);
        sizes.push(size);
        if (size === 'large') largeCount++;
    }

    return sizes;
}
