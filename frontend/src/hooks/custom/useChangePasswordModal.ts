import { SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { passwordSchemaType } from "@/common/validation/password.yup";
import { init } from "@/common/store/slices/verifySlice";
import { useVerfiyModal } from "./useVerfiyModal";
import useMutationPatchPassword from "../mutations/useMutationPatchPassword";
import { useDispatch, useSelector } from "@/common/store";

const useChangePasswordModal = () => {
  const mutation = useMutationPatchPassword();
  const stateData = useSelector((state) => state.verify);
  const { push, query, pathname } = useRouter();
  const dispatch = useDispatch();
  const { onClose, setUseFormReturnMethod, useFormReturnMethod } =
    useVerfiyModal();

  const onSubmit: SubmitHandler<passwordSchemaType> = (data) => {
    mutation.mutate(
      {
        id: stateData.userId,
        password: data.password,
      },
      {
        onSuccess: () => {
          dispatch(init());
          useFormReturnMethod?.reset();
          push(pathname);
        },
        onError: (error) => {
          if (error instanceof AxiosError)
            useFormReturnMethod?.setError("password", {
              type: "manual",
              message: error.response?.data.message,
            });
        },
      }
    );
  };

  return {
    onClose,
    setUseFormReturnMethod,
    useFormReturnMethod,
    onSubmit,
    query,
    pathname,
    userId: stateData.userId,
  };
};

export default useChangePasswordModal;
