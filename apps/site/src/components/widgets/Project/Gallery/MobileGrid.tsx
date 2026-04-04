import type { GalleryImage } from './galleryUtils';
import { GalleryThumbnail } from './GalleryThumbnail';

interface MobileGridProps {
    readonly images: GalleryImage[];
    readonly onImageClick: (image: GalleryImage) => void;
}

export function MobileGrid({ images, onImageClick }: MobileGridProps) {
    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {images.map((image) => (
                <GalleryThumbnail
                    key={image.src}
                    image={image}
                    className="aspect-9/16"
                    onClick={() => onImageClick(image)}
                />
            ))}
        </div>
    );
}
