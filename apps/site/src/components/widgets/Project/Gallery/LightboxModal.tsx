import { useEffect, useRef, useCallback } from 'react';
import { cn } from '@lib/utils';
import { classifyImage, type GalleryImage } from './galleryUtils';

interface LightboxModalProps {
    readonly images: GalleryImage[];
    readonly currentIndex: number;
    readonly onClose: () => void;
    readonly onChange: (index: number) => void;
}

export function LightboxModal({ images, currentIndex, onClose, onChange }: LightboxModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const image = images[currentIndex];
    const cat = classifyImage(image);
    const isMobile = cat === 'mobile' || cat === 'mobile-fullpage';
    const isFullpage = cat === 'desktop-fullpage' || cat === 'mobile-fullpage';

    const prev = useCallback(() => onChange((currentIndex - 1 + images.length) % images.length), [currentIndex, images.length, onChange]);
    const next = useCallback(() => onChange((currentIndex + 1) % images.length), [currentIndex, images.length, onChange]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (!dialog.open) {
            dialog.showModal();
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev();
            else if (e.key === 'ArrowRight') next();
        };

        const handleCancel = (e: Event) => {
            e.preventDefault();
            onClose();
        };

        dialog.addEventListener('keydown', handleKeyDown);
        dialog.addEventListener('cancel', handleCancel);
        return () => {
            dialog.removeEventListener('keydown', handleKeyDown);
            dialog.removeEventListener('cancel', handleCancel);
        };
    }, [prev, next, onClose]);

    return (
        <dialog
            ref={dialogRef}
            className="fixed inset-0 z-50 flex max-h-dvh max-w-[100vw] items-center justify-center bg-transparent backdrop:bg-black/90 backdrop:backdrop-blur-sm"
        >
            {/* Invisible backdrop button for click-to-close */}
            <button
                type="button"
                className="absolute inset-0 size-full cursor-default"
                onClick={onClose}
                aria-label="Fechar galeria"
            />

            <div className="relative flex items-center justify-center">
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
                            isFullpage ? 'w-full' : 'max-h-[85vh] object-contain',
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
        </dialog>
    );
}
