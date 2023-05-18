import { Unity, useUnityContext } from "react-unity-webgl";
import FloatingMenu from "../../components/Layout/FloatingMenu";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../../stores/page/path";
import { RootState } from "../../stores/store";
import useUserDetailUpdate from "@/apis/user/useUserDetailUpdate";

export default function Metaverse() {
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
    addEventListener,
    removeEventListener,
    sendMessage, //오브젝트, 메소드, 파라메터
  } = useUnityContext({
    loaderUrl: "Build/WebGL.loader.js",
    dataUrl: "Build/WebGL.data",
    frameworkUrl: "Build/WebGL.framework.js",
    codeUrl: "Build/WebGL.wasm",
  });
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const userUpdateQuery = useUserDetailUpdate();
  const [accessNumber, setAccessNumber] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [tutorial, setTutorial] = useState(true);
  const [page, setPage] = useState(0);

  const { nickname } = useSelector((state: RootState) => state.user);
  const handleNickname = useCallback((accessNumber: number) => {
    setAccessNumber(accessNumber);
  }, []);

  const [isNicknameChanged, setIsNicknameChanged] = useState(0);

  const handleNicknameChange = useCallback((isNicknameChanged: number) => {
    setIsNicknameChanged(isNicknameChanged);
  }, []);

  useEffect(() => {
    addEventListener("GetUser", handleNickname);
    return () => {
      removeEventListener("GetUser", handleNickname);
    };
  }, [addEventListener, removeEventListener, handleNickname]);

  useEffect(() => {
    addEventListener("NicknameChanged", handleNicknameChange);
    return () => {
      removeEventListener("NicknameChanged", handleNicknameChange);
    };
  }, [addEventListener, removeEventListener, handleNicknameChange]);

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(setPath("metaverse"));
    return () => {
      setPath("");
    };
  }, []);

  useEffect(() => {
    return () => {
      detachAndUnloadImmediate().catch((reason) => {
        console.warn(reason);
      });
    };
  }, [detachAndUnloadImmediate]);

  useEffect(() => {
    if (accessNumber === 100) {
      if (sessionStorage.getItem("accessToken")) {
        sendMessage(
          "GameController",
          "GetLogin",
          sessionStorage.getItem("accessToken"),
        );

        if (nickname) {
          sendMessage("GameController", "GetNickname", nickname);
        } else {
          sendMessage("GameController", "GetNickname", "");
        }
      } else {
        sendMessage("GameController", "GetLogin", "");
      }

      setAccessNumber(0);
    } else {
    }
  }, [accessNumber, sendMessage, nickname]);

  useEffect(() => {
    //유저정보 업데이트
    userUpdateQuery.refetch();
  }, [isNicknameChanged]);

  const loadingPercentage = Math.round(loadingProgression * 100);
  const style: CSSProperties = {
    width: loadingPercentage + "%",
  };
  return (
    <>
      {tutorial && (
        <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-blue-500">
          <div className="flex flex-col items-center ">
            <div className="flex justify-center gap-32">
              <div
                className="flex h-500 w-50 cursor-pointer items-center justify-center rounded-10 text-center"
                onClick={() => setPage(page - 1 === -1 ? 7 : page - 1)}
              >
                <img src="./help/left.png" alt="이전" />
              </div>
              <div className="flex h-500 w-400 flex-col items-center justify-center">
                {page === 0 && (
                  <div>
                    <img src="./help/meta_cache.png" alt="캐시" />
                    <div className="text-center text-white">
                      실행이 안되나요?
                      <br />
                      F12 - network - 캐시 사용 중지 체크 - 새로고침
                    </div>
                  </div>
                )}
                {page === 1 && (
                  <div>
                    <img src="./help/meta_key.png" alt="조작법" />
                  </div>
                )}
                {page === 2 && (
                  <div>
                    <img src="./help/meta_zoom.png" alt="줌인줌아웃" />
                    <div className="text-center  text-white">
                      마우스 휠로 줌인 줌아웃이 가능합니다.
                    </div>
                  </div>
                )}
                {page === 3 && (
                  <div>
                    <img src="./help/meta_map.png" alt="지도" />
                    <div className="text-center text-white">
                      싸피스타의 지도입니다.
                      <br />
                      M으로 확인해보세요
                    </div>
                  </div>
                )}
                {page === 4 && (
                  <div>
                    <img src="./help/meta_chat.png" alt="채팅" />
                    <div className="text-center text-white">
                      귓속말은 /w 닉네임 메시지
                      <br />
                      귓속말 답장은 /r 메시지
                    </div>
                  </div>
                )}
                {page === 5 && (
                  <div>
                    <img src="./help/meta_charac.png" alt="캐릭터" />
                    <div className="text-center text-white">
                      캐릭터는 지도의 옷가게
                      <br />
                      좌측하단의 이모티콘에서 변경할 수 있습니다.
                    </div>
                  </div>
                )}
                {page === 6 && (
                  <div>
                    <img src="./help/meta_npc.png" alt="npc" />
                    <div className="text-center text-white">
                      지도의 빨간점에 NPC가 있습니다.
                      <br />
                      싸피에 도움이 되는 말이 있습니다.
                    </div>
                  </div>
                )}
                {page === 7 && (
                  <div>
                    <img src="./help/meta_pro.png" alt="홍보관" />
                    <div className="text-center text-white">
                      지도에 홍보관을 통해 입장
                      <br />
                      서비스들을 구경해보세요.
                    </div>
                  </div>
                )}
              </div>
              <div
                className="flex h-500 w-50 cursor-pointer items-center justify-center rounded-10  text-center"
                onClick={() => setPage((page + 1) % 8)}
              >
                <img src="./help/right.png" alt="다음" />
              </div>
            </div>

            {isLoaded ? (
              <div className="">
                <div
                  className="text-bold flex h-50 w-100 cursor-pointer items-center justify-center rounded-10 bg-yellow-500 text-xl "
                  onClick={() => setTutorial(false)}
                >
                  게임 입장
                </div>
              </div>
            ) : (
              <div className="h-10 w-300 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-10 rounded-full bg-blue-600"
                  style={style}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}
      <div></div>
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "100%" }}
      />
      <FloatingMenu />
    </>
  );
}
