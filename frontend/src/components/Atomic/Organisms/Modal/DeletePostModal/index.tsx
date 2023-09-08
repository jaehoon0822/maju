import classNames from "classnames";
import Backdrop from "@/components/Atomic/Atoms/Backdrop";
import { Button } from "@/components/Atomic/Atoms/Button";
import useDeletePostModal from "@/hooks/custom/useDeletePostModal";

const DeletePostModal = () => {
  const {
    deletPostMadalRef,
    onClickDeletePost,
    onClickDeletePostModal,
    pos,
    query,
  } = useDeletePostModal();
  return (
    <>
      <div
        ref={deletPostMadalRef}
        className={classNames(
          "absolute bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
          {
            "opacity-0 invisible": query.modal !== "deletePost",
            "opacity-100 visible": query.modal === "deletePost",
          }
        )}
        style={{
          top: `calc(${pos}px + 50%)`,
        }}
      >
        <div
          className={classNames(
            "flex flex-col justify-center items-center bg-white w-[40rem] h-[20rem] md:w-[80vw] md:-mx-10"
          )}
        >
          <div>
            <span className={classNames("text-lg text-[#8f8f8f]")}>
              해당 게시물을
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
          <Button
            label="삭제하기"
            size="medium"
            variant="warn"
            onClick={onClickDeletePost}
          />
        </div>
      </div>
      <Backdrop onClose={onClickDeletePostModal} />
    </>
  );
};

export default DeletePostModal;
