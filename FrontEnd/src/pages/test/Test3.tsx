import { Unity, useUnityContext } from "react-unity-webgl";

export default function Test3() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/WebGLFile.loader.js",
    dataUrl: "Build/WebGLFile.data",
    frameworkUrl: "Build/WebGLFile.framework.js",
    codeUrl: "Build/WebGLFile.wasm",
  });
  return (
    <Unity
      unityProvider={unityProvider}
      style={{ marginLeft: 50, width: 1400, height: 750 }}
    />
  );
}
