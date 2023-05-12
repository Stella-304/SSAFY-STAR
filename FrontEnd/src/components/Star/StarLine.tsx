import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";

interface Iprops {
  starFilterInfo: any;
  starFilterEdgeList: any;
}

export default function StarLine({
  starFilterInfo,
  starFilterEdgeList,
}: Iprops) {
  const [hovered, setHovered] = useState<boolean>(false);
  const color = new THREE.Color();
  const lineRef = useRef<any>(null);

  let t = 0;
  useFrame(() => {
    if (t > 10) return;
    t += 0.01;

    // for (let i = 0; i < starFilterInfo?.length - 1; i++) {
    //   lineRef.current.setPoints(
    //     [starFilterInfo[i].x, starFilterInfo[i].y, starFilterInfo[i].z],
    //     [
    //       starFilterInfo[i + 1].x,
    //       starFilterInfo[i + 1].y,
    //       starFilterInfo[i + 1].z,
    //     ],
    //   );
    // }
  });

  return starFilterEdgeList ? (
    <>
      {starFilterEdgeList.map((item: any, index: number) => (
        <Line
          key={index}
          ref={lineRef}
          points={[
            [item.x1 * 2, item.y1 * 2, item.z1 * 2],
            [item.x2 * 2, item.y2 * 2, item.z2 * 2],
          ]}
          lineWidth={0.5}
          color="#ffffff" // Default
          visible={starFilterInfo ? true : false}
        />
      ))}
    </>
  ) : (
    <></>
  );
}
