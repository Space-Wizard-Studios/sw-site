import { useState, useMemo } from 'react';
import { cn } from '@lib/utils';
import { classifyImage, isMobileCategory, type GalleryImage } from './galleryUtils';
import { DesktopGrid } from './DesktopGrid';
import { MobileGrid } from './MobileGrid';
import { LightboxModal } from './LightboxModal';

export type { GalleryImage } from './galleryUtils';

interface ProjectGalleryProps {
    readonly images: GalleryImage[];
    readonly className?: string;
}

export function ProjectGallery({ images, className }: ProjectGalleryProps) {
    const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);

    const { desktopImages, mobileImages } = useMemo(() => {
        const desktop: GalleryImage[] = [];
        const mobile: GalleryImage[] = [];
        for (const img of images) {
            if (isMobileCategory(classifyImage(img))) {
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
                            <h4 className="text-on-surface/60 text-sm font-medium tracking-wide uppercase">Desktop</h4>
                        )}
                        <DesktopGrid images={desktopImages} onImageClick={(img) => openLightbox(desktopImages, img)} />
                    </div>
                )}

                {mobileImages.length > 0 && (
                    <div className="space-y-4">
                        {desktopImages.length > 0 && (
                            <h4 className="text-on-surface/60 text-sm font-medium tracking-wide uppercase">Mobile</h4>
                        )}
                        <MobileGrid images={mobileImages} onImageClick={(img) => openLightbox(mobileImages, img)} />
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
