import React from 'react';

import { ProductsProvider, useProductsContext } from './ProductsContext';

import { ProductCard } from './ProductCard';
import { ProductToggle } from './ProductToggle';

import type { ProcessedProduct } from '@lib/collections/productHelpers';

import { cn } from '@lib/utils';

interface ProductGalleryProps {
    className?: string;
    products: ProcessedProduct[];
}

function ProductGalleryContent({ className, products }: ProductGalleryProps) {
    const { containerRef } = useProductsContext();

    return (
        <section
            id='products-container'
            ref={containerRef}
            className={cn(
                'relative grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 content-around',
                className,
            )}
        >
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    index={index}
                    product={product}
                />
            ))}
            <ProductToggle />
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