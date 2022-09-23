/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    planet: THREE.Mesh
  }
  materials: {
    scene_planet_land: THREE.MeshStandardMaterial
  }
}

type ActionName = 'planet'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/planet.gltf') as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="planet" geometry={nodes.planet.geometry} material={materials.scene_planet_land} position={[-21.16, -11.74, -23.76]} rotation={[0.51, -1.52, -1]} scale={-8.5} />
      </group>
    </group>
  )
}

useGLTF.preload('/planet.gltf')