import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useInView } from 'framer-motion';

import CardIconModel from '@atoms/CardIconModel';

export interface CardIconCanvasProps {
	fbxPath: string;
}

export default function CardIconCanvas({ fbxPath }: CardIconCanvasProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 1 });

	return (
		<Canvas ref={ref}>
			<PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} rotation={[0, 0, 0]} />
			<pointLight position={[10, 10, 10]} intensity={1.2} />
			<Suspense fallback={null}>
				<CardIconModel modelPath={fbxPath} isInView={isInView} />
			</Suspense>
		</Canvas>
	);
}
