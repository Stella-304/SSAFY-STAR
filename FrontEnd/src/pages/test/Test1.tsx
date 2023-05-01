import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, QuadraticBezierLine, Stars } from "@react-three/drei";
import CardFront from "../../components/Card/CardFront";
import { User } from "../../types/User";
import CardBack from "../../components/Card/CardBack";
import { KernelSize } from "postprocessing";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import useStarInfoQuery from "../../apis/useStarInfoQuery";
import Ground from "../../components/Ground/Ground";
import Star from "../../components/GroundObjects/Star";

const userInfo: User = {
  name: "이아현",
  generation: 7,
  ban: 5,
  x: 25,
  y: 25,
  z: 25,
  cardId: 1,
  campus: "대전",
  major: "전공",
  track: "자바",
  company: "삼성전자",
  githubId: "skylove308",
  bojId: "skylove650",
  blogAddr: "https://daily-programmers-diary.tistory.com",
  email: "skylove0911@naver.com",
  nickname: "블루베리",
  role: "BackEnd",
  bojTier: "Platinum",
  algoTest: "B형",
  authorized: false,
  prize: `자율 1등\n특화 2등\n공통 1등`,
  text: `얼마 전 당신의 입장이 되었던 기억이 나고, \n 얼마나 힘든 일인지 압니다. \n 하지만 노력과 헌신, 인내를 통해 \n 목표를 달성할 수 있다는 것도 알고 있습니다. \n 포기하지 말고 계속 탁월함을 위해 노력합시다.`,
};

interface Iprops {
  starPos: THREE.Vector3 | undefined;
  starRef: any;
  planeRef: any;
  endAnim: boolean;
}

function StarLine({ starPos }: Iprops) {
  const [hovered, setHovered] = useState<boolean>(false);
  const color = new THREE.Color();
  const lineRef = useRef<any>(null);

  // useFrame(({ camera }) => {
  //   // Make text face the camera
  //   lineRef.current.quaternion.copy(camera.quaternion);
  //   // Animate font color
  //   lineRef.current.material.color.lerp(
  //     color.set(hovered ? "#fa2720" : "white"),
  //     0.1,
  //   );
  // });
  let t = 0;
  useFrame(() => {
    if (t > 1) return;
    t += 0.01;
    if (starPos) {
      //console.log(lineRef.current);
      lineRef.current.setPoints(
        starPos,
        [0, 0, 0],
        // [5, 0, 0] // Optional: mid-point
      );
    }
  });

  console.log(starPos);

  return (
    <QuadraticBezierLine
      ref={lineRef}
      start={starPos ? starPos : [0, 0, 0]} // Starting point, can be an array or a vec3
      end={[0, 0, 0]} // Ending point, can be an array or a vec3
      lineWidth={3}
      color="#ff2060" // Default
      visible={starPos ? true : false}
    />
  );
}

export default function Test1() {
  const [starPos, setStarPos] = useState<THREE.Vector3>();
  const [endAnim, setEndAnim] = useState<boolean>(false);
  const [isCardFront, setCardFront] = useState<boolean>(true);
  const [selectedUserInfo, setSelectedUserInfo] = useState<User>();

  const position: THREE.Vector3[] = [
    new THREE.Vector3(25, 25, 0),
    new THREE.Vector3(25, -25, 0),
    new THREE.Vector3(-25, 25, 0),
    new THREE.Vector3(25, 0, 25),
    new THREE.Vector3(-25, 0, -25),
    new THREE.Vector3(-25, 10, 0),
    new THREE.Vector3(-10, 30, 0),
    new THREE.Vector3(-10, 15, 10),
    new THREE.Vector3(-15, 30, 20),
  ];

  const lineRef = useRef<any>(null);
  const starInfo = useStarInfoQuery();
  const starRef = useRef<any>(null);

  return (
    <div className="h-screen w-full overflow-hidden bg-black perspective-9">
      <Canvas dpr={[1, 2]} camera={{ position: [0, -10, 0], fov: 47 }}>
        <OrbitControls enableZoom={false} />
        <ambientLight />
        <EffectComposer multisampling={8}>
          <Bloom
            kernelSize={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            intensity={0.6}
          />
          <Bloom
            kernelSize={KernelSize.HUGE}
            luminanceThreshold={0}
            luminanceSmoothing={0}
            intensity={0.5}
          />
        </EffectComposer>
        {starInfo?.data?.cardList?.map((item: User) => (
          <Star
            item={item}
            starPos={starPos}
            setEndAnim={setEndAnim}
            onClick={() => {
              setStarPos(new THREE.Vector3(item.x * 2, item.y * 2, item.z * 2));
              setSelectedUserInfo(item);
              setCardFront(true);
              setEndAnim(false);
            }}
            key={item.cardId}
          />
        ))}
        {/* {position.map((item, index) => (
          <Star
            item={item}
            starPos={starPos}
            setEndAnim={setEndAnim}
            onClick={() => {
              setStarPos(new THREE.Vector3(item.x * 3, item.y * 3, item.z * 3));
            }}
            key={index}
          />
        ))} */}
        <Stars
          radius={130}
          depth={30}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Ground />
      </Canvas>
      {selectedUserInfo && (
        <div
          className={
            (endAnim
              ? "opacity-100 transition duration-[2000ms]"
              : "invisible opacity-0") +
            " absolute left-[calc(50%-230px)] top-[calc(50%-356px)] z-10 h-712 w-461"
          }
        >
          <img
            src="/icons/exit.svg"
            className="absolute right-10 top-10 z-20 h-20 w-20 cursor-pointer"
            onClick={() => setEndAnim(false)}
          />
          <div
            className={
              (isCardFront ? "" : "rotate-y-180") +
              " absolute h-full w-full transition-transform duration-1000 transform-style-3d"
            }
            onClick={() => setCardFront(!isCardFront)}
          >
            <div className="absolute h-full w-full backface-hidden">
              <CardFront
                generation={selectedUserInfo.generation}
                name={selectedUserInfo.name}
                text={`얼마 전 당신의 입장이 되었던 기억이 나고, \n 얼마나 힘든 일인지 압니다. \n 하지만 노력과 헌신, 인내를 통해 \n 목표를 달성할 수 있다는 것도 알고 있습니다. \n 포기하지 말고 계속 탁월함을 위해 노력합시다.`}
              />
            </div>
            <div className="absolute h-full w-full backface-hidden rotate-y-180">
              <CardBack user={selectedUserInfo} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
