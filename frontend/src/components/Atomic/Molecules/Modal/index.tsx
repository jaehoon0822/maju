import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import module from "./Modal.module.css";
import ModalTop from "../ModalTop/Index";
import { ModalTemplateProps } from "./Modal.type";
import Backdrop from "../../Atoms/Backdrop";
import { useSelector } from "@/common/store";

const Modal = ({
  children,
  onClose,
  isTop,
  scrollAuto,
}: ModalTemplateProps) => {
  const { query } = useRouter();
  const { pos } = useSelector((state) => state.pos);

  return (
    <>
      <div
        aria-label="modal"
        className={classNames(module.modal_wrapper, {
          "overflow-auto": scrollAuto,
          "overflow-hidden": !scrollAuto,
        })}
        style={{
          top: pos,
        }}
      >
        {/* 모달 닫기 및 로고 부분 */}
        <ModalTop onClose={onClose} isTop={isTop} />

        {/* 모달 내용 부분 */}
        <div
          className={classNames(module.modal_children, {
            "left-0 opacity-100": query.modal,
            "-left-[200px] opacity-0": !query.modal,
          })}
        >
          {children}
        </div>
      </div>
      {/* 모달 backdrop 부분 */}
      <Backdrop onClose={onClose} />
    </>
  );
};

export { Modal };
