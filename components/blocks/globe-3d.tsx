"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function GlobeWireframe() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const lineGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2.2, 32, 32);
    return new THREE.WireframeGeometry(geo);
  }, []);

  const innerGeo = useMemo(() => new THREE.SphereGeometry(2.0, 32, 32), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += (mouse.y * 0.05 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Solid inner sphere — dark ocean */}
      <mesh geometry={innerGeo}>
        <meshBasicMaterial color="#001830" transparent opacity={0.6} />
      </mesh>
      {/* Outer wireframe — sky blue */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#2571BC" transparent opacity={0.5} />
      </lineSegments>
      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.25, 0.008, 8, 80]} />
        <meshBasicMaterial color="#FFB03A" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function Globe3D({ className = "" }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#2571BC" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#BECAE6" />
        <GlobeWireframe />
      </Canvas>
    </div>
  );
}
