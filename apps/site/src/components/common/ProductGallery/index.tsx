import React, { useEffect, useRef, useState, type RefObject } from 'react';
import { ProductsProvider } from './ProductsContext';
import { ProductCard } from './ProductCard';
import type { ProcessedProduct } from '@lib/collections/productHelpers';
import { cn } from '@lib/utils';
import { Rocket } from '@icons/UI';

import '@styles/rocket.css';
import { motion } from 'motion/react';

interface ProductGalleryProps {
    className?: string;
    products: ProcessedProduct[];
}

const calculatePath = (current: Position, target: Position, maxYOffset: number) => {
    const midX = (current.x + target.x) / 2;
    const dir = Math.sign(target.x - current.x);

    const yOffset = Math.max(maxYOffset - Math.abs(target.y - current.y), 0);
    const xOffset = 80 * (dir === 0 ? 1 : dir);

    const control1 = { x: midX - xOffset, y: current.y - yOffset };
    const control2 = { x: midX + xOffset, y: target.y - yOffset };

    return `M ${current.x} ${current.y} C ${control1.x} ${control1.y} ${control2.x} ${control2.y} ${target.x} ${target.y} v -0.1`;
};

function ProductGalleryContent({ className, products }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState<Size>({ width: 0, height: 0 });

    useEffect(() => {
        if (containerRef.current) {
            const containerRect = containerRef.current?.getBoundingClientRect();
            setContainerSize({
                width: containerRect.width,
                height: containerRect.height,
            });
        }
    }, [containerRef]);

    const rocketRef = useRef<HTMLDivElement>(null);
    const [rocketState, setRocketState] = useState<SpaceShipState>({
        key: 0,
        path: 'M 0 -200',
        ease: 'linear',
        duration: 1,
        isActive: false,
    });

    const handleSetActiveCard = (index: number, targetRef: RefObject<HTMLDivElement>) => {
        const isDeactivating = activeIndex === index;
        const isDeactivated = !rocketState.isActive;

        const containerRect = containerRef.current.getBoundingClientRect();

        const currentRect = rocketRef.current.getBoundingClientRect();
        const currentPos = isDeactivated
            ? { x: 0, y: -200 }
            : {
                  x: currentRect.x - containerRect.x + currentRect.width / 2,
                  y: currentRect.y - containerRect.y + currentRect.height / 2,
              };

        const targetRect = targetRef.current.getBoundingClientRect();
        const targetPos = isDeactivating
            ? { x: 0, y: -200 }
            : {
                  x: targetRect.x - containerRect.x + targetRect.width / 2,
                  y: targetRect.y - containerRect.y + targetRect.height / 2,
              };

        const path = calculatePath(currentPos, targetPos, isDeactivating ? 0 : 280);

        setActiveIndex(isDeactivating ? -1 : index);
        setRocketState((state) => ({
            ...state,
            key: state.key + 1,
            path,
            ease: 'ease-out',
            duration: isDeactivating ? 3000 : 750,
            isActive: !isDeactivating,
        }));
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
            <SpaceShip containerSize={containerSize} rocketRef={rocketRef} state={rocketState} />
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

type Size = {
    width: number;
    height: number;
};

type Position = {
    x: number;
    y: number;
};

interface SpaceShipProps {
    containerSize: Size;
    rocketRef: RefObject<HTMLDivElement>;
    state: SpaceShipState;
}

interface SpaceShipState {
    key: number;
    path: string;
    ease: string;
    duration: number;
    isActive: boolean;
}

function SpaceShip({ containerSize, rocketRef, state }: SpaceShipProps) {
    const { key, path, duration, ease, isActive } = state;
    const { width, height } = containerSize;

    return (
        <motion.div
            className='pointer-events-none absolute inset-0'
            initial={{ opacity: isActive ? 1 : 0 }}
            animate={{
                opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: isActive ? 0.15 : 0.75, ease: 'circInOut' }}
        >
            <svg
                className='text-sw-flamingo-400/60 pointer-events-none absolute z-20 h-full w-full fill-none stroke-2'
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='xMidYMid meet'
                viewBox={`${-width / 2} ${-height / 2} ${width * 2} ${height * 2}`}
                style={{ scale: 2 }}
            >
                <path
                    key={key}
                    d={path}
                    stroke='currentColor'
                    strokeDasharray='8 8'
                    strokeLinecap='round'
                    style={{
                        animationName: 'rocket-path',
                        animationDuration: `${duration}ms`,
                        animationFillMode: 'forwards',
                        animationTimingFunction: ease,
                        animationIterationCount: 1,
                    }}
                />
            </svg>
            <div
                key={key}
                ref={rocketRef}
                className='bg-inverse-surface text-inverse-on-surface ani pointer-events-none absolute z-30 h-10 w-10 rounded-full p-2'
                style={{
                    offsetPath: `path("${path}")`,
                    animationName: 'move-on-path',
                    animationDuration: `${duration}ms`,
                    animationFillMode: 'forwards',
                    animationTimingFunction: ease,
                    animationIterationCount: 1,
                }}
            >
                <Rocket className='rotate-90' />
            </div>
        </motion.div>
    );
}
