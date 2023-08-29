import { axiosClient } from "@/common/utils/axiosClient";
import { signupSchemaType } from "@/common/validation/signup.yup";
import { useMutation } from "@tanstack/react-query";

const useMutationPostSignup = () => {
  const mutation = useMutation(
    async (data: Omit<signupSchemaType, "passwordConfirm">) => {
      const res = await axiosClient.post("/auth/signup", data);
      return res.data;
    }
  );
  return mutation;
};

export default useMutationPostSignup;
