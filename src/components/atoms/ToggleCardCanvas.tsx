import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useInView } from 'framer-motion';

import Icon from '@atoms/models/IconModel';

export interface ToggleCardCanvasProps {
	modelPath: string;
}

export default function ToggleCardCanvas({ modelPath }: ToggleCardCanvasProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 1 });

	return (
		<Canvas ref={ref}>
			<PerspectiveCamera makeDefault fov={30} position={[0, 0, 10]} rotation={[0, 0, 0]} />
			<pointLight position={[10, 10, 10]} intensity={1.2} />
			<Suspense fallback={null}>
				<Icon
					modelPath={modelPath}
					isInView={isInView}
					position={[0, 0, 0]}
					rotation={[0, 0.12, -0.12]}
					scale={5}
				/>
			</Suspense>
		</Canvas>
	);
}
