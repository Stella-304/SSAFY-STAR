import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import ground from "../../assets/ground.jpg";
import Tree from "../GroundObjects/Tree";
import Flower from "../GroundObjects/Flower";
import Tree2 from "../GroundObjects/Tree2";

export default function Ground() {
  const texture = useTexture(ground);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return (
    <>
      <mesh receiveShadow position={[0, -10, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
          map={texture}
          map-repeat={[240, 240]}
          color="green"
          side={THREE.DoubleSide}
        />
      </mesh>
      <Tree2
        x={-100}
        y={-10}
        z={-130}
        scale={0.1}
        fbx={"/obj/tree/Tree1.2.fbx"}
      />{" "}
      <Tree2 x={100} y={-10} z={90} scale={0.1} fbx={"/obj/tree/Tree1.1.fbx"} />{" "}
      <Tree2
        x={-150}
        y={-10}
        z={-40}
        scale={0.1}
        fbx={"/obj/tree/Tree1.3.fbx"}
      />
      <Tree2
        x={-200}
        y={-10}
        z={-90}
        scale={0.1}
        fbx={"/obj/tree/Tree1.1.fbx"}
      />
      <Flower x={70} y={-5} z={50} scale={0.3} fbx={"/obj/Flower1.1.fbx"} />
      <Flower x={200} y={-5} z={50} scale={0.3} fbx={"/obj/Flower3.1.fbx"} />
      <Flower x={100} y={-5} z={80} scale={0.3} fbx={"/obj/Flower2.1.fbx"} />
      <Flower x={90} y={-5} z={60} scale={0.3} fbx={"/obj/Flower2.2.fbx"} />
      <Flower x={70} y={-5} z={-50} scale={0.3} fbx={"/obj/Flower3.2.fbx"} />
      <Flower x={-60} y={-5} z={-70} scale={0.3} fbx={"/obj/Flower3.3.fbx"} />
      <Flower x={-200} y={-5} z={-80} scale={0.3} fbx={"/obj/Flower1.2.fbx"} />
      <Flower x={-120} y={-5} z={-90} scale={0.3} fbx={"/obj/Flower1.3.fbx"} />
    </>
  );
}
