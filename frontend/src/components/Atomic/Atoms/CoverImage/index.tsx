import classNames from "classnames";
import Image from "next/image";
import PhotoSizeSelectIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { User } from "@/common/types/index.types";
import useCoverImage from "@/hooks/custom/useCoverImage";

const CoverImage = ({
  user,
  isEdit = false,
}: {
  user?: User;
  onClick?: () => void;
  isEdit?: boolean;
}) => {
  const { image, inputRef, onChange, onClickEdit, onClickPreviewImage } =
    useCoverImage({ user, isEdit });

  return (
    // isEdit 에 의한 onClick 이벤트 활성화 및 비활성화
    <div
      onClick={isEdit ? onClickEdit : onClickPreviewImage}
      className={classNames("relative w-full h-48 cursor-pointer group")}
    >
      {/* coverImage 가 있다면, user 의 coverImage 를 보여줌 */}
      {image ? (
        // image/* 으로 시작하는지 확인
        <Image
          // data:image/ 로 시작하면, image 값을, 그렇지 않으면 주소가 포함된 image 값을 할당
          src={
            /^data:image\/*/g.test(image)
              ? image
              : `${process.env.NEXT_PUBLIC_IMAGE_URL}/coverImage/raw/${image}`
          }
          alt={`${user?.nick}님의 배경이미지`}
          sizes="lg:100vw md:80vw sm:40vw"
          className={classNames("object-cover object-center")}
          fill
        />
      ) : (
        // 그렇지 않다면, default 배경이미지를 보여줌
        <div className={classNames("bg-blue-300 w-full h-full")}></div>
      )}
      {/* isEdit 이 true 이면 backdrop 활성화 */}
      {isEdit ? (
        // backdrop
        <div>
          <div
            className={classNames(
              "absolute w-full h-full top-0 transition-colors group-hover:bg-black/70",
              {
                "bg-none": image,
                "bg-black/50": !image,
              }
            )}
          >
            <PhotoSizeSelectIcon
              className={classNames(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white  group:animate-fadeIn",
                {
                  "invisible group-hover:visible group-hover:animate-fadeIn":
                    image,
                  visible: !image,
                }
              )}
            />
          </div>
          {/* file 의 onChange 를 실행할 input */}
          <input
            type="file"
            accept="image/*"
            name="coverImage"
            ref={inputRef}
            onChange={isEdit ? onChange : undefined}
            className={classNames("hidden")}
          />
        </div>
      ) : (
        <div
          className={classNames(
            "absolute w-full h-full top-0 transition-colors group-hover:bg-black/50"
          )}
        >
          <PhotoSizeSelectIcon
            className={classNames(
              "absolute invisible top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white group-hover:visible group-hover:animate-fadeIn "
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CoverImage;
