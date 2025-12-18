'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
}

export default function ParticleField({ count = 500 }: ParticleFieldProps) {
  const mesh = useRef<THREE.Points>(null)
  const light = useRef<THREE.PointLight>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const purple = new THREE.Color('#9900ff')
    const cyan = new THREE.Color('#00ffff')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Position in a sphere
      const radius = 15 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Color blend between purple and cyan
      const color = Math.random() > 0.5 ? purple : cyan
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 2 + 0.5
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return

    const time = state.clock.getElapsedTime()
    mesh.current.rotation.y = time * 0.05
    mesh.current.rotation.x = Math.sin(time * 0.1) * 0.1

    // Animate particle positions slightly
    const positions = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const originalY = particles.positions[i3 + 1]
      positions[i3 + 1] = originalY + Math.sin(time + i * 0.1) * 0.2
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <pointLight ref={light} position={[0, 0, 0]} intensity={2} color="#9900ff" />
    </>
  )
}
