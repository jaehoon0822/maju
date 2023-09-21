import React, { ChangeEvent, useRef, useState } from "react";
import ReactQuill from "react-quill";
import useMutationCreateImage from "../mutations/useMutationCreateImage";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { InferType } from "yup";
import { postSchema } from "@/common/validation/post.yup";
import { Post } from "@/common/types/index.types";
import { readImageFile } from "@/common/utils/readImageFile";

const useEditor = (
  onSubmit: (data: InferType<typeof postSchema> & { img: string[] }) => void,
  post?: Post
) => {
  const editorRef = useRef<ReactQuill | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const createImageMutation = useMutationCreateImage();
  const [useFormReturn, setUseFormReturn] =
    useState<UseFormReturn<InferType<typeof postSchema>>>();
  const [images, setImages] = useState<string[]>(
    post && post.img ? Array.from(post.img, (img) => img.img) : []
  );
  const [errors, setErrors] = useState<FieldErrors<FieldValues>>({});

  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    useFormReturn?.clearErrors();
    const files = e.currentTarget.files;
    const imageFiles = useFormReturn?.getValues("img") as [];

    if (imageFiles && imageFiles.length > 4) {
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
  };

  const onHandleImage = () => {
    if (imageInputRef.current) {
      const input = imageInputRef.current;
      input.click();
    }
  };

  const onRemoveImage = (idx: number) => {
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
  };

  const onSubmitHandler: SubmitHandler<InferType<typeof postSchema>> = async (
    data
  ) => {
    let imageUrls: string[] =
      post && post.img ? Array.from(post.img, (img) => img.img) : [];
    if (data.img.length !== 0) {
      imageUrls = (await createImageMutation.mutateAsync(data.img as File[]))
        .images;
    }
    onSubmit({ content: data.content, img: imageUrls });
    setImages([]);
    setTimeout(() => {
      useFormReturn?.reset();
    }, 100);
    if (editorRef.current) {
      editorRef.current.blur();
    }
  };

  return {
    onHandleImage,
    onChangeImage,
    onRemoveImage,
    onSubmitHandler,
    setUseFormReturn,
  };
};

export default useEditor;
