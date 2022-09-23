import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import CardIconModel from './CardIconModel';

export interface CardIconCanvasProps {
	fbxPath: string;
}

export default function CardIconCanvas({ fbxPath }: CardIconCanvasProps) {
	return (
		<Canvas>
			<PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} rotation={[0, 0, 0]} />
			<pointLight position={[10, 10, 10]} intensity={1.2} />
			<Suspense fallback={null}>
				<CardIconModel modelPath={fbxPath} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={3.5} />
			</Suspense>
		</Canvas>
	);
}
