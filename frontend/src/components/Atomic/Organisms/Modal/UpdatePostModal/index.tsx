import Editor from "@/components/Atomic/Atoms/Editor/index.editor";
import { Modal } from "@/components/Atomic/Molecules/Modal";
import useUpdatePostModal from "@/hooks/custom/useUpdatePostModal";
import classNames from "classnames";

const UpdatePostModal = () => {
  const { isLoading, onClose, postData, query, pos } = useUpdatePostModal();

  return (
    <div
      className={classNames({
        "opacity-0 invisible": query.modal !== "updatePost",
        "opacity-100 visible": query.modal == "updatePost",
      })}
      style={{
        top: pos,
      }}
    >
      <Modal onClose={onClose}>
        <div className={classNames("flex flex-col text-2xl")}>
          <h3>
            <span className={classNames("mr-2")}>글을 </span>
            <span
              className={classNames("text-blue-500 text-4xl mr-2 font-bold")}
            >
              수정
            </span>
            <span>하실건가요?</span>
          </h3>
        </div>
        {!isLoading && (
          <Editor editData={postData} placeholder="이야기를 수정하실건가요?" />
        )}
      </Modal>
    </div>
  );
};

export default UpdatePostModal;
