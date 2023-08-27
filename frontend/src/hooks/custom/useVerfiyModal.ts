import { useRouter } from "next/router";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AnyObject } from "yup";

const useVerfiyModal = <T extends AnyObject>() => {
  const { push, pathname } = useRouter();
  const [useFormReturnMethod, setUseFormReturnMethod] = useState<
    UseFormReturn<T> | undefined
  >();

  const onClose = () => {
    push(pathname);
    useFormReturnMethod?.reset();
  };

  return {
    useFormReturnMethod,
    setUseFormReturnMethod,
    onClose,
  };
};

export { useVerfiyModal };
