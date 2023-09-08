import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { InferType } from "yup";
import { Form } from "../../Atoms/Form/Index";
import { Button } from "../../Atoms/Button";
import { FieldErrors, FieldValues, SubmitHandler } from "react-hook-form";
import Editor from "../../Atoms/Editor";
import { commentSchema } from "@/common/validation/comment.yup";
import classNames from "classnames";

const CommentEditorForm = () => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [errors, setErrors] = useState<FieldErrors<FieldValues> | null>(null);
  const onSubmit: SubmitHandler<InferType<typeof commentSchema>> = (data) => {
    console.log(data);
  };

  return (
    <Form schema={commentSchema} mode="onChange" onSubmit={onSubmit}>
      <div className={classNames("flex flex-col py-10")}>
        <div>
          <Editor
            placeholder="댓글작성을 하시나요?"
            name="content"
            forwardedRef={quillRef}
            setErrors={setErrors}
          />
          {/* <CommentEditor name="content" /> */}
        </div>
        <div className={classNames("ml-auto mt-4 mb-4")}>
          <Button
            label="댓글쓰기"
            size="large"
            variant="primary"
            disabled={!!errors?.["content"]?.message}
          />
        </div>
      </div>
    </Form>
  );
};

export default CommentEditorForm;
