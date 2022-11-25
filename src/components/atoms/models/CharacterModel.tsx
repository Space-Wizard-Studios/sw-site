import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Color, LoopPingPong } from 'three';
import { AnimationClip } from 'three';

interface CharacterProps {
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
	materials: {
		suit_c4: THREE.MeshPhysicalMaterial;
		suit_c1: THREE.MeshPhysicalMaterial;
		body_skin: THREE.MeshStandardMaterial;
		body_mouth: THREE.MeshStandardMaterial;
		body_eyes: THREE.MeshStandardMaterial;
		body_hair: THREE.MeshStandardMaterial;
		suit_helmet_glass: THREE.MeshStandardMaterial;
		extra_star: THREE.MeshStandardMaterial;
		suit_c3: THREE.MeshStandardMaterial;
		wand_wood: THREE.MeshStandardMaterial;
	};
};

type ActionName = 'char_anim';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export default function Character({ ...props }: CharacterProps) {
	const ref = useRef<THREE.Group>(null);
	const { nodes, materials, animations } = useGLTF('./models/hero/character.gltf') as any as GLTFResult;
	const { actions } = useAnimations(animations, ref);

	useEffect(() => {
		let action = (actions as GLTFActions).char_anim.play();
		action.loop = LoopPingPong;
		action.timeScale = 0.25;
	});

	materials.suit_helmet_glass.color = new Color(0xd3e0f6);
	materials.suit_helmet_glass.transparent = true;
	materials.suit_helmet_glass.opacity = 0.5;
	materials.suit_helmet_glass.roughness = 0;

	// materials.extra_star.emissive = new Color(0xFFFAB6);
	materials.extra_star.emissiveIntensity = 1.8;
	materials.extra_star.toneMapped = false;

	return (
		<group {...props} ref={ref}>
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
							material={materials.suit_c4}
							skeleton={nodes.Cube019.skeleton}
						/>
						<skinnedMesh
							name="Cube019_1"
							geometry={nodes.Cube019_1.geometry}
							material={materials.suit_c1}
							skeleton={nodes.Cube019_1.skeleton}
						/>
						<skinnedMesh
							name="Cube019_2"
							geometry={nodes.Cube019_2.geometry}
							material={materials.body_skin}
							skeleton={nodes.Cube019_2.skeleton}
						/>
						<skinnedMesh
							name="Cube019_3"
							geometry={nodes.Cube019_3.geometry}
							material={materials.body_mouth}
							skeleton={nodes.Cube019_3.skeleton}
						/>
						<skinnedMesh
							name="Cube019_4"
							geometry={nodes.Cube019_4.geometry}
							material={materials.body_eyes}
							skeleton={nodes.Cube019_4.skeleton}
						/>
						<skinnedMesh
							name="Cube019_5"
							geometry={nodes.Cube019_5.geometry}
							material={materials.body_hair}
							skeleton={nodes.Cube019_5.skeleton}
						/>
						<skinnedMesh
							name="Cube019_6"
							geometry={nodes.Cube019_6.geometry}
							material={materials.suit_helmet_glass}
							skeleton={nodes.Cube019_6.skeleton}
						/>
						<skinnedMesh
							name="Cube019_7"
							geometry={nodes.Cube019_7.geometry}
							material={materials.extra_star}
							skeleton={nodes.Cube019_7.skeleton}
						/>
						<skinnedMesh
							name="Cube019_8"
							geometry={nodes.Cube019_8.geometry}
							material={materials.suit_c3}
							skeleton={nodes.Cube019_8.skeleton}
						/>
						<skinnedMesh
							name="Cube019_9"
							geometry={nodes.Cube019_9.geometry}
							material={materials.wand_wood}
							skeleton={nodes.Cube019_9.skeleton}
						/>
					</group>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload('./models/hero/character.gltf');
