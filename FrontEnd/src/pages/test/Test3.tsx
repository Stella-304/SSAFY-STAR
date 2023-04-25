import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, Vector3 } from "@react-three/fiber";
import { Box, OrbitControls, Sphere } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { MotionConfig, useMotionValue, useTransform } from "framer-motion";
import { gsap } from "gsap";
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

export default function Test3() {
  const [starPos, setStarPos] = useState<Vector3>();
  const [endAnim, setEndAnim] = useState<boolean>(false);
  const [isCardFront, setCardFront] = useState<boolean>(true);

  const position: Vector3[] = [
    new THREE.Vector3(25, 25, 0),
    new THREE.Vector3(25, -25, 0),
    new THREE.Vector3(-25, 25, 0),
    new THREE.Vector3(25, 0, 25),
    new THREE.Vector3(-25, 0, -25),
  ];

  const starRef = useRef<any>(null);

  useEffect(() => {
    if (starPos && starRef.current) {
      let ctx = gsap.context(() => {
        let tween = gsap.timeline().to(starRef.current.position, {
          x: 0,
          y: 0,
          z: 0,
          duration: 3,
          ease: "power3.inOut",
        });
        if (tween.progress()) {
          console.log("?");
          setEndAnim(false);
        } else {
          console.log("?!");
          setEndAnim(true);
        }
      }, starRef);
      return () => ctx.revert();
    }
  }, [starPos]);

  return (
    <div className="h-screen w-full overflow-hidden bg-black perspective-9">
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {position.map((item, index) => (
          <Sphere
            position={item}
            onClick={() => {
              setStarPos(item);
            }}
            key={index}
          />
        ))}

        <Sphere
          position={starPos}
          ref={starRef}
          visible={starPos ? true : false}
        >
          <meshStandardMaterial color="hotpink" />
        </Sphere>
      </Canvas>

      <div
        className={
          (endAnim ? " " : "invisible") +
          " absolute left-[calc(50%-230px)] top-[calc(50%-356px)] z-10 h-712 w-461"
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
    </div>
  );
}
