import Button from "../../Atoms/Button";
import Editor from "../../Atoms/Editor";
import Form from "../../Atoms/Form/Index";
import { postSchema, postType } from "@/common/validation/post.yup";
import EditPerviewImage from "../../Atoms/EditPreviewImage";
import classNames from "classnames";
import EditorToolbar from "../../Atoms/EditorToolbar";
import usePostEditor from "@/hooks/custom/usePostEditor";
import { toEditContent } from "@/common/utils/toEditContent";
import { memo, useMemo } from "react";
import { Post } from "@/common/types/index.types";

const PostEditor = ({
  toolbarId,
  onSubmit,
  post,
  placeholder,
}: {
  toolbarId?: string;
  onSubmit: (data: postType) => void;
  post?: Post;
  placeholder?: string;
}) => {
  const {
    onChangeImage,
    onHandleImage,
    onRemoveImage,
    onSubmitHandler,
    setUseFormReturn,
    setErrors,
    editorRef,
    imageInputRef,
    errors,
    images,
    hashtags,
  } = usePostEditor(onSubmit, post);

  return (
    <Form
      onSubmit={onSubmitHandler}
      schema={postSchema}
      defaultValues={
        post
          ? {
              content: toEditContent(post.content),
              img: Array.from(post.img, (img) => img.img),
            }
          : { content: "", img: [] }
      }
      setUseFormReturnMethod={setUseFormReturn}
    >
      <div className={classNames("w-full")}>
        <Editor
          name="content"
          forwardedRef={editorRef}
          setErrors={setErrors}
          placeholder={placeholder ?? undefined}
          toolbar={
            toolbarId
              ? useMemo(
                  () => ({
                    container: `#${toolbarId}`,
                    handlers: {
                      image: onHandleImage,
                    },
                  }),
                  [toolbarId]
                )
              : undefined
          }
        >
          <div className={classNames("relative pb-4 transition-opacity")}>
            {useMemo(
              () =>
                hashtags.map((hashtag, idx) => (
                  <span
                    key={hashtag + idx}
                    className={classNames(
                      "inline-block animate-fadeIn p-2 mt-2 bg-blue-500 text-white ml-2"
                    )}
                  >
                    {hashtag}
                  </span>
                )),
              [hashtags]
            )}
          </div>
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
            {toolbarId ? <EditorToolbar toolbarId={toolbarId} /> : null}
            <div className={classNames("ml-auto py-4 pt-8 sm:pt-4 sm:w-full")}>
              <Button
                label="게시하기"
                size="large"
                variant="primary"
                disabled={useMemo(
                  () =>
                    !!errors["content"]?.message || !!errors["img"]?.message,
                  [errors]
                )}
              />
            </div>
          </div>
        </Editor>
      </div>
    </Form>
  );
};

export default memo(PostEditor);
