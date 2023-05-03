import { useLoader } from "@react-three/fiber";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

interface IProps {
  x: number;
  y: number;
  z: number;
  scale: number;
  mtl: string;
  obj: string;
}

export default function Tree({ x, y, z, scale, mtl, obj }: IProps) {
  const treeMtl = useLoader(MTLLoader, mtl);
  const tree = useLoader(OBJLoader, obj, (loader) => {
    treeMtl.preload();
    loader.setMaterials(treeMtl);
  });

  const treeClone = tree.clone();

  return (
    <primitive
      object={treeClone}
      position={[x, y, z]}
      scale={[scale, scale, scale]}
    />
  );
}
