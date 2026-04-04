import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import MagicExplosion from './MagicExplosion';
import MagicSparkles from './MagicSparkles';
import './magic-reveal.css';

interface Props {
    text: string;
    className?: string;
}

export default function MagicReveal({ text, className }: Readonly<Props>) {
    const [explode, setExplode] = useState(false);
    const [sparkle, setSparkle] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.7', 'end center'],
    });

    const scrollWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    function handleClick() {
        setExplode(false);
        setClickCount((c) => c + 1);
        requestAnimationFrame(() => {
            setExplode(true);
            setSparkle(true);
        });
    }

    return (
        <motion.span
            ref={ref}
            className={`magic-reveal relative inline-block cursor-pointer ${className ?? ''}`}
            onClick={handleClick}
            whileTap={{ scale: 0.92 }}
            animate={explode ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.35, ease: 'easeOut' }}
        >
            <span className='base' style={{ padding: '0 2px' }}>{text}</span>
            <motion.span
                className='hover'
                aria-hidden='true'
                style={{ width: scrollWidth, padding: '0 2px' }}
            >
                {text}
            </motion.span>

            <span className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                <MagicExplosion
                    seed={clickCount}
                    start={explode}
                    count={14}
                    radius={140}
                    sparkleColorClass='text-sw-gold'
                />
            </span>
            <MagicSparkles
                seed={clickCount}
                start={sparkle}
                count={6}
                sparkleColorClass='text-sw-gold'
            />
        </motion.span>
    );
}
