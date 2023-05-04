import { Unity, useUnityContext } from "react-unity-webgl";
import EarthLayout from "../../components/Layout/EarthLayout";

export default function Metaverse() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/WebGLFile.loader.js",
    dataUrl: "Build/WebGLFile.data",
    frameworkUrl: "Build/WebGLFile.framework.js",
    codeUrl: "Build/WebGLFile.wasm",
  });
  return (
    <EarthLayout>
      <Unity
        unityProvider={unityProvider}
        style={{ marginLeft: 50, width: 1400, height: 750 }}
      />
    </EarthLayout>
  );
}
