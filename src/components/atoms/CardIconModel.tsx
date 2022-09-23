import { useRef, useMemo } from 'react';
import { useFBX } from '@react-three/drei';
import { a } from '@react-spring/three';
import { Mesh } from 'three';

export interface CardIconModelProps {
	modelPath: string;
	[props: string]: any;
}

const LoadFBX = ({ modelPath, ...props }) => {
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

	return <a.mesh {...props} geometry={geometry} />;
};

export default function CardIconModel({ modelPath, ...props }: CardIconModelProps) {
	const ref = useRef(null);

	return (
		<LoadFBX {...props} modelPath={modelPath}>
			<meshStandardMaterial />
		</LoadFBX>
	);
}
