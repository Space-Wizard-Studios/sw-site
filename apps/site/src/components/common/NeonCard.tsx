import { type PointerEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { cn } from '@lib/utils';

interface NeonCardProps {
    children: React.ReactNode;
    className?: string;
}

export function NeonCard({ children, className }: Readonly<NeonCardProps>) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const neonBorder = useMotionTemplate`
        radial-gradient(
            100px circle at ${mouseX}px ${mouseY}px,
            rgba(255, 80, 200, 1),
            rgba(168, 85, 247, 0.9) 40%,
            rgba(34, 211, 238, 0.4) 60%,
            transparent 30%
        )
    `;

    const neonGlow = useMotionTemplate`
        radial-gradient(
            260px circle at ${mouseX}px ${mouseY}px,
            rgba(255, 80, 200, 0.55),
            rgba(168, 85, 247, 0.35),
            transparent 15%
        )
    `;

    const updatePointerPosition = ({ currentTarget, clientX, clientY }: PointerEvent<HTMLDivElement>) => {
        const rect = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - rect.left);
        mouseY.set(clientY - rect.top);
    };

    return (
        <div
            className={cn('group relative', className)}
            onPointerEnter={updatePointerPosition}
            onPointerMove={updatePointerPosition}
        >
            {/* Outer glow */}
            <motion.div
                aria-hidden='true'
                className='pointer-events-none absolute -inset-0.5 rounded-[calc(1rem+2px)] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50'
                style={{ background: neonGlow }}
            />

            {/* Border neon */}
            <motion.div
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-30'
                style={{
                    background: neonBorder,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '2px',
                }}
            />

            {children}
        </div>
    );
}
