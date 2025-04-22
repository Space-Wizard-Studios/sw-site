import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'motion/react';
import { Rocket } from '@icons/UI';
import { useProductsContext } from '../ProductsContext';
import { cn } from '@helpers/cn';

import type { Variants } from 'motion/react';

export function RocketToggle() {
    const {
        rocketPosition,
        setRocketPosition,
        isMoving,
        setIsMoving,
        activeCard,
        setActiveCard,
        planetRefs,
        setRocketVisible,
        containerRef,
    } = useProductsContext();

    // State for the dynamic initial position
    const [dynamicInitialPosition, setDynamicInitialPosition] = useState({ x: 0, y: -500 });

    // Animation phase states for clearer lifecycle management
    const [animationPhase, setAnimationPhase] = useState<'hidden' | 'path-drawing' | 'flying' | 'landing' | 'landed'>(
        'hidden',
    );

    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [pathVisible, setPathVisible] = useState(false);
    const [pathD, setPathD] = useState('');
    const [pathPoints, setPathPoints] = useState({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });

    const [landingPathD, setLandingPathD] = useState('');
    const [landingPathVisible, setLandingPathVisible] = useState(false);

    const previousActiveCard = useRef<number | null>(null);

    const currentPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);

    const rocketControls = useAnimationControls();
    const pathControls = useAnimationControls();
    const [pathControlPoint, setPathControlPoint] = useState({ x: 0, y: 0 });

    const [rocketRotation, setRocketRotation] = useState<number>(0);

    const [animationInProgress, setAnimationInProgress] = useState(false);

    // Debug mode for development
    const DEBUG_MODE = false;

    const DRAW_PATH = true;
    const MOVING_DURATION = 2;
    const PATH_TRANSITION = 1;
    const LANDING_DURATION = 1;
    const TARGET_OFFSET = 32;
    const OVERSHOOT = .75;
    const ARC_HEIGHT_MIN = 100;
    const ARC_HEIGHT_MAX = 600;

    const ROCKET_ID = 'sw-rocket';

    // Effect to calculate and update initial position based on container size
    useEffect(() => {
        const calculateInitialPosition = () => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                // Position it off-screen to the right, with random vertical variation
                const randomXOffset = 100 + Math.random() * 200;
                const randomYOffset = -100 - Math.random() * 200;
                setDynamicInitialPosition({
                    x: containerRect.width + randomXOffset,
                    y: randomYOffset,
                });
            } else {
                // Fallback with randomness
                const randomXOffset = 50 + Math.random() * 100;
                const randomYOffset = -100 - Math.random() * 200;
                setDynamicInitialPosition({ x: window.innerWidth + randomXOffset, y: randomYOffset });
            }
        };

        calculateInitialPosition(); // Calculate on mount

        window.addEventListener('resize', calculateInitialPosition);

        return () => {
            window.removeEventListener('resize', calculateInitialPosition);
        };
    }, [containerRef]);

    const getRelativeCoordinates = useCallback(
        (element: HTMLElement) => {
            const containerRect = containerRef.current?.getBoundingClientRect() || {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            };
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
        const element = document.getElementById(ROCKET_ID);
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
        // const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

        const arcHeight = Math.random() * (ARC_HEIGHT_MAX - ARC_HEIGHT_MIN) + ARC_HEIGHT_MIN;

        // Overshoot factor for the control point
        const overshootFactor = OVERSHOOT;
        const overshootX = (end.x - start.x) * overshootFactor;

        // Calculate control points for an elastic arc
        const midX = (start.x + end.x) / 2 - overshootX;
        const midY = Math.min(start.y, end.y) - arcHeight; // Arc height - higher for more curve

        // Save the control point for later use
        setPathControlPoint({ x: midX, y: midY });

        // Create the path
        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    }, []);

    // Generate a vertical path for landing
    const generateVerticalPath = useCallback((start: { x: number; y: number }, end: { x: number; y: number }) => {
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }, []);

    const normalizeAngle = (angle: number): number => {
        angle = angle % 360;
        // Force the angle to be positive
        angle = (angle + 360) % 360;
        // Force angle into the range -180 to 180
        if (angle > 180) {
            angle -= 360;
        }
        return angle;
    };

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
            const dxPath = 2 * (invT * (midX - start.x) + t * (end.x - midX));
            const dyPath = 2 * (invT * (midY - start.y) + t * (end.y - midY));
            let anglePath = Math.atan2(dyPath, dxPath); // Keep in radians for now

            // Calculate angle directly to the target
            const dxTarget = end.x - x;
            const dyTarget = end.y - y;
            let angleTarget = Math.atan2(dyTarget, dxTarget); // Keep in radians

            // --- Start Change: Bias towards upward angle ---
            const pathWeight = 0.1; // Lower weight for path tangent
            const targetWeight = 0.1; // Lower weight for direct target
            const upwardWeight = 0.8; // High weight for upward bias

            // Angle representing "up" before the +90 offset is applied (-90 degrees)
            const upwardAngleRad = -Math.PI / 2;

            // Weighted average of vectors representing the angles
            const avgX =
                pathWeight * Math.cos(anglePath) +
                targetWeight * Math.cos(angleTarget) +
                upwardWeight * Math.cos(upwardAngleRad);
            const avgY =
                pathWeight * Math.sin(anglePath) +
                targetWeight * Math.sin(angleTarget) +
                upwardWeight * Math.sin(upwardAngleRad);

            // Calculate the final angle from the averaged vector
            let finalAngleRad = Math.atan2(avgY, avgX);

            // Convert final angle to degrees
            let finalAngle = finalAngleRad * (180 / Math.PI);

            // Adjust angle assuming the SVG's 'forward' is 'up' (90 deg)
            finalAngle += 90;

            // Normalize the final angle
            finalAngle = normalizeAngle(finalAngle);
            // --- End Change ---

            // console.log('Angles (deg): Path=', anglePath * (180 / Math.PI), 'Target=', angleTarget * (180 / Math.PI), 'Final=', finalAngle);
            return { x, y, angle: finalAngle };
        },
        [pathPoints, pathControlPoint],
    );

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

    // Animation function for rocket flight
    const animateAlongPath = useCallback(
        async (fromCard: number | null, toCard: number | null) => {
            try {
                // Define the hover height (distance above target for hover)
                const hoverHeight = TARGET_OFFSET; // Can be adjusted as needed

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
                    // Moving off-screen (exiting) - Calculate a NEW random exit point
                    let exitX = 0;
                    let exitY = 0;
                    if (containerRef.current) {
                        const containerRect = containerRef.current.getBoundingClientRect();
                        const randomXOffset = 50 + Math.random() * 100;
                        const randomYOffset = -100 - Math.random() * 200;
                        exitX = containerRect.width + randomXOffset;
                        exitY = randomYOffset;
                    } else {
                        // Fallback
                        const randomXOffset = 50 + Math.random() * 100;
                        const randomYOffset = -100 - Math.random() * 200;
                        exitX = window.innerWidth + randomXOffset;
                        exitY = randomYOffset;
                    }
                    endPoint = { x: exitX, y: exitY };
                    landingPoint = endPoint; // No landing needed for exit
                }

                // Create and show the path to the hover position
                setupPath(startPoint, endPoint, generatePath);

                // console.log('Path created', { pathD, pathPoints });

                // Phase 3: Fly along the path to hover position
                setAnimationPhase('flying');
                await rocketControls.start({
                    pathOffset: [0, 1],
                    transition: {
                        duration: MOVING_DURATION,
                        ease: 'easeInOut',
                    },
                });

                updateRocketPositionState(endPoint.x, endPoint.y);

                setRocketRotation(0);

                // Only perform landing if we're going to a card
                if (toCard !== null) {
                    // Phase 4: Landing sequence - vertical descent from hover position
                    setAnimationPhase('landing'); // Set phase first

                    const verticalPath = generateVerticalPath(endPoint, landingPoint);
                    setLandingPathD(verticalPath); // Set the landing path data
                    setLandingPathVisible(true); // Make the landing path visible
                    setPathVisible(false); // Hide the main flight path

                    setPathPoints({ start: endPoint, end: landingPoint });

                    // Follow the landing path (using pathOffset, onUpdate will use getPointAtPercentageForLanding)
                    await rocketControls.start({
                        pathOffset: [0, 1],
                        transition: {
                            duration: LANDING_DURATION,
                            ease: 'easeIn',
                        },
                    });
                }

                // Phase 5: Complete and hide path
                setAnimationPhase('landed');

                setLandingPathVisible(false);
                setIsMoving(false);

                // Final position update - use landing point for cards
                const finalPosition = toCard !== null ? landingPoint : endPoint;
                updateRocketPositionState(finalPosition.x, finalPosition.y);
                updateRocketDOM(finalPosition.x, finalPosition.y);

                // Hide the rocket
                if (toCard !== null) {
                    setIsVisible(false);
                    setRocketVisible(false);
                    setAnimationPhase('hidden');
                } else {
                    // If moving off-screen, ensure it's hidden and reset phase
                    setIsVisible(false);
                    setPathVisible(false);
                    setLandingPathVisible(false);
                    setRocketVisible(false);
                    setAnimationPhase('hidden');
                }
            } catch (error) {
                console.error('Animation error:', error);
                // Reset states in case of error
                setAnimationPhase('hidden');
                setIsMoving(false);
                setPathVisible(false);
                setLandingPathVisible(false); // Also reset landing path visibility
                pathControls.set({ pathLength: 0 }); // Reset path on error
                setIsVisible(false); // Ensure hidden on error
                setRocketVisible(false);
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
            setIsVisible,
            setIsMoving,
            setAnimationPhase,
            setPathVisible,
            getRelativeCoordinates,
            dynamicInitialPosition,
            setRocketVisible,
            updateRocketDOM,
            setLandingPathD,
            setLandingPathVisible,
        ],
    );

    // Continuous animation loop when moving (requestAnimationFrame)
    // This seems fine, not directly related to initial position.
    useEffect(() => {
        if (isMoving && animationFrameRef.current === null) {
            const animate = () => {
                // updateRocketPosition(); // This might not be needed if using motion controls
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
    }, [isMoving]);

    // Set initial position after component mounts and dynamic position is calculated
    useEffect(() => {
        // Only set initial state once mounted and dynamic position is available
        if (isMounted || dynamicInitialPosition.x === 0) return;

        // console.log('RocketToggle mounted, setting initial state');
        updateRocketPositionState(dynamicInitialPosition.x, dynamicInitialPosition.y);
        updateRocketDOM(dynamicInitialPosition.x, dynamicInitialPosition.y); // Also update DOM initially
        setIsMounted(true);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [dynamicInitialPosition, isMounted, updateRocketPositionState, updateRocketDOM]);

    // Track active card changes
    useEffect(() => {
        // Prevent animation if it's already in progress or component not mounted
        if (animationInProgress || !isMounted) return;

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

                // Ensure start position is current before animating
                const startPos = currentPosition.current;
                updateRocketPositionState(startPos.x, startPos.y);
                updateRocketDOM(startPos.x, startPos.y);

                animateAlongPath(prevActiveCard, currentActiveCard)
                    .then(() => {
                        // Only update the reference after successful animation
                        previousActiveCard.current = currentActiveCard;
                    })
                    .finally(() => {
                        setAnimationInProgress(false);
                    });
            } else if (prevActiveCard !== null) {
                console.log('Card deactivated - showing rocket exit animation');
                setAnimationInProgress(true);
                setRocketVisible(true); // Set visible immediately when animation starts
                setIsVisible(true);

                // Ensure start position is current before animating exit
                const startPos = currentPosition.current;
                updateRocketPositionState(startPos.x, startPos.y);
                updateRocketDOM(startPos.x, startPos.y);

                animateAlongPath(prevActiveCard, null)
                    .then(() => {
                        // Only update the reference after successful animation
                        previousActiveCard.current = null;
                    })
                    .finally(() => {
                        setAnimationInProgress(false);
                        // rocketVisible is set to false within animateAlongPath for exit
                    });
            } else {
                // Handle the case where both are null (initial state or error)
                previousActiveCard.current = null;
                // Ensure rocket is not visible if no card is active initially
                if (activeCard === null) {
                    setIsVisible(false);
                    setRocketVisible(false);
                }
            }
        }
    }, [
        activeCard,
        animateAlongPath,
        animationInProgress,
        isMounted,
        setRocketVisible,
        updateRocketDOM,
        updateRocketPositionState,
    ]);
    useEffect(() => {
        console.log('Animation phase changed:', animationPhase);
    }, [animationPhase]);

    const handleRocketClick = useCallback(() => {
        if (activeCard !== null) {
            setActiveCard(null);
        }
    }, [activeCard, setActiveCard]);

    // Now the conditional return is safe
    if (!isMounted) return null;

    const pathVariants: Variants = {
        initial: {
            pathLength: 0,
            opacity: 0,
        },
        shown: {
            pathLength: 1,
            opacity: 0.5,
            transition: { duration: PATH_TRANSITION },
        },
        hidden: {
            pathLength: 1,
            opacity: 0,
            transition: { duration: PATH_TRANSITION },
        },
    };

    return (
        <>
            {/* Main Path */}
            {DRAW_PATH && (
                <svg className='stroke-accent pointer-events-none absolute left-0 top-0 z-[9999] h-full w-full overflow-visible'>
                    <motion.path
                        d={pathD}
                        fill='none'
                        stroke={'line'}
                        variants={pathVariants}
                        initial='initial'
                        animate={pathVisible ? 'shown' : 'hidden'}
                    />
                </svg>
            )}

            {/* Landing Path */}
            {DRAW_PATH && (
                <svg className='stroke-accent pointer-events-none absolute left-0 top-0 z-[9999] h-full w-full overflow-visible'>
                    <motion.path
                        d={landingPathD}
                        fill='none'
                        variants={pathVariants}
                        initial='initial'
                        animate={landingPathVisible ? 'shown' : 'hidden'}
                    />
                </svg>
            )}

            {/* Rocket - enhanced visibility and appearance */}
            <motion.div
                id={ROCKET_ID}
                className='pointer-events-none absolute z-[9999] w-auto'
                style={{
                    translateX: `-50%`,
                    translateY: `-50%`,
                    left: `${rocketPosition.x}px`,
                    top: `${rocketPosition.y}px`,
                    opacity: isVisible ? 1 : 0,
                    visibility: isVisible ? 'visible' : 'hidden',
                }}
                animate={rocketControls}
                onUpdate={(latest) => {
                    if ('pathOffset' in latest) {
                        const offset = latest.pathOffset as number;

                        if (animationPhase === 'landing') {
                            // For landing phase: use position from path but FORCE upward rotation
                            const { x, y } = getPointAtPercentageForLanding(offset * 100);

                            // Update position state and DOM
                            updateRocketPositionState(x, y);
                            setRocketRotation(0); // Force 0 rotation for landing
                            updateRocketDOM(x, y);
                        } else {
                            const { x, y, angle } = getPointAtPercentage(offset * 100);

                            // Update position state, rotation and DOM
                            updateRocketPositionState(x, y);
                            setRocketRotation(angle);
                            updateRocketDOM(x, y);
                        }

                        // Ensure visibility during animation updates
                        if (!isVisible) setIsVisible(true);
                    } else if ('y' in latest && animationPhase === 'landing') {
                        const y = latest.y as number;
                        const x = currentPosition.current.x; // Keep X stable during vertical land

                        // Update position
                        updateRocketPositionState(x, y);
                        updateRocketDOM(x, y);
                        setRocketRotation(0); // Ensure rotation stays 0
                    }
                }}
                onClick={handleRocketClick}
            >
                <div
                    className={cn(
                        'bg-inverse-surface text-inverse-on-surface border-sw-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-full p-4',
                    )}
                    style={{
                        transition: 'transform 0.1s ease-out',
                        transform: `rotate(${rocketRotation}deg)`,
                    }}
                >
                    <motion.div
                        className='flex h-10 w-10 items-center justify-center'
                        transition={{
                            repeat: isMoving ? Infinity : 0,
                            duration: 0.5,
                        }}
                    >
                        <Rocket flames={isMoving ? 1 : 0} className='text-sw-primary h-6 w-6' />
                    </motion.div>
                </div>
            </motion.div>

            {DEBUG_MODE && (
                <>
                    <div
                        id='debug-panel'
                        className='fixed bottom-4 left-4 z-[9999] rounded-lg bg-black/70 p-4 font-mono text-xs text-white'
                    >
                        <div>DEBUG MODE ACTIVE</div>
                        <div>Phase: {animationPhase}</div>
                        <div>Visible: {isVisible ? 'Yes' : 'No'}</div>
                        <div>PathVis: {pathVisible ? 'Yes' : 'No'}</div>
                        <div>Active: {activeCard ?? 'None'}</div>
                        <div>Prev: {previousActiveCard.current ?? 'None'}</div>
                        <div>Moving: {isMoving ? 'Yes' : 'No'}</div>
                        <div>AnimInProg: {animationInProgress ? 'Yes' : 'No'}</div>
                        <div>
                            Pos: {Math.round(rocketPosition.x)}, {Math.round(rocketPosition.y)}
                        </div>
                        <div>
                            Start: {Math.round(pathPoints.start.x)}, {Math.round(pathPoints.start.y)}
                        </div>
                        <div>
                            End: {Math.round(pathPoints.end.x)}, {Math.round(pathPoints.end.y)}
                        </div>
                        <div>
                            CtrlPt: {Math.round(pathControlPoint.x)}, {Math.round(pathControlPoint.y)}
                        </div>
                        <div>Rot: {Math.round(rocketRotation)}°</div>
                        <div>
                            InitPos: {Math.round(dynamicInitialPosition.x)}, {Math.round(dynamicInitialPosition.y)}
                        </div>
                    </div>
                    <svg className='pointer-events-none absolute left-0 top-0 z-[9998] h-full w-full overflow-visible'>
                        {/* Line from the ship to the target */}
                        {pathPoints.end && isVisible && (
                            <line
                                x1={rocketPosition.x}
                                y1={rocketPosition.y}
                                x2={pathPoints.end.x}
                                y2={pathPoints.end.y}
                                stroke='rgba(255, 0, 0, 0.5)'
                                strokeWidth='1'
                                strokeDasharray='4'
                            />
                        )}

                        {/* Line representing the ship's current direction */}
                        {isVisible &&
                            (() => {
                                const directionLength = 50; // Shorter direction line
                                const angleInRadians = (rocketRotation * Math.PI) / 180;
                                const directionX = rocketPosition.x + directionLength * Math.cos(angleInRadians);
                                const directionY = rocketPosition.y + directionLength * Math.sin(angleInRadians);

                                return (
                                    <line
                                        x1={rocketPosition.x}
                                        y1={rocketPosition.y}
                                        x2={directionX}
                                        y2={directionY}
                                        stroke='rgba(0, 0, 255, 0.5)'
                                        strokeWidth='1'
                                    />
                                );
                            })()}

                        {/* Circle at control point */}
                        {pathVisible && (
                            <circle cx={pathControlPoint.x} cy={pathControlPoint.y} r='5' fill='rgba(0, 255, 0, 0.5)' />
                        )}
                        {/* Circle at path start */}
                        {pathVisible && (
                            <circle
                                cx={pathPoints.start.x}
                                cy={pathPoints.start.y}
                                r='5'
                                fill='rgba(255, 255, 0, 0.5)'
                            />
                        )}
                        {/* Circle at path end */}
                        {pathVisible && (
                            <circle cx={pathPoints.end.x} cy={pathPoints.end.y} r='5' fill='rgba(255, 0, 255, 0.5)' />
                        )}
                    </svg>
                </>
            )}
        </>
    );
}
