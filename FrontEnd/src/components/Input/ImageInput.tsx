 
 //http://yoonbumtae.com/?p=3225

import { useRef } from "react"

 //https://velog.io/@yiyb0603/React%EC%97%90%EC%84%9C-%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-%ED%95%98%EA%B8%B0
 export default function ImageInput() {
    const dragRef = useRef<HTMLLabelElement>(null);
    //이미지를 드래그해서 입력
    const dragEnter = (e:any)=>{
        //아래와 같은 막는것을 넣어줘야 drop이벤트를 잡을 수 있다.
        e.stopPropagation()
        e.preventDefault()

        console.log("들어옴")
    }
    const dragLeave = (e:any)=>{
        e.stopPropagation()
        e.preventDefault()
        console.log("나옴")
    }
    const dragOver = (e:any)=>{
        e.stopPropagation()
        e.preventDefault()
        console.log("위임")
    }
    const drop=(e:any)=>{
        e.preventDefault() //중요
        console.log("드랍")
        console.log(e.dataTransfer)
        let files = e.dataTransfer && e.dataTransfer.files;
        console.log(files);
    }

    //

    return (
      <div className="w-full h-full bg-blue-500" onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragOver} onDrop={drop} >
        <input id="image" type="file" className="hidden"/>
        <label htmlFor="image" ref={dragRef}></label>
      </div>
    );
  }
  