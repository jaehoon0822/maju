import { ReactNode, memo, useEffect } from "react";
import classNames from "classnames";
import TopMenu from "../../Organisms/TopMenu";
import TopbarItem from "../../Atoms/TopbarItem";
import useHomeTemplate from "@/hooks/custom/useHomeTemplate";
import PostEdit from "../../Molecules/PostEditor";
import PageWrapper from "@/components/common/PageWrapper";
import { setPos } from "@/common/store/slices/posSlice";

const HomeTemplate = ({ children }: { children: ReactNode }) => {
  const {
    onSubmit,
    push,
    query,
    selectedIdx,
    posDispatch,
    onClickSelectedIdx,
  } = useHomeTemplate();

  return (
    <div className={classNames("w-full")}>
      <TopMenu
        selectedIdx={selectedIdx}
        onClickSelectedIdx={onClickSelectedIdx}
      >
        <TopbarItem
          title="나의 포스트"
          onClick={() => {
            push("/home");
            posDispatch(setPos(0));
            onClickSelectedIdx(0);
          }}
        />
        <TopbarItem
          title="팔로우 포스트"
          onClick={() => {
            push("/home?page=followPost");
            posDispatch(setPos(0));
            onClickSelectedIdx(1);
          }}
        />
      </TopMenu>
      {query.page !== "followPost" ? (
        <div
          className={classNames(
            "break-words break-all border-solid border-b-[1px] border-b-[#d2d2d2]"
          )}
        >
          <PostEdit onSubmit={onSubmit} toolbarId="HomeToolbar" />
        </div>
      ) : null}
      <PageWrapper>{children}</PageWrapper>
    </div>
  );
};

export default memo(HomeTemplate);
