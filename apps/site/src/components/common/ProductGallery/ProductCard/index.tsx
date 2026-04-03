import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { Planet } from '@icons/UI';
import { ProductFront } from './ProductFront';
import { ProductBack } from './ProductBack';
import { cn } from '@lib/utils';

import type { ProcessedProduct } from '@lib/collections/productHelpers';
import { useRef, type PointerEvent, type RefObject } from 'react';

interface Props {
    index: number;
    product: ProcessedProduct;
    isActive: boolean;
    setActiveCard: (index: number, target: RefObject<HTMLDivElement | null>) => void;
}

export function ProductCard({ index, product, isActive, setActiveCard }: Props) {
    const targetRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const { title, summary = '', description = '' } = product;

    const neonBorder = useMotionTemplate`
        radial-gradient(
            100px circle at ${mouseX}px ${mouseY}px,
            rgba(255, 80, 200, 1),
            rgba(168, 85, 247, 0.9) 40%,
            rgba(34, 211, 238, 0.4) 60%,
            transparent 30%
        )
    `;

    const neonGlow = useMotionTemplate`
        radial-gradient(
            260px circle at ${mouseX}px ${mouseY}px,
            rgba(255, 80, 200, 0.55),
            rgba(168, 85, 247, 0.35),
            transparent 15%
        )
    `;

    const updatePointerPosition = ({ currentTarget, clientX, clientY }: PointerEvent<HTMLDivElement>) => {
        const rect = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - rect.left);
        mouseY.set(clientY - rect.top);
    };

    return (
        <div className={cn('relative flex min-h-72')}>
            <div className='group relative h-full w-full' onPointerEnter={updatePointerPosition} onPointerMove={updatePointerPosition}>
                <motion.div
                    aria-hidden='true'
                    className='pointer-events-none absolute -inset-0.5 rounded-[calc(1rem+2px)] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50'
                    style={{ background: neonGlow }}
                />

                <motion.div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-30'
                    style={{
                        background: neonBorder,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        padding: '2px',
                    }}
                />

                <div
                    className={cn(
                        'relative z-10 flex h-full w-full flex-col justify-between gap-2 overflow-hidden rounded-2xl',
                        'bg-radial-[at_15%_15%]',
                        'text-on-surface border border-surface/60 from-surface-container-low/60 to-surface-container/60 backdrop-blur-md',
                        'transition-shadow duration-300',
                        isActive ? 'shadow-primary/15 shadow-md' : 'hover:shadow-primary/10 shadow-xl',
                    )}
                >
                    <ProductFront isActive={!isActive} title={title} summary={summary} />
                    <ProductBack isActive={isActive} description={description} />

                    <div className='absolute bottom-0 left-0 right-0 flex h-14 flex-row justify-center p-2'>
                        <div className='bg-surface-container-lowest flex flex-wrap items-center justify-center gap-2 rounded-full'>
                            <motion.div
                                ref={targetRef}
                                onClick={() => setActiveCard(index, targetRef)}
                                className={cn(
                                    'z-0 flex h-10 w-10 cursor-pointer flex-row items-center justify-center rounded-full border-none p-2',
                                    isActive
                                        ? 'bg-inverse-surface text-inverse-on-surface'
                                        : 'bg-surface-container-low text-on-container',
                                )}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 1.1 }}
                            >
                                <div className='h-6 w-6'>
                                    <Planet />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
