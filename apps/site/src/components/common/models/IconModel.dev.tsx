import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import type { GLTF } from 'three-stdlib'
import { Color, MeshStandardMaterial } from 'three'
import * as THREE from 'three'
import { motion } from 'motion/react'

extend({ Group: THREE.Group })

interface IconProps {
  isOpen: boolean
  modelPath: string
  modelColor: number
  isInView: boolean
  [props: string]: any
}

type GLTFResult = GLTF & {
  nodes: {
    icon: THREE.Mesh
  }
  materials: {}
}

export default function Icon({ isOpen, modelPath, modelColor, isInView, ...props }: IconProps) {
  const ref = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF(modelPath) as any as GLTFResult

  const variants = {
    hidden: {
      scale: 0,
      rotateZ: [0, 0]
    },
    inView: {
      scale: 1,
      rotateZ: [-Math.PI / 12, Math.PI / 12]
    },
    open: {
      scale: 1.1,
      rotateZ: [-Math.PI / 12, Math.PI / 12]
    }
  }

  nodes.icon.material = new MeshStandardMaterial({
    color: new Color(modelColor)
  })

  return (
    // TODO
    <></>
    // <primitive object={new THREE.Group()} ref={ref} {...props}>
    //   <motion.mesh
    //     geometry={nodes.icon.geometry}
    //     material={nodes.icon.material}
    //     initial='hidden'
    //     animate={isOpen ? 'open' : isInView ? 'inView' : 'hidden'}
    //     variants={variants}
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
    // </primitive>
  )
}
