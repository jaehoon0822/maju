import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { UseFormReturn } from "react-hook-form";
import { OnLoadingComplete } from "next/dist/shared/lib/get-img-props";
import { readImageFile } from "@/common/utils/readImageFile";
import { useRouter } from "next/router";
import useMutationCreateAvatar from "@/hooks/mutations/useMutationCreateAvatar";
import { User } from "@/common/types/index.types";
import { useDispatch } from "@/common/store";
import { setPos } from "@/common/store/slices/posSlice";

const useAvatar = ({
  user,
  useFormReturn,
  setIsAvatarLoading,
  size,
}: {
  user?: User;
  useFormReturn?: UseFormReturn;
  setIsAvatarLoading?: Dispatch<SetStateAction<boolean>>;
  size?: string;
}) => {
  // input 참조 Ref
  const inputRef = useRef<HTMLInputElement | null>(null);
  // image loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // image update 및 생성시 미리보기로 보여줄 dataUrl;
  const [img, setImg] = useState<string>(user?.profile?.avatar ?? "");
  // image retry count
  const [retryCount, setRetryCount] = useState<number>(0);
  // blur data
  const [blurData, setBlurData] = useState<string>(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAcAAA0ACbYD1v4AAAAASUVORK5CYII="
  );
  // push 가져옴
  const { push } = useRouter();
  // Dispatch
  const dispatch = useDispatch();
  // useFormContext 를 사용하여 setValue 가져옴
  // avatar mutation 호출
  const createAvatarMutation = useMutationCreateAvatar();
  // data:image/ 로 시작하는지 확인
  const isDataUrl = /^data:image\/*/g.test(img ?? "");
  // image selector
  const getImage = ({ width }: { width: string }) => {
    if (img) {
      return `${process.env.NEXT_PUBLIC_IMAGE_URL}/avatar/${width}/${img}`;
    }
    return "";
  };

  const src =
    size === "SM" ? getImage({ width: "w40" }) : getImage({ width: "w112" });

  // image error 처리
  const onError = () => {
    if (retryCount < 10) {
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };

  // onLoadComplate 처리
  const onLoadingComplete: OnLoadingComplete = () => {
    setRetryCount(0);
    setIsLoading(false);
  };

  // 클릭시 InputRef.current.click 실행
  const onClickEditProfile = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  // isEdit 이 false 이면 profil 로 이동
  const onClickPushProfile = useCallback(() => {
    push(`/profile/${user?.nick}`);
    dispatch(setPos(0));
  }, [user, push, dispatch]);

  // input file 등록시 onChange 처리 로직
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // file 을 가져옴
    try {
      const file = e.currentTarget.files?.[0];
      if (file) {
        setIsLoading(true);
        // file 이 있다면, dataUrl 을 가져옴
        const dataUrl = await readImageFile(file);
        // dataUrl 을 blurData 에 저장
        setBlurData(dataUrl);
        // File react hook form 에 저장
        const avatar = await createAvatarMutation.mutateAsync(file);
        setImg((_prev) => avatar.image);
        useFormReturn!.setValue("avatar", avatar.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // react state 는 초기값이 처음 설정되면
  // remount 되지 않은이상 이전 초기값을 사용
  // user udpate 가 일어나면, 상태값을 업데이트하여
  // 작동되게함

  useEffect(() => {
    if (user?.profile?.avatar) {
      setImg(user.profile.avatar);
    }
  }, [user]);

  useEffect(() => {
    if (setIsLoading) {
      setIsLoading(isLoading);
    }
    if (setIsAvatarLoading) {
      setIsAvatarLoading(isLoading);
    }
  }, [isLoading, retryCount, setImg]);

  return {
    onChange,
    onClickEditProfile,
    onClickPushProfile,
    onError,
    onLoadingComplete,
    img,
    src,
    blurData,
    retryCount,
    isLoading,
    isDataUrl,
    inputRef,
  };
};

export default useAvatar;
