import { useMemo } from 'react';
import { assignDesktopCellSizes, desktopCellClasses, type GalleryImage } from './galleryUtils';
import { GalleryThumbnail } from './GalleryThumbnail';

interface DesktopGridProps {
    readonly images: GalleryImage[];
    readonly onImageClick: (image: GalleryImage) => void;
}

export function DesktopGrid({ images, onImageClick }: DesktopGridProps) {
    const cellSizes = useMemo(() => assignDesktopCellSizes(images), [images]);

    return (
        <div className="grid auto-rows-[180px] grid-cols-2 grid-flow-dense gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
            {images.map((image, i) => (
                <GalleryThumbnail
                    key={image.src}
                    image={image}
                    className={desktopCellClasses[cellSizes[i]]}
                    onClick={() => onImageClick(image)}
                />
            ))}
        </div>
    );
}
