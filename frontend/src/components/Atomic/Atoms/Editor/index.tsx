import React, { useEffect, useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { QuillEditor } from "../QuillEditor";
import classNames from "classnames";
import { EditorProps } from "./Editor.type";

// Quill 을 사용한 Editor
const Editor = ({
  forwardedRef, // QuillEditor 를 참조할 Ref
  name, // ReactHookForm 에서 사용할 이름
  isToolbar = false,
  toolbar, // QuillEditor 의 툴바, not required
  children, // Editor 에 사용될 자식 엘리먼트
  placeholder = "당신의 이야기를 들려주세요.", // 플레이스 홀더
  setErrors,
}: EditorProps) => {
  // control 과 formState 를 formContext 에서 가져옴
  const { control, clearErrors, formState } = useFormContext();
  // controller 를 사용하기 위해 호출
  const { field, fieldState } = useController({
    control, // form 의 컨트롤러
    name, // form 에서 사용될 이름
  });
  const errors = formState.errors;

  const onChange = (data: string) => {
    if (errors) {
      clearErrors();
    }
    // react quill 의 특성상
    // 빈 문자열 입력시 <p><br></p> 식으로 나옴
    // 빈문자열일때 "" 으로 변경
    data = data && data === "<p><br></p>" ? "" : data;
    // react hook form 을 사용하므로,
    // 변경된 data 를 react hook from 에서 인식할수 있도록
    // field.onChange 로 값을 넘김
    field.onChange(data);
  };

  useEffect(() => {
    setErrors(errors);
  }, [setErrors, errors]);

  return (
    <div>
      {/* QuillEditor 기본 style 변경 */}
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
      {/* QuillEditor 에 대한 설정 */}
      <QuillEditor
        id="editor"
        // ref 연결
        forwardedRef={forwardedRef}
        // value 값 할당
        value={field.value}
        // placeholder 값 할당
        placeholder={placeholder}
        // onChange
        onChange={onChange}
        // modules 설정
        // toolbar 가 있으면, 해당 toolbar 로 설정
        // 아니면 false 로 보여주지 않음
        modules={useMemo(
          () => ({
            toolbar: isToolbar ? toolbar : isToolbar,
          }),
          []
        )}
      />
      {children}
      <div>
        <span className={classNames("text-red-500 px-4 sm:text-sm")}>
          {(errors["content"]?.message as string) ||
            (errors["img"]?.message as string)}
        </span>
      </div>
    </div>
  );
};

export default Editor;
