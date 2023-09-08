import React, { useEffect, useState } from "react";
import module from "./ModalTop.module.css";
import { CloseButton } from "../../Atoms/CloseButton";
import Logo from "../../Atoms/Logo";
import { sizeType } from "../../Atoms/Logo/Logo.type";
import classNames from "classnames";
import { ModalTopProps } from "./ModalTop.type";
import { useRouter } from "next/router";

const ModalTop = ({ onClose, isTop }: ModalTopProps) => {
  const { pathname } = useRouter();
  const [currentSize, setCurrentSize] = useState<sizeType>("M");

  const getSizeFromViewport = () => {
    const width = window.innerWidth;

    if (width < 576) {
      return "SM";
    } else if (width < 960) {
      return "M";
    } else if (width < 1200) {
      return "L";
    }

    return "M";
  };

  useEffect(() => {
    setCurrentSize(getSizeFromViewport());
  }, [getSizeFromViewport, setCurrentSize]);

  return (
    <div
      className={classNames(module.modalTop_wrapper, {
        "mb-48 md:w-auto": !isTop,
        "mb-10 md:w-auto": isTop,
      })}
    >
      <CloseButton onClick={onClose} />
      <div
        onClick={() => {
          document.body.style.overflow = "auto";
        }}
      >
        <Logo size={currentSize} href={pathname} />
      </div>
    </div>
  );
};

export default ModalTop;
