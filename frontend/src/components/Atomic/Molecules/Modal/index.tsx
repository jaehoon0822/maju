import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import module from "./Modal.module.css";
import ModalTop from "../ModalTop/Index";
import { ModalTemplateProps } from "./Modal.type";

const Modal = ({ children, onClose }: ModalTemplateProps) => {
  const { query } = useRouter();

  return (
    <>
      <div aria-label="modal" className={classNames(module.modal_wrapper)}>
        {/* 모달 닫기 및 로고 부분 */}
        <ModalTop onClose={onClose} />

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
      <div
        aria-label="backdrop"
        onClick={onClose}
        className={classNames(module.modal_backdrop, {
          "opacity-100": query.modal,
          "opacity-0 hidden": !query.modal,
        })}
      ></div>
    </>
  );
};

export { Modal };
