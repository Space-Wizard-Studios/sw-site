import { motion } from 'motion/react';

interface Props {
    seed: number;
    isOpen: boolean;
}

const nParticles = 12;
const radius = 50;

function mulberry32(a: number) {
    return function () {
        var t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function Particle({ seed, isOpen }: Props) {
    const shockWave = {
        hidden: { opacity: 1, scale: 1 },
        shown: {
            opacity: 1,
            scale: 1.2,
            transition: {
                scale: {
                    duration: 0.45,
                    ease: 'easeOut',
                },

                staggerChildren: 0.005,
            },
        },
    };

    const debris = {
        hidden: { opacity: 0, translateX: 0 },
        shown: (dir: [number, number]) => ({
            opacity: [1, 0],
            translateX: [0, dir[0]],
            translateY: [0, dir[1]],
            transition: {
                opacity: {
                    duration: 0.45,
                    ease: 'easeOut',
                },
                translateX: {
                    duration: 0.3,
                    ease: 'circOut',
                },
                translateY: {
                    duration: 0.3,
                    ease: 'circOut',
                },
            },
        }),
    };

    const prng = mulberry32(seed);

    function shuffle(array: any[]) {
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

    const deltaAngle = (2 * Math.PI) / nParticles;
    const angles = Array(nParticles)
        .fill(0)
        .map((_, i) => (i + (2 * prng() - 1)) * deltaAngle);

    shuffle(angles);

    return (
        <motion.div
            variants={shockWave}
            initial='hidden'
            animate={isOpen ? 'shown' : 'hidden'}
            className='absolute bottom-0 right-0 m-2 h-12 w-12'
        >
            {angles.map((angle, i) => (
                <motion.div
                    key={i}
                    custom={[Math.cos(angle) * radius, Math.sin(angle) * radius]}
                    variants={debris}
                    className='bg-sw-navy dark:bg-sw-flamingo absolute bottom-0 left-0 right-0 top-0 m-auto h-1 w-2.5 rounded-full'
                    style={{ rotate: `${angle}rad` }}
                />
            ))}
        </motion.div>
    );
}
