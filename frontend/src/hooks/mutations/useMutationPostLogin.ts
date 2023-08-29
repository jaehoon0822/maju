import { axiosClient } from "@/common/utils/axiosClient";
import { loginSchemaType } from "@/common/validation/login.yup";
import { useMutation } from "@tanstack/react-query";

const useMutationPostLogin = () => {
  const mutation = useMutation(async (data: loginSchemaType) => {
    const res = await axiosClient.post("/auth/login", data);
    return res.data;
  });

  return mutation;
};

export default useMutationPostLogin;
