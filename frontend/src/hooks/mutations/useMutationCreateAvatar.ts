import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const useMutationCreateAvatar = () => {
  const creatAvatar = async (data: File) => {
    const formData = new FormData();
    formData.append("avatar", data);
    const { data: avatar } = await axiosClient.post<{ image: string }>(
      "/user/profile/avatar",
      formData
    );
    return avatar;
  };
  const mutation = useMutation(creatAvatar, {
    retry: 5,
    retryDelay: 1500,
  });
  return mutation;
};

export default useMutationCreateAvatar;
