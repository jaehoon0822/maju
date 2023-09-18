import { useRouter } from "next/router";
import useQueryGetPostByPostId from "../queries/useQueryGetPostByPostId";
import { useDispatch } from "react-redux";
import { setPos } from "@/common/store/slices/posSlice";
import { useRef } from "react";

const usePostPreviewImageModal = () => {
  const imageModalRef = useRef<HTMLDivElement | null>(null);
  const posDispatch = useDispatch();
  const { query, back } = useRouter();
  const { data: postData, isLoading } = useQueryGetPostByPostId(
    query.postId as string | undefined
  );

  const onClose = () => {
    back();
    posDispatch(setPos(window.scrollY));
  };

  return {
    imageModalRef,
    onClose,
    postData,
    isLoading,
  };
};

export default usePostPreviewImageModal;
