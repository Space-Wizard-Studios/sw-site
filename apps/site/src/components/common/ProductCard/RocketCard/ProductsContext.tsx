import { createContext, useContext, useState, useRef, type ReactNode } from 'react';

// Create the context with a default value
const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

interface ProductsContextType {
    activeCard: number | null;
    setActiveCard: (index: number | null) => void;
    rocketPosition: { x: number; y: number };
    setRocketPosition: (position: { x: number; y: number }) => void;
    rocketRotation: number;
    setRocketRotation: (rotation: number) => void;
    isMoving: boolean;
    setIsMoving: (isMoving: boolean) => void;
    planetRefs: React.RefObject<HTMLDivElement>[];
    rocketVisible: boolean;
    setRocketVisible: (visible: boolean) => void;
}

export function ProductsProvider({ children, cardCount = 4 }: { children: ReactNode; cardCount?: number }) {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });
    const [rocketRotation, setRocketRotation] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [rocketVisible, setRocketVisible] = useState(false);

    // Create a ref for each card
    const planetRefs = Array.from({ length: cardCount }, () => useRef<HTMLDivElement>(null));

    return (
        <ProductsContext.Provider
            value={{
                activeCard,
                setActiveCard,
                rocketPosition,
                setRocketPosition,
                rocketRotation,
                setRocketRotation,
                isMoving,
                setIsMoving,
                planetRefs,
                rocketVisible,
                setRocketVisible,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

export function useProductsContext() {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProductsContext must be used within a ProductsProvider');
    }
    return context;
}
