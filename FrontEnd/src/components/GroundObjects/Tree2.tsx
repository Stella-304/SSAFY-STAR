import { useFBX } from "@react-three/drei";

interface IProps {
  x: number;
  y: number;
  z: number;
  scale: number;
  fbx: string;
}

export default function Tree2({ x, y, z, scale, fbx }: IProps) {
  const tree = useFBX(fbx);
  const treeClone = tree.clone();

  return (
    <primitive
      object={treeClone}
      position={[x, y, z]}
      scale={[scale, scale, scale]}
    />
  );
}
