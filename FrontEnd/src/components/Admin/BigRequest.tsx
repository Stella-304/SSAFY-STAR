import useAdminAccept from "../../apis/admin/useAdminAccept";
import { BadgeListType } from "../../types/BadgeListType";
import MidButton from "../Button/MidButton";
import SmallButton from "../Button/SmallButton";



export default function BigRequest(props:BadgeListType) {
  const adminMutate = useAdminAccept();

  const accept=(acp:string)=>{
    adminMutate.mutate({authid:props.authId,type:acp});
  }

  return (
    <div className="flex flex-col items-center justify-around h-full">
      {props.authId!==""&&<div className="flex">
        <div className="w-500 h-500 flex justify-center">
          <img className="h-full" src={props.imageUrl}/>
        </div>
        <div className="bg-gray-500 text-white flex flex-col justify-around">
          <div>
            <span>- 뱃지 타입 </span> <br/>
            <span>{props.badgeType}</span>
          </div>
          {props.badgeType==="COMPANY"&&
          <div>
            <span>- 회사명</span><br/>
            <span>{props.companyName}</span>
          </div>}
          
          <div>
            <span>- 이메일</span><br/>
            <span>{props.userEmail}</span>
          </div>
          <div>
            <span>- 이름</span><br/>
            <span>{props.userName}</span>
          </div>
          <div>
            <span>- 닉네임</span><br/>
            <span>{props.userNickname}</span>
          </div>
          {!props.processStatus&&<div className="flex justify-around gap-16">
              <SmallButton value="승인" onClick={()=>accept("ok")}/>
              <SmallButton value="거절"  onClick={()=>accept("no")}/>
          </div>}
          
        </div>
      </div>}
      
    </div>
  );
}
    