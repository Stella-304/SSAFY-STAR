import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type props = {
  content: string;
  setOpen: (params: any) => void;
};
export default function Test1(props: props) {
  function close() {
    props.setOpen(false);
  }
  return (
    <div className="w-full h-screen fixed top-0 left-0 flex items-center">
      <div className="m-auto w-100 h-100 text-white">
        <div onClick={close}>X</div>
        {props.content}
      </div>
    </div>
  );
}
