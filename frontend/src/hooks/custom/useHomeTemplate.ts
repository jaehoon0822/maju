import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useQueryGetUser from "../queries/useQueryGetUser";
import useQueryGetPostByUserId from "../queries/useQueryGetPostByUserId";
import { useDispatch, useSelector } from "@/common/store";
import { setPos } from "@/common/store/slices/posSlice";
import { InferType } from "yup";
import { postSchema } from "@/common/validation/post.yup";
import useMutationCreatePosts from "../mutations/useMutatioCreatePosts";
import { AxiosError } from "axios";

const useHomeTemplate = () => {
  const { pos } = useSelector((state) => state.pos);
  const posDispatch = useDispatch();
  const { data: userQuery, isLoading: userQueryIsLoading } = useQueryGetUser();
  const {
    data: postQuery,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: postQueryIsLoading,
  } = useQueryGetPostByUserId(userQuery!.id);
  const queryClient = useQueryClient();
  const createPostMutation = useMutationCreatePosts();
  const router = useRouter();

  const onSubmit = (data: InferType<typeof postSchema> & { img: string[] }) => {
    createPostMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["/posts", userQuery?.id]);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          throw error;
        }
      },
    });
  };

  const onClickOpenModal = (postId: string) => {
    router.push(`/home?modal=image&postId=${postId}`);
    posDispatch(setPos(window.scrollY));
    window.document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const windowScroll = () => {
      window.scrollTo({ top: pos });
    };
    router.events.on("routeChangeComplete", windowScroll);
    return () => router.events.off("routeChangeComplete", windowScroll);
  }, [pos]);

  return {
    onClickOpenModal,
    postQuery,
    fetchNextPage,
    hasNextPage,
    postQueryIsLoading,
    userQueryIsLoading,
    isFetchingNextPage,
    onSubmit,
    query: router.query,
  };
};

export default useHomeTemplate;
