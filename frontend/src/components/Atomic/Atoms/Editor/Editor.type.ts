import React, { ReactNode } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import ReactQuill from "react-quill";

export interface EditorProps {
  forwardedRef: React.MutableRefObject<ReactQuill | null>;
  name: string;
  placeholder?: string;
  toolbar?: {
    container: string;
    handlers: Record<string, () => void>;
  };
  children?: ReactNode;
  setErrors: (error: FieldErrors<FieldValues>) => void;
}
