import Editor from "@/components/Atomic/Atoms/Editor";
import classNames from "classnames";
import React, { useState } from "react";

const Test = () => {
  return (
    <div className={classNames("py-10")}>
      <Editor />
    </div>
  );
};

export default Test;
