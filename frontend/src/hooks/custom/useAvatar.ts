import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { readImageFile } from "@/common/utils/readImageFile";
import { useRouter } from "next/router";
import useMutationCreateAvatar from "@/hooks/mutations/useMutationCreateAvatar";
import { User } from "@/common/types/index.types";
import { useDispatch } from "@/common/store";
import { setPos } from "@/common/store/slices/posSlice";

const useAvatar = ({
  user,
  isEdit = false,
}: {
  user?: User;
  isEdit?: boolean;
}) => {
  // input 참조 Ref
  const inputRef = useRef<HTMLInputElement | null>(null);
  // image update 및 생성시 미리보기로 보여줄 dataUrl
  const [image, setImage] = useState<string>(user?.profile?.avatar ?? "");
  // Dispatch
  const dispatch = useDispatch();
  // push 가져옴
  const { push } = useRouter();
  // useFormContext 를 사용하여 setValue 가져옴
  const { setValue } = isEdit ? useFormContext() : { setValue: undefined };
  // avatar mutation 호출
  const createAvatarMutation = useMutationCreateAvatar();
  // data:image/ 로 시작하면, image 값을, 그렇지 않으면 주소가 포함된 image 값을 할당
  const imgSrc = useMemo(
    () =>
      /^data:image\/*/g.test(image)
        ? `${image}`
        : `${process.env.NEXT_PUBLIC_IMAGE_URL}/avatar/raw/${image}`,
    [image]
  );

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
  }, []);
  // input file 등록시 onChange 처리 로직
  const onChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      // file 을 가져옴
      const file = e.currentTarget.files?.[0];
      if (file) {
        // file 이 있다면, dataUrl 을 가져옴
        const dataUrl = await readImageFile(file);
        // dataUrl 을 저장
        setImage(dataUrl);
        // File react hook form 에 저장
        if (setValue && createAvatarMutation) {
          const avatar = await createAvatarMutation.mutateAsync(file);
          setValue("avatar", avatar.image);
        }
      }
    },
    [setValue, createAvatarMutation]
  );

  // react state 는 초기값이 처음 설정되면
  // remount 되지 않은이상 이전 초기값을 사용
  // user udpate 가 일어나면, 상태값을 업데이트하여
  // 작동되게함
  useEffect(() => {
    if (user) {
      setImage(user?.profile?.avatar ?? "");
    }
  }, [user]);

  return {
    onChange,
    onClickEditProfile,
    onClickPushProfile,
    image,
    imgSrc,
    inputRef,
  };
};

export default useAvatar;
