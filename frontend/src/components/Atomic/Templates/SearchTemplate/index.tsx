import { Fragment, memo, useCallback, useEffect, useState } from "react";
import SearchBar from "../../Molecules/SearchBar";
import classNames from "classnames";
import Line from "../../Atoms/Line";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../../Organisms/Post";
import PostImages from "../../Atoms/PostImages";
import PageWrapper from "@/components/common/PageWrapper";
import useSearchTemplate from "@/hooks/custom/useSearchTemplate";
import { useRouter } from "next/router";
import { useDispatch } from "@/common/store";
import { setPos } from "@/common/store/slices/posSlice";
import { getPathname } from "@/common/utils/getPathname";

const SearchTemplate = () => {
  // 라우터 호출
  const { push, asPath, query } = useRouter();
  // redux dispatch
  const dispatch = useDispatch();
  // click 되었는지 확인하는 state
  const [isClicked, setIsClicked] = useState<boolean>(false);
  // search infinite query
  const { fetchNextPage, hasNextPage, hashtagPostsData, setHashtagTitle } =
    useSearchTemplate();

  const onClickPostImageModal = useCallback(
    (postId: string) => {
      // pathname 만 가져오기
      const queryPage = query.page ? (query.page as string) : "";
      const pathname = getPathname({
        asPath,
        queryPage,
        queryString: `modal=image/post&postId=${postId}`,
      });
      push(pathname);
      dispatch(setPos(window.scrollY));
    },
    [query.page, asPath]
  );

  // isClicked 변화 감지
  useEffect(() => {
    // isClicked 가 true 이면, 100 밀리초 이후에 false 로 변경
    if (isClicked === true) {
      setTimeout(() => {
        setIsClicked(false);
      }, 100);
    }
  }, [isClicked]);

  return (
    <>
      <div className={classNames("flex justify-center w-full pt-10")}>
        <SearchBar
          onSubmit={(data) => {
            setHashtagTitle(data.search);
            setIsClicked((prev) => !prev);
          }}
        />
      </div>
      <div className={classNames("-mt-8")}>
        <Line />
      </div>
      {hashtagPostsData && hashtagPostsData.pages[0].length !== 0 ? (
        <PageWrapper>
          <InfiniteScroll
            hasMore={hasNextPage ?? false}
            dataLength={hashtagPostsData?.pages.length as number}
            next={fetchNextPage}
            loader={hasNextPage ?? <h4>loading...</h4>}
            hasChildren
          >
            {hashtagPostsData &&
              hashtagPostsData.pages.map((group) => {
                if (group && group.length) {
                  return group.map((post) => {
                    return (
                      <Fragment key={post.id}>
                        <PageWrapper>
                          <Post post={post}>
                            <PostImages
                              post={post}
                              onClickModal={onClickPostImageModal}
                            />
                          </Post>
                        </PageWrapper>
                      </Fragment>
                    );
                  });
                }
              })}
          </InfiniteScroll>
        </PageWrapper>
      ) : (
        <div
          className={classNames(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all",
            {
              "opacity-0": isClicked, // isClicked 가 true 이면, opacity 0
              "opacity-100": !isClicked, // isClicked 가 false 이면, opacity 100
            }
          )}
        >
          <PageWrapper>
            <div
              className={classNames(
                "flex flex-col items-center text-gray-300 font-bold text-3xl"
              )}
            >
              <span className={classNames("text-3xl font-extrabold pb-4")}>
                \&lt;*_*&gt;/
              </span>
              <span>태그가 없어요</span>
            </div>
          </PageWrapper>
        </div>
      )}
    </>
  );
};

export default memo(SearchTemplate);
