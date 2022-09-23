import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Stage, SpotLight } from '@react-three/drei';
import HeroModel from './HeroModel';

export interface HeroCanvasProps {
	modelPath: string;
}

export default function HeroCanvas({ modelPath }: HeroCanvasProps) {
	return (
		<Canvas>
			<PerspectiveCamera makeDefault fov={25} position={[0, 0, 10]} />
			<Stars radius={100} depth={50} count={3000} factor={4} saturation={0} speed={2.3} fade />

			<Suspense fallback={null}>
				<SpotLight
					position={[2.4, 2.8, 0.2]}
					color={0xb22312}
					distance={8}
					angle={0.6}
					attenuation={6}
					anglePower={7}
				/>
				<SpotLight
					position={[-2.4, 2.8, -0.2]}
					color={0x2312f2}
					distance={8}
					angle={0.6}
					attenuation={6}
					anglePower={7}
				/>

				<Stage
					adjustCamera
					ambience={1}
					intensity={0.8}
					environment={'night'}
					shadows={false}
					contactShadow={false}
				>
					<HeroModel
						position={[0, 0, 0]}
						rotation={[Math.PI / 8, -Math.PI / 3, Math.PI / 12]}
						scale={1}
						modelPath={modelPath}
					/>
				</Stage>
			</Suspense>
		</Canvas>
	);
}
