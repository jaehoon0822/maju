import InfiniteScroll from "react-infinite-scroll-component";
import PostImages from "../../Atoms/PostImages";
import TopMenu from "../../Organisms/TopMenu";
import { TopbarItem } from "../../Atoms/TopbarItem";
import Post from "../../Organisms/Post";
import useHomeTemplate from "@/hooks/custom/useHomeTemplate";
import classNames from "classnames";
import Spinner from "../../Atoms/Spinner";
import { Fragment } from "react";
import PostEdit from "../../Molecules/PostEditor";

const HomeTemplate = () => {
  const {
    onClickOpenModal,
    hasNextPage,
    fetchNextPage,
    postQuery,
    postQueryIsLoading,
    userQueryIsLoading,
    onSubmit,
    query,
  } = useHomeTemplate();

  if (postQueryIsLoading || userQueryIsLoading) {
    return (
      <div
        className={classNames("bg-white bg-opacity-50 relative w-full tm-10")}
      >
        <Spinner isLoading={postQueryIsLoading || userQueryIsLoading} />
      </div>
    );
  }

  return (
    <div>
      {query.modal !== "updatePost" && query.modal !== "comments" ? (
        <div
          className={classNames(
            "break-words break-all border-solid border-b-[1px] border-b-[#d2d2d2]"
          )}
        >
          <PostEdit onSubmit={onSubmit} />
        </div>
      ) : null}
      <TopMenu>
        <TopbarItem title="나의 포스트" onClick={() => {}} />
        <TopbarItem title="팔로우 포스트" onClick={() => {}} />
      </TopMenu>
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
          dataLength={postQuery?.pages.length as number}
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

export default HomeTemplate;
