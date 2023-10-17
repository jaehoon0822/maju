import { useRouter } from "next/router";
import { useRef } from "react";
import { useDispatch, useSelector } from "@/common/store";
import useQueryGetUserById from "../queries/useQueryGetUserById";
import { setPos } from "@/common/store/slices/posSlice";

const useUserPreviewCoverImageModal = () => {
  const imageModalRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { commentModalRef, commentModalPos } = useSelector(
    (state) => state.commentModalpos
  );
  const { pos } = useSelector((state) => state.pos);
  const { query, back } = useRouter();
  const { data: userData, isLoading } = useQueryGetUserById(
    query.userId as string
  );

  const onClose = () => {
    back();
    if (query.modal === "comments" && commentModalRef) {
      commentModalRef.scrollTo({ top: commentModalPos });
      dispatch(setPos(window.scrollTo));
    } else {
      dispatch(setPos(window.scrollTo));
    }
    document.body.style.overflow = "auto";
  };

  return {
    imageModalRef,
    pos,
    onClose,
    userData,
    isLoading,
  };
};

export default useUserPreviewCoverImageModal;
