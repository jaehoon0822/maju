import { useDispatch } from "@/common/store";
import { useRouter } from "next/router";
import useQueryGetUserByNick from "../queries/useQueryGetUserByNick";
import useQueryGetPostByUserId from "../queries/useQueryGetPostByUserId";
import { setPos } from "@/common/store/slices/posSlice";

const useProfileTemplate = () => {
  const { query, push, asPath } = useRouter();
  const dispatch = useDispatch();
  const { data: userData, isLoading: isUserLoading } = useQueryGetUserByNick(
    query.nick as string
  );
  const pathname = asPath.split("?")[0];

  const {
    data: postData,
    hasNextPage,
    fetchNextPage,
    isLoading: isPostLoading,
  } = useQueryGetPostByUserId(userData?.id);

  const onClickModal = (postId: string) => {
    push(`${pathname}/?modal=image/post&postId=${postId}`);
    dispatch(setPos(window.scrollY));
  };
  return {
    postData,
    userData,
    hasNextPage,
    fetchNextPage,
    isPostLoading,
    isUserLoading,
    onClickModal,
  };
};

export default useProfileTemplate;
