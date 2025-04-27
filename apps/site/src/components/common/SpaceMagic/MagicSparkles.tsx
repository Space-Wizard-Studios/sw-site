import { motion, useAnimationControls } from 'motion/react';
import type { Variants } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Star } from '@icons/Brand';
import { cn } from '@lib/utils';

interface Props {
	seed: number;
	start: boolean;
	count: number;
	sparkleColorClass?: string;
}

function mulberry32(a: number) {
	return function () {
		var t = (a += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

type ParticleProps = {
	prng: () => number;
	start: boolean;
	containerRef: React.RefObject<HTMLDivElement | null>;
	scale: number;
	duration: number;
	delay: number;
	rotation: number;
	sparkleColorClass?: string;
};

type Position = {
	x: number;
	y: number;
};

function Particle({ prng, start, containerRef, scale, duration, delay, rotation, sparkleColorClass }: ParticleProps) {
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
	const controls = useAnimationControls();

	async function setPositionRandom() {
		if (!containerRef.current) {
			return;
		}

		setPosition({
			x: containerRef.current.clientWidth * prng(),
			y: containerRef.current.clientHeight * prng(),
		});

		await controls.start(start ? 'spawn' : 'hidden');

		if (start) {
			setPositionRandom();
		}
	}

	useEffect(() => {
		setPositionRandom();
	}, [containerRef, start]);

	return (
		<motion.div
			initial="hidden"
			animate={controls}
			custom={{
				scale: scale,
				duration: duration,
				delay: delay,
			}}
			variants={particleVariants}
			className={cn('absolute rounded-full w-4 h-4 pointer-events-none origin-center', sparkleColorClass)}
			style={{
				rotate: `${rotation}rad`,
				translateX: `${position.x}px`,
				translateY: `${position.y}px`,
			}}
		>
			<Star />
		</motion.div>
	);
}

export default function MagicSparkles({ seed, start, count, sparkleColorClass }: Props) {
	const prng = mulberry32(seed);
	const ref = useRef<HTMLDivElement>(null);

	const particles = Array(count)
		.fill(0)
		.map((_) => ({
			scale: prng() * 0.4 + 0.6,
			rotation: prng() * 2 * Math.PI,
			duration: prng() * 0.8 + 0.8,
			delay: prng() * 1.2 + 0.4,
		}));

	return (
		<div ref={ref} className={cn("absolute inset-0 -z-10", sparkleColorClass)}>
			{particles.map((particle, i) => (
				<Particle key={i} containerRef={ref} prng={prng} start={start} {...particle} />
			))}
		</div>
	);
}

type SpawnProps = {
	scale: number;
	duration: number;
	delay: number;
};

const particleVariants: Variants = {
	hidden: {
		scale: 0,
		opacity: 0,
	},
	spawn: (props: SpawnProps) => ({
		scale: [0, props.scale, 0],
		opacity: [0, 1, 0],
		transition: {
			delay: props.delay,
			duration: props.duration,
			ease: 'easeInOut',
		},
	}),
};