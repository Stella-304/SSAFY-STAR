import * as THREE from "three";
import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import CardFront from "../../components/Card/CardFront";
import { User } from "../../types/User";
import CardBack from "../../components/Card/CardBack";
import { KernelSize } from "postprocessing";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import Ground from "../../components/Ground/Ground";
import Star from "../../components/Star/Star";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import CardPreviewFront from "../../components/Card/CardPreviewFront";
import StarLine from "../../components/Star/StarLine";
import FloatingMenu from "../../components/Layout/FloatingMenu";
import { setViewCard } from "../../stores/star/starInfo";
import { setPath } from "../../stores/page/path";
import bubbleChat from "../../assets/icons/bubble-chat2.png";
import Comment from "@/components/Comment/Comment";
import ReactPlayer from "react-player";
import playIcon from "@/assets/icons/volume.png";
import pauseIcon from "@/assets/icons/mute.png";
import playIcon2 from "@/assets/icons/play.png";
import pauseIcon2 from "@/assets/icons/pause.png";

export default function Universe() {
  const [starPos, setStarPos] = useState<THREE.Vector3>();
  const [endAnim, setEndAnim] = useState<boolean>(false);
  const [isCardFront, setCardFront] = useState<boolean>(true);
  const [selectedUserInfo, setSelectedUserInfo] = useState<User>();
  const [openReply, setOpenReply] = useState<boolean>(false);
  const [preventAuto, setPreventAuto] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [clickOnce, setClickOnce] = useState<boolean>(false);
  const [existMine, setExistMine] = useState<boolean>(false);
  const [myStarPos, setMyStarPos] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0),
  );
  const [playAutoRotate, setPlayAutoRotate] = useState<boolean>(true);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  const dispatch = useDispatch();

  // 별자리 유저 정보리스트
  const starFilterInfo = useSelector(
    (state: RootState) => state.starInfo.userInfoList,
  );

  // 별자리 선 리스트
  const starFilterEdgeList = useSelector(
    (state: RootState) => state.starInfo.starEdgeList,
  );

  // 별자리 그룹 리스트
  const starGroupInfoList = useSelector(
    (state: RootState) => state.starInfo.groupInfoList,
  );

  const filterName = useSelector(
    (state: RootState) => state.starInfo.filterName,
  );

  // 카드 보기 / 닫기
  const viewCard = useSelector((state: RootState) => state.starInfo.viewCard);

  // 검색 필터 열고 닫기
  const isFilterOpen = useSelector(
    (state: RootState) => state.starInfo.filterOpen,
  );

  useEffect(() => {
    dispatch(setPath("universe")); //현위치 지정
    dispatch(setViewCard(false));
    return () => {
      setPath(""); //나올땐 리셋
    };
  }, []);

  useEffect(() => {
    if (preventAuto) {
      return;
    }
    if (clickOnce) {
      setPlaying(true);
      setPreventAuto(true);
    }
  }, [clickOnce]);

  const controls = useCallback(
    (node: any) => {
      if (node) {
        node.object.position.x = 0;
        node.object.position.y = -10;
        node.object.position.z = 0;
      }
    },
    [starFilterInfo, myStarPos],
  );

  useEffect(() => {
    if (starFilterInfo) {
      starFilterInfo.map((item) => {
        if (item.mine) {
          setExistMine(true);
          setMyStarPos(new THREE.Vector3(item.x, item.y, item.z));
        }
      });
    }
  }, [starFilterInfo]);

  return (
    <>
      <div
        className="relative h-screen w-full overflow-hidden bg-black perspective-9"
        onClick={() => setClickOnce(true)}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{
            fov: 47,
          }}
        >
          <OrbitControls
            autoRotate={playAutoRotate}
            autoRotateSpeed={0.1}
            enableZoom={false}
            reverseOrbit={true}
            rotateSpeed={0.3}
            ref={controls}
            position={[0, -10, 0]}
          />
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
                setStarPos(
                  new THREE.Vector3(item.x * 2, item.y * 2, item.z * 2),
                );
                setSelectedUserInfo(item);
                setCardFront(true);
                setEndAnim(false);
                setSelectedStars([...selectedStars, item.cardId]);
              }}
              selectedStars={selectedStars}
              key={item.cardId}
            />
          ))}
          {starGroupInfoList?.map((item: any, index: number) => (
            <Html
              position={new THREE.Vector3(item.x, item.y, item.z)}
              zIndexRange={[0, 0]}
              className="pointer-events-none w-200 text-20 text-yellow-300 text-opacity-80"
              key={index}
            >
              {item.groupName}
            </Html>
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
        <img
          src={playing ? playIcon : pauseIcon}
          className="absolute right-15 top-15 h-30 w-30 cursor-pointer"
          onClick={() => setPlaying(!playing)}
        />
        <img
          src={playAutoRotate ? playIcon2 : pauseIcon2}
          className="absolute right-55 top-15 h-30 w-30 cursor-pointer"
          onClick={() => setPlayAutoRotate(!playAutoRotate)}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=hvnRr7lPpH0"
          playing={playing}
          controls={true}
          muted={false}
          className="invisible"
        />
        <Filter />
        <div
          className="group fixed left-0 top-125 flex h-40 w-40 cursor-pointer items-center justify-center hover:brightness-90"
          onClick={() => dispatch(setViewCard(false))}
        >
          <img src="/icons/star3.png" className="h-40 w-40" />
          <div className="invisible absolute -right-130 top-5 flex h-30 w-120 items-center justify-center border-1 border-white bg-black text-16 text-white group-hover:visible">
            별자리로 보기
          </div>
        </div>
        <div
          className="group fixed left-0 top-175 flex h-40 w-40 cursor-pointer items-center justify-center rounded-50 hover:brightness-90"
          onClick={() => dispatch(setViewCard(true))}
        >
          <img src="/icons/card3.png" className="h-40 w-40" />
          <div className="invisible absolute -right-110 top-5 flex h-30 w-100 items-center justify-center border-1 border-white bg-black text-16 text-white group-hover:visible">
            카드로 보기
          </div>
        </div>
        <div
          className={
            (isFilterOpen
              ? "left-[340px] transition duration-[700ms]"
              : "left-[340px] transition duration-[700ms] -translate-x-270") +
            " absolute top-20 text-25 font-bold text-white"
          }
        >
          {filterName ? filterName : "전체"}
        </div>
        {selectedUserInfo && (
          <>
            <div
              className="absolute left-0 top-0 z-20 h-full w-full bg-black opacity-30"
              onClick={() => {
                setEndAnim(false);
                setSelectedUserInfo(undefined);
                setOpenReply(false);
              }}
            ></div>

            <div
              className={
                (endAnim
                  ? "opacity-100 transition duration-[1200ms]"
                  : "invisible opacity-0") +
                " group absolute left-[calc(50%-240px)] top-[calc(50%-320px)] z-25 h-640 w-480"
              }
            >
              <div
                className={
                  (isCardFront ? "" : "rotate-y-180") +
                  " absolute h-full w-full transition-transform duration-1000 transform-style-3d"
                }
                onClick={() => {
                  setCardFront(!isCardFront);
                }}
              >
                {/* <div className="absolute right-0 top-0 z-20 h-0 w-0 group-hover:rounded-bl-16 group-hover:border-b-60 group-hover:border-r-60 group-hover:border-b-white group-hover:border-r-transparent"></div> */}
                <div className="absolute h-full w-full backface-hidden">
                  <CardFront
                    generation={selectedUserInfo.generation}
                    name={selectedUserInfo.name}
                    text={selectedUserInfo.content}
                    isCompanyVerified={selectedUserInfo.companyIsAuthorized}
                  />
                </div>
                <div className="absolute h-full w-full backface-hidden rotate-y-180">
                  <CardBack user={selectedUserInfo} />
                </div>
              </div>
              <img
                src={bubbleChat}
                className="absolute -right-50 -top-0 h-40 w-40 cursor-pointer"
                onClick={() => setOpenReply(!openReply)}
              />
              {openReply && <Comment selectedUserInfo={selectedUserInfo} />}
            </div>
          </>
        )}
        {viewCard && (
          <div
            className={
              (isFilterOpen
                ? "left-300 w-[calc(100%-300px)] transition duration-[700ms]"
                : "left-300 w-full transition duration-[700ms] -translate-x-270") +
              " scrollbar-white absolute top-50 flex h-full flex-wrap justify-center gap-15 overflow-y-scroll p-20 pb-100 pr-60 scrollbar-thin"
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
                }}
              >
                <CardPreviewFront
                  generation={item.generation}
                  campus={item.campus}
                  ban={item.ban}
                  name={item.name}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <FloatingMenu />
    </>
  );
}
