import { useState, useMemo } from 'react';
import { cn } from '@lib/utils';

export interface GalleryImage {
    src: string;
    width: number;
    height: number;
    title?: string;
    alt?: string;
}

interface ProjectGalleryProps {
    readonly images: GalleryImage[];
    readonly className?: string;
}

type ImageCategory = 'desktop' | 'desktop-fullpage' | 'mobile' | 'mobile-fullpage';

function classifyImage(img: GalleryImage): ImageCategory {
    const ratio = img.height / img.width;

    // Landscape or square — always desktop
    if (ratio <= 1) return 'desktop';

    // Portrait with large width — desktop fullpage
    if (img.width >= 1400) return 'desktop-fullpage';

    // Portrait with small width — mobile
    return ratio > 3 ? 'mobile-fullpage' : 'mobile';
}

type CellSize = 'large' | 'medium' | 'small';

function pickCellSize(i: number, cat: ImageCategory, largeCount: number, total: number): CellSize {
    if (i === 0) return 'large';
    if (cat === 'desktop-fullpage') return i % 3 === 0 ? 'large' : 'medium';
    if (largeCount < Math.ceil(total / 5) && i % 4 === 0) return 'large';
    return i % 3 === 0 ? 'medium' : 'small';
}

function assignDesktopCellSizes(images: GalleryImage[]): CellSize[] {
    const sizes: CellSize[] = [];
    let largeCount = 0;

    for (let i = 0; i < images.length; i++) {
        const size = pickCellSize(i, classifyImage(images[i]), largeCount, images.length);
        sizes.push(size);
        if (size === 'large') largeCount++;
    }

    return sizes;
}

const desktopCellClasses: Record<CellSize, string> = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-2 row-span-1',
    small: 'col-span-1 row-span-1',
};

/* ── Lightbox ─────────────────────────────────────────── */

function LightboxModal({
    images,
    currentIndex,
    onClose,
    onChange,
}: {
    readonly images: GalleryImage[];
    readonly currentIndex: number;
    readonly onClose: () => void;
    readonly onChange: (index: number) => void;
}) {
    const image = images[currentIndex];
    const cat = classifyImage(image);
    const isMobile = cat === 'mobile' || cat === 'mobile-fullpage';
    const isFullpage = cat === 'desktop-fullpage' || cat === 'mobile-fullpage';

    const prev = () => onChange((currentIndex - 1 + images.length) % images.length);
    const next = () => onChange((currentIndex + 1) % images.length);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            {/* Backdrop close button */}
            <button
                type="button"
                className="absolute inset-0 size-full cursor-default"
                onClick={onClose}
                onKeyDown={(e) => { if (e.key === 'Escape') onClose(); else if (e.key === 'ArrowLeft') prev(); else if (e.key === 'ArrowRight') next(); }}
                aria-label="Fechar galeria"
            />

            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
                aria-label="Fechar"
            >
                &times;
            </button>

            <button
                type="button"
                onClick={prev}
                className="absolute left-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
                aria-label="Anterior"
            >
                &#8249;
            </button>

            <button
                type="button"
                onClick={next}
                className="absolute right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
                aria-label="Próxima"
            >
                &#8250;
            </button>

            <div
                className={cn(
                    'pointer-events-none relative z-10 flex flex-col items-center gap-2',
                    isFullpage ? 'max-h-[90vh] overflow-y-auto rounded-lg p-1' : 'p-4',
                    isMobile ? 'max-w-90 md:max-w-100' : 'max-w-[90vw]',
                )}
            >
                <img
                    src={image.src}
                    alt={image.alt ?? image.title ?? ''}
                    className={cn(
                        'pointer-events-auto rounded-lg',
                        isFullpage
                            ? 'w-full'
                            : 'max-h-[85vh] object-contain',
                    )}
                />
                {image.title && (
                    <span className="mt-1 text-center text-sm text-white/70">{image.title}</span>
                )}
            </div>

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/50">
                {currentIndex + 1} / {images.length}
            </span>
        </div>
    );
}

/* ── Section components ───────────────────────────────── */

