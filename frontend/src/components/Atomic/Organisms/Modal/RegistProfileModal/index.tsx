import classNames from "classnames";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FieldErrors, SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  profileSchema,
  profileSchemaType,
} from "@/common/validation/profile.yup";
import Avatar from "@/components/Atomic/Atoms/Avator";
import Button from "@/components/Atomic/Atoms/Button";
import CoverImage from "@/components/Atomic/Atoms/CoverImage";
import Form from "@/components/Atomic/Atoms/Form/Index";
import { Modal } from "@/components/Atomic/Molecules/Modal";
import useQueryGetUserById from "@/hooks/queries/useQueryGetUserById";
import TextButton from "@/components/Atomic/Atoms/TextButton";
import Editor from "@/components/Atomic/Atoms/Editor";
import ReactQuill from "react-quill";
import useMutationPostProfile from "@/hooks/mutations/useMutationPostProfile";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import path from "path";
import { getPathname } from "@/common/utils/getPathname";

const RegistProfilModal = ({
  isEdit = true,
  isPost = false,
}: {
  isEdit?: boolean;
  isPost?: boolean;
  setIsSignup?: Dispatch<SetStateAction<boolean>>;
}) => {
  // queryClient
  const queryClient = useQueryClient();
  // router
  const { query, push, pathname, back, asPath } = useRouter();
  // editor 의 Ref
  const editorRef = useRef<ReactQuill | null>(null);
  // user 의 정보를 가져옴
  const { data: userData } = useQueryGetUserById(query.userId as string);
  // profile 생성을 위한 mutation
  const profileMutation = useMutationPostProfile();
  // useFormReturn
  const [useFormReturn, setUseFormReturn] = useState<UseFormReturn>();
  // error 세팅
  const [errors, setErrors] = useState<FieldErrors>();
  // image 가 Loading 중인지 확인하는 state
  const [isCoverimageLoading, setIsCoverImageLoading] =
    useState<boolean>(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(false);

  // onPostSubmit
  const onPostSubmit: SubmitHandler<profileSchemaType> = async (data) => {
    if (userData) {
      profileMutation!.mutate(
        {
          userId: query.userId as string,
          avatar: data.avatar as string | undefined,
          coverImage: data.coverImage as string | undefined,
          coverLetter: data.coverLetter,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ["/user"],
            });
            await queryClient.invalidateQueries({
              queryKey: ["/profile", userData!.nick],
            });
            await queryClient.invalidateQueries({
              queryKey: ["/posts"],
            });
            if (pathname === "/") {
              push({
                pathname: "/",
                query: {
                  modal: "signupComplate",
                  userId: userData.id,
                },
              });
            } else {
              // push({
              //   pathname: `${asPath.split("?")[0]}`,
              // });
              back();
            }
          },
          onError: (error) => {
            if (error instanceof AxiosError) throw error;
          },
        }
      );
    }
  };

  // 여러 errors 중 처음 나오는 에러를 선택하여 보여줌
  const catchError = (errors: FieldErrors<profileSchemaType>) => {
    if (errors) {
      const keys = Object.keys(errors) as (keyof profileSchemaType)[];
      return errors[keys[0]]?.message;
    }
  };

  return (
    <div
      className={classNames({
        "opacity-100 visible": query.modal === "registProfile",
        "opacity-0 invisible": query.modal !== "registProfile",
      })}
    >
      <main>
        <Modal>
          {userData ? (
            <>
              <h3 className={classNames("text-3xl font-bold pb-10")}>
                {isPost ? "프로필 수정" : "프로필 등록"}
              </h3>
              <div className={classNames("w-full flex flex-col")}>
                <div className={classNames("relative w-full")}>
                  <div className={classNames("w-full h-48 ")}>
                    <CoverImage
                      user={userData}
                      isEdit={isEdit}
                      setIsLoading={setIsCoverImageLoading}
                      useFormReturn={useFormReturn}
                    />
                  </div>
                  <div className={classNames("relative px-10 md:px-4")}>
                    <div
                      className={classNames(
                        "absolute -bottom-14 p-1 bg-white rounded-full"
                      )}
                    >
                      <Avatar
                        user={userData}
                        size={"L"}
                        isEdit={isEdit}
                        setIsLoading={setIsAvatarLoading}
                        useFormReturn={useFormReturn}
                      />
                    </div>
                  </div>
                  <Form
                    onSubmit={onPostSubmit}
                    schema={profileSchema}
                    setErrors={setErrors}
                    setUseFormReturnMethod={setUseFormReturn}
                    defaultValues={
                      userData
                        ? {
                            ...userData.profile,
                          }
                        : undefined
                    }
                  >
                    <div className={classNames("pt-10")}>
                      <Editor
                        name="coverLetter"
                        setErrors={setErrors}
                        placeholder="자기소개를 해주세요."
                        forwardedRef={editorRef}
                      />
                    </div>
                    <div
                      className={classNames("w-fit mt-8 md:w-full ml-auto ")}
                    >
                      <Button
                        label="등록하기"
                        size="large"
                        variant="primary"
                        disabled={isCoverimageLoading || isAvatarLoading}
                      />
                    </div>
                  </Form>
                  <div
                    className={classNames("absolute w-fit right-0 -bottom-4")}
                  >
                    <span className={classNames("text-red-500")}>
                      {errors && catchError(errors)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // query.userId 가 없거나 isSignup 이 false 이면 회원가입 유도 문구 활성화
            <>
              <div className={classNames("mb-4")}>
                <span
                  className={classNames("text-5xl font-extrabold sm:text-3xl")}
                >
                  회원가입
                </span>
                <span className={classNames("text-5xl sm:text-3xl")}>을</span>
              </div>
              <div className={classNames("mb-4")}>
                <span
                  className={classNames("text-5xl font-extrabold sm:text-3xl")}
                >
                  먼저
                </span>
                <span className={classNames("text-5xl sm:text-3xl")}>
                  진행해주세요!
                </span>
              </div>
              <div>
                <TextButton label="회원가입 하러가기" href={`/?modal=signup`} />
              </div>
            </>
          )}
        </Modal>
      </main>
    </div>
  );
};

export default RegistProfilModal;
