import { RefCallBack, useController, useFormContext } from "react-hook-form";
import { QuillEditor } from "../QuillEditor";
import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import classNames from "classnames";
interface CommentEditor {
  name: string;
}

const CommentEditor = ({ name }: CommentEditor) => {
  const commentEdtiroRef = useRef<ReactQuill | null>(null);
  const { control, setError, clearErrors, formState } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  const onChange = (data: string) => {
    data = data === "<p><br></p>" ? "" : data;
    field.onChange(data);
  };

  const error = formState.errors["content"]?.message as string;

  useEffect(() => {
    if (commentEdtiroRef.current) {
      const editor = commentEdtiroRef.current?.getEditor();
      const text = editor.getText();
      const lines = editor.getLines().length;
      if (text.length >= 255) {
        setError("content", {
          type: "manual",
          message: "255자 이하로 작성해주세요.",
        });
      }

      if (lines >= 10) {
        setError("content", {
          type: "manual",
          message: "10줄 이하로 작성해주세요.",
        });
      }

      if (text.length < 255 && lines < 10) {
        clearErrors();
      }
    }
  }, [field.value]);

  return (
    <div className={classNames("relative")}>
      <div className={classNames("pb-10")}>
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
        <QuillEditor
          forwardedRef={commentEdtiroRef}
          placeholder="댓글을 작성해 주세요."
          onChange={onChange}
          value={field.value}
          modules={{
            toolbar: false,
          }}
        />
      </div>
      <div
        className={classNames(
          "absolute transition-opacity text-red-500 bottom-1",
          {
            "opacity-0 invisible": !error,
            "opacity-100 visible": error,
          }
        )}
      >
        <span>{error}</span>
      </div>
    </div>
  );
};

export default CommentEditor;
