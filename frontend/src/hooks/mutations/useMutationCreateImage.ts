import { axiosClient } from "@/common/utils/axiosClient";
import { useMutation } from "@tanstack/react-query";

const createImage = async (data: File[]) => {
  const formData = new FormData();
  data.map((file) => formData.append("img", file));
  const { data: imageData } = await axiosClient.post("/post/img", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return imageData;
};

const useMutationCreateImage = () => {
  const mutation = useMutation(createImage);
  return mutation;
};

export default useMutationCreateImage;
