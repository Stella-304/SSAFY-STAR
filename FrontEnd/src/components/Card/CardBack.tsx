import { Link } from "react-router-dom";
import { User } from "../../types/User";

interface Iprops {
  user: User;
}

export default function CardBack({ user }: Iprops) {
  return (
    <div className="h-full w-full select-none rounded-20 bg-gradient-to-b from-cardTop to-[#EFF6EE] px-25 py-28 shadow-md">
      <div className="relative h-full w-full rounded-20 border-2 border-black">
        <div className="absolute left-[calc(50%-37px)] top-[-15px] h-25 w-75 bg-cardTop text-center text-16 font-bold">
          - ★ -
        </div>
        <img
          className="absolute left-1/4 top-[33%] aspect-square w-1/2"
          alt="back"
          src="/background/cardBackCircle.svg"
        />
        <div className="absolute top-25 flex w-full flex-col pl-20">
          <div className="mb-10 text-40 font-bold">{user.name}</div>
          <div className="text-20">
            {user.campus}_{user.generation}기_{user.ban}반_{user.track}트랙_
          </div>
        </div>

        <div className="absolute bottom-10 flex w-full flex-col pl-20">
          {user.company && (
            <div className="flex gap-10">
              <div className="text-24 font-bold">직장</div>
              <div className="text-24">{user.company}</div>
            </div>
          )}
          {user.major && (
            <div className="flex gap-10">
              <div className="text-24 font-bold">전공</div>
              <div className="text-24">{user.major}</div>
            </div>
          )}
          {user.role && (
            <div className="flex gap-10">
              <div className="text-24 font-bold">분야</div>
              <div className="text-24">{user.role}</div>
            </div>
          )}
          {user.email && (
            <div className="flex gap-10">
              <div className="text-24 font-bold">이메일</div>
              <div className="text-24">{user.email}</div>
            </div>
          )}
          {user.githubId && (
            <div className="flex gap-10">
              <div className="text-24 font-bold">깃허브</div>
              <Link
                to={`https://github.com/${user.githubId}`}
                target="_blank"
                className="text-24"
              >
                바로가기
              </Link>
            </div>
          )}
          {user.blogAddr && (
            <div className="flex gap-10">
              <div className="text-24 font-bold">기술 블로그</div>
              <Link to={user.blogAddr} target="_blank" className="text-24">
                바로가기
              </Link>
            </div>
          )}

          {user.bojTier && (
            <div className="flex gap-10">
              <div className="text-24 font-bold">백준 티어</div>
              <div className="text-24">{user.bojTier}</div>
            </div>
          )}
          {user.algoTest && (
            <div className="flex gap-10">
              <div className="text-24 font-bold">역량 테스트</div>
              <div className="text-24">{user.algoTest}</div>
            </div>
          )}
          {user.prize && (
            <div className="flex gap-10">
              <div className="text-24 font-bold">수상내역</div>
              <div className="whitespace-pre-wrap text-24">{user.prize}</div>
            </div>
          )}
        </div>
        <div className="absolute bottom-[-11px] left-[calc(50%-100px)] inline-block  h-25 w-200 overflow-hidden bg-cardBottom text-center text-16 font-bold">
          - ssafy star -
        </div>
      </div>
    </div>
  );
}
