import { SubmitHandler, UseFormReturn } from "react-hook-form";
import useMutationPostLogin from "../mutations/useMutationPostLogin";
import { loginSchemaType } from "@/common/validation/login.yup";
import { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const useLogin = () => {
  const { push, query } = useRouter();
  const mutation = useMutationPostLogin();
  const [useFormReturnMethod, setUseFormReturnMethod] =
    useState<UseFormReturn<loginSchemaType>>();

  const onSubmit: SubmitHandler<loginSchemaType> = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        push("/home");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          useFormReturnMethod?.setError("password", {
            type: "manual",
            message: error.response?.data.message,
          });
        }
      },
    });
  };
  return { useFormReturnMethod, setUseFormReturnMethod, onSubmit, push, query };
};

export default useLogin;
