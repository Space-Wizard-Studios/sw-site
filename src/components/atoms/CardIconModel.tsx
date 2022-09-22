import { useRef, useState, useMemo } from 'react';

import { useFrame } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';

import type { Mesh } from 'three';

export interface CardIconModelProps {
	fbxPath: string;
	position?: [x: number, y: number, z: number];
	rotation?: [x: number, y: number, z: number];
	scale?: number;
}

export default function CardIconModel({
	fbxPath,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	scale = 1,
}: CardIconModelProps) {
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
}
