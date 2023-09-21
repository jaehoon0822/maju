import { useRouter } from "next/router";
import { useCallback } from "react";
import useQueryGetPostByUserId from "../queries/useQueryGetPostByUserId";
import useQueryGetUser from "../queries/useQueryGetUser";
import { useDispatch } from "@/common/store";
import { setPos } from "@/common/store/slices/posSlice";

const useHomeMyPostContents = () => {
  const { query, push } = useRouter();
  const { data: userQuery } = useQueryGetUser();
  const posDispatch = useDispatch();
  const {
    data: postQuery,
    fetchNextPage,
    hasNextPage,
    isLoading: postQueryIsLoading,
  } = useQueryGetPostByUserId(userQuery?.id);

  const onClickOpenModal = useCallback((postId: string) => {
    push(`/home?modal=image/post&postId=${postId}`);
    posDispatch(setPos(window.scrollY));
  }, []);

  return {
    postQueryIsLoading,
    onClickOpenModal,
    hasNextPage,
    fetchNextPage,
    postQuery,
    query,
  };
};

export default useHomeMyPostContents;
