import React, { ChangeEvent, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { InferType } from "yup";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "../../Atoms/Button";
import Editor from "../../Atoms/Editor";
import { Form } from "../../Atoms/Form/Index";
import { postSchema } from "@/common/validation/post.yup";
import EditPerviewImage from "../../Atoms/EditPreviewImage";
import classNames from "classnames";
import EditorToolbar from "../../Atoms/EditorToolbar";
import Post from "../../Organisms/Post";
import usePostEditor from "@/hooks/custom/usePostEditor";

const PostEditor = ({
  onSubmit,
  post,
}: {
  onSubmit: (data: InferType<typeof postSchema> & { img: string[] }) => void;
  post?: Post;
}) => {
  const {
    onChangeImage,
    onHandleImage,
    onRemoveImage,
    onSubmitHandler,
    setUseFormReturn,
    editorRef,
    errors,
    imageInputRef,
    images,
    setErrors,
  } = usePostEditor(onSubmit, post);

  return (
    <Form
      onSubmit={onSubmitHandler}
      schema={postSchema}
      defaultValues={
        post
          ? {
              content: post.content,
              img: Array.from(post.img, (img) => img.img),
            }
          : { content: "", img: [] }
      }
      setUseFormReturnMethod={setUseFormReturn}
    >
      <>
        <Editor
          name="content"
          forwardedRef={editorRef}
          setErrors={setErrors}
          isToolbar={true}
          toolbar={{
            container: "#toolbar",
            handlers: {
              image: onHandleImage,
            },
          }}
        >
          <EditPerviewImage images={images} onRemoveImage={onRemoveImage} />
          <div className={classNames("flex sm:flex-col")}>
            <input
              ref={imageInputRef}
              name="img"
              type="file"
              accept="image/*"
              multiple
              className={classNames("hidden")}
              onChange={onChangeImage}
            />
            <EditorToolbar />
            <div className={classNames("ml-auto py-4 sm:w-full")}>
              <Button
                label="게시하기"
                size="large"
                variant="primary"
                disabled={
                  !!errors["content"]?.message || !!errors["img"]?.message
                }
              />
            </div>
          </div>
        </Editor>
      </>
    </Form>
  );
};

export default PostEditor;
