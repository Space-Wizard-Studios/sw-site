import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { LoopPingPong } from 'three';

export interface HeroModelProps {
	modelPath: string;
	[props: string]: any;
}

export default function HeroModel({ modelPath, ...props }: HeroModelProps) {
	const ref = useRef(null);

	const { nodes, materials, animations } = useGLTF(modelPath);
	const { mixer, names, actions, clips } = useAnimations(animations, ref);

	useEffect(() => {
		let action = actions.char_anim.play();
		action.loop = LoopPingPong;
		action.timeScale = 0.25;
	});

	return (
		<group ref={ref} {...props} dispose={null}>
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
							material-color="cyan"
						/>
					</group>
				</group>
			</group>
		</group>
	);
}
