import { useRouter } from "next/router";
import { useRef } from "react";
import { useSelector } from "@/common/store";
import useQueryGetUserById from "../queries/useQueryGetUserById";

const useUserPreviewCoverImageModal = () => {
  const imageModalRef = useRef<HTMLDivElement | null>(null);
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
