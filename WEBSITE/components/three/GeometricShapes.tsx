'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({
  position,
  rotation,
  scale,
  shape,
  color,
  speed = 1,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  shape: 'box' | 'sphere' | 'torus' | 'octahedron'
  color: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2 * speed
    meshRef.current.rotation.y = time * 0.3 * speed
  })

  const getGeometry = () => {
    switch (shape) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />
      case 'octahedron':
        return <octahedronGeometry args={[0.7]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        {getGeometry()}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.2}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function GeometricShapes() {
  return (
    <group>
      <FloatingShape
        position={[-8, 3, -5]}
        shape="box"
        color="#9900ff"
        scale={2}
        speed={0.5}
      />
      <FloatingShape
        position={[8, -2, -8]}
        shape="sphere"
        color="#00ffff"
        scale={2.5}
        speed={0.7}
      />
      <FloatingShape
        position={[-6, -4, -10]}
        shape="torus"
        color="#9900ff"
        scale={3}
        speed={0.4}
      />
      <FloatingShape
        position={[6, 4, -6]}
        shape="octahedron"
        color="#00ffff"
        scale={2}
        speed={0.6}
      />
      <FloatingShape
        position={[0, -6, -12]}
        shape="box"
        color="#ffd700"
        scale={1.5}
        speed={0.3}
      />
      <FloatingShape
        position={[-10, 0, -15]}
        shape="sphere"
        color="#9900ff"
        scale={3}
        speed={0.2}
      />
      <FloatingShape
        position={[10, 2, -12]}
        shape="torus"
        color="#00ffff"
        scale={2}
        speed={0.5}
      />
    </group>
  )
}
