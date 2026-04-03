import { motion } from 'motion/react';
import { Planet } from '@icons/UI';
import { ProductFront } from './ProductFront';
import { ProductBack } from './ProductBack';
import { cn } from '@lib/utils';
import { NeonCard } from '@common/NeonCard';

import type { ProcessedProduct } from '@lib/collections/productHelpers';
import { useRef, type RefObject } from 'react';

interface Props {
    index: number;
    product: ProcessedProduct;
    isActive: boolean;
    setActiveCard: (index: number, target: RefObject<HTMLButtonElement | null>) => void;
}

export function ProductCard({ index, product, isActive, setActiveCard }: Props) {
    const targetRef = useRef<HTMLButtonElement>(null);
    const { title, summary = '', description = '' } = product;

    return (
        <motion.div
            animate={{
                scale: isActive ? 1.025 : 1,
                zIndex: isActive ? 10 : 0,
            }}
            className='flex min-h-72'
        >
            <NeonCard className='flex min-h-72 w-full'>
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

                <div className='absolute bottom-0 left-0 right-0 flex w-full justify-center p-2'>
                    <div className='bg-surface-container-lowest flex flex-wrap items-center justify-center gap-2 rounded-full p-2'>
                        <motion.button
                            ref={targetRef}
                            type='button'
                            onClick={() => setActiveCard(index, targetRef)}
                            aria-label={isActive ? 'Fechar detalhes' : 'Ver detalhes'}
                            aria-expanded={isActive}
                            className={cn(
                                'z-0 flex h-10 w-10 cursor-pointer flex-row items-center justify-center rounded-full border-none p-2',
                                isActive
                                    ? 'bg-inverse-surface text-inverse-on-surface'
                                    : 'bg-surface-container-low text-on-container',
                            )}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1.1 }}
                        >
                            <div className='h-6 w-6' aria-hidden='true'>
                                <Planet />
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>
        </NeonCard>
        </motion.div>
    );
}
