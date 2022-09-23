import { useRef, useState, useMemo, forwardRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { useFBX, useGLTF } from '@react-three/drei';

import type { Mesh } from 'three';

export interface CardIconModelProps {
	modelPath: string;
	position?: [x: number, y: number, z: number];
	rotation?: [x: number, y: number, z: number];
	scale?: number;
}

const LoadGLFT = ({ modelPath, forwardedRef, ...props }) => {
	const { nodes, materials } = useGLTF(modelPath);
	return <mesh {...props} ref={forwardedRef} geometry={nodes.Curve007_1.geometry} />;
};

const LoadFBX = ({ modelPath, forwardedRef, ...props }) => {
	const fbx = useFBX(modelPath);

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

	return <mesh {...props} ref={forwardedRef} geometry={geometry} />;
};

export default function CardIconModel({
	modelPath,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	scale = 1,
}: CardIconModelProps) {
	const ref = useRef(null);

	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);

	useFrame((state, delta) => {
		if (ref.current === null) return;
		ref.current.rotation.z += delta * 0.75;
	});

	// return (
	// 	<LoadGLFT
	// 		modelPath={modelPath}
	// 		forwardedRef={ref}
	// 		position={position}
	// 		rotation={rotation}
	// 		scale={clicked ? scale * 1.1 : scale}
	// 		onClick={(e) => click(!clicked)}
	// 		onPointerOver={(e) => hover(true)}
	// 		onPointerOut={(e) => hover(false)}
	// 	>
	// 		<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
	// 	</LoadGLFT>
	// );

	return (
		<LoadFBX
			modelPath={modelPath}
			forwardedRef={ref}
			position={position}
			rotation={rotation}
			scale={clicked ? scale * 1.1 : scale}
			onClick={(e) => click(!clicked)}
			onPointerOver={(e) => hover(true)}
			onPointerOut={(e) => hover(false)}
		>
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</LoadFBX>
	);
}
