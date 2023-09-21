import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const useMutationCreateCoverImage = () => {
  const createCoverImage = async (data: File) => {
    const formData = new FormData();
    formData.append("coverImage", data);
    const { data: avatar } = await axiosClient.post(
      "/user/profile/coverImage",
      formData
    );
    return avatar;
  };
  const mutation = useMutation(createCoverImage);
  return mutation;
};

export default useMutationCreateCoverImage;
