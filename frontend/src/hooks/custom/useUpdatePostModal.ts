import { useSelector } from "@/common/store";
import { useRouter } from "next/router";
import useQueryGetPostByPostId from "../queries/useQueryGetPostByPostId";
import useMutationUpdatePost from "../mutations/useMutationUpdatePost";
import { SubmitHandler } from "react-hook-form";
import { InferType } from "yup";
import { postSchema } from "@/common/validation/post.yup";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useQueryGetUser from "../queries/useQueryGetUser";

const useUpdatePostModal = () => {
  const { query, back } = useRouter();
  const { pos } = useSelector((state) => state.pos);
  const queryClient = useQueryClient();
  const { data: userData } = useQueryGetUser();
  const {
    data: postData,
    isLoading,
    isSuccess,
  } = useQueryGetPostByPostId(query.postId as string);
  const updatePostMutation = useMutationUpdatePost();
  const isMyPost = userData?.id === postData?.user.id;

  const onClose = () => {
    window.scrollTo({ top: pos });
    back();
  };

  const onSubmit: SubmitHandler<InferType<typeof postSchema>> = (data) => {
    updatePostMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["/user"]);
        queryClient.invalidateQueries(["/post", postData?.id]);
        queryClient.invalidateQueries(["/posts", userData?.id]);
        queryClient.invalidateQueries(["/profile", userData?.nick]);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          throw error;
        }
      },
    });
    back();
  };

  return {
    postData,
    isLoading,
    isSuccess,
    onClose,
    onSubmit,
    isMyPost,
    query,
    pos,
  };
};

export default useUpdatePostModal;