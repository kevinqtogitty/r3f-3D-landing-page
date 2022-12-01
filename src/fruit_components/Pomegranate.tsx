/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    food_pomegranate_01: THREE.Mesh
  }
  materials: {
    food_pomegranate_01: THREE.MeshStandardMaterial
  }
}

export const Pomegranate = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/models/fruits/pomegranate.gltf/food_pomegranate_01_1k.gltf') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.food_pomegranate_01.geometry} material={materials.food_pomegranate_01} />
    </group>
  )
}

useGLTF.preload('/models/fruits/pomegranate.gltf/food_pomegranate_01_1k.gltf')
