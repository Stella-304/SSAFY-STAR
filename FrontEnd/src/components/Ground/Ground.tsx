import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import ground from "../../assets/ground.jpg";
import Tree from "../GroundObjects/Tree";
import Flower from "../GroundObjects/Flower";

export default function Ground() {
  const texture = useTexture(ground);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return (
    <>
      {" "}
      <mesh receiveShadow position={[0, -10, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
          map={texture}
          map-repeat={[240, 240]}
          color="green"
          side={THREE.DoubleSide}
        />
      </mesh>
      <Tree
        x={90}
        y={-10}
        z={60}
        scale={0.5}
        mtl={"/obj/Lowpoly_tree_sample.mtl"}
        obj={"/obj/Lowpoly_tree_sample.obj"}
      />
      <Tree
        x={100}
        y={-10}
        z={10}
        scale={0.5}
        mtl={"/obj/Lowpoly_tree_sample.mtl"}
        obj={"/obj/Lowpoly_tree_sample.obj"}
      />
      <Tree
        x={100}
        y={-10}
        z={5}
        scale={0.5}
        mtl={"/obj/Lowpoly_tree_sample.mtl"}
        obj={"/obj/Lowpoly_tree_sample.obj"}
      />
      <Tree
        x={40}
        y={-10}
        z={90}
        scale={0.5}
        mtl={"/obj/Lowpoly_tree_sample.mtl"}
        obj={"/obj/Lowpoly_tree_sample.obj"}
      />
      <Tree
        x={30}
        y={-10}
        z={100}
        scale={0.5}
        mtl={"/obj/Lowpoly_tree_sample.mtl"}
        obj={"/obj/Lowpoly_tree_sample.obj"}
      />
      <Tree
        x={20}
        y={-10}
        z={70}
        scale={0.5}
        mtl={"/obj/Lowpoly_tree_sample.mtl"}
        obj={"/obj/Lowpoly_tree_sample.obj"}
      />
      <Flower x={70} y={-5} z={50} scale={0.3} fbx={"/obj/Flower1.1.fbx"} />
    </>
  );
}
