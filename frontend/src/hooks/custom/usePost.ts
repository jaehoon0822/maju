import { MouseEvent } from "react";
import useQueryGetUser from "../queries/useQueryGetUser";
import { useRouter } from "next/router";

const usePost = () => {
  const { query } = useRouter();
  const { data: userData } = useQueryGetUser();
  const onClickPost = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  return { userData, onClickPost, query };
};

export default usePost;
