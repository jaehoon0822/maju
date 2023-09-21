import { MouseEvent, useCallback, useMemo } from "react";
import useQueryGetUser from "../queries/useQueryGetUser";
import { useRouter } from "next/router";

const usePost = () => {
  const { query, pathname } = useRouter();
  const { data: userData } = useQueryGetUser();
  const onClickPost = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);
  const isProfile = useMemo(() => pathname.startsWith("/profile"), [pathname]);
  return { userData, onClickPost, query, isProfile };
};

export default usePost;
