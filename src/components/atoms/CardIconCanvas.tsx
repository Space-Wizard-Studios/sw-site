import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

import { useInView } from 'react-intersection-observer';
import { easings, useSpring } from '@react-spring/three';

import CardIconModel from './CardIconModel';

export interface CardIconCanvasProps {
	fbxPath: string;
}

export default function CardIconCanvas({ fbxPath }: CardIconCanvasProps) {
	const { ref, inView } = useInView({
		threshold: 1,
		delay: 500,
		triggerOnce: true,
		fallbackInView: true,
	});

	const { scale } = useSpring({
		scale: inView ? 3.75 : 0,
		config: { easing: easings.easeOutBack, duration: 350, precision: 0.001 },
	});

	const { rotation } = useSpring({
		loop: { reverse: true },
		reset: true,
		from: { rotation: [-Math.PI / 2, 0.1, -Math.PI / 10 - 0.12] },
		to: { rotation: [-Math.PI / 2, 0.1, Math.PI / 10 - 0.12] },
		config: { easing: easings.easeInOutQuad, duration: 1500, precision: 0.001 },
	});

	return (
		<Canvas ref={ref}>
			<PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} rotation={[0, 0, 0]} />
			<pointLight position={[10, 10, 10]} intensity={1.2} />
			<Suspense fallback={null}>
				<CardIconModel modelPath={fbxPath} position={[0, 0, 0]} rotation={rotation} scale={scale} />
			</Suspense>
		</Canvas>
	);
}
