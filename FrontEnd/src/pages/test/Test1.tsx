import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import {
  CameraControls,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
  });
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function Test1() {
  return (
    <div className="w-full h-screen">
      <Suspense fallback={null}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <Box position={[-25, 0, 0]} />
          <Box position={[25, 0, 0]} />
          <Box position={[-25, 25, 0]} />
          <Box position={[25, -25, 0]} />
          <Box position={[-25, 0, 25]} />
          <Box position={[25, 0, -25]} />
          <Box position={[-25, 0, 0]} />
          <Box position={[10, 10, 10]} />
          <Box position={[-25, 25, 25]} />
          <Box position={[10, -10, 10]} />
          <Box position={[-10, -10, 10]} />
          <Box position={[10, 100, -0]} />

          <OrbitControls enableZoom={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
