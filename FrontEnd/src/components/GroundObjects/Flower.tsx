import { useFBX } from "@react-three/drei";

interface Iprops {
  x: number;
  y: number;
  z: number;
  scale: number;
  fbx: string;
}

export default function Flower({ x, y, z, scale, fbx }: Iprops) {
  const flower = useFBX(fbx);
  const flowerClone = flower.clone();
  return (
    <primitive
      object={flowerClone}
      position={[x, y, z]}
      scale={[scale, scale, scale]}
    />
  );
}
