import { useEffect, useState } from "react";
import useAdminAll from "../../apis/admin/useAdminAll";
import useAdminYet from "../../apis/admin/useAdminYet";
import BigRequest from "../../components/Admin/BigRequest";
import RequestList from "../../components/Admin/SmallRequest";
import { BadgeListType } from "../../types/BadgeListType";



export default function AcceptList({type}:{type:string}) {
  const [badgeList, setBadgeList] = useState<BadgeListType[]>([]);
  const [badge,setBadge] = useState<BadgeListType>({
    authId:"",
    badgeType:"",
    companyName:"",
    imageUrl:"",
    processStatus:false,
    userEmail:"",
    userName:"",
    userNickname:""});
  const adminAllQuery = useAdminAll(setBadgeList);
  const adminYetQuery = useAdminYet(setBadgeList);

  useEffect(()=>{
    setBadge({
      authId:"",
      badgeType:"",
      companyName:"",
      imageUrl:"",
      processStatus:false,
      userEmail:"",
      userName:"",
      userNickname:""})
    if(type==="all"){
      adminAllQuery.refetch();
    }else{
      adminYetQuery.refetch();
    }
  },[type])


  return (
    <div className="flex">
      <div className="w-800">
        <BigRequest {...badge}/>
      </div>
      <div className="flex flex-col w-200 overflow-auto gap-16 ">
        {badgeList&&badgeList.map((ele)=><RequestList key={ele?.authId}  onClick={()=>setBadge(ele)} imgSrc={ele.imageUrl}/>)}
      </div>
    </div>
  );
}
  