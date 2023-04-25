import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import CardFront from "../../components/Card/CardFront";
import { User } from "../../types/User";
import CardBack from "../../components/Card/CardBack";

const userInfo: User = {
  name: "이아현",
  generation: 7,
  region: "대전",
  major: "전공",
  track: "자바",
  company: "삼성전자",
  gitHub: "https://github.com/skylove308",
  blog: "https://daily-programmers-diary.tistory.com",
  type: "BackEnd",
  baekjoonTier: "Platinum",
  algoTest: "B형",
  prize: `자율 1등\n특화 2등\n공통 1등`,
  text: `얼마 전 당신의 입장이 되었던 기억이 나고, \n 얼마나 힘든 일인지 압니다. \n 하지만 노력과 헌신, 인내를 통해 \n 목표를 달성할 수 있다는 것도 알고 있습니다. \n 포기하지 말고 계속 탁월함을 위해 노력합시다.`,
};

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
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function Test1() {
  const [isCardFront, setCardFront] = useState<boolean>(true);
  const [isShow, showCard] = useState<boolean>(false);

  return (
    <div className="h-screen w-full overflow-hidden bg-black perspective-9">
      <div
        className={
          (isShow
            ? "h-712 w-461 animate-shine overflow-hidden"
            : "left-10 top-10 h-40 w-40 overflow-hidden") +
          " absolute left-[calc(50%-230px)] top-[calc(50%-356px)] z-10 transition duration-[3000ms] transform-style-3d"
        }
      >
        <div
          className={
            (isCardFront ? "" : "rotate-y-180") +
            " absolute h-full w-full transition-transform duration-1000 transform-style-3d"
          }
          onClick={() => setCardFront(!isCardFront)}
        >
          <div className="absolute h-full w-full backface-hidden">
            <CardFront
              generation={7}
              name="이아현"
              text={`얼마 전 당신의 입장이 되었던 기억이 나고, \n 얼마나 힘든 일인지 압니다. \n 하지만 노력과 헌신, 인내를 통해 \n 목표를 달성할 수 있다는 것도 알고 있습니다. \n 포기하지 말고 계속 탁월함을 위해 노력합시다.`}
            />
          </div>
          <div className="absolute h-full w-full backface-hidden rotate-y-180">
            <CardBack user={userInfo} />
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <Box position={[-25, 0, 0]} onClick={() => showCard(true)} />
          <Box position={[25, 0, 0]} onClick={() => showCard(true)} />
          <Box position={[-25, 25, 0]} onClick={() => showCard(true)} />
          <Box position={[25, -25, 0]} onClick={() => showCard(true)} />
          <Box position={[-25, 0, 25]} onClick={() => showCard(true)} />
          <Box position={[25, 0, -25]} onClick={() => showCard(true)} />
          <Box position={[-25, 0, 0]} onClick={() => showCard(true)} />
          <Box position={[10, 10, 10]} onClick={() => showCard(true)} />
          <Box position={[-25, 25, 25]} onClick={() => showCard(true)} />
          <Box position={[10, -10, 10]} onClick={() => showCard(true)} />
          <Box position={[-10, -10, 10]} onClick={() => showCard(true)} />
          <Box position={[10, 10, -0]} onClick={() => showCard(true)} />

          <OrbitControls enableZoom={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
