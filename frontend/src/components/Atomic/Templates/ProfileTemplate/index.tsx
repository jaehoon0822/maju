import { Fragment, memo } from "react";
import ProfileBox from "../../Molecules/ProfileBox";
import Spinner from "../../Atoms/Spinner";
import classNames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../../Organisms/Post";
import PostImages from "../../Atoms/PostImages";
import useProfileTemplate from "@/hooks/custom/useProfileTemplate";

const ProfileTemplate = () => {
  const {
    postData,
    userData,
    fetchNextPage,
    hasNextPage,
    isPostLoading,
    isUserLoading,
    onClickModal,
  } = useProfileTemplate();

  if (isUserLoading || isPostLoading) {
    <div>
      <Spinner isLoading={isUserLoading || isPostLoading} />
    </div>;
  }

  if (postData && userData) {
    return (
      <>
        <div className="w-full">
          <div className={classNames("pb-4")}>
            <ProfileBox user={userData} />
          </div>
          <div
            className={classNames("flex justify-center py-4 border-b-[1px]")}
          />
          <div>
            <InfiniteScroll
              hasMore={hasNextPage!}
              dataLength={postData?.pages.length as number}
              next={fetchNextPage}
              loader={hasNextPage === true ? <h4>loading...</h4> : null}
              hasChildren
            >
              {postData &&
                postData.pages.map((group) => {
                  if (group && group.length !== 0) {
                    return group.map((post) => {
                      return (
                        <Fragment key={post.id}>
                          <Post post={post}>
                            {post?.img && (
                              <PostImages
                                post={post}
                                onClickModal={() => {
                                  onClickModal(post.id);
                                }}
                              />
                            )}
                          </Post>
                        </Fragment>
                      );
                    });
                  }
                })}
            </InfiniteScroll>
          </div>
        </div>
      </>
    );
  }
};

export default ProfileTemplate;
