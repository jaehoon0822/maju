import React, { useCallback } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import module from "./Modal.module.css";
import ModalTop from "../ModalTop";
import { ModalTemplateProps } from "./Modal.type";

const Modal = ({
  children,
  onClose,
  id,
  isTop,
  scrollAuto,
  modalRef,
}: ModalTemplateProps) => {
  const { query, back } = useRouter();
  const onCloseModal = useCallback(() => {
    back();
  }, []);

  return (
    <>
      <div
        ref={modalRef}
        id={id}
        aria-label="modal"
        className={classNames(module.modal_wrapper, {
          "overflow-auto": scrollAuto,
          "overflow-hidden": !scrollAuto,
        })}
      >
        {/* 모달 닫기 및 로고 부분 */}
        <ModalTop onClose={onClose ? onClose : onCloseModal} isTop={isTop} />

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
    </>
  );
};

export { Modal };