function DesktopGrid({
    images,
    onImageClick,
}: {
    readonly images: GalleryImage[];
    readonly onImageClick: (image: GalleryImage) => void;
}) {
    const cellSizes = useMemo(() => assignDesktopCellSizes(images), [images]);

    return (
        <div className="grid auto-rows-[180px] grid-cols-2 grid-flow-dense gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
            {images.map((image, i) => {
                const size = cellSizes[i];
                const cat = classifyImage(image);
                const isFullpage = cat === 'desktop-fullpage';

                return (
                    <button
                        type="button"
                        key={image.src}
                        className={cn(
                            'group relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:z-10 hover:scale-[1.02] hover:shadow-2xl',
                            desktopCellClasses[size],
                        )}
                        onClick={() => onImageClick(image)}
                    >
                        <img
                            src={image.src}
                            alt={image.alt ?? image.title ?? ''}
                            loading="lazy"
                            className={cn(
                                'h-full w-full transition-transform duration-500 group-hover:scale-105',
                                isFullpage ? 'object-cover object-top' : 'object-cover',
                            )}
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        {image.title && (
                            <span className="absolute bottom-0 left-0 w-full translate-y-full bg-linear-to-t from-black/60 to-transparent px-3 pb-2 pt-6 text-sm text-white transition-transform duration-300 group-hover:translate-y-0">
                                {image.title}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

function MobileGrid({
    images,
    onImageClick,
}: {
    readonly images: GalleryImage[];
    readonly onImageClick: (image: GalleryImage) => void;
}) {
    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {images.map((image) => {
                const isFullpage = classifyImage(image) === 'mobile-fullpage';

                return (
                    <button
                        type="button"
                        key={image.src}
                        className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:z-10 hover:scale-[1.02] hover:shadow-2xl"
                        onClick={() => onImageClick(image)}
                    >
                        <div className="relative aspect-9/16 w-full">
                            <img
                                src={image.src}
                                alt={image.alt ?? image.title ?? ''}
                                loading="lazy"
                                className={cn(
                                    'h-full w-full transition-transform duration-500 group-hover:scale-105',
                                    isFullpage ? 'object-cover object-top' : 'object-cover',
                                )}
                            />
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        {image.title && (
                            <span className="absolute bottom-0 left-0 w-full translate-y-full bg-linear-to-t from-black/60 to-transparent px-3 pb-2 pt-6 text-sm text-white transition-transform duration-300 group-hover:translate-y-0">
                                {image.title}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

/* ── Main Gallery ─────────────────────────────────────── */

export function ProjectGallery({ images, className }: ProjectGalleryProps) {
    const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);

    const { desktopImages, mobileImages } = useMemo(() => {
        const desktop: GalleryImage[] = [];
        const mobile: GalleryImage[] = [];
        for (const img of images) {
            const cat = classifyImage(img);
            if (cat === 'mobile' || cat === 'mobile-fullpage') {
                mobile.push(img);
            } else {
                desktop.push(img);
            }
        }
        return { desktopImages: desktop, mobileImages: mobile };
    }, [images]);

    if (!images || images.length === 0) return null;

    const openLightbox = (group: GalleryImage[], image: GalleryImage) => {
        const index = group.indexOf(image);
        setLightbox({ images: group, index: Math.max(0, index) });
    };

    return (
        <section className={cn('relative w-full bg-surface-dim py-12 md:py-16', className)}>
            <div className="sw-container flex-col gap-10">
                <h3 className="text-on-surface">Galeria</h3>

                {desktopImages.length > 0 && (
                    <div className="space-y-4">
                        {mobileImages.length > 0 && (
                            <h4 className="text-on-surface/60 text-sm font-medium tracking-wide uppercase">
                                Desktop
                            </h4>
                        )}
                        <DesktopGrid
                            images={desktopImages}
                            onImageClick={(img) => openLightbox(desktopImages, img)}
                        />
                    </div>
                )}

                {mobileImages.length > 0 && (
                    <div className="space-y-4">
                        {desktopImages.length > 0 && (
                            <h4 className="text-on-surface/60 text-sm font-medium tracking-wide uppercase">
                                Mobile
                            </h4>
                        )}
                        <MobileGrid
                            images={mobileImages}
                            onImageClick={(img) => openLightbox(mobileImages, img)}
                        />
                    </div>
                )}
            </div>

            {lightbox && (
                <LightboxModal
                    images={lightbox.images}
                    currentIndex={lightbox.index}
                    onClose={() => setLightbox(null)}
                    onChange={(i) => setLightbox({ ...lightbox, index: i })}
                />
            )}
        </section>
    );
}
