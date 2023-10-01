import { signupSchemaType } from "@/common/validation/signup.yup";
import useMutationPostSignup from "../mutations/useMutationPostSignup";
import { useVerfiyModal } from "./useVerfiyModal";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

const useSignupModal = (setIsSignup: Dispatch<SetStateAction<boolean>>) => {
  const { pathname, push, query } = useRouter();
  const mutation = useMutationPostSignup();
  const { onClose, setUseFormReturnMethod, useFormReturnMethod } =
    useVerfiyModal();

  const onSubmit: SubmitHandler<signupSchemaType> = (data) => {
    const { passwordConfirm, ...filteredData } = data;
    mutation.mutate(filteredData, {
      onSuccess: (data) => {
        push(`${pathname}?modal=registProfile&userId=${data.id}`);
        useFormReturnMethod?.reset();
        setIsSignup(true);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            const responseData = error.response?.data;
            if (Array.isArray(responseData)) {
              responseData.forEach(
                (error: {
                  message: string;
                  field: string;
                  statusCode: number;
                }) => {
                  useFormReturnMethod?.setError("root", {
                    type: "manual",
                    message: error.message,
                  });
                }
              );
            }
          }
          if (error.response?.status === 400) {
            const responseData = error.response?.data;
            if (Array.isArray(responseData)) {
              error.response?.data.forEach(
                (error: { message: string; field: string }) => {
                  useFormReturnMethod?.setError("root", {
                    type: "manual",
                    message: error.message,
                  });
                }
              );
            }
          }
        }
      },
    });
  };

  return {
    onClose,
    onSubmit,
    setUseFormReturnMethod,
    useFormReturnMethod,
    pathname,
    push,
    query,
  };
};

export default useSignupModal;
