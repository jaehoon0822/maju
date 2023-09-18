import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

const useSearchBar = () => {
  const [useFormReturnMethod, setUseFormReturnMethod] =
    useState<UseFormReturn>();

  useEffect(() => {
    if (useFormReturnMethod) {
      const onClickDocument = () => {
        useFormReturnMethod.clearErrors();
      };
      document.addEventListener("click", onClickDocument);

      return () => document.removeEventListener("click", onClickDocument);
    }
  }, [useFormReturnMethod]);

  return { setUseFormReturnMethod };
};

export default useSearchBar;
