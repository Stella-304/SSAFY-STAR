import { Link } from "react-router-dom";
import { User } from "../../types/User";

interface Iprops {
  user: User;
}

export default function CardBack({ user }: Iprops) {
  return (
    <div className="w-full h-full rounded-20 bg-gradient-to-b from-cardTop to-[#EFF6EE] px-25 py-28 shadow-md select-none">
      <div className="w-full h-full border-2 border-black rounded-20 relative">
        <div className="w-75 h-25 text-16 font-bold bg-cardTop absolute top-[-15px] left-[calc(50%-37px)] text-center">
          - ★ -
        </div>
        <img
          className="w-1/2 aspect-square absolute top-[33%] left-1/4"
          alt="back"
          src="/background/cardBackCircle.svg"
        />
        <div className="w-full flex flex-col absolute top-25 pl-20">
          <div className="text-40 font-bold mb-10">{user.name}</div>
          <div className="text-20">
            {user.region}_{user.generation}기_{user.major}_{user.track}트랙_
          </div>
        </div>
        <div className="w-full flex flex-col absolute bottom-10 pl-20">
          <div className="flex gap-10">
            <div className="text-24 font-bold">직장</div>
            <div className="text-24">{user.company}</div>
          </div>
          <div className="flex gap-10">
            <div className="text-24 font-bold">깃허브</div>
            <Link to={user.gitHub} target="_blank" className="text-24">
              바로가기
            </Link>
          </div>
          <div className="flex gap-10">
            <div className="text-24 font-bold">기술 블로그</div>
            <Link to={user.blog} target="_blank" className="text-24">
              바로가기
            </Link>
          </div>
          <div className="flex gap-10">
            <div className="text-24 font-bold">분야</div>
            <div className="text-24">{user.type}</div>
          </div>
          <div className="flex gap-10">
            <div className="text-24 font-bold">백준 티어</div>
            <div className="text-24">{user.baekjoonTier}</div>
          </div>
          <div className="flex gap-10">
            <div className="text-24 font-bold">역량 테스트</div>
            <div className="text-24">{user.algoTest}</div>
          </div>
          <div className="flex gap-10">
            <div className="text-24 font-bold">수상내역</div>
            <div className="text-24 whitespace-pre-wrap">{user.prize}</div>
          </div>
        </div>
        <div className="w-200 h-25 text-16 font-bold  bg-cardBottom absolute bottom-[-11px] inline-block left-[calc(50%-100px)] overflow-hidden text-center">
          - ssafy star -
        </div>
      </div>
    </div>
  );
}
