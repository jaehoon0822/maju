import { codeSchemaType } from "./../../common/validation/code.yup";
import { SubmitHandler } from "react-hook-form";
import { useVerfiyModal } from "./useVerfiyModal";
import { useDispatch, useSelector } from "@/common/store";
import { useRouter } from "next/router";
import { set } from "@/common/store/slices/verifySlice";

const useVerifyCodeModal = () => {
  const { push, query, pathname } = useRouter();
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.verify);
  const { onClose, setUseFormReturnMethod, useFormReturnMethod } =
    useVerfiyModal();

  const onSubmit: SubmitHandler<codeSchemaType> = async (data) => {
    if (data.code === stateData.code) {
      dispatch(
        set({
          ...stateData,
          certified: true,
        })
      );
      useFormReturnMethod?.reset();
      useFormReturnMethod?.clearErrors();
      push(`${pathname}?modal=changePassword`);
    } else {
      useFormReturnMethod?.setError("root", {
        type: "manual",
        message: "코드가 일치하지 않아요. 다시 확인해주세요.",
      });
    }
  };
  return {
    onClose,
    setUseFormReturnMethod,
    useFormReturnMethod,
    onSubmit,
    query,
    pathname,
  };
};

export { useVerifyCodeModal };
