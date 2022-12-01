/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    food_apple_01: THREE.Mesh
  }
  materials: {
    food_apple_01: THREE.MeshStandardMaterial
  }
}

export const Apple = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/models/fruits/apple.gltf/food_apple_01_1k.gltf') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.food_apple_01.geometry} material={materials.food_apple_01} />
    </group>
  )
}

useGLTF.preload('/models/fruits/apple.gltf/food_apple_01_1k.gltf')
