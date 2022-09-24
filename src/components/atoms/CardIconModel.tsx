import { useRef, useMemo } from 'react';
import { useFBX } from '@react-three/drei';
import { motion } from '../../../node_modules/framer-motion-3d';

import type { Mesh } from 'three';

export interface CardIconModelProps {
	modelPath: string;
	isInView: boolean;
	[props: string]: any;
}

const LoadFBX = ({ modelPath, isInView, ...props }: CardIconModelProps) => {
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

	return (
		<motion.mesh
			{...props}
			geometry={geometry}
			animate={{
				scale: isInView ? 3.75 : 0,
				rotateZ: [-Math.PI / 10 - 0.12, Math.PI / 10 - 0.12],
			}}
			transition={{
				scale: {
					ease: 'backOut',
					duration: 0.45,
				},
				rotateZ: {
					ease: 'easeInOut',
					duration: 1.5,
					repeat: Infinity,
					repeatType: 'reverse',
				},
			}}
			rotation-x={-Math.PI / 2}
			rotation-y={0.12}
		/>
	);
};

export default function CardIconModel({ modelPath, isInView, ...props }: CardIconModelProps) {
	const ref = useRef(null);

	return (
		<LoadFBX {...props} isInView={isInView} modelPath={modelPath}>
			<meshStandardMaterial />
		</LoadFBX>
	);
}
