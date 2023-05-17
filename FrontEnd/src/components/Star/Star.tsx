import * as THREE from "three";
import { Html, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setStarInfoPreview } from "../../stores/star/starInfo";

export default function Star(props: any) {
  const [hovered, setHovered] = useState<boolean>(false);
  const color = new THREE.Color();
  const starRef = useRef<any>(null);
  const dispatch = useDispatch();

  useFrame(() => {
    let c: THREE.ColorRepresentation = "white";
    if (starRef.current) {
      if (props.item.mine) {
        c = "rgb(0,143,255,1)";
        starRef.current.scale.x = 0.9;
        starRef.current.scale.y = 0.9;
        starRef.current.scale.z = 0.9;
      } else if (hovered) {
        c = "yellow";
      } else if (props.selectedStars.includes(props.item.cardId)) {
        c = "yellow";
      }
      starRef.current.material.color.lerp(color.set(c), 0.5);
      if (hovered) {
        starRef.current.scale.x = 1.2;
        starRef.current.scale.y = 1.2;
        starRef.current.scale.z = 1.2;
        dispatch(setStarInfoPreview(props.item));
      } else {
        if (props.item.mine) {
          starRef.current.scale.x = 0.9;
          starRef.current.scale.y = 0.9;
          starRef.current.scale.z = 0.9;
        } else {
          if (props.selectedStars.includes(props.item.cardId)) {
            starRef.current.scale.x = 0.9;
            starRef.current.scale.y = 0.9;
            starRef.current.scale.z = 0.9;
          } else {
            starRef.current.scale.x = 0.5;
            starRef.current.scale.y = 0.5;
            starRef.current.scale.z = 0.5;
          }
        }

        dispatch(setStarInfoPreview(null));
      }
    }
  });

  useLayoutEffect(() => {
    props.setEndAnim(true);

    return () => {
      props.setEndAnim(false);
    };
  }, [props.starPos]);

  return (
    <>
      <Sphere
        position={[props.item.x * 2, props.item.y * 2, props.item.z * 2]}
        onClick={() => {
          props.onClick();
        }}
        key={props.item.cardId}
        scale={2.5}
        onPointerOver={() => {
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
        visible={false}
      />
      <Sphere
        position={[props.item.x * 2, props.item.y * 2, props.item.z * 2]}
        ref={starRef}
      />
      {hovered && (
        <Html position={[props.item.x * 2, props.item.y * 2, props.item.z * 2]}>
          <div className="ml-8 mt-8 h-30 w-100 border-[0.5px] border-white bg-black text-center leading-30 text-white">
            {props.item.generation}기 {props.item.name}
          </div>
        </Html>
      )}
    </>
  );
}
