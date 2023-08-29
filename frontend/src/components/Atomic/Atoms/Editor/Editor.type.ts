import React, { Dispatch, SetStateAction, useState } from "react";

export interface EditorProps {
  html: string;
  setHtml: Dispatch<SetStateAction<string>>;
}
