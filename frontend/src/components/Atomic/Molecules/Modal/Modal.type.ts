import { ObjectSchema } from "yup";

export interface ModalTemplateProps {
  children: React.ReactNode;
  onClose: () => void;
  isTop?: boolean;
  scrollAuto?: boolean;
}
