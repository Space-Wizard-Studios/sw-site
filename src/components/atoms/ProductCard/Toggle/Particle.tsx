import { motion } from 'framer-motion';
import { seededRandom } from 'three/src/math/MathUtils';

interface Props {
	isOpen: boolean;
}

const nParticles = 12;
const radius = 50;

export function Particle({ isOpen }: Props) {
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

	function shuffle(array: any[]) {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(seededRandom(0) * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
	}

	const deltaAngle = (2 * Math.PI) / nParticles;
	const angles = Array(nParticles)
		.fill(0)
		.map((_, i) => (i + (2 * seededRandom(0) - 1)) * deltaAngle);

	shuffle(angles);

	return (
		<motion.div
			variants={shockWave}
			initial="hidden"
			animate={isOpen ? 'shown' : 'hidden'}
			className="absolute right-0 bottom-0 w-12 h-12 m-2"
		>
			{angles.map((angle, i) => (
				<motion.div
					key={i}
					custom={[Math.cos(angle) * radius, Math.sin(angle) * radius]}
					variants={debris}
					className="absolute left-0 right-0 top-0 bottom-0 m-auto rounded-full w-2.5 h-1 bg-sw-navy dark:bg-sw-flamingo"
					style={{ rotate: `${angle}rad` }}
				/>
			))}
		</motion.div>
	);
}
