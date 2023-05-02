import { useFBX } from "@react-three/drei";

interface IProps {
  x: number;
  y: number;
  z: number;
  scale: number;
  fbx: string;
}

export default function Grass({ x, y, z, scale, fbx }: IProps) {
  const grass = useFBX(fbx);
  const grassClone = grass.clone();

  return (
    <primitive
      object={grassClone}
      position={[x, y, z]}
      scale={[scale, scale, scale]}
    />
  );
}
