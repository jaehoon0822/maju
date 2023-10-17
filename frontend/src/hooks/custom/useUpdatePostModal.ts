import { useDispatch, useSelector } from "@/common/store";
import { useRouter } from "next/router";
import useQueryGetPostByPostId from "../queries/useQueryGetPostByPostId";
import useMutationUpdatePost from "../mutations/useMutationUpdatePost";
import { SubmitHandler } from "react-hook-form";
import { InferType } from "yup";
import { postSchema } from "@/common/validation/post.yup";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useQueryGetUser from "../queries/useQueryGetUser";
import { setPos } from "@/common/store/slices/posSlice";

const useUpdatePostModal = () => {
  const { query, back } = useRouter();
  const { pos } = useSelector((state) => state.pos);
  const queryClient = useQueryClient();
  const posDispatch = useDispatch();
  const { data: userData } = useQueryGetUser();
  const {
    data: postData,
    isLoading,
    isSuccess,
  } = useQueryGetPostByPostId(query.postId as string);
  const updatePostMutation = useMutationUpdatePost();
  const isMyPost = userData?.id === postData?.user.id;

  const onClose = () => {
    posDispatch(setPos(window.scrollY));
    back();
  };

  const onSubmit: SubmitHandler<InferType<typeof postSchema>> = (data) => {
    updatePostMutation.mutate(data, {
      onSuccess: async () => {
        window.scrollTo({ top: pos });
        back();
        await queryClient.invalidateQueries(["/user"]);
        await queryClient.invalidateQueries(["/posts"]);
        await queryClient.invalidateQueries(["/post", postData?.id]);
        await queryClient.invalidateQueries(["/profile", userData?.nick]);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          throw error;
        }
      },
    });
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
