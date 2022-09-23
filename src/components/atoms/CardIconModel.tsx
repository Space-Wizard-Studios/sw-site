import { useRef, useMemo } from 'react';
import { useFBX } from '@react-three/drei';
import { a } from '@react-spring/three';
import { Mesh } from 'three';

export interface CardIconModelProps {
	modelPath: string;
	isVisible: boolean;
	[props: string]: any;
}

const LoadFBX = ({ modelPath, isVisible, ...props }) => {
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

export default function CardIconModel({ modelPath, isVisible, ...props }: CardIconModelProps) {
	const ref = useRef(null);

	return (
		<LoadFBX {...props} modelPath={modelPath} isVisible={isVisible}>
			<meshStandardMaterial color={isVisible ? 'hotpink' : 'orange'} />
		</LoadFBX>
	);
}
