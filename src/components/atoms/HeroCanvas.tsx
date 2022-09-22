import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Stage, SpotLight, RandomizedLight } from '@react-three/drei';
import HeroModel from './HeroModel';

export interface HeroCanvasProps {}

export default function CardIconCanvas({}: HeroCanvasProps) {
	return (
		<Canvas>
			<PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
			<Stars radius={100} depth={50} count={3000} factor={4} saturation={0} speed={2.3} fade />
			<Stage
				adjustCamera
				ambience={1}
				intensity={0.6}
				environment={'night'}
				shadows
				contactShadow={{ blur: 0.2, opacity: 0.7 }}
			>
				<Suspense fallback={null}>
					<HeroModel />
				</Suspense>
			</Stage>

			<SpotLight
				position={[+3.3, 5.6, +1]}
				color={0xf22312}
				distance={7}
				angle={0.6}
				attenuation={7}
				anglePower={5}
			/>
			<SpotLight
				position={[-3.3, 5.6, -1]}
				color={0x2312f2}
				distance={7}
				angle={0.6}
				attenuation={7}
				anglePower={5}
			/>
		</Canvas>
	);
}
