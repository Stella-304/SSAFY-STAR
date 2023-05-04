import { Link } from "react-router-dom";
import { User } from "../../types/User";

interface Iprops {
  user: User;
  onClick: () => void;
}

export default function CardBack({ user, onClick }: Iprops) {
  return (
    <div className="box-border h-640 w-480 rounded-2xl border-5 border-white bg-black bg-opacity-70 px-20 py-20 shadow-neon">
      <img
        src="/icons/exit-white.svg"
        className="absolute right-8 top-8 z-20 h-20 w-20 cursor-pointer"
        onClick={onClick}
      />
      <div className="absolute left-0 top-0 h-0 w-0  border-r-30 border-t-30 border-r-transparent border-t-white hover:border-t-blue-900"></div>
      <div className="from-opacity-70 to-opacity-38 relative h-full w-full rounded-lg border-5 border-white bg-gradient-to-b from-black to-darkblue shadow-neon">
        <div className="absolute top-25 flex w-full flex-col pl-20">
          <div className="mb-10 text-40 font-bold text-white">{user.name}</div>
          <div className="text-20 text-white">
            {user.campus}_{user.generation}기_{user.ban}반_{user.track}트랙
          </div>
        </div>

        <div className="absolute bottom-10 flex w-full flex-col pl-20">
          {user.company && (
            <div className="flex h-36 items-center gap-10">
              <div className="h-36 text-24  font-bold text-white">직장</div>
              <div className="h-36 text-22 text-white">{user.company}</div>
            </div>
          )}
          {user.major && (
            <div className="flex h-36 items-center gap-10">
              <div className="h-36 text-24  font-bold text-white">전공</div>
              <div className="h-36 text-22 text-white">{user.major}</div>
            </div>
          )}
          {user.role && (
            <div className="flex h-36 items-center gap-10">
              <div className="h-36 text-24  font-bold text-white">분야</div>
              <div className="h-36 text-22 text-white">{user.role}</div>
            </div>
          )}
          {user.email && (
            <div className="flex h-36 items-baseline gap-10">
              <div className="h-36 text-24  font-bold text-white">이메일</div>
              <div className="h-36 text-22 text-white">{user.email}</div>
            </div>
          )}
          {user.githubId && (
            <div className="flex h-36 items-baseline gap-10">
              <div className="h-36 text-24 font-bold text-white">깃허브</div>
              <Link
                to={`https://github.com/${user.githubId}`}
                target="_blank"
                className="flex h-36 text-22 font-bold text-blue-400 hover:text-blue-700 "
              >
                바로가기
              </Link>
            </div>
          )}
          {user.blogAddr && (
            <div className="flex h-36 items-center gap-10">
              <div className="h-36 text-24  font-bold text-white">
                기술 블로그
              </div>
              <Link
                to={user.blogAddr}
                target="_blank"
                className="h-36 text-22 font-bold text-blue-400 hover:text-blue-700"
              >
                바로가기
              </Link>
            </div>
          )}

          {user.bojTier && (
            <div className="flex h-36 items-center gap-10">
              <div className="h-36 text-24  font-bold text-white">
                백준 티어
              </div>
              <div className="h-36 text-22 text-white">{user.bojTier}</div>
            </div>
          )}
          {user.swTier && (
            <div className="flex h-36 items-center gap-10">
              <div className="h-36 text-24  font-bold text-white">
                역량 테스트
              </div>
              <div className="h-36 text-22 text-white">{user.swTier}</div>
            </div>
          )}
          {user.etc && (
            <div className="flex h-36 items-center gap-10">
              <div className="text-24 font-bold text-white">기타사항</div>
              <div className="whitespace-pre-wrap text-22 text-white">
                {user.etc}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
