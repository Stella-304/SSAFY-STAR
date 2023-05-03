import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import CardFront from "../../components/Card/CardFront";
import { User } from "../../types/User";
import CardBack from "../../components/Card/CardBack";
import { KernelSize } from "postprocessing";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import Ground from "../../components/Ground/Ground";
import Star from "../../components/Star/Star";
import Filter from "../../components/Filter/Filter";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import CardPreviewFront from "../../components/Card/CardPreviewFront";
import StarLine from "../../components/Star/StarLine";
import useMouse from "@react-hook/mouse-position";

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
  content: `얼마 전 당신의 입장이 되었던 기억이 나고, \n 얼마나 힘든 일인지 압니다. \n 하지만 노력과 헌신, 인내를 통해 \n 목표를 달성할 수 있다는 것도 알고 있습니다. \n 포기하지 말고 계속 탁월함을 위해 노력합시다.`,
};

export default function Test1() {
  const [starPos, setStarPos] = useState<THREE.Vector3>();
  const [endAnim, setEndAnim] = useState<boolean>(false);
  const [isCardFront, setCardFront] = useState<boolean>(true);
  const [selectedUserInfo, setSelectedUserInfo] = useState<User>();
  const [isCardOpen, setCardOpen] = useState<boolean>(false);
  const [mousePosX, setMousePosX] = useState<number>();
  const [mousePosY, setMousePosY] = useState<number>();

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

  const ref = useRef<any>(null);
  //const mouse = useMouse(ref);

  const starFilterInfo = useSelector(
    (state: RootState) => state.starInfo.userInfoList,
  );

  const starFilterEdgeList = useSelector(
    (state: RootState) => state.starInfo.starEdgeList,
  );

  const userInfoPreview = useSelector(
    (state: RootState) => state.starInfo.userInfoPreview,
  );

  const viewCard = useSelector((state: RootState) => state.starInfo.viewCard);

  const isFilterOpen = useSelector(
    (state: RootState) => state.starInfo.filterOpen,
  );

  useEffect(() => {
    console.log(ref);
  }, [starFilterInfo]);

  // useEffect(() => {
  //   if (userInfoPreview) {
  //     setMousePosX(userInfoPreview.x * 2 - 1);
  //     setMousePosY(userInfoPreview.y * 2 - 1);
  //   }
  // }, [userInfoPreview]);

  return (
    <div className=" relative h-screen w-full overflow-hidden bg-black perspective-9">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, -10, 0], fov: 47 }}
        ref={ref}
      >
        <OrbitControls autoRotate={true} autoRotateSpeed={0.15} />
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
        {starFilterInfo?.map((item: User) => (
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
        <StarLine
          starFilterInfo={starFilterInfo}
          starFilterEdgeList={starFilterEdgeList}
        />
      </Canvas>
      <Filter />
      {selectedUserInfo && (
        <div
          className={
            (endAnim
              ? "opacity-100 transition duration-[1200ms]"
              : "invisible opacity-0") +
            " absolute left-[calc(50%-230px)] top-[calc(50%-356px)] z-25 h-712 w-461"
          }
        >
          <img
            src="/icons/exit.svg"
            className="absolute right-10 top-10 z-20 h-20 w-20 cursor-pointer"
            onClick={() => {
              setEndAnim(false);
              setCardOpen(false);
            }}
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
                text={selectedUserInfo.content}
              />
            </div>
            <div className="absolute h-full w-full backface-hidden rotate-y-180">
              <CardBack user={selectedUserInfo} />
            </div>
          </div>
        </div>
      )}
      {isCardOpen && (
        <div className="absolute left-0 top-0 z-20 h-full w-full bg-black opacity-30"></div>
      )}
      {viewCard && (
        <div
          className={
            (isFilterOpen
              ? "left-300 w-[calc(100%-300px)]"
              : "left-30 w-full") +
            " absolute top-0 flex h-full flex-wrap justify-center gap-15 overflow-y-scroll p-20 scrollbar-thin scrollbar-track-blue-100 scrollbar-thumb-blue-400"
          }
        >
          {starFilterInfo?.map((item: User, index: number) => (
            <div
              className="h-200 w-150 cursor-pointer hover:brightness-125"
              key={index}
              onClick={() => {
                setStarPos(
                  new THREE.Vector3(item.x * 2, item.y * 2, item.z * 2),
                );
                setSelectedUserInfo(item);
                setCardFront(true);
                setEndAnim(false);
                setCardOpen(true);
              }}
            >
              <CardPreviewFront generation={item.generation} name={item.name} />
            </div>
          ))}
        </div>
      )}
      {/* {userInfoPreview && mouse && (
        <div
          style={{ top: mouse.y!, left: mouse.x! }}
          className="absolute z-30 h-30 w-50 bg-yellow-500"
        >
          {userInfoPreview?.name}
        </div>
      )} */}
    </div>
  );
}
