import classNames from "classnames";
import React, { ReactNode, useEffect } from "react";
import MenuTemplate from "./Menu";
import PageWrapper from "../common/PageWrapper";
import DeletePostModal from "../Atomic/Organisms/Modal/DeletePostModal";
import PreviewImageModal from "../Atomic/Organisms/Modal/PreviewImageModal";
import UpdatePostModal from "../Atomic/Organisms/Modal/UpdatePostModal";
import { useRouter } from "next/router";
import CommentsModal from "../Atomic/Organisms/Modal/CommentsModal.ts";

const Layout = ({ children }: { children: ReactNode }) => {
  const { query } = useRouter();

  useEffect(() => {
    if (query.modal) {
      document.body.style.overflow = "hidden";
    }
  }, [query]);

  return (
    <div
      className={classNames(
        "flex m-auto border-r-[1px] border-solid max-w-[1200px] "
      )}
    >
      <MenuTemplate />
      <div
        className={classNames(
          "flex flex-col ml-[17.5rem] md:ml-[6rem] w-[80%]"
        )}
      >
        <div
          className={classNames("px-10 h-full md:px-8 break-words break-all")}
        >
          {children}
        </div>
      </div>
      <PageWrapper>
        <DeletePostModal />
        <PreviewImageModal />
        {query.modal == "updatePost" && <UpdatePostModal />}
        {query.modal === "comments" && <CommentsModal />}
      </PageWrapper>
    </div>
  );
};

export default Layout;
