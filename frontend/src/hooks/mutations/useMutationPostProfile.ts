import { Profile } from "@/common/types/index.types";
import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useMutationPostProfile = () => {
  const updateProfile = async (data: {
    userId: string;
    avatar?: string;
    coverImage?: string;
    coverLetter?: string;
  }) => {
    try {
      const { data: userData } = await axiosClient.post<Profile>(
        `user/profile/update`,
        data
      );
      return userData;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  };

  const mutation = useMutation(updateProfile);
  return mutation;
};

export default useMutationPostProfile;
