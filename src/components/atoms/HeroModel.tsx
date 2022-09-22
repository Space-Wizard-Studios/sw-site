import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export interface HeroModelProps {}

export default function HeroModel({}: HeroModelProps) {
	const ref = useRef(null);

	useFrame((state, delta) => {
		if (ref.current === null) return;
		ref.current.rotation.x += delta * 0.7;
		ref.current.rotation.y += delta * 0.7;
	});

	return (
		<mesh ref={ref} position={[0, 0, 0]}>
			<torusKnotGeometry args={[1, 0.4, 100, 16]} />
			<meshLambertMaterial color={0x4259f1} wireframe />
		</mesh>
	);
}
