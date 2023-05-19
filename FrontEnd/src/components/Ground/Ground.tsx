import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import ground from "../../assets/ground.jpg";
import Flower from "../GroundObjects/Flower";
import Tree2 from "../GroundObjects/Tree2";
import Grass from "../GroundObjects/Grass";

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
      />
      <Tree2 x={0} y={-10} z={90} scale={0.1} fbx={"/obj/tree/Tree1.1.fbx"} />
      <Tree2
        x={-150}
        y={-10}
        z={-40}
        scale={0.1}
        fbx={"/obj/tree/Tree1.3.fbx"}
      />
      <Tree2
        x={-350}
        y={-10}
        z={140}
        scale={0.1}
        fbx={"/obj/tree/Tree1.1.fbx"}
      />
      <Tree2
        x={500}
        y={-10}
        z={180}
        scale={0.1}
        fbx={"/obj/tree/Tree1.2.fbx"}
      />
      <Tree2
        x={-640}
        y={-10}
        z={-160}
        scale={0.1}
        fbx={"/obj/tree/Tree1.3.fbx"}
      />
      <Tree2 x={100} y={-10} z={80} scale={0.1} fbx={"/obj/tree/Tree1.3.fbx"} />
      <Tree2 x={20} y={-10} z={160} scale={0.1} fbx={"/obj/tree/Tree1.3.fbx"} />
      <Tree2
        x={-400}
        y={-10}
        z={120}
        scale={0.1}
        fbx={"/obj/tree/Tree1.3.fbx"}
      />
      <Flower x={70} y={-5} z={150} scale={0.3} fbx={"/obj/Flower1.1.fbx"} />
      <Flower x={200} y={-5} z={100} scale={0.3} fbx={"/obj/Flower3.1.fbx"} />
      <Flower x={100} y={-5} z={80} scale={0.3} fbx={"/obj/Flower2.1.fbx"} />
      <Flower x={90} y={-5} z={60} scale={0.3} fbx={"/obj/Flower2.2.fbx"} />
      <Flower x={70} y={-5} z={-50} scale={0.3} fbx={"/obj/Flower3.2.fbx"} />
      <Flower x={-60} y={-5} z={-70} scale={0.3} fbx={"/obj/Flower3.3.fbx"} />
      <Flower x={-200} y={-5} z={-80} scale={0.3} fbx={"/obj/Flower1.2.fbx"} />
      <Flower x={-300} y={-5} z={-90} scale={0.3} fbx={"/obj/Flower1.3.fbx"} />
      <Flower x={300} y={-5} z={60} scale={0.3} fbx={"/obj/Flower1.2.fbx"} />
      <Flower x={220} y={-5} z={130} scale={0.3} fbx={"/obj/Flower1.3.fbx"} />
      <Flower x={-570} y={-5} z={-120} scale={0.3} fbx={"/obj/Flower1.1.fbx"} />
      <Flower x={-130} y={-5} z={-70} scale={0.3} fbx={"/obj/Flower3.3.fbx"} />
      <Flower x={-230} y={-5} z={130} scale={0.3} fbx={"/obj/Flower1.2.fbx"} />
      <Flower x={-350} y={-5} z={-105} scale={0.3} fbx={"/obj/Flower1.3.fbx"} />
      <Flower x={320} y={-5} z={60} scale={0.3} fbx={"/obj/Flower1.2.fbx"} />
      <Flower x={420} y={-5} z={130} scale={0.3} fbx={"/obj/Flower1.3.fbx"} />
      <Flower x={-50} y={-5} z={-120} scale={0.3} fbx={"/obj/Flower1.1.fbx"} />
      <Flower x={62} y={-5} z={-70} scale={0.3} fbx={"/obj/Flower3.3.fbx"} />
      <Flower x={70} y={-5} z={100} scale={0.3} fbx={"/obj/Flower1.2.fbx"} />
      <Flower x={-333} y={-5} z={60} scale={0.3} fbx={"/obj/Flower1.3.fbx"} />
      <Flower x={267} y={-5} z={60} scale={0.3} fbx={"/obj/Flower1.2.fbx"} />
      <Flower x={220} y={-5} z={130} scale={0.3} fbx={"/obj/Flower1.3.fbx"} />
      <Flower x={-470} y={-5} z={-120} scale={0.3} fbx={"/obj/Flower1.1.fbx"} />
      <Grass
        x={-300}
        y={-5}
        z={-120}
        scale={0.3}
        fbx={"/obj/grass/Grass.fbx"}
      />
      <Grass
        x={-500}
        y={-5}
        z={-160}
        scale={0.3}
        fbx={"/obj/grass/Grass.fbx"}
      />
      <Grass x={100} y={-5} z={120} scale={0.3} fbx={"/obj/grass/Grass.fbx"} />
      <Grass x={90} y={-5} z={180} scale={0.3} fbx={"/obj/grass/Grass.fbx"} />
      <Grass x={500} y={-5} z={-200} scale={0.3} fbx={"/obj/grass/Grass.fbx"} />
      <Grass x={300} y={-5} z={-120} scale={0.3} fbx={"/obj/grass/Grass.fbx"} />
      <Grass
        x={-210}
        y={-5}
        z={-120}
        scale={0.3}
        fbx={"/obj/grass/Grass.fbx"}
      />
      <Grass x={350} y={-5} z={-180} scale={0.3} fbx={"/obj/grass/Grass.fbx"} />
      <Grass x={700} y={-5} z={-120} scale={0.3} fbx={"/obj/grass/Grass.fbx"} />
      <Grass x={470} y={-5} z={-190} scale={0.3} fbx={"/obj/grass/Grass.fbx"} />
      <Grass x={0} y={-5} z={-120} scale={0.3} fbx={"/obj/grass/Grass.fbx"} />
      <Grass x={-530} y={-5} z={200} scale={0.3} fbx={"/obj/grass/Grass.fbx"} />
    </>
  );
}
