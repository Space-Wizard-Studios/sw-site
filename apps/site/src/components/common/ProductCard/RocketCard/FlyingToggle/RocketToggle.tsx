import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import { Rocket } from '@icons/ProductCardIcons';
import { useProductsContext } from '../ProductsContext';
import { cn } from '@helpers/cn';

export function RocketToggle() {
    const {
        rocketPosition,
        setRocketPosition,
        isMoving,
        setIsMoving,
        activeCard,
        setActiveCard,
        planetRefs,
        // rocketRotation,
        // setRocketRotation,
        setRocketVisible,
        containerRef,
    } = useProductsContext();

    // Animation phase states for clearer lifecycle management
    const [animationPhase, setAnimationPhase] = useState<'hidden' | 'path-drawing' | 'flying' | 'landing' | 'landed'>(
        'hidden',
    );
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [pathVisible, setPathVisible] = useState(false);
    const [pathD, setPathD] = useState('');
    const [pathPoints, setPathPoints] = useState({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });

    const lastUpdateTime = useRef(0);
    const previousActiveCard = useRef<number | null>(null);

    const currentPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);

    const rocketControls = useAnimationControls();
    const pathControls = useAnimationControls();
    const [pathControlPoint, setPathControlPoint] = useState({ x: 0, y: 0 });

    const [rocketRotation, setRocketRotation] = useState<number>(0);

    const [animationInProgress, setAnimationInProgress] = useState(false);

    // Debug mode for development
    const DEBUG_MODE = true;
    const INITIAL_POSITION = { x: 1000, y: -500 };

    const getRelativeCoordinates = useCallback(
        (element: HTMLElement) => {
            const containerRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
            const elementRect = element.getBoundingClientRect();

            // Calculate position relative to the container
            return {
                x: elementRect.left - containerRect.left + elementRect.width / 2,
                y: elementRect.top - containerRect.top + elementRect.height / 2,
            };
        },
        [containerRef],
    );

    // Helper functions to reduce code duplication
    const updateRocketPositionState = useCallback(
        (x: number, y: number) => {
            setRocketPosition({ x, y });
            currentPosition.current = { x, y };
            return { x, y };
        },
        [setRocketPosition],
    );

    const updateRocketDOM = useCallback((x: number, y: number) => {
        const element = document.getElementById('sw-rocket');
        if (element) {
            // Make sure these are container-relative coordinates
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        }
    }, []);

    const setupPath = useCallback(
        (
            start: { x: number; y: number },
            end: { x: number; y: number },
            pathGenerator: (start: { x: number; y: number }, end: { x: number; y: number }) => string,
        ) => {
            const path = pathGenerator(start, end);
            setPathD(path);
            setPathPoints({ start, end });
            setPathVisible(true);
            return path;
        },
        [],
    );

    // Generate a curved path between two points
    const generatePath = useCallback((start: { x: number; y: number }, end: { x: number; y: number }) => {
        // Calculate distance between points to adjust arc height
        const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

        // Dynamic arc height based on distance
        const arcHeight = Math.min(distance * 0.5, 300);

        // Calculate control points for a nice arc
        const midX = (start.x + end.x) / 2;
        const midY = Math.min(start.y, end.y) - arcHeight; // Arc height - higher for more curve

        // Save the control point for later use
        setPathControlPoint({ x: midX, y: midY });

        // Create the path
        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    }, []);

    // Calculate point and rotation along a path with enhanced landing behavior
    const getPointAtPercentage = useCallback(
        (percentage: number) => {
            if (!pathPoints.start || !pathPoints.end) return { x: 0, y: 0, angle: 0 };

            const { start, end } = pathPoints;
            const midX = pathControlPoint.x;
            const midY = pathControlPoint.y;

            // Quadratic bezier curve formula
            const t = percentage / 100;
            const invT = 1 - t;

            const x = invT * invT * start.x + 2 * invT * t * midX + t * t * end.x;
            const y = invT * invT * start.y + 2 * invT * t * midY + t * t * end.y;

            // Calculate angle tangent to the curve
            // Derivative of the quadratic bezier
            const dx = 2 * (invT * (midX - start.x) + t * (end.x - midX));
            const dy = 2 * (invT * (midY - start.y) + t * (end.y - midY));
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Enhanced landing behavior
            let finalAngle = angle;

            // Start vertical transition earlier for smoother landing
            if (t > 0.6) {
                // Longer landing phase (40% of animation)
                const landingProgress = (t - 0.6) / 0.4;
                // Sharp transition to 90 degrees (vertical)
                finalAngle = angle * (1 - landingProgress) + 90 * landingProgress;

                // Add small horizontal oscillation better landing approach
                if (t < 0.9) {
                    const oscillation = Math.sin((t - 0.6) * 10) * 5 * (1 - landingProgress);
                    finalAngle += oscillation;
                }
            }

            return { x, y, angle: finalAngle };
        },
        [pathPoints, pathControlPoint],
    );

    const calculateAngle = useCallback((startX: number, startY: number, endX: number, endY: number) => {
        const dx = endX - startX;
        const dy = endY - startY;
        console.log('Calculating angle:', { startX, startY, endX, endY });
        return Math.atan2(dy, dx) * (180 / Math.PI);
    }, []);

    const smoothRotation = (currentAngle: number, targetAngle: number) => {
        const delta = targetAngle - currentAngle;
        const shortestDelta = ((delta + 180) % 360) - 180;
        return currentAngle + shortestDelta * 0.1; // Adjust the multiplier for smoothness
    };

    // Function to update rocket position based on active card with directional awareness
    const updateRocketPosition = useCallback(() => {
        const now = Date.now();
        if (now - lastUpdateTime.current < 16) return; // ~60 fps
        lastUpdateTime.current = now;

        if (activeCard !== null && planetRefs[activeCard]?.current) {
            const planet = planetRefs[activeCard].current;
            const relativePos = getRelativeCoordinates(planet);

            // Use relative coordinates
            const targetX = relativePos.x;
            const targetY = relativePos.y;

            // Calculate direction for rotation if moving
            if (
                isMoving &&
                animationPhase !== 'landing' &&
                animationPhase !== 'landed' &&
                animationPhase !== 'hidden'
            ) {
                // Only update rotation during normal flight, not during or after landing
                const angle = calculateAngle(currentPosition.current.x, currentPosition.current.y, targetX, targetY);
                setRocketRotation((prev: number) => smoothRotation(prev, angle));
            }

            // Update position
            updateRocketPositionState(targetX, targetY);
        } else if (previousActiveCard.current !== null) {
            // If card was deactivated, move rocket off-screen
            const targetX = INITIAL_POSITION.x;
            const targetY = INITIAL_POSITION.y;

            // Calculate direction for rotation if moving
            if (isMoving && animationPhase !== 'landing' && animationPhase !== 'landed') {
                // Only update rotation during normal flight, not during or after landing
                const angle = calculateAngle(currentPosition.current.x, currentPosition.current.y, targetX, targetY);
                setRocketRotation((prev: number) => smoothRotation(prev, angle));
            }

            updateRocketPositionState(targetX, targetY);
        }
    }, [
        activeCard,
        planetRefs,
        isMoving,
        animationPhase,
        calculateAngle,
        updateRocketPositionState,
        setRocketRotation,
        getRelativeCoordinates,
    ]);

    // Function to calculate points along a vertical landing path
    const getPointAtPercentageForLanding = useCallback(
        (percentage: number) => {
            if (!pathPoints.start || !pathPoints.end) return { x: 0, y: 0, angle: 0 };

            const { start, end } = pathPoints;

            // Linear interpolation for vertical path
            const t = percentage / 100;

            // Keep x position stable (slight variation for realism)
            const x = start.x + (end.x - start.x) * t;

            // Linear vertical movement
            const y = start.y + (end.y - start.y) * t;

            // For landing, maintain consistent upward angle (rocket engines pointing down)
            return { x, y, angle: 0 };
        },
        [pathPoints],
    );

    // Generate a vertical path for landing
    const generateVerticalPath = useCallback((start: { x: number; y: number }, end: { x: number; y: number }) => {
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }, []);

    // Animation function for rocket flight
    const animateAlongPath = useCallback(
        async (fromCard: number | null, toCard: number | null) => {
            try {
                // Define the hover height (distance above target for hover)
                const hoverHeight = 100; // Can be adjusted as needed

                // Phase 1: Prepare and show the rocket
                setAnimationPhase('path-drawing');
                setIsVisible(true);
                setIsMoving(true);

                let startPoint = currentPosition.current;
                let endPoint = { x: 0, y: 0 };
                let landingPoint = { x: 0, y: 0 };

                // Define the end point based on destination
                if (toCard !== null && planetRefs[toCard]?.current) {
                    const planet = planetRefs[toCard].current;
                    const relativePos = getRelativeCoordinates(planet);

                    // The actual target position (final landing spot)
                    landingPoint = {
                        x: relativePos.x,
                        y: relativePos.y,
                    };

                    // The path end point (hover position above the target)
                    endPoint = {
                        x: landingPoint.x,
                        y: landingPoint.y - hoverHeight, // Hover above target
                    };
                } else {
                    // Moving off-screen (exiting)
                    endPoint = { x: INITIAL_POSITION.x, y: INITIAL_POSITION.y };
                    landingPoint = endPoint; // No landing needed for exit
                }

                // Create and show the path to the hover position
                setupPath(startPoint, endPoint, generatePath);

                console.log('Path created', { pathD, pathPoints });

                // Phase 2: Animate the path drawing
                await pathControls.start({
                    pathLength: [0, 1],
                    transition: { duration: 1 },
                });

                // Phase 3: Fly along the path to hover position
                setAnimationPhase('flying');
                await rocketControls.start({
                    pathOffset: [0, 1], // Complete flight to hover position
                    transition: {
                        duration: 2.0,
                        ease: 'easeInOut',
                    },
                });

                // Only perform landing if we're going to a card
                if (toCard !== null) {
                    // Phase 4: Landing sequence - vertical descent from hover position
                    setAnimationPhase('landing');

                    console.log('Animation phase:', animationPhase);

                    // Create a new vertical path for landing
                    setupPath(endPoint, landingPoint, generateVerticalPath);

                    // Briefly show landing path if desired
                    await pathControls.start({
                        pathLength: [0, 1],
                        transition: { duration: 0.5 },
                    });

                    // Follow the landing path
                    await rocketControls.start({
                        pathOffset: [0, 1],
                        transition: {
                            duration: 0.5,
                            ease: 'easeIn',
                        },
                    });
                }

                // Phase 5: Complete and hide path
                setAnimationPhase('landed');

                console.log('Animation phase:', animationPhase);

                setPathVisible(false);
                pathControls.set({ pathLength: 0 });
                setIsMoving(false);

                // Final position update - use landing point for cards
                const finalPosition = toCard !== null ? landingPoint : endPoint;
                updateRocketPositionState(finalPosition.x, finalPosition.y);
                updateRocketDOM(finalPosition.x, finalPosition.y);

                // Hide the rocket after a short delay (if moving to a card)
                if (toCard !== null) {
                    setIsVisible(false);
                    setRocketVisible(false);
                    setAnimationPhase('hidden');

                    console.log('Animation phase:', animationPhase);
                }
            } catch (error) {
                console.error('Animation error:', error);
                // Reset states in case of error
                setAnimationPhase('hidden');

                console.log('Animation phase:', animationPhase);

                setIsMoving(false);
                setPathVisible(false);
            }
        },
        [
            generatePath,
            generateVerticalPath,
            planetRefs,
            setupPath,
            updateRocketPositionState,
            pathControls,
            rocketControls,
            setRocketRotation,
            setIsVisible,
            setIsMoving,
            setAnimationPhase,
            setPathVisible,
            getRelativeCoordinates,
        ],
    );

    // Continuous animation loop when moving
    useEffect(() => {
        if (isMoving && animationFrameRef.current === null) {
            const animate = () => {
                updateRocketPosition();
                animationFrameRef.current = requestAnimationFrame(animate);
            };
            animationFrameRef.current = requestAnimationFrame(animate);
        } else if (!isMoving && animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [isMoving, updateRocketPosition]);

    // Set initial position after component mounts
    useEffect(() => {
        console.log('RocketToggle mounted');
        const initialPos = {
            x: INITIAL_POSITION.x,
            y: INITIAL_POSITION.y,
        };
        setInitialPosition(initialPos);
        updateRocketPositionState(initialPos.x, initialPos.y);
        setIsMounted(true);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [updateRocketPositionState]);

    // Track active card changes
    useEffect(() => {
        // Prevent animation if it's already in progress
        if (animationInProgress) return;

        // Using a local variable to capture current values for the closure
        const currentActiveCard = activeCard;
        const prevActiveCard = previousActiveCard.current;

        // Only animate if there's actually been a change
        if (currentActiveCard !== prevActiveCard) {
            console.log(`Card changed: ${prevActiveCard} -> ${currentActiveCard}`);

            if (currentActiveCard !== null) {
                console.log('Card activated - showing rocket');
                setAnimationInProgress(true);
                setRocketVisible(true); // Set visible immediately when animation starts
                setIsVisible(true);

                animateAlongPath(prevActiveCard, currentActiveCard)
                    .then(() => {
                        // Only update the reference after successful animation
                        previousActiveCard.current = currentActiveCard;
                    })
                    .finally(() => {
                        setAnimationInProgress(false);
                        // Don't set rocketVisible false here - it's done in animateAlongPath
                    });
            } else if (prevActiveCard !== null) {
                console.log('Card deactivated - showing rocket exit animation');
                setAnimationInProgress(true);
                setRocketVisible(true); // Set visible immediately when animation starts
                setIsVisible(true);

                animateAlongPath(prevActiveCard, null)
                    .then(() => {
                        // Only update the reference after successful animation
                        previousActiveCard.current = null;
                    })
                    .finally(() => {
                        setAnimationInProgress(false);
                        setRocketVisible(false); // Make sure it's set to false when exiting
                    });
            } else {
                // Handle the case where both are null (shouldn't happen but just to be safe)
                previousActiveCard.current = null;
            }
        }
    }, [activeCard, animateAlongPath, animationInProgress]);

    const handleRocketClick = useCallback(() => {
        if (activeCard !== null) {
            setActiveCard(null);
        }
    }, [activeCard, setActiveCard]);

    // Now the conditional return is safe
    if (!isMounted) return null;

    return (
        <>
            {/* Path visualization - improved visibility */}
            {pathVisible && (
                <svg className='stroke-accent pointer-events-none absolute left-0 top-0 z-[9999] h-full w-full'>
                    <motion.path
                        d={pathD}
                        fill='none'
                        strokeDasharray={1000}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: pathVisible ? 1 : 0,
                            opacity: pathVisible ? 1 : 0,
                        }}
                        transition={{ duration: 1 }}
                    />
                </svg>
            )}

            {/* Rocket - enhanced visibility and appearance */}
            <motion.div
                id='sw-rocket'
                className='pointer-events-none absolute z-[9999] w-auto'
                style={{
                    transform: `translate(-50%, -50%)`,
                    left: `${rocketPosition.x}px`,
                    top: `${rocketPosition.y}px`,
                    // opacity: isVisible ? 1 : 0,
                    // visibility: isVisible ? 'visible' : 'hidden',
                }}
                // initial={{ left: initialPosition.x, top: initialPosition.y }}
                animate={rocketControls}
                onUpdate={(latest) => {
                    if ('pathOffset' in latest) {
                        const offset = latest.pathOffset as number;

                        if (animationPhase === 'landing') {
                            // For landing phase: use position from path but FORCE upward rotation
                            const { x, y } = getPointAtPercentageForLanding(offset * 100);

                            // Update position state and DOM
                            updateRocketPositionState(x, y);
                            setRocketRotation(0);
                            updateRocketDOM(x, y);
                        } else {
                            const { x, y, angle } = getPointAtPercentage(offset * 100);

                            // Update position state, rotation and DOM
                            updateRocketPositionState(x, y);
                            setRocketRotation(angle);
                            updateRocketDOM(x, y);
                        }

                        setIsVisible(true);
                    }
                    // Direct y position update during landing phase
                    else if ('y' in latest && animationPhase === 'landing') {
                        const y = latest.y as number;
                        const x = currentPosition.current.x;

                        // Update position
                        updateRocketPositionState(x, y);
                        updateRocketDOM(x, y);
                    }
                }}
                onClick={handleRocketClick}
            >
                <div
                    className={cn(
                        'bg-inverse-surface text-inverse-on-surface border-sw-primary flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-6',
                    )}
                    style={{
                        transition: 'transform 0.15s ease-out',
                        transform: `rotate(${rocketRotation}deg)`,
                    }}
                >
                    <motion.div
                        className='flex h-12 w-12 items-center justify-center'
                        transition={{
                            repeat: isMoving ? Infinity : 0,
                            duration: 0.5,
                        }}
                    >
                        <Rocket flames={isMoving ? 1 : 0} className='text-sw-primary h-8 w-8' />
                    </motion.div>
                </div>
            </motion.div>

            {/* Debug panel */}
            {DEBUG_MODE && (
                <div className='absolute -left-80 z-[9999] rounded-lg bg-black/50 p-4 text-white'>
                    <div>Animation Phase: {animationPhase}</div>
                    <div>Is Visible: {isVisible ? 'Yes' : 'No'}</div>
                    <div>Path Visible: {pathVisible ? 'Yes' : 'No'}</div>
                    <div>Active Card: {activeCard}</div>
                    <div>Previous Card: {previousActiveCard.current}</div>
                    <div>
                        Current Position: {Math.round(rocketPosition.x)}, {Math.round(rocketPosition.y)}
                    </div>
                    <div>
                        Path Start: {Math.round(pathPoints.start.x)}, {Math.round(pathPoints.start.y)}
                    </div>
                    <div>
                        Path End: {Math.round(pathPoints.end.x)}, {Math.round(pathPoints.end.y)}
                    </div>
                    <div>Rotation: {Math.round(rocketRotation)}°</div>
                </div>
            )}
        </>
    );
}
