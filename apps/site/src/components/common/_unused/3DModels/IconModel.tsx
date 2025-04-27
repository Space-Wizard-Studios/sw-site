import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';
import { Color, MeshStandardMaterial } from 'three';
import * as THREE from 'three';
import { motion } from 'motion/react';

interface IconProps {
    modelPath: string;
    modelColor: number;
    isInView: boolean;
    [props: string]: any;
}

type GLTFResult = GLTF & {
    nodes: {
        icon: THREE.Mesh;
    };
    materials: {};
};

export default function Icon({ isActive, modelPath, modelColor, isInView, ...props }: IconProps) {
    const ref = useRef<THREE.Group>(null);
    const { nodes, materials } = useGLTF(modelPath) as any as GLTFResult;

    nodes.icon.material = new MeshStandardMaterial({
        color: new Color(modelColor),
    });

    return (
        // TODO
        <></>
        // <group ref={ref} {...props}>
        //   <motion.mesh
        //     geometry={nodes.icon.geometry}
        //     material={nodes.icon.material}
        //     animate={{
        //       scale: isInView ? 1 : 0,
        //       rotateZ: [-Math.PI / 12, Math.PI / 12]
        //     }}
        //     transition={{
        //       scale: {
        //         ease: 'backOut',
        //         duration: 0.45
        //       },
        //       rotateZ: {
        //         ease: 'easeInOut',
        //         duration: 1.5,
        //         repeat: Infinity,
        //         repeatType: 'reverse'
        //       }
        //     }}
        //     rotation={[Math.PI / 2, 0, 0]}
        //   />
        // </group>
    );
}
