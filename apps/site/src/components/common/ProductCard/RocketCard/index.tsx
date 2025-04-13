import { useRef } from 'react';
import { motion } from 'motion/react';
import { Planet, Rocket } from '@icons/ProductCardIcons';
import { cn } from '@helpers/cn';
import { useProductsContext } from './ProductsContext';
import { ProductFront } from '../ProductFront';
import { ProductBack } from '../ProductBack';

import { Target } from './FlyingToggle/Target';

interface Props {
    index: number;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    description?: React.ReactNode;
}

export function RocketCard({ index, title, subtitle, description }: Props) {
    const { activeCard, setActiveCard, setRocketPosition, setIsMoving, planetRefs, rocketVisible } =
        useProductsContext();

    const isActive = activeCard === index;

    const handlePlanetClick = () => {
        // Only allow clicks when the rocket is not visible (animation complete or not started)
        if (rocketVisible) {
            console.log('Rocket is currently visible. Ignoring click.');
            return;
        }

        if (activeCard === index) {
            // If clicking the already active card, deactivate it and make rocket exit
            setIsMoving(true);
            setActiveCard(null);
        } else if (planetRefs[index].current) {
            // Get position of this planet for rocket to move to
            const rect = planetRefs[index].current.getBoundingClientRect();
            setRocketPosition({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            });
            setIsMoving(true);

            // After rocket animation, set this as active card
            setTimeout(() => {
                setActiveCard(index);
                setIsMoving(false);
            }, 500);
        }
    };

    return (
        <motion.div
            className={cn(
                'relative flex',
                'min-h-72', // Default height for all cards
            )}
            // Use motion animations to adjust card size without affecting the grid
            animate={{
                scale: isActive ? 1.1 : 1,
                zIndex: isActive ? 10 : 0,
            }}
            transition={{ duration: 0.3 }}
        >
            <div
                className={cn(
                    'flex h-full w-full flex-col justify-between overflow-visible rounded-xl p-6',
                    'bg-radial-[at_15%_15%]',
                    'text-on-surface from-surface-container-low to-surface-container',
                    'transition-all duration-300',
                    isActive ? 'shadow-primary/50 shadow-2xl' : 'hover:shadow-sw-navy/10 shadow-md hover:shadow-lg',
                )}
            >
                <ProductFront title={title} subtitle={subtitle} />
                <ProductBack isOpen={isActive} description={description} />
                <div className={`flex flex-row justify-center`}>
                    <motion.div
                        style={{
                            opacity: isActive && rocketVisible ? '0' : '1',
                            pointerEvents: isActive && rocketVisible ? 'none' : 'auto',
                        }}
                        ref={planetRefs[index]}
                        onClick={handlePlanetClick}
                        className='bg-inverse-surface text-inverse-on-surface z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-2'
                        whileHover={{ scale: rocketVisible ? 1.0 : 1.1 }}
                        whileTap={{ scale: rocketVisible ? 1.0 : 0.9 }}
                    >
                        <Target isActive={isActive} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
