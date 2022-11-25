import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

interface PlanetProps {
	[props: string]: any;
}

type GLTFResult = GLTF & {
	nodes: {
		planet: THREE.Mesh;
	};
	materials: {
		scene_planet_land: THREE.MeshStandardMaterial;
	};
};

export default function Planet({ ...props }: PlanetProps) {
	const ref = useRef<THREE.Group>(null);
	const { nodes, materials } = useGLTF('./models/hero/planet.gltf') as any as GLTFResult;

	return (
		<group ref={ref} {...props}>
			<group name="Scene">
				<mesh name="planet" geometry={nodes.planet.geometry} material={materials.scene_planet_land} />
			</group>
		</group>
	);
}

useGLTF.preload('./models/hero/planet.gltf');
