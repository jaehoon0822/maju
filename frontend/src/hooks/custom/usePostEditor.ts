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
import { uniq } from "lodash";
import { postSchema, postType } from "@/common/validation/post.yup";
import { Post } from "@/common/types/index.types";
import { readImageFile } from "@/common/utils/readImageFile";
import toContent from "@/common/utils/toContent";

const usePostEditor = (onSubmit: (data: postType) => void, post?: Post) => {
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
          message: "4개의 이미지를 등록해주세요.",
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

  console.log("---test", images, useFormReturn?.getValues("img"));

  const onSubmitHandler: SubmitHandler<postType> = useCallback(
    async (data) => {
      // let imageUrls: string[] =
      //   post && post.img ? Array.from(post.img, (img) => img.img) : [];
      let imageUrls: string[] = data.img;
      if (data.img.length !== 0) {
        const fileImages = data.img.filter((file) =>
          /image\/\w+/g.test(file.type)
        );
        const urls = data.img.filter((file) =>
          /^(?!image\/)\w+/g.test(file.type)
        );
        imageUrls = [
          ...urls,
          ...(await createImageMutation.mutateAsync(fileImages as File[]))
            .images,
        ];
      }

      console.log("----imageUrls", imageUrls);

      const content = toContent(data.content, hashtags);
      onSubmit({ content, img: imageUrls });
      setImages([]);
      setTimeout(() => {
        useFormReturn?.reset();
      }, 100);
      if (editorRef.current) {
        editorRef.current.blur();
      }
    },
    [post, toContent, editorRef, useFormReturn, setImages, onSubmit, hashtags]
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
    imageInputRef,
    errors,
    hashtags,
  };
};

export default usePostEditor;
