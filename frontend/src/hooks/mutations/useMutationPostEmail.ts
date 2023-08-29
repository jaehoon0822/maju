import { axiosClient } from "@/common/utils/axiosClient";
import { emailSchemaType } from "@/common/validation/email.yup";
import { useMutation } from "@tanstack/react-query";

const useMutationPostEmail = () => {
  return useMutation(async (data: emailSchemaType) => {
    const res = await axiosClient.post("/mail", {
      email: data.email,
    });

    return res.data;
  });
};

export { useMutationPostEmail };
