import { User } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import React from "react";

const useQueryGetUserByNick = (nick: string) => {
  const getUserByNick = async (context: QueryFunctionContext) => {
    const { data } = await axiosClient.get<User>(
      `/user/nick/${context.queryKey[1]}`
    );
    return data;
  };

  const { data, isError, isLoading, isFetched, isSuccess, error } = useQuery({
    queryKey: ["/profile", nick],
    queryFn: getUserByNick,
    enabled: !!nick,
  });

  return { data, isError, isLoading, isFetched, isSuccess, error };
};

export default useQueryGetUserByNick;
