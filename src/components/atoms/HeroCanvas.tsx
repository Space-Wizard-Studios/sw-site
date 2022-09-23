import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Stage, SpotLight, OrbitControls } from '@react-three/drei';
import HeroModel from './HeroModel';

export interface HeroCanvasProps {
	modelPath: string;
}

export default function HeroCanvas({ modelPath }: HeroCanvasProps) {
	return (
		<Canvas>
			<fog attach="fog" args={['#424251', 16, 24]} />
			<ambientLight intensity={0.7} />
			<Stars radius={350} depth={50} count={2000} factor={10} fade speed={0.25} />

			<PerspectiveCamera makeDefault fov={60} position={[0, 0, 16]}>
				<pointLight intensity={0.8} position={[-10, -25, -10]} />
				<spotLight
					castShadow
					intensity={1.8}
					angle={0.2}
					penumbra={1}
					position={[-25, 20, -15]}
					shadow-mapSize={[1024, 1024]}
					shadow-bias={-0.0001}
				/>
			</PerspectiveCamera>

			{/* <OrbitControls
				autoRotate
				autoRotateSpeed={0.5}
				rotateSpeed={0.5}
				enablePan={false}
				enableZoom={false}
				maxPolarAngle={Math.PI / 2}
				minPolarAngle={Math.PI / 2}
			/> */}

			<Suspense fallback={null}>
				<HeroModel
					position={[0, -7.6, 0]}
					rotation={[Math.PI / 8, -Math.PI / 3, Math.PI / 12]}
					scale={12}
					modelPath={modelPath}
				/>
			</Suspense>
		</Canvas>
	);
}
