import classNames from "classnames";
import usePostPreviewImageModal from "@/hooks/custom/usePostPreviewImageModal";
import PreviewImg from "@/components/Atomic/Atoms/PreviewImg";
import ImageSlider from "@/components/Atomic/Atoms/ImageSlider";
import ImagePreviewWrapper from "@/components/Atomic/Atoms/PreviewImageWrapper";
import { memo } from "react";

const PostPreviewImageModal = () => {
  const { imageModalRef, postData, onClose } = usePostPreviewImageModal();

  return (
    <ImagePreviewWrapper
      imageModalRef={imageModalRef}
      onClose={onClose}
      modalName="post"
    >
      {postData && postData.img && (
        <ImageSlider img={postData.img!}>
          {postData?.img?.map((image) => {
            return (
              <div key={image.id} className={classNames("w-screen")}>
                <PreviewImg type="post" img={image.img} />
              </div>
            );
          })}
        </ImageSlider>
      )}
    </ImagePreviewWrapper>
  );
};

export default memo(PostPreviewImageModal);
