import { axiosClient } from "@/common/utils/axiosClient";
import { passwordSchemaType } from "@/common/validation/password.yup";
import { useMutation } from "@tanstack/react-query";

const useMutationPatchPassword = () => {
  const mutation = useMutation(
    async (data: Pick<passwordSchemaType, "password"> & { id: string }) => {
      const res = await axiosClient.patch("/auth/password", { ...data });
      return res.data;
    }
  );
  return mutation;
};

export default useMutationPatchPassword;
