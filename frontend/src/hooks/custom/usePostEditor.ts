import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import useMutationCreateImage from "../mutations/useMutationCreateImage";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { InferType } from "yup";
import { debounce, uniq } from "lodash";
import { postSchema, postType } from "@/common/validation/post.yup";
import { Post } from "@/common/types/index.types";
import { readImageFile } from "@/common/utils/readImageFile";
import toContent from "@/common/utils/toContent";

const usePostEditor = (onSubmit: (data: postType) => void, post?: Post) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const editorRef = useRef<ReactQuill | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const createImageMutation = useMutationCreateImage();
  const [hashtags, setHahstags] = useState<string[]>([]);
  const [useFormReturn, setUseFormReturn] =
    useState<UseFormReturn<InferType<typeof postSchema>>>();
  const [images, setImages] = useState<string[]>(
    post && post.img ? Array.from(post.img, (img) => img.img) : []
  );
  const [errors, setErrors] = useState<FieldErrors<FieldValues>>({});

  const onChangeImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      useFormReturn?.clearErrors();
      const files = e.currentTarget.files;
      const imageFiles = useFormReturn?.getValues("img") as [];

      if (
        (imageFiles && imageFiles.length > 4) ||
        (files && files.length > 4)
      ) {
        useFormReturn?.setError("img", {
          message: "4개이하로 등록해주세요.",
        });
        e.target.value = "";
        return;
      }

      try {
        if (files) {
          const arrayFiles = Array.from(files);
          const promisesFiles = Array.from(files, (file) => {
            return readImageFile(file);
          });
          const dataUrls = await Promise.all(promisesFiles);
          setImages((prev) => {
            if (prev.length + arrayFiles.length > 4) {
              const newImages = prev.slice(arrayFiles.length);
              return [...newImages, ...dataUrls];
            }
            return [...prev, ...dataUrls];
          });

          if (imageFiles.length + files.length > 4) {
            const newImageFiles = imageFiles.slice(files.length);
            useFormReturn?.setValue("img", [...newImageFiles, ...arrayFiles]);
          } else {
            useFormReturn?.setValue("img", [...imageFiles, ...arrayFiles]);
          }
          e.target.value = "";
        }
      } catch (error) {
        throw error;
      }
    },
    [useFormReturn]
  );

  const onHandleImage = useCallback(() => {
    if (imageInputRef.current) {
      const input = imageInputRef.current;
      input.click();
    }
  }, [imageInputRef.current]);

  const onRemoveImage = useCallback(
    (idx: number) => {
      useFormReturn?.clearErrors();
      const prevImageFiles = useFormReturn?.getValues("img");
      if (prevImageFiles) {
        const imageFiles = prevImageFiles;
        imageFiles.splice(idx, 1);
        useFormReturn?.setValue("img", imageFiles);
      }
      setImages((prev) => {
        const images = [...prev];
        images.splice(idx, 1);
        return images;
      });
    },
    [useFormReturn, setImages]
  );

  const onSubmitHandler: SubmitHandler<postType> = useCallback(
    debounce(async (data) => {
      // submit 전에 image 확인
      setIsSubmiting(true);

      // imageUrls 는 submit 에 전송할 image
      let imageUrls: string[] = data.img;
      if (data.img.length !== 0) {
        // fileImages 는 filereader 의 dataUrl 의 배열
        const fileImages = data.img.filter((file: any) =>
          /image\/\w+/g.test(file.type)
        );
        // urls 는 s3 url 을 가진 이미지를 가진 배열
        const urls = data.img.filter((file: any) =>
          /^(?!image\/)\w+/g.test(file.type)
        );
        // imageUrls 는 submit 전송전 보낼 image 배열
        imageUrls = [
          // s3 의 url 형태는 그대로 사용
          ...urls,
          // filereader 의 dataUrl 이면, s3 ulr 변환이후, 배열추가
          ...(await createImageMutation.mutateAsync(fileImages as File[]))
            .images,
        ];
      }
      // content 의 hashatag를
      //`<span style="color:#3b83f6">${hashtag}</span>` 로 변환
      const content = toContent(data.content, hashtags);
      // submit 에 담아 호출
      onSubmit({ content, img: imageUrls });

      // 상단의 onSubmit 에서 img 전달이후 처리되기이전에
      // setImages([]) 가 실행되어 image 가 처리되지 않은 상황발생!
      // setTimeout 을 사용하여 비동기로 실행
      setTimeout(() => {
        // useForm 을 reset
        useFormReturn?.reset();
        // image 를 reset
        setImages([]);
      }, 0);
      // quill editor 를 blur 로 처리
      if (editorRef.current) {
        editorRef.current.blur();
      }
      setIsSubmiting(false);
    }, 100),
    [
      post,
      toContent,
      editorRef,
      useFormReturn,
      setImages,
      onSubmit,
      hashtags,
      setIsSubmiting,
    ]
  );

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      const regex = /#[^\s]+(?:[ \n]|$)/g;
      editor.on("text-change", () => {
        const text = editor.getText();
        const searchedHashtags = Array.from(text.match(regex) ?? [], (text) =>
          text.trim()
        );
        setHahstags(uniq(searchedHashtags));
      });
    }
  }, [editorRef.current, setHahstags]);

  return {
    onHandleImage,
    onChangeImage,
    onRemoveImage,
    onSubmitHandler,
    setUseFormReturn,
    editorRef,
    setErrors,
    images,
    isSubmiting,
    imageInputRef,
    errors,
    hashtags,
  };
};

export default usePostEditor;
