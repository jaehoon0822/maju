import classNames from "classnames";
import React, { ReactNode, memo, useEffect } from "react";
import MenuTemplate from "./Menu";
import PageWrapper from "../common/PageWrapper";
import DeletePostModal from "../Atomic/Organisms/Modal/DeletePostModal";
import UpdatePostModal from "../Atomic/Organisms/Modal/UpdatePostModal";
import { useRouter } from "next/router";
import CommentsModal from "../Atomic/Organisms/Modal/CommentsModal.ts";
import PostPreviewImageModal from "../Atomic/Organisms/Modal/PostPreviewImageModal";
import UserPreviewCoverImageModal from "../Atomic/Organisms/Modal/UserPreviewCoverImageModal";
import RegistProfilModal from "../Atomic/Organisms/Modal/RegistProfileModal";
import { useDispatch, useSelector } from "@/common/store";
import Backdrop from "../Atomic/Atoms/Backdrop";
import ScrollTopButton from "../Atomic/Atoms/ScrollTopButton";
import DeleteCommentModal from "../Atomic/Organisms/Modal/DeleteCommentModal";
import CreatePostModal from "../Atomic/Organisms/Modal/CreatepostModal";
import { setPos } from "@/common/store/slices/posSlice";

const Layout = ({ children }: { children: ReactNode }) => {
  const { query, ...router } = useRouter();
  const { pos } = useSelector((state) => state.pos);
  const dispatch = useDispatch();

  useEffect(() => {
    const windowScroll = () => {
      window.scrollTo({ top: pos });
      dispatch(setPos(0));
    };
    router.events.on("routeChangeComplete", windowScroll);
    return () => router.events.off("routeChangeComplete", windowScroll);
  }, [pos]);

  useEffect(() => {
    if (query.modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [query]);

  return (
    <>
      <div
        className={classNames(
          "flex m-auto border-r-[1px] border-solid max-w-[1200px] sm:flex-col sm:border-none"
        )}
      >
        <MenuTemplate />
        <div
          className={classNames(
            "flex flex-col ml-[17.5rem] w-[80%] md:ml-24 md:w-full sm:w-full sm:ml-0 sm:mb-20"
          )}
        >
          <div
            className={classNames(
              "relative flex flex-col flex-items items-center px-4 h-full break-words break-all md:w-full md:px-8 sm:px-4 z-0"
            )}
          >
            {children}
            <ScrollTopButton />
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className={classNames("fixed z-30")}>
        <PageWrapper>
          {/* postPreviwImage 모달 */}
          {query.modal === "image/post" ? <PostPreviewImageModal /> : null}
          {/* post 삭제 모달 */}
          {query.modal === "deletePost" ? <DeletePostModal /> : null}
          {/* user 의 coverImage 모달 */}
          {query.modal === "image/user" ? <UserPreviewCoverImageModal /> : null}
          {/* user 의 프로필 수정 모달 */}
          {query.modal === "registProfile" ? (
            <RegistProfilModal isPost={router.asPath.startsWith("/profile")} />
          ) : null}

          {/* 게시물 수정 모달 */}
          {query.modal === "updatePost" ? <UpdatePostModal /> : null}
          {/* 댓글 모달 */}
          {query.modal === "comments" ? <CommentsModal /> : null}
          {/* 댓글 삭제 모달 */}
          {query.modal === "deleteComment" ? <DeleteCommentModal /> : null}
          {/* 글 작성 모달 */}
          {query.modal === "createPost" ? <CreatePostModal /> : null}
          {/* 백드랍 */}
          <Backdrop />
        </PageWrapper>
      </div>
    </>
  );
};

export default memo(Layout);
