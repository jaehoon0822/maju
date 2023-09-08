import { useSelector } from "@/common/store";
import { useRouter } from "next/router";
import useQueryGetPostByPostId from "../queries/useQueryGetPostByPostId";

const useUpdatePostModal = () => {
  const { query, back } = useRouter();
  const { pos } = useSelector((state) => state.pos);
  const { data: postData, isLoading } = useQueryGetPostByPostId(
    query.postId as string
  );
  const onClose = () => {
    window.scrollTo({ top: pos });
    document.body.style.overflow = "auto";
    back();
  };

  return {
    postData,
    isLoading,
    onClose,
    query,
    pos,
  };
};

export default useUpdatePostModal;
