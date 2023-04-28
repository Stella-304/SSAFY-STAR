import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, Vector3, useFrame } from "@react-three/fiber";
import {
  CameraControls,
  OrbitControls,
  Plane,
  QuadraticBezierLine,
  Sparkles,
  Sphere,
  Stars,
  TrackballControls,
  useTexture,
} from "@react-three/drei";
import { gsap } from "gsap";
import CardFront from "../../components/Card/CardFront";
import { User } from "../../types/User";
import CardBack from "../../components/Card/CardBack";
import { KernelSize } from "postprocessing";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ground from "../../assets/ground.jpg";

import { motion } from "framer-motion-3d";
import { Scene } from "three";
import useStarInfoQuery from "../../apis/useStarInfoQuery";
import axios from "axios";

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

function Ground() {
  const texture = useTexture(ground);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return (
    <mesh receiveShadow position={[0, -10, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial
        map={texture}
        map-repeat={[240, 240]}
        color="green"
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Star({ item, onClick }: any) {
  const [hovered, setHovered] = useState<boolean>(false);
  const color = new THREE.Color();
  const starRef = useRef<any>(null);

  useFrame(() => {
    // Animate font color
    starRef.current.material.color.lerp(
      color.set(hovered ? "#fa2720" : "white"),
      0.1,
    );
    if (hovered) {
      starRef.current.scale.x = 0.7;
      starRef.current.scale.y = 0.7;
      starRef.current.scale.z = 0.7;
    } else {
      starRef.current.scale.x = 0.12;
      starRef.current.scale.y = 0.12;
      starRef.current.scale.z = 0.12;
    }
  });

  return (
    <Sphere
      position={[item.x * 3, item.y * 3, item.z * 3]}
      onClick={() => onClick()}
      ref={starRef}
      key={item.cardId}
      scale={0.12}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial color="white" />
    </Sphere>
  );
}

export default function Test3() {
  const [starPos, setStarPos] = useState<THREE.Vector3>();
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
  const lineRef = useRef<any>(null);

  const starInfo = useStarInfoQuery();

  let tl = gsap.timeline();

  useLayoutEffect(() => {
    if (starPos && starRef.current) {
      let ctx = gsap.context(() => {
        tl.to(starRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 2,
          ease: "elastic",
        }).then(() => setEndAnim(true));
      }, starRef);

      return () => {
        ctx.revert();
        setEndAnim(false);
      };
    }
  }, [starPos]);

  return (
    <div className="h-screen w-full overflow-hidden bg-black perspective-9">
      <Canvas dpr={[1, 2]} camera={{ position: [0, -10, 0], fov: 47 }}>
        <OrbitControls autoRotate autoRotateSpeed={0.4} enableZoom={false} />
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

        {/* {starInfo?.data?.cardList?.map((item: any) => (
          // <Sphere
          //   position={[item.x * 3, item.y * 3, item.z * 3]}
          //   onClick={() => {
          //     setStarPos(new THREE.Vector3(item.x * 3, item.y * 3, item.z * 3));
          //     console.log(item);
          //   }}
          //   ref={starRef}
          //   key={item.cardId}
          //   scale={0.12}
          //   onPointerOver={}
          // />
          <Star
            item={item}
            onClick={() =>
              setStarPos(new THREE.Vector3(item.x * 3, item.y * 3, item.z * 3))
            }
          />
        ))} */}
        {position.map((item) => (
          <Star
            item={item}
            onClick={() =>
              setStarPos(new THREE.Vector3(item.x * 3, item.y * 3, item.z * 3))
            }
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
        {/* <Sparkles
          count={50}
          color={"yellow"}
          scale={10}
          speed={0.5}
          noise={0.5}
        /> */}
        {/* <StarLine
          starPos={starPos}
          starRef={starRef}
          planeRef={planeRef}
          endAnim={endAnim}
        /> */}
        {/* <Sphere
          position={starPos}
          ref={starRef}
          visible={starPos ? true : false}
        /> */}
        {/* <QuadraticBezierLine
          ref={lineRef}
          start={starPos ? starPos : [0, 0, 0]} // Starting point, can be an array or a vec3
          end={[0, 0, 0]} // Ending point, can be an array or a vec3
          lineWidth={3}
          color="white" // Default
          visible={starPos ? true : false}
        /> */}
        <Ground />
      </Canvas>

      <div
        className={
          (endAnim
            ? "opacity-100 transition duration-[2000ms]"
            : "invisible opacity-0") +
          " absolute left-[calc(50%-230px)] top-[calc(50%-356px)] z-10 h-712 w-461"
        }
      >
        <div
          className="absolute right-10 top-10 z-20 cursor-pointer text-15"
          onClick={() => setEndAnim(false)}
        >
          X
        </div>
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
