import { useRouter } from "next/router";
import useQueryGetPostByPostId from "../queries/useQueryGetPostByPostId";
import { useSelector } from "@/common/store";
import { useDispatch } from "react-redux";
import { setPos } from "@/common/store/slices/posSlice";
import { useRef } from "react";

const usePreviewImageModal = () => {
  const imageModalRef = useRef<HTMLDivElement | null>(null);
  const { pos } = useSelector((state) => state.pos);
  const posDispatch = useDispatch();
  const { query, back } = useRouter();
  const { data: postData, isLoading } = useQueryGetPostByPostId(
    query.postId as string | undefined
  );

  const onClose = () => {
    back();
    posDispatch(setPos(window.scrollY));
    if (imageModalRef.current) {
      window.scrollTo({ top: imageModalRef.current.offsetTop });
    }
    document.body.style.overflow = "auto";
  };

  return {
    imageModalRef,
    onClose,
    postData,
    isLoading,
    query,
    pos,
  };
};

export default usePreviewImageModal;
