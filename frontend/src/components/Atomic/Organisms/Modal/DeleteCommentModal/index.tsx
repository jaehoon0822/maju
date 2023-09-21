import classNames from "classnames";
import Button from "@/components/Atomic/Atoms/Button";
import Ban from "@/components/Atomic/Atoms/Ban";
import useDeleteCommentModal from "@/hooks/custom/useDeleteCommentModal";
import { memo } from "react";

const DeleteCommentModal = () => {
  const { deleteCommentMadalRef, onClickDeleteComment, query, isMyComment } =
    useDeleteCommentModal();
  return (
    <>
      <div
        ref={deleteCommentMadalRef}
        className={classNames(
          "fixed left-[50vw] top-[50vh] -translate-x-1/2 -translate-y-1/2 z-50",
          {
            "opacity-0 invisible": query.modal !== "deleteComment",
            "opacity-100 visible": query.modal === "deleteComment",
          }
        )}
      >
        {isMyComment ? (
          <div
            className={classNames(
              "flex flex-col justify-center items-center bg-white w-[40rem] h-[20rem] md:w-[80vw] md:-mx-10"
            )}
          >
            <div>
              <span className={classNames("text-lg text-[#8f8f8f]")}>
                해당 댓글을
              </span>
            </div>
            <div className={classNames("mb-4")}>
              <span
                className={classNames("text-2xl font-bold text-red-500 mr-2")}
              >
                삭제
              </span>
              <span className={classNames("text-lg text-[#8f8f8f]")}>
                하시겠습니까?
              </span>
            </div>
            <div className={classNames("flex justify-center w-40")}>
              <Button
                label="삭제하기"
                size="medium"
                variant="warn"
                onClick={onClickDeleteComment}
              />
            </div>
          </div>
        ) : (
          <Ban />
        )}
      </div>
    </>
  );
};

export default memo(DeleteCommentModal);
