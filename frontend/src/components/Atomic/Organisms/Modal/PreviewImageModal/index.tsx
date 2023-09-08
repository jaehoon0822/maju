import classNames from "classnames";
import usePreviewImageModal from "@/hooks/custom/usePreviewImageModal";
import Backdrop from "../../../Atoms/Backdrop";
import PreviewImg from "@/components/Atomic/Atoms/PreviewImg";
import { CloseButton } from "@/components/Atomic/Atoms/CloseButton";
import ImageSlider from "@/components/Atomic/Atoms/ImageSlider";

const PreviewImageModal = () => {
  const { imageModalRef, postData, query, pos, onClose } =
    usePreviewImageModal();

  return (
    <div
      ref={imageModalRef}
      className={classNames({
        "opacity-0 invisible": query.modal !== "image",
        "opacity-100 visible": query.modal === "image",
      })}
    >
      <Backdrop />
      <div
        className={classNames("absolute left-14")}
        style={{
          top: `calc(${pos!}px + 5%)`,
        }}
      >
        <CloseButton color="white" onClick={onClose} />
      </div>
      {postData && postData.img && (
        <ImageSlider img={postData.img!}>
          {postData?.img?.map((image) => {
            return (
              <div
                key={image.id}
                className={classNames("relative w-screen h-full", "z-50")}
              >
                <PreviewImg img={image.img} />
              </div>
            );
          })}
        </ImageSlider>
      )}
    </div>
  );
};

export default PreviewImageModal;
