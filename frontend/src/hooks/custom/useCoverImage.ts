import { useRouter } from "next/router";
import { User } from "./../../common/types/index.types";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { UseFormReturn } from "react-hook-form";
import useMutationCreateCoverImage from "../mutations/useMutationCreateCoverImage";
import { readImageFile } from "@/common/utils/readImageFile";
import useGetPathname from "./useGetPathname";
import { useDispatch, useSelector } from "@/common/store";
import { setPos } from "@/common/store/slices/posSlice";
import { setCommentModalPos } from "@/common/store/slices/commentModalPosSlice";

const useCoverImage = ({
  user,
  useFormReturn,
  setIsCoverImageLoading,
}: {
  user?: User;
  useFormReturn?: UseFormReturn;
  setIsCoverImageLoading?: Dispatch<SetStateAction<boolean>>;
}) => {
  // dispatch
  const { commentModalRef } = useSelector((state) => state.commentModalpos);
  // push 가져옴
  const { push, query } = useRouter();
  // path 가져옴
  const { pathname } = useGetPathname({
    queryString: `modal=image/user&userId=${user?.id}`,
  });
  // disptach
  const dispatch = useDispatch();
  // input 의 ref
  const inputRef = useRef<HTMLInputElement | null>(null);
  // 화면상 보여줄 image 설정
  // user.coverImage 가 있다면 사용하고, 그렇지 않다면 없음
  const [image, setImage] = useState<string>(user?.profile?.coverImage ?? "");
  // deviceWidth
  const [deviceWidth, setDeviceWidth] = useState<number>(0);
  // retryCount
  const [retryCount, setRetryCount] = useState<number>(0);
  // isLoading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // placeholder 의 blurDataUrl 에 사용될 base64
  const [dataUrl, setDataUrl] = useState<string>(
    "data:image/;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAcAAA0ACbYD1v4AAAAASUVORK5CYII="
  );
  // CoverImage 요청 mutation
  const createCoverImageMutation = useMutationCreateCoverImage();
  // imageWidth: deviceWidth 에 따라 선택적
  const imageWidth =
    deviceWidth > 1200 ? `w576` : deviceWidth > 576 ? `w348` : `raw`;
  // imageUrl: s3 image 의 url
  const imageUrl = useMemo(
    () =>
      `${process.env.NEXT_PUBLIC_IMAGE_URL}/coverImage/${imageWidth}/${image}`,
    [imageWidth, image]
  );

  // onLoadingComplete
  const onLoadingComplete = () => {
    setIsLoading(false);
    setRetryCount(0);
  };

  // onError
  const onError = () => {
    if (retryCount < 10) {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };

  // inputRef 클릭 이벤트
  const onClickEdit = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // click 시 해당 image 가져옴
  const onClickPreviewImage = () => {
    if (commentModalRef) {
      dispatch(setCommentModalPos(commentModalRef.scrollTop));
      dispatch(setPos(window.scrollY));
    } else {
      dispatch(setPos(window.scrollY));
    }
    push(pathname);
  };

  // input 의 change 이벤트
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // e.currentTarget 에 files 가 있는지 확인
    if (e.currentTarget.files) {
      setIsLoading(true);
      setRetryCount(0);
      // file 에서 첫번짹 값을 가져옴
      const file = e.currentTarget.files[0];
      // FileRedder 의 dataUrl
      const dataUrl = await readImageFile(file);
      // Image dataUrl 값 할당
      setDataUrl(dataUrl);
      // react hook form 의 coverImage 에 file 을 할당
      const coverImage = await createCoverImageMutation.mutateAsync(file);
      // Mutation 으로 가져온 data 할당
      setImage(coverImage.image);
      if (useFormReturn) {
        // react hook form 의 useFormReturn 값이 있다면,
        // setValue 로 Mutation 의 data 할당
        useFormReturn.setValue("coverImage", coverImage.image);
      }
    }
  };

  useEffect(() => {
    if (user?.profile?.coverImage) {
      setImage(user?.profile?.coverImage);
    }
  }, [user]);

  useEffect(() => {
    //  coverImageLoading 에 현재 coverImage 의
    // loading 값 할당
    if (setIsCoverImageLoading) {
      setIsCoverImageLoading(isLoading);
    }
    // 현재 윈도우의 innerWidth 값을 계산해서 할당
    setDeviceWidth(window.innerWidth);
  }, [isLoading]);

  return {
    image,
    dataUrl,
    imageUrl,
    onClickEdit,
    onClickPreviewImage,
    onError,
    onLoadingComplete,
    retryCount,
    isLoading,
    setIsLoading,
    inputRef,
    onChange,
  };
};

export default useCoverImage;
