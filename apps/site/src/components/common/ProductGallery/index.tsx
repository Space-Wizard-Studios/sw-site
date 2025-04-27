import React, { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
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
    const midX = (current.x + target.x) / 2;

    const dir = Math.sign(target.x - current.x);

    const control1 = { x: midX - 80 * dir, y: current.y - 80 };
    const control2 = { x: midX + 80 * dir, y: target.y - 80 };

    return `M ${current.x} ${current.y} C ${control1.x} ${control1.y} ${control2.x} ${control2.y} ${target.x} ${target.y}`;
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
        path: 'M 20 50 C 100 150 160 -150 250 -50 Q 290 0 250 60 C 160 150 100 -150 20 -50 Q -10 0 20 50',
        ease: 'linear',
        duration: 5000,
        repeat: true,
    });

    const handleSetActiveCard = (index: number, targetRef: RefObject<HTMLDivElement>) => {
        if (activeIndex === index) {
            return;
        }

        setActiveIndex(index);

        const containerRect = containerRef.current.getBoundingClientRect();

        const currentRect = rocketRef.current.getBoundingClientRect();
        const currentPos = {
            x: currentRect.x - containerRect.x + currentRect.width / 2,
            y: currentRect.y - containerRect.y + currentRect.height / 2,
        };

        const targetRect = targetRef.current.getBoundingClientRect();
        const targetPos = {
            x: targetRect.x - containerRect.x + targetRect.width / 2,
            y: targetRect.y - containerRect.y + targetRect.height / 2,
        };

        const path = calculateBezier(currentPos, targetPos);
        console.log(path);
        setRocketState((state) => ({
            ...state,
            key: state.key + 1,
            path,
            ease: 'ease-out',
            duration: 1000,
            repeat: false,
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
    repeat: boolean;
}

function SpaceShip({ containerSize, rocketRef, state }: SpaceShipProps) {
    const { key, path, duration, ease, repeat } = state;
    const { width, height } = containerSize;

    return (
        <>
            <svg
                className='stroke-sw-flamingo-400/60 pointer-events-none absolute z-20 h-full w-full fill-none stroke-2'
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='xMidYMid meet'
                viewBox={`${-width / 2} ${-height / 2} ${width * 2} ${height * 2}`}
                style={{ scale: 2 }}
            >
                <path
                    strokeLinecap='round'
                    strokeDasharray={8}
                    d={path}
                    style={{
                        animationName: 'rocket-path',
                        animationDuration: '500ms',
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite',
                    }}
                />
            </svg>
            <div
                key={key}
                ref={rocketRef}
                className='bg-inverse-surface text-inverse-on-surface ani absolute z-30 h-10 w-10 rounded-full p-2'
                style={{
                    offsetPath: `path("${path}")`,
                    animationName: 'move-on-path',
                    animationDuration: `${duration}ms`,
                    animationFillMode: 'forwards',
                    animationTimingFunction: ease,
                    animationIterationCount: repeat ? 'infinite' : 1,
                }}
            >
                <Rocket className='rotate-90' />
            </div>
        </>
    );
}
