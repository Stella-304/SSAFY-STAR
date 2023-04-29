import SmallButton from "../../../components/Button/SmallButton";
import Input from "../../../components/Input/Input";

export default function Certify() {

  return (
    <div className="h-400 flex flex-col justify-around">
        {/* 싸피인증 */}
        <div>
            <div>
                <span className="text-1xl font-bold">싸피 인증</span>
            </div>
            <div className="flex justify-center  gap-16">
                <div>
                    <div className="w-150 h-150 bg-red-400">
                        입력창
                    </div>
                </div>
                <div>
                    <Input id="region" label="지역" onChange={()=>{}} type="input" />
                    <Input id="cardinal" label="기수" onChange={()=>{}} type="input" />
                    <div className="flex justify-center mt-16">
                        <SmallButton value="제출"/>
                    </div>
                </div>
            </div>
        </div>
        
        {/* 회사인증 */}
        <div>
            <div>
                <span className="text-1xl font-bold">회사 인증</span>
            </div>
            <div className="flex justify-center  gap-16">
                <div>
                    <div className="w-150 h-150 bg-red-400">
                        입력창
                    </div>
                </div>
                <div className="flex flex-col justify-around">
                    <Input id="company" label="회사명" onChange={()=>{}} type="input" />
                    <div className="flex justify-center mt-16">
                        <SmallButton value="제출"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
