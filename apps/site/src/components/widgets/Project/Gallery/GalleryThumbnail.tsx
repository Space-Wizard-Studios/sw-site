import { cn } from '@lib/utils';
import { classifyImage, type GalleryImage } from './galleryUtils';

interface GalleryThumbnailProps {
    readonly image: GalleryImage;
    readonly className?: string;
    readonly onClick: () => void;
}

export function GalleryThumbnail({ image, className, onClick }: GalleryThumbnailProps) {
    const cat = classifyImage(image);
    const isFullpage = cat === 'desktop-fullpage' || cat === 'mobile-fullpage';

    return (
        <button
            type="button"
            className={cn(
                'group relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:z-10 hover:scale-[1.02] hover:shadow-2xl',
                className,
            )}
            onClick={onClick}
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
}
