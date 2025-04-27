import React, { useRef, useState, type RefObject } from 'react';
import { ProductsProvider, useProductsContext } from './ProductsContext';
import { ProductCard } from './ProductCard';
import type { ProcessedProduct } from '@lib/collections/productHelpers';
import { cn } from '@lib/utils';
import { Rocket } from '@icons/UI';

import '@styles/rocket.css';

interface ProductGalleryProps {
    className?: string;
    products: ProcessedProduct[];
}

const calculateBezier = (current: Position, target: Position) => {
    return 'M 0 15 C 15 160 280 -160 300 -15 Q 302 0 300 12 C 280 160 15 -160 0 -15 Q -2 0 0 15';
};

function ProductGalleryContent({ className, products }: ProductGalleryProps) {
    const { containerRef } = useProductsContext();

    const [activeIndex, setActiveIndex] = useState(-1);

    const rocketRef = useRef<HTMLDivElement>(null);
    const [rocketState, setRocketState] = useState<SpaceShipState>({
        key: 0,
        path: 'M 0 15 C 15 160 280 -160 300 -15 Q 302 0 300 12 C 280 160 15 -160 0 -15 Q -2 0 0 15',
        repeat: true,
    });

    const handleSetActiveCard = (index: number, targetRef: RefObject<HTMLDivElement>) => {
        setActiveIndex(index);

        const currentRect = rocketRef.current.getBoundingClientRect();
        const currentPos = { x: currentRect.x, y: currentRect.y };

        const targetRect = targetRef.current.getBoundingClientRect();
        const targetPos = { x: targetRect.x, y: targetRect.y };

        const path = calculateBezier(currentPos, targetPos);
        setRocketState((state) => ({ ...state, key: state.key++, path, repeat: false }));
    };

    return (
        <section
            id='products-container'
            ref={containerRef}
            className={cn(
                'relative grid auto-rows-fr grid-cols-1 content-around gap-8 md:grid-cols-2 lg:grid-cols-4',
                className,
            )}
        >
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    index={index}
                    product={product}
                    isActive={index === activeIndex}
                    setActiveCard={handleSetActiveCard}
                />
            ))}
            <SpaceShip ref={rocketRef} state={rocketState} />
        </section>
    );
}

export function ProductGallery({ className, products }: ProductGalleryProps) {
    return (
        <ProductsProvider>
            <ProductGalleryContent className={className} products={products} />
        </ProductsProvider>
    );
}

type Position = {
    x: number;
    y: number;
};

interface SpaceShipProps {
    ref: RefObject<HTMLDivElement>;
    state: SpaceShipState;
}

interface SpaceShipState {
    key: number;
    path: string;
    repeat: boolean;
}

function SpaceShip({ ref, state }: SpaceShipProps) {
    const { key, path, repeat } = state;

    return (
        <div
            key={key}
            ref={ref}
            className='bg-inverse-surface text-inverse-on-surface ani absolute z-10 h-10 w-10 rounded-full p-2'
            style={{
                offsetPath: `path("${path}")`,
                animationName: 'move-on-path',
                animationDuration: '5000ms',
                animationTimingFunction: 'linear',
                animationIterationCount: repeat ? 'infinite' : 1,
            }}
        >
            <Rocket className='rotate-90' />
        </div>
    );
}
