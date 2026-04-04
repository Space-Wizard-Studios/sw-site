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

    // Open dialog and lock body scroll
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (!dialog.open) {
            dialog.showModal();
        }

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
        };

        const handleCancel = (e: Event) => {
            e.preventDefault();
            onClose();
        };

        const handleClick = (e: MouseEvent) => {
            if (e.target === dialog) onClose();
        };

        dialog.addEventListener('keydown', handleKeyDown);
        dialog.addEventListener('cancel', handleCancel);
        dialog.addEventListener('click', handleClick);
        return () => {
            document.body.style.overflow = prevOverflow;
            dialog.removeEventListener('keydown', handleKeyDown);
            dialog.removeEventListener('cancel', handleCancel);
            dialog.removeEventListener('click', handleClick);
        };
    }, [prev, next, onClose]);

    return (
        <dialog
            ref={dialogRef}
            className="fixed inset-0 z-50 m-0 flex h-dvh w-screen max-h-dvh max-w-[100vw] items-center justify-center bg-black/90 p-0 backdrop:bg-transparent"
        >
            {/* Close button */}
            <button
                type="button"
                onClick={onClose}
                className="fixed top-4 right-4 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Fechar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            {/* Navigation: Previous */}
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="fixed left-4 top-1/2 z-50 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Anterior"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            {/* Navigation: Next */}
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="fixed right-4 top-1/2 z-50 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Próxima"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>

            {/* Image container */}
            <div
                className={cn(
                    'flex flex-col items-center rounded-lg',
                    isFullpage
                        ? 'max-h-[85dvh] overflow-y-auto overscroll-contain p-1'
                        : 'max-h-[85dvh]',
                    isMobile ? 'w-full max-w-80 md:max-w-96' : 'w-full max-w-[90vw]',
                )}
            >
                <img
                    src={image.src}
                    alt={image.alt ?? image.title ?? ''}
                    className={cn(
                        'max-w-full rounded-lg',
                        isFullpage ? 'w-full' : 'max-h-[80dvh] object-contain',
                    )}
                />
            </div>

            {/* Caption + Counter */}
            <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-1">
                {image.title && (
                    <span className="text-center text-sm text-white/70">{image.title}</span>
                )}
                <span className="text-xs text-white/50">
                    {currentIndex + 1} / {images.length}
                </span>
            </div>
        </dialog>
    );
}
