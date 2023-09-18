import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { InferType } from "yup";
import Form from "../../Atoms/Form/Index";
import Button from "../../Atoms/Button";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import Editor from "../../Atoms/Editor";
import {
  commentSchema,
  commentSchemaType,
} from "@/common/validation/comment.yup";
import classNames from "classnames";

const CommentEditor = (params: {
  content?: string;
  isEdit?: boolean;
  onClickEditComment?: () => void;
  onSubmit: SubmitHandler<commentSchemaType>;
}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [useFormReturnMethod, setUseFormReturnMethod] =
    useState<UseFormReturn>();
  const [content, setContent] = useState<string>(params.content ?? "");
  const [errors, setErrors] = useState<FieldErrors<FieldValues> | null>(null);
  const onSubmitHandler: SubmitHandler<commentSchemaType> = useCallback(
    (data) => {
      useFormReturnMethod?.reset();
      params.onSubmit(data);
    },
    [useFormReturnMethod]
  );

  useEffect(() => {
    setContent(params.content ?? "");
    if (useFormReturnMethod) {
      const onClickClearErrors = () => {
        useFormReturnMethod.clearErrors();
      };
      document.addEventListener("click", onClickClearErrors);
      return () => document.removeEventListener("click", onClickClearErrors);
    }
  }, [params.content, useFormReturnMethod]);

  return (
    <Form
      schema={commentSchema}
      mode="onBlur"
      defaultValues={{ content }}
      onSubmit={onSubmitHandler}
      setUseFormReturnMethod={setUseFormReturnMethod}
    >
      <div className={classNames("flex flex-col ")}>
        <div>
          {/* Editor */}
          <Editor
            placeholder="댓글작성을 하시나요?"
            name="content"
            forwardedRef={quillRef}
            setErrors={setErrors}
          >
            {/* 댓글작성 및 수정 버튼 */}
            <div className={classNames("flex pt-8")}>
              <div
                className={classNames(
                  "ml-auto w-fit md:w-[20%] sm:w-full mb-4"
                )}
              >
                {/* isEdit 이 ture 이면 "댓글수정", 아니면 "댓글쓰기" */}
                <Button
                  label={params.isEdit ? "댓글수정" : "댓글쓰기"}
                  size="medium"
                  variant="primary"
                  disabled={
                    // error 가 있거나, 기존의 내용과 새로운 내용이 같으면 disabled
                    !!errors?.["content"]?.message ||
                    params.content === useFormReturnMethod?.getValues("content")
                  }
                />
              </div>
              {/* isEdit 이 true 이면, 취소버튼 활성화 */}
              {params.isEdit ? (
                <div
                  className={classNames("w-fit md:w-[20%] sm:w-full mb-4 ml-4")}
                >
                  <Button
                    label="취소"
                    size="medium"
                    variant="warn"
                    onClick={params.onClickEditComment}
                  />
                </div>
              ) : null}
            </div>
          </Editor>
        </div>
      </div>
    </Form>
  );
};

export default memo(CommentEditor);
