import React, { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
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

const offscreenPosition: Position = { x: 0, y: -200 };

const getRelativePosition = (rect: DOMRect, containerRect: DOMRect): Position => ({
    x: rect.x - containerRect.x + rect.width / 2,
    y: rect.y - containerRect.y + rect.height / 2,
});

function ProductGalleryContent({ className, products }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState<Size>({ width: 0, height: 0 });
    const rocketRef = useRef<HTMLDivElement>(null);
    const activeTargetRef = useRef<RefObject<HTMLDivElement | null> | null>(null);
    const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isResizing, setIsResizing] = useState(false);

    const updateContainerSize = useCallback(() => {
        if (!containerRef.current) {
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const nextSize = {
            width: containerRect.width,
            height: containerRect.height,
        };

        setContainerSize((currentSize) =>
            currentSize.width === nextSize.width && currentSize.height === nextSize.height ? currentSize : nextSize,
        );
    }, []);

    const finishResize = useCallback(() => {
        globalThis.requestAnimationFrame(() => {
            updateContainerSize();
            setIsResizing(false);
        });
    }, [updateContainerSize]);

    useEffect(() => {
        updateContainerSize();

        if (!containerRef.current) {
            return;
        }

        const observer = new ResizeObserver(() => {
            setIsResizing(true);

            if (resizeTimeoutRef.current) {
                globalThis.clearTimeout(resizeTimeoutRef.current);
            }

            resizeTimeoutRef.current = globalThis.setTimeout(finishResize, 160);
        });

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();

            if (resizeTimeoutRef.current) {
                globalThis.clearTimeout(resizeTimeoutRef.current);
            }
        };
    }, [finishResize, updateContainerSize]);

    const [rocketState, setRocketState] = useState<SpaceShipState>({
        key: 0,
        path: 'M 0 -200',
        ease: 'linear',
        duration: 1,
        isActive: false,
    });

    const handleSetActiveCard = (index: number, targetRef: RefObject<HTMLDivElement | null>) => {
        if (!containerRef.current || !targetRef.current) {
            return;
        }

        const isDeactivating = activeIndex === index;
        const isDeactivated = !rocketState.isActive;

        activeTargetRef.current = isDeactivating ? null : targetRef;

        const containerRect = containerRef.current.getBoundingClientRect();
        const currentRect = rocketRef.current?.getBoundingClientRect();
        const currentPos = isDeactivated || !currentRect ? offscreenPosition : getRelativePosition(currentRect, containerRect);

        const targetRect = targetRef.current.getBoundingClientRect();
        const targetPos = isDeactivating ? offscreenPosition : getRelativePosition(targetRect, containerRect);

        const path = calculatePath(currentPos, targetPos, isDeactivating ? 0 : 280);

        setActiveIndex(isDeactivating ? -1 : index);
        setRocketState((state) => ({
            ...state,
            key: state.key + 1,
            path,
            ease: 'ease-out',
            duration: isDeactivating ? 3000 : 1500,
            isActive: !isDeactivating,
        }));
    };

    useEffect(() => {
        if (isResizing || !containerRef.current || !activeTargetRef.current?.current) {
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const currentRect = rocketRef.current?.getBoundingClientRect();
        const targetRect = activeTargetRef.current.current.getBoundingClientRect();

        const currentPos = currentRect ? getRelativePosition(currentRect, containerRect) : offscreenPosition;
        const targetPos = getRelativePosition(targetRect, containerRect);

        setRocketState((state) => ({
            ...state,
            path: calculatePath(currentPos, targetPos, 180),
            ease: 'linear',
            duration: 0,
            isActive: true,
        }));
    }, [containerSize.height, containerSize.width, isResizing]);

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
            <SpaceShip containerSize={containerSize} rocketRef={rocketRef} state={rocketState} isResizing={isResizing} />
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
    rocketRef: RefObject<HTMLDivElement | null>;
    state: SpaceShipState;
    isResizing: boolean;
}

interface SpaceShipState {
    key: number;
    path: string;
    ease: string;
    duration: number;
    isActive: boolean;
}

function SpaceShip({ containerSize, rocketRef, state, isResizing }: Readonly<SpaceShipProps>) {
    const { key, path, duration, ease, isActive } = state;
    const { width, height } = containerSize;
    const shouldAnimate = duration > 0;

    let opacity = 0;
    let transitionDuration = 0.75;

    if (isResizing) {
        transitionDuration = 0.1;
    } else if (isActive) {
        opacity = 1;
        transitionDuration = 0.15;
    }

    return (
        <motion.div
            className='pointer-events-none absolute inset-0 z-50'
            initial={{ opacity: isActive && !isResizing ? 1 : 0 }}
            animate={{ opacity }}
            transition={{ duration: transitionDuration, ease: 'circInOut' }}
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
                        opacity: shouldAnimate ? 1 : 0,
                        animationName: shouldAnimate ? 'rocket-path' : 'none',
                        animationDuration: shouldAnimate ? `${duration}ms` : undefined,
                        animationFillMode: 'forwards',
                        animationTimingFunction: ease,
                        animationIterationCount: 1,
                    }}
                />
            </svg>
            <div
                key={key}
                ref={rocketRef}
                className='bg-inverse-surface text-inverse-on-surface pointer-events-none absolute z-30 h-10 w-10 rounded-full p-2'
                style={{
                    offsetPath: `path("${path}")`,
                    offsetDistance: isActive ? '100%' : '0%',
                    animationName: shouldAnimate ? 'move-on-path' : 'none',
                    animationDuration: shouldAnimate ? `${duration}ms` : undefined,
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
