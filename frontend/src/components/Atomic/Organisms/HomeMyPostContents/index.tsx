import classNames from "classnames";
import React, { Fragment, memo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../Post";
import PostImages from "../../Atoms/PostImages";
import useHomeMyPostContents from "@/hooks/custom/useHomeMyPostContents";
import Spinner from "../../Atoms/Spinner";

const HomeMyPostContents = () => {
  const {
    fetchNextPage,
    hasNextPage,
    onClickOpenModal,
    postQuery,
    postQueryIsLoading,
  } = useHomeMyPostContents();

  if (postQueryIsLoading) {
    return (
      <div
        className={classNames(
          "relative top-1/2 -translate-y-1/2 bg-white bg-opacity-50 w-full tm-10"
        )}
      >
        <Spinner isLoading={postQueryIsLoading} />
      </div>
    );
  }

  return (
    <div>
      {postQuery &&
      Array.isArray(postQuery.pages[0]) &&
      postQuery.pages[0].length === 0 ? (
        <div className={classNames("pt-20")}>
          <div className={classNames("text-center pb-4")}>
            <span className={classNames("text-[#acacac] text-2xl")}>
              포스트가 없습니다.
            </span>
          </div>
          <div className={classNames("text-center")}>
            <span className={classNames("text-[#acacac] text-center text-2xl")}>
              당신의 이야기를 들려주세요.
            </span>
          </div>
        </div>
      ) : (
        <InfiniteScroll
          hasMore={hasNextPage as boolean}
          next={fetchNextPage}
          dataLength={(postQuery?.pages.length as number) ?? 0}
          loader={hasNextPage === true ? <h4>loading...</h4> : null}
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
                            onClickModal={onClickOpenModal}
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

export default memo(HomeMyPostContents);
