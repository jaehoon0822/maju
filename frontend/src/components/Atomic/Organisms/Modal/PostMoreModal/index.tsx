import Backdrop from "@/components/Atomic/Atoms/Backdrop";
import ModalTop from "@/components/Atomic/Molecules/ModalTop";
import classNames from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";

const PostMoreModal = ({
  isActive,
  onClose,
  children,
}: {
  isActive?: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isSm, setIsSM] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 576) {
      setIsSM(true);
    } else {
      setIsSM(false);
    }
  }, [setIsSM, isActive]);

  return (
    <>
      <div
        ref={modalRef}
        className={classNames(
          "absolute boder-solid border-gray-200 border-[1px]  flex flex-col top-10 right-10 w-1/2 p-4 shadow-xl bg-white transition-all sm:z-40 sm:fixed sm:top-1/2 z-30 sm:left-0 sm:translate-x-0 sm:w-full sm:h-full sm:shadow-2xl sm:shadow-black sm:rounded-t-xl sm:p-4",
          {
            "opacity-0 invisible sm:translate-y-full": isActive === false,
            "opacity-100 visible sm:translate-y-0": isActive === true,
          }
        )}
      >
        {isSm ? <ModalTop onClose={onClose} /> : null}
        {children}
      </div>
      {isSm ? <Backdrop isActive={isActive} onClickClose={onClose} /> : null}
    </>
  );
};

export default PostMoreModal;
