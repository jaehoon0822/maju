import { ForwardedRef, MutableRefObject } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";

export type QuillEditorFowardedRef = ReactQuillProps & {
  forwardedRef: ForwardedRef<ReactQuill | null>;
};
