import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import HeroModel from './HeroModel';

export interface HeroCanvasProps {}

export default function CardIconCanvas({}: HeroCanvasProps) {
	return (
		<Canvas>
			<PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
			<pointLight position={[10, 10, 10]} intensity={1.2} />
			<Suspense fallback={null}>
				<HeroModel />
			</Suspense>
		</Canvas>
	);
}
