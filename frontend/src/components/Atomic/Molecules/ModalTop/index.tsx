import { memo, useCallback, useEffect, useState } from "react";
import module from "./ModalTop.module.css";
import CloseButton from "../../Atoms/CloseButton";
import Logo from "../../Atoms/Logo";
import { sizeType } from "../../Atoms/Logo/Logo.type";
import classNames from "classnames";
import { ModalTopProps } from "./ModalTop.type";

const ModalTop = ({ onClose, isTop, disabledLogo }: ModalTopProps) => {
  const [currentSize, setCurrentSize] = useState<sizeType>("M");

  const getSizeFromViewport = useCallback(() => {
    const width = window.innerWidth;

    if (width < 576) {
      return "SM";
    } else if (width < 960) {
      return "M";
    } else if (width < 1200) {
      return "L";
    }

    return "M";
  }, []);

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
      <div>
        <Logo
          size={currentSize}
          onClick={!disabledLogo ? onClose : undefined}
        />
      </div>
    </div>
  );
};

export default memo(ModalTop);
