import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { Star } from '@icons/Brand';
import { cn } from '@lib/utils';

interface Props {
    seed: number;
    start: boolean;
    count: number;
    radius: number;
    magicColorClass?: string;
}

function mulberry32(a: number) {
    return function () {
        var t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function shuffle(prng: () => number, array: any[]) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(prng() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export default function MagicExplosion({ seed, start, count, radius, magicColorClass }: Props) {
    const prng = mulberry32(seed);
    const deltaAngle = (2 * Math.PI) / count;

    const particles = Array(count)
        .fill(0)
        .map((_, i) => ({
            angle: (i + (2 * prng() - 1)) * deltaAngle,
            rotation: (i + (2 * prng() - 1)) * deltaAngle,
            duration: prng() * 0.8 + 0.8,
            delay: prng() * 0.02,
        }));

    shuffle(prng, particles);

    return (
        <>
            {particles.map((particle, i) => (
                <motion.div
                    key={i}
                    initial='hidden'
                    animate={start ? 'spawn' : 'hidden'}
                    custom={{
                        dir: [Math.cos(particle.angle) * radius, Math.sin(particle.angle) * radius],
                        duration: particle.duration,
                        delay: particle.delay,
                    }}
                    variants={particleVariants}
                    className={cn('pointer-events-none absolute -z-10 h-8 w-8 rounded-full', magicColorClass)}
                    style={{ rotate: `${particle.rotation}rad` }}
                >
                    <Star />
                </motion.div>
            ))}
        </>
    );
}

type SpawnProps = {
    dir: [number, number];
    duration: number;
    delay: number;
};

const particleVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    spawn: (props: SpawnProps) => ({
        opacity: [1, 0],
        scale: [1, 0],
        translateX: [0, props.dir[0]],
        translateY: [0, props.dir[1]],
        transition: {
            delay: props.delay,
            duration: props.duration,
            ease: 'circOut',
            translate: {
                delay: props.delay,
                duration: props.duration,
                ease: 'circOut',
            },
        },
    }),
};
