import React, {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import ReactQuill, { ReactQuillProps, Value } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../Button";
import classNames from "classnames";
import { debounce, isEqual } from "lodash";

const QuillEditor = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({
      forwardedRef,
      ...props
    }: ReactQuillProps & {
      forwardedRef: MutableRefObject<ReactQuill | null>;
    }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

function Toolbar() {
  return (
    <div
      id="toolbar"
      style={{
        border: "none",
      }}
    >
      <span className="ql-formats">
        <button
          className="ql-image"
          defaultValue="3"
          style={{
            width: "32px",
            height: "32px",
          }}
        />
      </span>
    </div>
  );
}

const Editor = () => {
  const editorRef = useRef<ReactQuill | null>(null);
  const [len, setLen] = useState<number>(0);
  const { control, handleSubmit, setValue, getValues } = useForm();
  const handleHashtags = (delta: any) => {
    const ops: Value = []; // ops 배열 초기화

    delta.ops.forEach((op: any) => {
      if (typeof op.insert === "string") {
        op.attributes = op.attributes || {};
        const text = op.insert;
        const regex = /#([^\s#]+)/g;
        let result;
        let lastIndex = 0;
        let modified = false; // 변경 여부 플래그

        while (
          (result = regex.exec(text)) !== null &&
          op.attributes.color !== "blue"
        ) {
          const tag = result[1];
          const hashtagPos = result.index;
          const prefix = text.slice(lastIndex, hashtagPos);
          const hashtag = text.slice(hashtagPos, hashtagPos + tag.length + 1);
          lastIndex = hashtagPos + tag.length + 1;

          // 기존에 해시태그가 아닌 삽입에는 적용하지 않음
          if (!modified && op.attributes.color === "blue") {
            modified = true;
            op.attributes.color = null;
          }

          ops.push({ insert: prefix, attributes: op.attributes });
          ops.push({
            insert: hashtag,
            attributes: { ...op.attributes, color: "blue" },
          });
        }

        if (!modified) {
          ops.push({ insert: text, attributes: op.attributes });
        }
      }
    });

    return { ops };
  };

  const handleHtmlChange = useCallback(
    debounce((value: string) => {
      setValue("content", value);
      if (editorRef.current) {
        const editor = editorRef.current.getEditor();
        const text = editor.getText();
        const contents = editor.getContents();
        setLen(text.length - 1);

        if (/#[^\s#]+/g.test(text)) {
          const newDelta = handleHashtags(contents);
          editor.updateContents(newDelta, "user");
        }
      }
    }, 300),
    []
  );

  const onSubmitContent = () => {
    const editor = editorRef.current?.getEditor();
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        formats: ["header"],
        handers: {},
        clipboard: {},
      },
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmitContent)}>
      <div className={classNames("flex flex-col ]")}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <div>
              <style jsx global={true}>{`
                .ql-container.ql-snow {
                  border: none;
                  border-bottom: 1px solid #d2d2d2;
                  font-size: 24px;
                }
                .ql-editor.ql-blank::before {
                  font-style: normal;
                  font-size: 24px;
                  font-weight: 400;
                  color: #bdbdbd;
                }
              `}</style>
              <QuillEditor
                forwardedRef={editorRef}
                modules={modules}
                // value={field.value}
                theme="snow"
                onChange={handleHtmlChange}
                className={classNames({
                  "bg-red-200 text-red-500": len > 70,
                  "bg-white": len <= 255,
                })}
                placeholder="당신의 이야기를 들려주세요."
              />
              <div className="flex items-center justify-between">
                <Toolbar />
                <div>
                  <span
                    className={classNames(
                      "mr-4 text-red-500 transition-opacity",
                      {
                        "opacity-100": len > 70,
                        "opacity-0": len <= 255,
                      }
                    )}
                  >
                    255자 보다 작아야 합니다.
                  </span>
                  <span
                    className={classNames(
                      "w-8 h-8 inline-block rounded-full text-center leading-[32px] transition-colors",
                      {
                        "bg-red-100 text-red-500": len > 70,
                        "bg-blue-100 text-blue-500": len <= 70,
                      }
                    )}
                  >
                    {len <= 70 ? len : 70 - len}
                  </span>
                </div>
              </div>
            </div>
          )}
        />
        <Button
          disabled={len > 70}
          label="글쓰기"
          size="medium"
          variant="primary"
        />
      </div>
    </form>
  );
};

export default Editor;
