import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

export interface ShipProps {
	[props: string]: any;
}

type GLTFResult = GLTF & {
	nodes: {
		Space_ship_lp_1: THREE.Mesh;
		Space_ship_lp_2: THREE.Mesh;
		Space_ship_lp_3: THREE.Mesh;
		Space_ship_lp_4: THREE.Mesh;
		Space_ship_lp_5: THREE.Mesh;
	};
	materials: {
		ship_glass: THREE.MeshStandardMaterial;
		ship_wings: THREE.MeshStandardMaterial;
		ship_body: THREE.MeshStandardMaterial;
		ship_thrusters: THREE.MeshStandardMaterial;
		ship_body_details: THREE.MeshStandardMaterial;
	};
};

export default function Ship({ ...props }: ShipProps) {
	const ref = useRef<THREE.Group>();
	const { nodes, materials } = useGLTF('./models/hero/ship.gltf') as GLTFResult;

	return (
		<group ref={ref} {...props} dispose={null}>
			<group name="Scene">
				<group name="Space_ship_lp">
					<mesh
						name="Space_ship_lp_1"
						geometry={nodes.Space_ship_lp_1.geometry}
						material={materials.ship_glass}
					/>
					<mesh
						name="Space_ship_lp_2"
						geometry={nodes.Space_ship_lp_2.geometry}
						material={materials.ship_wings}
					/>
					<mesh
						name="Space_ship_lp_3"
						geometry={nodes.Space_ship_lp_3.geometry}
						material={materials.ship_body}
					/>
					<mesh
						name="Space_ship_lp_4"
						geometry={nodes.Space_ship_lp_4.geometry}
						material={materials.ship_thrusters}
					/>
					<mesh
						name="Space_ship_lp_5"
						geometry={nodes.Space_ship_lp_5.geometry}
						material={materials.ship_body_details}
					/>
				</group>
			</group>
		</group>
	);
}
