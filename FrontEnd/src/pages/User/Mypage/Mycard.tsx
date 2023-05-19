import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../../../stores/page/path";
import HeaderMenu from "@/components/Layout/HeaderMenu";
import { RootState } from "@/stores/store";
import { User } from "@/types/User";
import CardFront from "@/components/Card/CardFront";
import CardBack from "@/components/Card/CardBack";
import bubbleChat from "../../../assets/icons/bubble-chat2.png";
import Comment from "@/components/Comment/Comment";

export default function Mycard() {
  const [endAnim, setEndAnim] = useState<boolean>(true);
  const [isCardFront, setCardFront] = useState<boolean>(true);

  const [openReply, setOpenReply] = useState<boolean>(false);

  const { card } = useSelector((state: RootState) => state.card);
  const user = useSelector((state: RootState) => state.user);

  const userDetail: User = {
    cardId: Number(card.cardId),
    algoTest: "",
    authorized: false,
    ban: Number(card.ban),
    blogAddr: card.blogAddr,
    bojId: card.bojId,
    bojTier: card.bojTier,
    campus: card.campus,
    company: card.company,
    content: card.content,
    companyIsAuthorized: false,
    email: "",
    etc: card.etc,
    generation: Number(card.generation),
    githubId: card.githubId,
    major: card.major,
    mine: true,
    name: card.name,
    nickname: user.nickname,
    prize: "",
    role: card.role,
    swTier: card.swTier,
    track: card.track,
    x: 0.0,
    y: 0.0,
    z: 0.0,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPath("mypage")); //현 위치 표시
    return () => {
      dispatch(setPath("")); //나갈땐 리셋
    };
  }, []);
  return (
    <div className="flex h-screen items-center bg-[url('/public/background/main_background.png')] bg-cover bg-center">
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
              generation={userDetail.generation}
              name={userDetail.name}
              text={userDetail.content}
              isCompanyVerified={userDetail.companyIsAuthorized}
            />
          </div>
          <div className="absolute h-full w-full backface-hidden rotate-y-180">
            <CardBack user={userDetail} />
          </div>
        </div>
        <img
          src={bubbleChat}
          className="absolute -right-50 -top-0 h-40 w-40 cursor-pointer"
          onClick={() => setOpenReply(!openReply)}
        />
        {openReply && <Comment selectedUserInfo={userDetail} />}
      </div>
      <HeaderMenu />
    </div>
  );
}
