import { motion } from 'motion/react';
import { Planet, Rocket } from '@icons/UI';
import { cn } from '@helpers/cn';
import { useProductsContext } from './ProductsContext';
import { ProductFront } from '../ProductFront';
import { ProductBack } from '../ProductBack';

interface Props {
    index: number;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    description?: React.ReactNode;
}

export function RocketCard({ index, title, subtitle, description }: Props) {
    const {
        activeCard,
        setActiveCard,
        setRocketPosition,
        setIsMoving,
        planetRefs,
        rocketVisible,
        setRocketVisible,
        containerRef,
    } = useProductsContext();
    const isActive = activeCard === index;

    const handlePlanetClick = () => {
        console.log('Planet clicked', { index, rocketVisible, activeCard });

        // Only allow clicks when the rocket is not visible (animation complete or not started)
        if (rocketVisible) {
            console.log('Rocket is currently visible. Ignoring click.');
            return;
        }

        if (activeCard === index) {
            console.log('Deactivating active card');
            // If clicking the already active card, deactivate it and make rocket exit
            setIsMoving(true);
            setActiveCard(null);
        } else if (planetRefs[index].current && containerRef.current) {
            console.log('Activating new card:', index);

            // Get coordinates
            const planetRect = planetRefs[index].current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const newPos = {
                x: planetRect.left - containerRect.left + planetRect.width / 2,
                y: planetRect.top - containerRect.top + planetRect.height / 2,
            };

            console.log('Setting position', newPos);

            // Important: Make rocket visible first
            setRocketVisible(true);
            setRocketPosition(newPos);
            setIsMoving(true);
            setActiveCard(index);
        } else {
            console.log('No valid refs', {
                planetRef: planetRefs[index]?.current ? 'exists' : 'null',
                containerRef: containerRef.current ? 'exists' : 'null',
            });
        }
    };

    return (
        <motion.div
            className={cn(
                'relative flex',
                'min-h-72',
            )}
            animate={{
                scale: isActive ? 1.05 : 1,
                zIndex: isActive ? 10 : 0,
            }}
            transition={{ duration: 0.3 }}
        >
            <div
                className={cn(
                    'relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl p-4',
                    'bg-radial-[at_15%_15%]',
                    'text-on-surface from-surface-container-low/60 to-surface-container/60 backdrop-blur-md',
                    'transition-shadow duration-300',
                    isActive ? 'shadow-primary/15 shadow-md' : 'hover:shadow-primary/10 shadow-xl',
                )}
            >
                <ProductFront title={title} subtitle={subtitle} />
                <ProductBack isActive={isActive} description={description} />
                <div className={`flex flex-row justify-center`}>
                    <div className='bg-surface-container-lowest flex flex-wrap items-center justify-center gap-2 rounded-full p-2'>
                        <motion.div
                            style={{
                                // opacity: isActive && rocketVisible ? '0' : '1',
                                pointerEvents: isActive && rocketVisible ? 'none' : 'auto',
                            }}
                            ref={planetRefs[index]}
                            onClick={handlePlanetClick}
                            className={cn(
                                'z-0 flex h-10 w-10 cursor-pointer flex-row items-center justify-center rounded-full border-none p-2',
                                isActive
                                    ? 'bg-inverse-surface text-inverse-on-surface'
                                    : 'bg-surface-container-low text-on-container',
                            )}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1.1 }}
                        >
                            <div className='h-6 w-6'>{isActive && !rocketVisible ? <Rocket flames={0} /> : <Planet />}</div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
