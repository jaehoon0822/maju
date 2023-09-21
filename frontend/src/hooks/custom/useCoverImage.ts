import { useRouter } from "next/router";
import { User } from "./../../common/types/index.types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import useMutationCreateCoverImage from "../mutations/useMutationCreateCoverImage";
import { readImageFile } from "@/common/utils/readImageFile";
import useGetPathname from "./useGetPathname";
import { useDispatch, useSelector } from "@/common/store";
import { setPos } from "@/common/store/slices/posSlice";
import { setCommentModalPos } from "@/common/store/slices/commentModalPosSlice";

const useCoverImage = ({ user, isEdit }: { user?: User; isEdit?: boolean }) => {
  // dispatch
  const { commentModalRef } = useSelector((state) => state.commentModalpos);
  // push 가져옴
  const { push, query } = useRouter();
  // disptach
  const dispatch = useDispatch();
  // input 의 ref
  const inputRef = useRef<HTMLInputElement | null>(null);
  // 화면상 보여줄 image 설정
  // user.coverImage 가 있다면 사용하고, 그렇지 않다면 없음
  const [image, setImage] = useState<string>(user?.profile?.coverImage ?? "");
  // react hook form 에 File 을 저장할 메서드
  const { setValue } = isEdit ? useFormContext() : { setValue: undefined };
  // CoverImage 요청 mutation
  const createCoverImageMutation = useMutationCreateCoverImage();
  // path 가져옴
  const { pathname } = useGetPathname({
    queryString: `modal=image/user&userId=${user?.id}`,
  });
  // inputRef 클릭 이벤트
  const onClickEdit = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // click 시 해당 image 가져옴
  const onClickPreviewImage = () => {
    if (query.modal === "comments" && commentModalRef) {
      dispatch(setCommentModalPos(commentModalRef.scrollTop));
    } else {
      dispatch(setPos(window.scrollY));
    }
    push(pathname);
  };
  // input 의 change 이벤트
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // e.currentTarget 에 files 가 있는지 확인
    if (e.currentTarget.files) {
      // file 에서 첫번짹 값을 가져옴
      const file = e.currentTarget.files[0];
      const dataUrl = await readImageFile(file);
      // react hook form 의 coverImage 에 file 을 할당
      setImage(dataUrl);
      if (setValue) {
        const coverImage = await createCoverImageMutation.mutateAsync(file);
        setValue("coverImage", coverImage.image);
      }
    }
  };

  useEffect(() => {
    setImage(user?.profile?.coverImage ?? "");
  }, [user]);

  return {
    image,
    onClickEdit,
    onClickPreviewImage,
    inputRef,
    onChange,
  };
};

export default useCoverImage;
