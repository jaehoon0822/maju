import ImagePreviewWrapper from "@/components/Atomic/Atoms/PreviewImageWrapper";
import PreviewImg from "@/components/Atomic/Atoms/PreviewImg";
import useUserPreviewCoverImageModal from "@/hooks/custom/useUserPreviewCoverImageModal";
import classNames from "classnames";
import { memo } from "react";

const UserPreviewCoverImageModal = () => {
  const { imageModalRef, onClose, userData } = useUserPreviewCoverImageModal();

  return (
    <ImagePreviewWrapper
      imageModalRef={imageModalRef}
      onClose={onClose}
      modalName="user"
    >
      <div>
        <div className={classNames("z-50")}>
          {userData?.profile?.coverImage ? (
            <PreviewImg type="coverImage" img={userData.profile.coverImage} />
          ) : (
            <div
              className={classNames(
                "flex justify-center items-center w-full h-screen"
              )}
            >
              <div className={classNames("w-[1000px] h-[500px] bg-blue-100")} />
            </div>
          )}
        </div>
      </div>
    </ImagePreviewWrapper>
  );
};

export default memo(UserPreviewCoverImageModal);
