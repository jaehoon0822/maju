import React, { useMemo } from "react";
import classNames from "classnames";
import { QuillEditor } from "../QuillEditor";
import EditorToolbar from "../EditorToolbar";
import { Button } from "../Button";
import useEditor from "@/hooks/custom/useEditor";
import EditPerviewImage from "../EditPreviewImage";
import { Post } from "@/common/types/index.types";

const Editor = ({
  editData,
  placeholder = "당신의 이야기를 들려주세요.",
}: {
  editData?: Post;
  placeholder?: string;
}) => {
  const {
    onSubmit,
    onSubmitUpdate,
    onChangeEditor,
    onChangeImage,
    onRemoveImage,
    quillRef,
    hashtags,
    Controller,
    control,
    query,
    handleSubmit,
    onHandleImage,
    imageInputRef,
    errors,
    images,
    imageUrls,
    len,
  } = useEditor(editData);

  return (
    <form
      className={classNames("px-10 py-10 md:px-4 w-full")}
      onSubmit={
        query.modal === "updatePost"
          ? handleSubmit(onSubmitUpdate)
          : handleSubmit(onSubmit)
      }
    >
      <div className={classNames("mb-2")}>
        <style jsx global={true}>{`
          .ql-container.ql-snow {
            border: none;
            border-bottom: 1px solid #d2d2d2;
            font-size: 24px;
          }
          .ql-editor {
            transition: all 0.5s;
            max-height: 30vh;
            overflow: auto;
          }
          .ql-editor.ql-blank::before {
            font-style: normal;
            font-size: 24px;
            font-weight: 400;
            color: #bdbdbd;
          }
          @media (max-width: 960px) {
            .ql-container.ql-snow {
              font-size: 16px;
            }
            .ql-editor.ql-blank::before {
              font-size: 16px;
            }
          }
        `}</style>
        <Controller
          control={control}
          name="content"
          render={({ field: { value } }) => (
            <QuillEditor
              value={value}
              forwardedRef={quillRef}
              theme="snow"
              placeholder={placeholder}
              onChange={onChangeEditor}
              id="editor"
              modules={useMemo(
                () => ({
                  toolbar: {
                    container: "#toolbar",
                    handlers: {
                      image: onHandleImage,
                    },
                  },
                }),
                [query.modal]
              )}
            />
          )}
        />
      </div>
      <input
        ref={imageInputRef}
        name="img"
        type="file"
        multiple
        className={classNames("hidden")}
        onChange={onChangeImage}
      />
      <div className={classNames("relative")}>
        {hashtags.map((hashtag, idx) => (
          <span
            key={hashtag + idx}
            className={classNames(
              "animate-fadeIn inline-block text-white mt-2 mr-2 px-2 py-2 bg-blue-500 rounded-md"
            )}
          >
            {hashtag}
          </span>
        ))}
      </div>
      <div className={classNames("flex flex-wrap")}>
        <EditPerviewImage
          images={imageUrls.length === 0 ? images : imageUrls}
          onRemoveImage={onRemoveImage}
        />
      </div>
      <div
        className={classNames(
          "relative flex justify-between mb-4 mt-8 items-center md:flex-col md:mt-4"
        )}
      >
        <div className={classNames("flex mr-auto")}>
          <EditorToolbar />
        </div>
        <div className={classNames("relative ml-auto")}>
          <span
            className={classNames(
              "text-red-500 mr-2 md:text-sm absolute -top-8 right-0 transition-all w-max md:block md:-top-[2rem] ",
              {
                "opacity-0": errors.content === undefined || len < 255,
                "opacity-100": errors.content !== undefined || len > 255,
              }
            )}
          >
            {len < 255
              ? (errors.content?.message as string)
              : "255자 이하로 작성해주세요."}
          </span>
          <span
            className={classNames(
              "w-8 h-8 inline-block leading-6 text-center mr-4 p-1 rounded-full bg-blue-100 text-xs transition-colors md:opacity-0 md:invisible",
              {
                "bg-orange-100 text-orange-500": len > 200,
                "bg-red-100 text-red-500": len > 255,
              }
            )}
          >
            {len < 255 ? len : 255 - len < -100 ? "∞" : 255 - len}
          </span>
          <Button
            label="게시하기"
            variant="primary"
            size="medium"
            disabled={len > 255}
          />
        </div>
      </div>
    </form>
  );
};

export default Editor;
