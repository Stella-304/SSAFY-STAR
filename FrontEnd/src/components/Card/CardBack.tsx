import { Link } from "react-router-dom";
import { User } from "../../types/User";

interface Iprops {
  user: User;
  onClick: () => void;
}

export default function CardBack({ user, onClick }: Iprops) {
  return (
    <div className="shadow-neon box-border h-640 w-480 rounded-2xl border-5 border-white bg-black bg-opacity-70 px-20 py-20">
      <div className="hover:border-t-blue absolute left-0 top-0 h-0  w-0 border-r-30 border-t-30 border-r-transparent border-t-white"></div>
        <div className="absolute top-25 flex w-full flex-col pl-20">
          <div className="mb-10 text-40 font-bold">{user.name}</div>
          <div className="text-20">
            {user.campus}_{user.generation}기_{user.ban}반_{user.track}트랙_
          </div>
        </div>

        <div className="absolute bottom-10 flex w-full flex-col pl-20">
          {user.company && (
            <div className="flex h-36 items-center gap-10">
              <div className="h-36 text-24  font-bold">직장</div>
              <div className="h-36 text-22 ">{user.company}</div>
            </div>
          )}
          {user.major && (
            <div className="flex h-36 items-center gap-10">
              <div className="h-36 text-24  font-bold">전공</div>
              <div className="h-36 text-22 ">{user.major}</div>
            </div>
          )}
          {user.role && (
            <div className="flex h-36 items-center gap-10">
              <div className="h-36 text-24  font-bold">분야</div>
              <div className="h-36 text-22 ">{user.role}</div>
            </div>
          )}
          {user.email && (
            <div className="flex h-36 items-baseline gap-10">
              <div className="h-36 text-24  font-bold">이메일</div>
              <div className="h-36 text-22 ">{user.email}</div>
            </div>
          )}
          {user.githubId && (
            <div className="flex h-36 items-baseline gap-10">
              <div className="h-36 text-24 font-bold">깃허브</div>
              <Link
                to={`https://github.com/${user.githubId}`}
                target="_blank"
                className="flex h-36 text-22 text-blue-300 hover:text-blue-700"
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
                className="h-36 text-22  text-blue-300 hover:text-blue-700"
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
        <div className="absolute bottom-[-11px] left-[calc(50%-100px)] inline-block h-25 w-200 overflow-hidden bg-cardBottom text-center text-16 font-bold">
          - ssafy star -
        </div>
      </div>
    </div>
  );
}
