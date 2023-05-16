import useCommentListQuery from "@/apis/comment/useCommentListQuery";
import useCommentSubmit from "@/apis/comment/useCommentSubmit";
import reply from "@/assets/icons/reply.svg";
import write from "@/assets/icons/writing2.png";
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
    setModifyCommentId(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
  };

  const handleModifyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifyContent(e.target.value);
  };

  useEffect(() => {
    setWriteReply(false);
    setModifyCommentId(undefined);
  }, []);

  return (
    <div className="from-opacity-70 to-opacity-70 absolute -right-[320px] top-50 h-500 w-300 rounded-10 border-3 border-white bg-gradient-to-b  from-black  to-darkblue2 text-18 text-white shadow-neon3">
      <div className="h-full w-full overflow-y-scroll scrollbar-none">
        {writeReply && (
          <div className="h-150">
            <button
              onClick={handleSubmit}
              className="float-right mr-10 mt-15 h-35 w-85 rounded-5 border-2 border-white bg-black font-semibold hover:bg-gray-800"
            >
              댓글달기
            </button>
            <textarea
              className="ml-10 mt-10 h-80 w-[calc(100%-20px)] rounded-10 border-2 border-white bg-black2 p-10 text-white"
              onChange={handleChange}
            ></textarea>
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
                  className="m-10 h-80 w-[calc(100%-20px)] rounded-10 border-2 border-white  bg-black2 p-10 text-white"
                  value={modifyContent}
                  onChange={handleModifyChange}
                ></textarea>
                <button
                  onClick={handleModify}
                  className="float-right  mr-10 h-35 w-85 rounded-5 border-2 border-white bg-black2 font-semibold hover:bg-gray-800"
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
        className="absolute -right-0 -top-36 h-24 w-24 cursor-pointer"
        onClick={() => setWriteReply(!writeReply)}
      />
    </div>
  );
}
