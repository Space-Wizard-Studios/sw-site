import { useState, useRef, useEffect, useCallback } from 'react';
import { useMotionValue, useSpring } from 'motion/react';
import MagicButton from './MagicButton';
import MagicExplosion from './MagicExplosion';
import MagicSparkles from './MagicSparkles';
import './magic.css';

const THRESHOLD = 5120; // px — distance from center where effect starts to decay
const MAX_OFFSET = 10; // px — max translate toward the cursor

type Props = {
    sparkleCount?: number;
    explosionCount?: number;
    explosionRadius?: number;
    
    defaultColorClass?: string;
    magicColorClass?: string;
    sparkleColorClass?: string;

    buttonClassName?: string;
    followMouse?: boolean;
};

export default function MagicStar({
    sparkleCount = 3,
    explosionCount = 12,
    explosionRadius = 60,
    defaultColorClass,
    magicColorClass,
    sparkleColorClass,
    buttonClassName,
    followMouse = true,
}: Readonly<Props>) {
    const [magic, setMagic] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const containerRef = useRef<HTMLDivElement | null>(null);

    // raw motion values
    const offsetX = useMotionValue(0);
    const offsetY = useMotionValue(0);

    // smoothed with a spring
    const springX = useSpring(offsetX, { stiffness: 300, damping: 30 });
    const springY = useSpring(offsetY, { stiffness: 300, damping: 30 });

    const updateOffset = useCallback(
        (clientX: number, clientY: number) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = clientX - centerX;
            const dy = clientY - centerY;
            const distance = Math.hypot(dx, dy);

            if (distance > THRESHOLD) {
                offsetX.set(0);
                offsetY.set(0);
                return;
            }

            const strength = 1 - distance / THRESHOLD;
            const inv = distance || 1;
            offsetX.set((dx / inv) * MAX_OFFSET * strength);
            offsetY.set((dy / inv) * MAX_OFFSET * strength);
        },
        [offsetX, offsetY],
    );

    // Global listener so the star reacts even when the cursor is nearby but not on it
    useEffect(() => {
        if (!followMouse) {
            offsetX.set(0);
            offsetY.set(0);
            return;
        }
        const onPointerMove = (e: PointerEvent) => updateOffset(e.clientX, e.clientY);
        globalThis.addEventListener('pointermove', onPointerMove, { passive: true });
        return () => globalThis.removeEventListener('pointermove', onPointerMove);
    }, [followMouse, updateOffset, offsetX, offsetY]);

    return (
        <div
            ref={containerRef}
            className='relative isolate inline-flex items-center justify-center'
        >
            <MagicSparkles seed={clickCount} start={magic} count={sparkleCount} sparkleColorClass={sparkleColorClass} />
            <MagicExplosion
                seed={clickCount}
                start={magic}
                count={explosionCount}
                radius={explosionRadius}
                sparkleColorClass={sparkleColorClass}
            />
            <MagicButton
                magic={magic}
                setMagic={setMagic}
                setClickCount={setClickCount}
                className={buttonClassName}
                defaultColorClass={defaultColorClass}
                magicColorClass={magicColorClass}
                // pass the smoothed motion values so the star can translate
                pointerX={springX}
                pointerY={springY}
            />
        </div>
    );
}
