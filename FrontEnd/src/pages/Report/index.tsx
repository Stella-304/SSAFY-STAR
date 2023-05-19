import useReport from "@/apis/report/useReport";
import useReportCategory from "@/apis/report/useReportCategory";
import BigButton from "@/components/Button/BigButton";
import Input from "@/components/Input/Input";
import Select from "@/components/Input/Select";
import ModalLayout from "@/components/Layout/ModalLayout";
import { useState } from "react";

interface props {
  open: boolean;
  onClose: (params: any) => void;
}
export default function Report(props: props) {
  const [reportList, setReportList] = useState([]);
  useReportCategory(setReportList); //바로 신고항목 가져옴
  const reportMutate = useReport();
  const [reportCategory, setReportCategory] = useState("");
  const [reportContent, setReportContent] = useState("");
  const submit = () => {
    reportMutate.mutate({ article: reportCategory, content: reportContent });
  };

  return props.open ? (
    <ModalLayout onClose={() => props.onClose(false)}>
      <div className="flex h-full flex-col gap-8 p-4">
        <div>
          <span className="text-2xl font-bold text-white">신고하기</span>
        </div>
        <div>
          <Select
            id="category"
            label="신고항목"
            onChange={setReportCategory}
            options={reportList}
          />
        </div>
        <div className="grow">
          <Input
            id="content"
            type="textarea"
            label="신고내용"
            onChange={setReportContent}
            textareaHeight="100%"
            inputHeight="100%"
            cardRegist={true}
          />
        </div>
        <div className="flex justify-center">
          <BigButton value="신고하기" onClick={submit} />
        </div>
      </div>
    </ModalLayout>
  ) : (
    <></>
  );
}
