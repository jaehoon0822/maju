import React, { Fragment, memo, useEffect } from "react";
import classNames from "classnames";
import { Post } from "@/common/types/index.types";
import useQueryGetComments from "@/hooks/queries/useQueryGetComments";
import Comment from "../../Atoms/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../Atoms/Spinner";
import PageWrapper from "@/components/common/PageWrapper";

interface CommentProps {
  post: Post;
}

const Comments = ({ post }: CommentProps) => {
  // postId 를 사용하여 comment 의 정보가져오기
  const {
    data: commentsData,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useQueryGetComments({ postId: post.id });

  useEffect(() => {
    console.log(hasNextPage);
  });

  return (
    <div className={classNames("flex justify-center py-4 px-4 m-auto w-full")}>
      <div
        className={classNames(
          "relative flex w-full justify-start items-center pb-4"
        )}
      >
        <div className="w-full">
          {/* post 의 comments */}
          <div>
            <InfiniteScroll
              next={fetchNextPage}
              hasMore={hasNextPage as boolean}
              dataLength={(commentsData?.pages.length as number) ?? 0}
              scrollableTarget="commentModal"
              loader={
                hasNextPage === true ? (
                  <div
                    className={classNames(
                      "bg-white bg-opacity-50 relative w-full tm-10"
                    )}
                  >
                    <Spinner isLoading={isLoading} />
                  </div>
                ) : null
              }
              hasChildren
            >
              {commentsData &&
                commentsData.pages.map((group) => {
                  if (group && group.length !== 0) {
                    return group.map((comment) => {
                      return (
                        <Fragment key={comment.id}>
                          <PageWrapper>
                            <Comment comment={comment} />
                          </PageWrapper>
                        </Fragment>
                      );
                    });
                  }
                })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Comments);
