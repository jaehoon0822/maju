import Ban from "@/components/Atomic/Atoms/Ban";
import { Modal } from "@/components/Atomic/Molecules/Modal";
import PostEditor from "@/components/Atomic/Molecules/PostEditor";
import useUpdatePostModal from "@/hooks/custom/useUpdatePostModal";
import classNames from "classnames";
import { memo } from "react";

const UpdatePostModal = () => {
  const { isSuccess, onClose, onSubmit, postData, query, isMyPost } =
    useUpdatePostModal();

  return (
    <div
      className={classNames({
        "opacity-0 invisible": query.modal !== "updatePost",
        "opacity-100 visible": query.modal == "updatePost",
      })}
    >
      {isMyPost ? (
        <Modal onClose={onClose}>
          <div
            className={classNames("w-[80%]", {
              "left-0 opacity-100": query.modal,
              "-left-[200px] opacity-0": !query.modal,
            })}
          >
            <div className={classNames("flex flex-col items-center text-2xl")}>
              <h3>
                <span className={classNames("text-4xl mr-2 font-bold")}>
                  게시물 수정
                </span>
              </h3>
            </div>
            <div className={classNames("w-full")}>
              {isSuccess && (
                <PostEditor
                  post={postData}
                  onSubmit={onSubmit}
                  toolbarId="updateToolbar"
                />
              )}
            </div>
          </div>
        </Modal>
      ) : (
        <Ban />
      )}
    </div>
  );
};

export default memo(UpdatePostModal);
