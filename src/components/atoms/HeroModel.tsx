import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations, useBVH } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { LoopPingPong } from 'three';

export interface HeroModelProps {
	modelPath: string;
	[props: string]: any;
}

type GLTFResult = GLTF & {
	nodes: {
		Cube019: THREE.SkinnedMesh;
		Cube019_1: THREE.SkinnedMesh;
		Cube019_2: THREE.SkinnedMesh;
		Cube019_3: THREE.SkinnedMesh;
		Cube019_4: THREE.SkinnedMesh;
		Cube019_5: THREE.SkinnedMesh;
		Cube019_6: THREE.SkinnedMesh;
		Cube019_7: THREE.SkinnedMesh;
		Cube019_8: THREE.SkinnedMesh;
		Cube019_9: THREE.SkinnedMesh;
		root: THREE.Bone;
		['MCH-torsoparent']: THREE.Bone;
		['MCH-foot_ikparentL']: THREE.Bone;
		['MCH-thigh_ik_targetparentL']: THREE.Bone;
		['MCH-foot_ikparentR']: THREE.Bone;
		['MCH-thigh_ik_targetparentR']: THREE.Bone;
		['MCH-hand_ikparentL']: THREE.Bone;
		['MCH-upper_arm_ik_targetparentL']: THREE.Bone;
		['MCH-hand_ikparentR']: THREE.Bone;
		['MCH-upper_arm_ik_targetparentR']: THREE.Bone;
	};
	materials: {};
};

export default function HeroModel({ modelPath, ...props }: HeroModelProps) {
	const ref = useRef<THREE.Group>();

	const { nodes, materials, animations } = useGLTF(modelPath) as GLTFResult;
	const { actions } = useAnimations(animations, ref);

	useEffect(() => {
		let action = actions.char_anim.play();
		action.loop = LoopPingPong;
		action.timeScale = 0.25;
	});

	return (
		<group {...props} ref={ref} dispose={null}>
			<group name="Scene">
				<group name="astronaut_rigify">
					<primitive object={nodes.root} />
					<primitive object={nodes['MCH-torsoparent']} />
					<primitive object={nodes['MCH-foot_ikparentL']} />
					<primitive object={nodes['MCH-thigh_ik_targetparentL']} />
					<primitive object={nodes['MCH-foot_ikparentR']} />
					<primitive object={nodes['MCH-thigh_ik_targetparentR']} />
					<primitive object={nodes['MCH-hand_ikparentL']} />
					<primitive object={nodes['MCH-upper_arm_ik_targetparentL']} />
					<primitive object={nodes['MCH-hand_ikparentR']} />
					<primitive object={nodes['MCH-upper_arm_ik_targetparentR']} />
					<group name="character">
						<skinnedMesh
							name="Cube019"
							geometry={nodes.Cube019.geometry}
							material={nodes.Cube019.material}
							skeleton={nodes.Cube019.skeleton}
							material-color="red"
						/>
						<skinnedMesh
							name="Cube019_1"
							geometry={nodes.Cube019_1.geometry}
							material={nodes.Cube019_1.material}
							skeleton={nodes.Cube019_1.skeleton}
							material-color="green"
						/>
						<skinnedMesh
							name="Cube019_2"
							geometry={nodes.Cube019_2.geometry}
							material={nodes.Cube019_2.material}
							skeleton={nodes.Cube019_2.skeleton}
							material-color="blue"
						/>
						<skinnedMesh
							name="Cube019_3"
							geometry={nodes.Cube019_3.geometry}
							material={nodes.Cube019_3.material}
							skeleton={nodes.Cube019_3.skeleton}
							material-color="black"
						/>
						<skinnedMesh
							name="Cube019_4"
							geometry={nodes.Cube019_4.geometry}
							material={nodes.Cube019_4.material}
							skeleton={nodes.Cube019_4.skeleton}
							material-color="yellow"
						/>
						<skinnedMesh
							name="Cube019_5"
							geometry={nodes.Cube019_5.geometry}
							material={nodes.Cube019_5.material}
							skeleton={nodes.Cube019_5.skeleton}
							material-color="orange"
						/>
						<skinnedMesh
							name="Cube019_6"
							geometry={nodes.Cube019_6.geometry}
							material={nodes.Cube019_6.material}
							skeleton={nodes.Cube019_6.skeleton}
							material-color="white"
						/>
						<skinnedMesh
							name="Cube019_7"
							geometry={nodes.Cube019_7.geometry}
							material={nodes.Cube019_7.material}
							skeleton={nodes.Cube019_7.skeleton}
							material-color="purple"
						/>
						<skinnedMesh
							name="Cube019_8"
							geometry={nodes.Cube019_8.geometry}
							material={nodes.Cube019_8.material}
							skeleton={nodes.Cube019_8.skeleton}
							material-color="pink"
						/>
						<skinnedMesh
							name="Cube019_9"
							geometry={nodes.Cube019_9.geometry}
							material={nodes.Cube019_9.material}
							skeleton={nodes.Cube019_9.skeleton}
							material-color="hotpink"
						/>
					</group>
				</group>
			</group>
		</group>
	);
}
