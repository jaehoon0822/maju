import { emailSchemaType } from "@/common/validation/email.yup";
import { useVerfiyModal } from "./useVerfiyModal";
import { SubmitHandler } from "react-hook-form";
import { useMutationPostEmail } from "../mutations/useMutationPostEmail";
import { AxiosError } from "axios";
import { useDispatch } from "@/common/store";
import { set } from "@/common/store/slices/verifySlice";
import { useRouter } from "next/router";

const useVerifyEmailModal = () => {
  const mutation = useMutationPostEmail();
  const dispatch = useDispatch();
  const { push, query, pathname } = useRouter();
  const { onClose, setUseFormReturnMethod, useFormReturnMethod } =
    useVerfiyModal<emailSchemaType>();

  const onSubmit: SubmitHandler<emailSchemaType> = async (data) => {
    mutation.mutate(data, {
      onSuccess: ({ data }) => {
        dispatch(
          set({
            userId: data.userId,
            code: String(data.code),
            certified: false,
          })
        );
        useFormReturnMethod?.reset();
        push(`${pathname}?modal=verifyCode`);
      },
      onError: (error) => {
        if (error instanceof AxiosError)
          useFormReturnMethod?.setError("root", {
            type: "manual",
            message: error.response?.data.message,
          });
      },
    });
  };

  return {
    onClose,
    setUseFormReturnMethod,
    onSubmit,
    query,
    pathname,
  };
};

export { useVerifyEmailModal };
