import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { Comment } from "@/entities/Comment";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";
import { ConflictError } from "@/errors/Conflict-error";

export class CommentService {
  public commentRepo = appDataSourceManager
    .getDataSource()
    .getRepository(Comment);

  // commentId 를 통해 찾는 서비스
  public async findByCommentId(params: {
    commentId: Comment["id"];
    hasDeleted?: boolean;
  }) {
    const { commentId, hasDeleted } = params;
    const commentQueryBuilder = await this.commentRepo
      .createQueryBuilder("comment")
      .innerJoinAndSelect("comment.post", "postId")
      .innerJoinAndSelect("comment.user", "userId")
      .where("comment.id = :commentId", { commentId });

    // 삭제된 id 를 쿼리하는지?
    if (hasDeleted) {
      commentQueryBuilder.where("comment.deletedAt IS NOT NULL");
    }

    const comment = commentQueryBuilder.getOne();
    return comment;
  }

  // postId 를 통해 찾는 서비스
  public async findByPostId(params: {
    postId: Post["id"];
    lastId?: Comment["id"];
    limit: number;
  }) {
    // limit, lastId 를 사용하여 take 제한
    const { postId, lastId, limit } = params;
    // postId 를 사용하여 comment query
    const commentQueryBuilder = this.commentRepo
      .createQueryBuilder("comment")
      .innerJoinAndSelect("comment.post", "post")
      .innerJoinAndSelect("comment.user", "user")
      .innerJoinAndSelect("user.profile", "profile")
      .where("comment.postId = :postId", { postId });
    // lastId 가 있다면,
    if (lastId) {
      // subquery 를 사용하여, 현재 lastId 의 createdAt 을 가져와
      // lastId 의 createdAt 이전의 comment 를 가져오도록하는 조건문
      commentQueryBuilder.andWhere((qb) => {
        const sq = qb
          .subQuery()
          .from(Comment, "sub_comment")
          .select("sub_comment.createdAt")
          .where("sub_comment.id = :lastId", { lastId });

        return `comment.createdAt < ${sq.getQuery()}`;
      });
    }
    // limit 을 설정하여, 해당 수만큼 쿼리하며, 내림차순으로 정렬
    const comments = await commentQueryBuilder
      .take(limit)
      .orderBy("comment.createdAt", "DESC")
      .getMany();

    return comments;
  }

  // userId 를 통해 찾는 서비스
  public async findByUserId(params: {
    userId: User["id"];
    lastId?: Comment["id"];
    limit: number;
  }) {
    const { userId, lastId, limit } = params;
    // userId 를 통해서 commnet query
    const commentsQueryBuilder = this.commentRepo
      .createQueryBuilder("comment")
      .innerJoinAndSelect("comment.post", "postId")
      .innerJoinAndSelect("comment.user", "userId")
      .where("comment.userId = :userId", { userId });

    // lastId 가 있다면
    if (lastId) {
      // subquery 를 사용하여, 현재 lastId 의 createdAt 을 가져와
      // lastId 의 createdAt 이전의 comment 를 가져오도록하는 조건문
      commentsQueryBuilder.where((qb) => {
        const sq = qb
          .subQuery()
          .select("coment.createdAt")
          .from(Comment, "comment")
          .where("comment.id = :lastId", { lastId });

        return `createdAt < ${sq.getQuery()}`;
      });
    }

    // limit 을 설정하여, 해당 수만큼 쿼리하며, 내림차순으로 정렬
    const comments = await commentsQueryBuilder
      .take(limit)
      .orderBy("comment.createdAt", "DESC")
      .getMany();

    return comments;
  }

  // comment 생성 서비스 로직
  public async createComment(params: {
    postId: Post["id"];
    userId: User["id"];
    content: Comment["content"];
  }) {
    const { postId, userId, content } = params;
    // insert into 를 사용하여 생성
    const insertResult = await this.commentRepo
      .createQueryBuilder()
      .insert()
      .into(Comment)
      .values([{ user: { id: userId }, post: { id: postId }, content }])
      .execute();

    // insertReulst 에 생성된 id 가 있는지 확인, 없다면 error
    if (!insertResult.generatedMaps[0].id) {
      throw new ConflictError("comment 생성 실패.");
    }
    // 생성된 insertResult 의 inedentifiers id 를 사용하여, comments 쿼리
    const comments = await this.findByCommentId({
      commentId: insertResult.identifiers[0].id,
    });

    return comments;
  }

  public async updateComment(params: {
    commentId: Comment["id"];
    userId: User["id"];
    content: Comment["content"];
  }) {
    const { commentId, userId, content } = params;
    // update 실행
    const updateResult = await this.commentRepo
      .createQueryBuilder("comment")
      .update()
      .set({ content })
      .where("comment.id = :commentId", { commentId })
      .andWhere("comment.userId = :userId", { userId })
      .execute();

    // affected 가 0이면 실패
    if (updateResult.affected == 0) {
      throw new ConflictError("업데이트 실패");
    }

    // 업데이트된 comment 쿼리
    const comment = await this.findByCommentId({
      commentId,
    });

    return comment;
  }

  // comment 삭제 서비스
  public async deleteComment(params: { commentId: Comment["id"] }) {
    try {
      const { commentId } = params;
      // 삭제
      const deleteResult = await this.commentRepo
        .createQueryBuilder("comment")
        .softDelete()
        .where("comment.id = :commentId", { commentId })
        .execute();

      // 적용된 결과가 없다면 에러 발생
      if (deleteResult.affected === 0) {
        throw new ConflictError("comment 삭제 실패");
      }

      // 삭제된 comment 쿼리
      const deletedComment = this.findByCommentId({
        commentId,
        hasDeleted: true,
      });

      // deleteResult 반환
      return deletedComment;
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  public getCommentRepository() {
    return this.commentRepo;
  }
}

export const commentService = new CommentService();
