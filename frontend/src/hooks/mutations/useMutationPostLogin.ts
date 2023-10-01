import { axiosClient } from "@/common/utils/axiosClient";
import { loginSchemaType } from "@/common/validation/login.yup";
import { useMutation } from "@tanstack/react-query";

const useMutationPostLogin = () => {
  const mutation = useMutation(async (data: loginSchemaType) => {
    try {
      const res = await axiosClient.post("/auth/login", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  });

  return mutation;
};

export default useMutationPostLogin;
