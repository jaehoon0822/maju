import { useState } from "react";
import useQueryGetHashtagPosts from "../queries/useQueryGetHashtagPosts";

const useSearchTemplate = () => {
  const [hashtagTitle, setHashtagTitle] = useState<string>("");
  const {
    data: hashtagPostsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetched,
    isSuccess,
  } = useQueryGetHashtagPosts({
    hashtagTitle,
  });

  return {
    hashtagPostsData,
    fetchNextPage,
    hasNextPage,
    setHashtagTitle,
    hashtagTitle,
    isLoading,
    isFetched,
    isSuccess,
  };
};

export default useSearchTemplate;
