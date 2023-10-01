import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useQueryGetUser from "../queries/useQueryGetUser";
import { postType } from "@/common/validation/post.yup";
import useMutationCreatePosts from "../mutations/useMutatioCreatePosts";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SubmitHandler } from "react-hook-form";

const useHomeTemplate = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const { data: userQuery, isLoading: userQueryIsLoading } = useQueryGetUser();
  const queryClient = useQueryClient();
  const createPostMutation = useMutationCreatePosts();
  const posDispatch = useDispatch();
  const router = useRouter();

  const onClickSelectedIdx = useCallback((idx: number) => {
    setSelectedIdx(idx);
  }, []);

  const onSubmit: SubmitHandler<postType> = useCallback(
    (data: postType) => {
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
    },
    [createPostMutation, userQuery?.id, queryClient]
  );

  const onClickTest = useCallback(() => {
    router.push(`/home?modal=image/user&userId=${userQuery?.id}`);
  }, [userQuery]);

  useEffect(() => {
    const page = new URLSearchParams(window.location.search).get("page");
    if (page === "followPost") {
      onClickSelectedIdx(1);
    }
  }, [router.query.pathname]);

  useEffect(() => {
    const routeChange = () => {
      const page = new URLSearchParams(window.location.search).get("page");
      if (page === "followPost") {
        onClickSelectedIdx(1);
      }
      if (!page) {
        onClickSelectedIdx(0);
      }
    };
    router.events.on("routeChangeComplete", routeChange);
    return () => router.events.off("routeChangeComplete", routeChange);
  }, [router.query]);

  return {
    onClickTest,
    selectedIdx,
    onClickSelectedIdx,
    userQueryIsLoading,
    onSubmit,
    posDispatch,
    router,
    query: router.query,
    push: router.push,
    pathname: router.pathname,
  };
};

export default useHomeTemplate;
