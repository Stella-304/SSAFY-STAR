import {CSSProperties} from 'react';
interface props{
  pos:string;
  delay:string;
}
export default function ShootingStar({pos,delay}:props) {
  const starStyle:CSSProperties={
    right:pos,
  }

  const style:CSSProperties={
    animationDelay: delay,
  }

  return (
    <div className="absolute top-0 right-0 rotate-45"
      style={starStyle}>
      <span className="opacity-0 animate-shooting w-170 h-2 block bg-gradient-to-r from-white to-transparent m-50 relative before:content-[''] before:absolute before:-bottom-1 before:-left-1 before:w-5 before:h-5 before:bg-white before:shadow-[0_0_6px_rgb(255,255,255) before:rounded-50]"
      style={style}
      ></span>
    </div>
  );
}
