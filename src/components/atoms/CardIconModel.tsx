import { useRef, useState, useMemo, Suspense } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import { useFBX, PerspectiveCamera } from '@react-three/drei';

import type { Mesh } from 'three';

export interface ModelProps {
	fbxPath: string;
	position?: [x: number, y: number, z: number];
	rotation?: [x: number, y: number, z: number];
	scale?: number;
}

const Model = ({ fbxPath, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ModelProps) => {
	const ref = useRef(null);
	const fbx = useFBX(fbxPath);

	let fbxClone = fbx.clone();

	const geometry = useMemo(() => {
		let g;
		fbxClone.traverse((c) => {
			if (c.type === 'Mesh') {
				const _c = c as Mesh;
				g = _c.geometry;
			}
		});
		return g;
	}, [fbxClone]);

	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);

	useFrame((state, delta) => {
		if (ref.current === null) return;
		ref.current.rotation.z += delta * 0.75;
	});

	return (
		<mesh
			ref={ref}
			geometry={geometry}
			position={position}
			rotation={rotation}
			scale={clicked ? scale * 1.1 : scale}
			onClick={(e) => click(!clicked)}
			onPointerOver={(e) => hover(true)}
			onPointerOut={(e) => hover(false)}
		>
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	);
};

export interface CardIconModelProps {
	fbxPath: string;
}

export default function CardIconModel({ fbxPath }: CardIconModelProps) {
	return (
		<Canvas>
			<PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} rotation={[0, 0, 0]} />
			<pointLight position={[10, 10, 10]} intensity={1.2} />

			<Suspense fallback={null}>
				<Model fbxPath={fbxPath} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={3.5} />
			</Suspense>
		</Canvas>
	);
}
