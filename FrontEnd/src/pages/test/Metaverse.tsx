import { Unity, useUnityContext } from "react-unity-webgl";
import FloatingMenu from "../../components/Layout/FloatingMenu";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "../../stores/page/path";
import { RootState } from "../../stores/store";

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
    loaderUrl: "Build/WebGLFile.loader.js",
    dataUrl: "Build/WebGLFile.data",
    frameworkUrl: "Build/WebGLFile.framework.js",
    codeUrl: "Build/WebGLFile.wasm",
  });
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [accessNumber, setAccessNumber] = useState(0);
  const { nickname } = useSelector((state: RootState) => state.user);
  const handleNickname = useCallback((accessNumber: number) => {
    setAccessNumber(accessNumber);
  }, []);

  useEffect(() => {
    addEventListener("GetUser", handleNickname);
    return () => {
      removeEventListener("GetUser", handleNickname);
    };
  }, [addEventListener, removeEventListener, handleNickname]);

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
      } else {
        sendMessage("GameController", "GetLogin", "");
      }
      if (nickname) {
        sendMessage("GameController", "GetNickname", nickname);
      }
    } else {
      console.log("잘 찍히나요?");
    }
  }, [accessNumber, sendMessage, nickname]);

  const loadingPercentage = Math.round(loadingProgression * 100);
  const style: CSSProperties = {
    width: loadingPercentage + "%",
  };
  return (
    <>
      {isLoaded === false && (
        <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-blue-500">
          <div className="flex flex-col ">
            <span className="mb-8 block text-7xl font-bold">Loading...</span>
            <div className="h-10 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-10 rounded-full bg-blue-600"
                style={style}
              ></div>
            </div>
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
