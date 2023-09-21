import dynamic from "next/dynamic";
import { QuillEditorFowardedRef } from "./QuillEditor.type";
import "react-quill/dist/quill.snow.css";
import { forwardRef } from "react";

export const QuillEditor = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }: QuillEditorFowardedRef) => {
      return <RQ {...props} ref={forwardedRef} />;
    };
  },
  {
    ssr: false,
  }
);
