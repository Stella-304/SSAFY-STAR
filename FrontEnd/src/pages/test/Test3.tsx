import * as THREE from "three";
import { useLayoutEffect, useRef, useState } from "react";
import { Canvas, Vector3 } from "@react-three/fiber";
import {
  OrbitControls,
  Plane,
  QuadraticBezierLine,
  Sphere,
  Stars,
} from "@react-three/drei";
import { gsap } from "gsap";
import CardFront from "../../components/Card/CardFront";
import { User } from "../../types/User";
import CardBack from "../../components/Card/CardBack";
import { KernelSize } from "postprocessing";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

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
  const [starPos, setStarPos] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0),
  );
  const [endAnim, setEndAnim] = useState<boolean>(false);
  const [isCardFront, setCardFront] = useState<boolean>(true);

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

  const starRef = useRef<any>(null);
  const planeRef = useRef<any>(null);
  const app = useRef<any>(null);

  useLayoutEffect(() => {
    if (starPos && starRef.current) {
      let ctx = gsap.context(() => {
        setEndAnim(false);
        let tl = gsap.timeline();
        tl.to(starRef.current.position, {
          x: 0,
          y: 0,
          z: 0,
          duration: 3,
          ease: "power4.inOut",
        })
          .to(starRef.current.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(planeRef.current.scale, { x: 1, y: 1, z: 1 })
          .then(() => setEndAnim(true));
      }, app);

      return () => ctx.revert();
    }
  }, [starPos]);

  return (
    <div className="h-screen w-full overflow-hidden bg-black perspective-9">
      <Canvas>
        <OrbitControls />
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
        <pointLight
          position={[10, 10, 10]}
          distance={40}
          intensity={8}
          color="lightblue"
        />
        {position.map((item, index) => (
          <Sphere
            position={item}
            onClick={() => {
              setStarPos(item);
            }}
            key={index}
          />
        ))}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Sphere
          position={starPos}
          ref={starRef}
          visible={starPos ? true : false}
        >
          <meshStandardMaterial color="hotpink" />
        </Sphere>

        {starPos && (
          <QuadraticBezierLine
            start={starPos} // Starting point, can be an array or a vec3
            end={[0, 0, 0]} // Ending point, can be an array or a vec3
            mid={[5, 0, 5]} // Optional control point, can be an array or a vec3
            lineWidth={3}
            color="#ff2060" // Default
            visible={starPos ? true : false}
          />
        )}
        <Plane
          position={[0, 0, 0]}
          ref={planeRef}
          args={[5, 10]}
          scale={[0, 0, 0]}
          visible={!endAnim}
        />
      </Canvas>

      <div
        className={
          (endAnim ? " " : "invisible") +
          " absolute left-[calc(50%-230px)] top-[calc(50%-356px)] z-10 h-712 w-461"
        }
        ref={app}
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
