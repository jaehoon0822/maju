import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { FieldErrors, SubmitHandler, UseFormReturn } from "react-hook-form";
import useMutationPostLogin from "../mutations/useMutationPostLogin";
import { loginSchemaType } from "@/common/validation/login.yup";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

const useLogin = () => {
  const { push, query, ...router } = useRouter();
  const mutation = useMutationPostLogin();
  const queryClient = useQueryClient();
  const [resError, setResError] = useState<FieldErrors>();
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [useFormReturnMethod, setUseFormReturnMethod] =
    useState<UseFormReturn<loginSchemaType>>();

  const onSubmit: SubmitHandler<loginSchemaType> = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        push("/home");
        queryClient.invalidateQueries(["/isLoggedIn"]);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          useFormReturnMethod?.setError("root", {
            type: "manual",
            message: error.response?.data.message,
          });
        }
      },
    });
  };
  const resetInputErrors = useCallback(() => {
    useFormReturnMethod?.clearErrors();
    useFormReturnMethod?.reset();
    setResError(undefined);
  }, [useFormReturnMethod, setResError]);

  useEffect(() => {
    router.events.on("routeChangeComplete", resetInputErrors);
    return () => router.events.off("routeChangeComplete", resetInputErrors);
  }, [resetInputErrors]);

  return {
    useFormReturnMethod,
    setUseFormReturnMethod,
    onSubmit,
    push,
    query,
    resError,
    setResError,
    isSignup,
    setIsSignup,
  };
};

export default useLogin;
