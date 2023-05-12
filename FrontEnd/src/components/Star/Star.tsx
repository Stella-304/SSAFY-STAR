import * as THREE from "three";
import { Html, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
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
        c = "red";
      } else if (hovered) {
        c = "yellow";
      }
      starRef.current.material.color.lerp(color.set(c), 0.5);
      if (hovered) {
        starRef.current.scale.x = 1.2;
        starRef.current.scale.y = 1.2;
        starRef.current.scale.z = 1.2;
        dispatch(setStarInfoPreview(props.item));
      } else {
        starRef.current.scale.x = 0.5;
        starRef.current.scale.y = 0.5;
        starRef.current.scale.z = 0.5;
        dispatch(setStarInfoPreview(null));
      }
    }
  });

  let tl = gsap.timeline();

  useLayoutEffect(() => {
    if (
      props.starPos &&
      props.starPos.x === starRef.current.position.x &&
      props.starPos.y === starRef.current.position.y &&
      props.starPos.z === starRef.current.position.z
    ) {
      let ctx = gsap.context(() => {
        tl.to(starRef.current.scale, {
          x: 2,
          y: 2,
          z: 2,
          duration: 1,
          ease: "elastic",
        }).then(() => {
          props.setEndAnim(true);
        });
      }, starRef);

      return () => {
        ctx.revert();
        props.setEndAnim(false);
      };
    }
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
