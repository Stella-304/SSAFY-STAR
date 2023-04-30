import BigRequest from "../../components/Admin/BigRequest";
import RequestList from "../../components/Admin/SmallRequest";

export default function AcceptList() {
  return (
    <div className="flex">
      <div className="w-800">
        <BigRequest/>
      </div>
      <div className="flex flex-col w-200 overflow-auto gap-16 ">
        <RequestList/>
        <RequestList/>
        <RequestList/>
        <RequestList/>
        <RequestList/>
        <RequestList/>
        <RequestList/>
        <RequestList/>
      </div>
    </div>
  );
}
  