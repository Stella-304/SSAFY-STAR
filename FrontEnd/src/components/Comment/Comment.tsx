import useCommentListQuery from "@/apis/comment/useCommentListQuery";
import useCommentSubmit from "@/apis/comment/useCommentSubmit";
import reply from "@/assets/icons/reply.svg";
import write from "@/assets/icons/writing.png";
import trash from "@/assets/icons/trash.png";
import erase from "@/assets/icons/eraser.png";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import useCommentDelete from "@/apis/comment/useCommentDelete";
import useCommentModify from "@/apis/comment/useCommentModify";

interface Iprops {
  selectedUserInfo: User;
}

export default function Comment({ selectedUserInfo }: Iprops) {
  const [writeReply, setWriteReply] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const [modifyContent, setModifyContent] = useState<string>("");
  const [modifyCommentId, setModifyCommentId] = useState<number>();
  const [modifyReply, setModifyReply] = useState<boolean>(false);

  // 카드 코멘트 리스트 불러오기
  const comment = useCommentListQuery(selectedUserInfo?.cardId);

  // 카드 코멘트 쓰기
  const submitComment = useCommentSubmit();

  // 카드 코멘트 삭제
  const deleteComment = useCommentDelete();

  // 카드 코멘트 수정
  const modifyComment = useCommentModify();

  // 카드 코멘트 제출 핸들러
  const handleSubmit = () => {
    selectedUserInfo &&
      submitComment.mutate({
        cardId: selectedUserInfo.cardId,
        content: replyContent,
      });
    setWriteReply(false);
  };

  const handleModify = () => {
    modifyComment.mutate({
      content: modifyContent,
      id: modifyCommentId,
    });
    setModifyReply(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
  };

  useEffect(() => {
    setWriteReply(false);
    setModifyCommentId(undefined);
  }, []);

  console.log(modifyCommentId);

  return (
    <div className="absolute -right-[320px] top-20 h-500 w-300 rounded-10 border-3 border-white bg-gradient-to-b from-[#0C1445] to-[#471E54] text-18 text-white">
      <div className="h-full w-full overflow-y-scroll scrollbar-none">
        {writeReply && (
          <div className="h-150">
            <textarea
              className="m-10 h-80 w-[calc(100%-20px)] rounded-10 p-10 text-black"
              onChange={handleChange}
            ></textarea>
            <button
              onClick={handleSubmit}
              className="float-right  mr-10 h-35 w-85 rounded-5 border-2 border-white bg-black font-semibold hover:bg-gray-800"
            >
              댓글달기
            </button>
          </div>
        )}
        {comment?.data?.map((item: any, index: number) => (
          <>
            <div
              className={
                (modifyCommentId === item.id ? "hidden" : "") +
                " m-10 w-[calc(100%-20px)] rounded-10 border-3 border-white p-10"
              }
              key={index}
            >
              <div className="flex h-30">
                <div>{item.writer}</div>
                {item.mine && (
                  <img
                    src={trash}
                    className="ml-3 h-22 w-22 cursor-pointer"
                    onClick={() => {
                      deleteComment.mutate(item.id);
                    }}
                  />
                )}
                {item.mine && (
                  <img
                    src={erase}
                    className="ml-3 h-22 w-22 cursor-pointer"
                    onClick={() => {
                      setModifyContent(item.content);
                      setModifyReply(true);
                      setModifyCommentId(item.id);
                    }}
                  />
                )}
              </div>
              <div>{item.content}</div>
              {item.reply && (
                <div className="mt-5 flex gap-8">
                  <img src={reply} className="h-20 w-20" />
                  <div>{item.reply}</div>
                </div>
              )}
            </div>
            {modifyReply && modifyCommentId === item.id && (
              <div className="h-150">
                <textarea
                  className="m-10 h-80 w-[calc(100%-20px)] rounded-10 p-10 text-black"
                  value={modifyContent}
                  onChange={handleChange}
                ></textarea>
                <button
                  onClick={handleModify}
                  className="float-right  mr-10 h-35 w-85 rounded-5 border-2 border-white bg-black font-semibold hover:bg-gray-800"
                >
                  댓글수정
                </button>
                <button
                  onClick={() => setModifyCommentId(undefined)}
                  className="float-right  mr-10 h-35 w-85 rounded-5 border-2 border-white bg-black font-semibold hover:bg-gray-800"
                >
                  수정취소
                </button>
              </div>
            )}
          </>
        ))}
      </div>
      <img
        src={write}
        className="absolute -right-5 -top-50 h-40 w-40 cursor-pointer"
        onClick={() => setWriteReply(!writeReply)}
      />
    </div>
  );
}
