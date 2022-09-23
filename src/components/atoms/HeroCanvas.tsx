import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import Character from './CharacterModel';
import Ship from './ShipModel';
import Planet from './PlanetModel';

export interface HeroCanvasProps {}

export default function HeroCanvas({}: HeroCanvasProps) {
	return (
		<Canvas>
			{/* <fog attach="fog" args={['#424251', 16, 24]} /> */}
			<ambientLight intensity={0.7} />
			<Stars radius={350} depth={50} count={2000} factor={10} fade speed={2.25} />

			<PerspectiveCamera makeDefault fov={37.8} position={[1.35, 0.93, 0.9]} rotation={[-0.38, 1.0, 0.35]}>
				<pointLight intensity={0.8} position={[-10, -25, -10]} />
				<spotLight
					castShadow
					intensity={2.6}
					angle={0.2}
					penumbra={1}
					position={[-25, 20, -15]}
					shadow-mapSize={[1024, 1024]}
					shadow-bias={-0.0001}
				/>
			</PerspectiveCamera>

			{/* <OrbitControls /> */}

			<Suspense fallback={null}>
				<Character position={[-0.3, 0, 0]} />
			</Suspense>
			<Suspense fallback={null}>
				<Ship position={[-13, 0.26, -3.1]} rotation={[0, 1.18, 0.9]} />
			</Suspense>
			<Suspense fallback={null}>
				<Planet position={[-18, -11, -22]} rotation={[6.66, -1.14, 1.5]} />
			</Suspense>

			<EffectComposer>
				<Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} />
				<Noise opacity={0.02} />
			</EffectComposer>
		</Canvas>
	);
}
