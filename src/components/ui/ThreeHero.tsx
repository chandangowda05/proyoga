import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

function ZenShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Torus ref={meshRef} args={[1.5, 0.4, 128, 128]} scale={1}>
        <MeshDistortMaterial
          color="#166534"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#064e3b"
          emissiveIntensity={0.2}
        />
      </Torus>
    </Float>
  );
}

function DecorDots() {
  const points = useRef<THREE.Group>(null);

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={points}>
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#166534" opacity={0.3} transparent />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeHero() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0, 5, 0]} intensity={0.8} />

        <ZenShape />
        <DecorDots />
      </Canvas>
    </div>
  );
}
