import { MutableRefObject } from "react";

export interface ModalTemplateProps {
  children: React.ReactNode;
  id?: string;
  onClose?: () => void;
  isTop?: boolean;
  scrollAuto?: boolean;
  modalRef?: MutableRefObject<HTMLDivElement | null>;
}
