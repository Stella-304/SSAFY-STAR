interface Props{
  imgSrc:string;
  onClick:()=>void;
}

export default function SmallRequest(props:Props) {
    return (
      <div className="flex flex-col items-center" onClick={props.onClick}>
        <div className="w-150 h-150 bg-blue-400">
            <img src={props.imgSrc}/>
        </div>
      </div>
    );
  }
    