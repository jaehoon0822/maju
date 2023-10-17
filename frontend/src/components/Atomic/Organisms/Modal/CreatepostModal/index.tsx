import { postType } from "@/common/validation/post.yup";
import ModalTop from "@/components/Atomic/Molecules/ModalTop";
import PostEditor from "@/components/Atomic/Molecules/PostEditor";
import useMutationCreatePosts from "@/hooks/mutations/useMutatioCreatePosts";
import useQueryGetUser from "@/hooks/queries/useQueryGetUser";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

const CreatePostModal = () => {
  const { query, back } = useRouter();
  const { data: userData, isSuccess } = useQueryGetUser();
  const [isActive, setIsActive] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const createPostMutation = useMutationCreatePosts();
  const onClose = () => {
    back();
    setTimeout(() => {
      setIsActive(false);
    }, 0);
  };

  useEffect(() => {
    setIsActive(query.modal === "createPost");
  }, [query.modal]);

  const onSubmit: SubmitHandler<postType> = (data) => {
    createPostMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["/user"]);
        queryClient.invalidateQueries(["/posts", userData?.id]);
        back();
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          throw error;
        }
      },
    });
  };
  return (
    <div
      className={classNames("transition-all", {
        "opacity-0 invisible": query.modal !== "createPost",
        "opacity-100 visible": query.modal === "createPost",
      })}
    >
      <div
        className={classNames(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll z-50 max-w-[1200px] max-h-[65vh] md:w-3/4 py-4 px-4 bg-white rounded-md sm:min-h-[100vh] sm:w-[100vw]"
        )}
      >
        <ModalTop disabledLogo={true} onClose={onClose} />
        <div>
          {isActive && (
            <PostEditor
              onSubmit={onSubmit}
              placeholder="당신의 이야기를 들려주세요."
              toolbarId="postModal"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CreatePostModal);
