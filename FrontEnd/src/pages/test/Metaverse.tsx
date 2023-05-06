import { Unity, useUnityContext } from "react-unity-webgl";
import FloatingMenu from "../../components/Layout/FloatingMenu";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPath } from "../../stores/page/path";
export default function Metaverse() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/WebGLFile.loader.js",
    dataUrl: "Build/WebGLFile.data",
    frameworkUrl: "Build/WebGLFile.framework.js",
    codeUrl: "Build/WebGLFile.wasm",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPath("metaverse"));
    return () => {
      setPath("");
    };
  }, []);
  return (
    <>
      <Unity
        unityProvider={unityProvider}
        style={{ marginLeft: 50, width: 1400, height: 750 }}
      />
      <FloatingMenu />
    </>
  );
}
