import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

export interface PlanetProps {
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
	const ref = useRef<THREE.Group>();
	const { nodes, materials } = useGLTF('./models/hero/planet.gltf') as GLTFResult;

	return (
		<group ref={ref} {...props} dispose={null}>
			<group name="Scene">
				<mesh
					name="planet"
					geometry={nodes.planet.geometry}
					material={materials.scene_planet_land}
					position={[-21.16, -11.74, -23.76]}
					rotation={[0.51, -1.52, -1]}
					scale={-8.5}
				/>
			</group>
		</group>
	);
}
