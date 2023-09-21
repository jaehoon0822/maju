import { Fragment, memo, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import classNames from "classnames";
import PostImages from "../../Atoms/PostImages";
import useQueryGetFollowerPosts from "@/hooks/queries/useQueryGetFollowerPosts";
import Post from "../Post";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setPos } from "@/common/store/slices/posSlice";
import Spinner from "../../Atoms/Spinner";
import { getPathname } from "@/common/utils/getPathname";

const HomeFollowerPostContents = () => {
  const { push, query, asPath } = useRouter();
  const posDispatch = useDispatch();

  const {
    data: postQuery,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useQueryGetFollowerPosts();

  const onClickPostImageModal = useCallback((postId: string) => {
    const queryPage = query.page ? (query.page as string) : "";
    const pathname = getPathname({
      asPath,
      queryPage,
      queryString: `modal=image/post&postId=${postId}`,
    });
    push(pathname);
    posDispatch(setPos(window.scrollY));
  }, []);

  if (isLoading) {
    <div>
      <Spinner isLoading={isLoading} />
    </div>;
  }

  return (
    <div className={classNames("w-full")}>
      {postQuery &&
      Array.isArray(postQuery.pages[0]) &&
      postQuery.pages[0].length === 0 ? (
        <div className={classNames("pt-20")}>
          <div className={classNames("text-center pb-4")}>
            <span className={classNames("text-[#acacac] text-2xl")}>
              팔로우된 포스트가 없습니다.
            </span>
          </div>
        </div>
      ) : (
        <InfiniteScroll
          hasMore={!!hasNextPage}
          next={fetchNextPage}
          dataLength={(postQuery?.pages.length as number) ?? 0}
          loader={
            hasNextPage ? (
              <div>
                <Spinner isLoading={hasNextPage} />
              </div>
            ) : null
          }
          hasChildren
        >
          {postQuery &&
            postQuery.pages.map((group) => {
              if (group && group.length !== 0) {
                return group.map((post) => {
                  return (
                    <Fragment key={post.id}>
                      <Post post={post}>
                        {post?.img && (
                          <PostImages
                            post={post}
                            onClickModal={onClickPostImageModal}
                          />
                        )}
                      </Post>
                    </Fragment>
                  );
                });
              }
            })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default memo(HomeFollowerPostContents);
