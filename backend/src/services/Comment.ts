import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { Comment } from "@/entities/Comment";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";
import { ConflictError } from "@/errors/Conflict-error";

export class CommentService {
  public commentRepo = appDataSourceManager
    .getDataSource()
    .getRepository(Comment);

  public async findByCommentId(params: { commentId: Comment["id"] }) {
    const { commentId } = params;
    const comment = await this.commentRepo
      .createQueryBuilder("comment")
      .innerJoinAndSelect("comment.post", "postId")
      .innerJoinAndSelect("comment.user", "userId")
      .where("comment.id = :commentId", { commentId })
      .getOne();
    return comment;
  }

  public async findByPostId(params: {
    postId: Post["id"];
    lastId?: Comment["id"];
    limit: number;
  }) {
    const { postId, lastId, limit } = params;
    const commentQueryBuilder = this.commentRepo
      .createQueryBuilder("comment")
      .innerJoinAndSelect("comment.post", "postId")
      .innerJoinAndSelect("comment.user", "userId")
      .where("comment.postId = :postId", { postId });

    if (lastId) {
      commentQueryBuilder.andWhere((qb) => {
        const sq = qb
          .subQuery()
          .from(Comment, "sub_comment")
          .select("sub_comment.createdAt")
          .where("sub_comment.id = :lastId", { lastId });

        return `comment.createAt = ${sq.getQuery()}`;
      });
    }

    const comments = await commentQueryBuilder
      .take(limit)
      .orderBy("comment.createdAt", "DESC")
      .getMany();

    return comments;
  }

  public async findByUserId(params: { userId: User["id"] }) {
    const { userId } = params;
    const comments = await this.commentRepo
      .createQueryBuilder("comment")
      .innerJoinAndSelect("comment.post", "postId")
      .innerJoinAndSelect("comment.user", "userId")
      .where("comment.userId = :userId", { userId })
      .orderBy("comment.createdAt", "DESC")
      .getMany();

    return comments;
  }

  public async createComment(params: {
    postId: Post["id"];
    userId: User["id"];
    content: Comment["content"];
  }) {
    const { postId, userId, content } = params;

    const insertResult = await this.commentRepo
      .createQueryBuilder()
      .insert()
      .into(Comment)
      .values([{ user: { id: userId }, post: { id: postId }, content }])
      .execute();

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

    const updateResult = await this.commentRepo
      .createQueryBuilder("comment")
      .update()
      .set({ content })
      .where("comment.id = :commentId", { commentId })
      .andWhere("comment.userId = :userId", { userId })
      .execute();

    if (updateResult.affected == 0) {
      throw new ConflictError("업데이트 되지 않았어요.");
    }

    const comment = await this.findByCommentId({
      commentId,
    });

    return comment;
  }

  public async deleteComment(params: { commentId: Comment["id"] }) {
    try {
      const { commentId } = params;
      const deleteResult = await this.commentRepo
        .createQueryBuilder("comment")
        .softDelete()
        .where("comment.id = :commentId", { commentId })
        .execute();

      console.log(JSON.stringify(deleteResult));

      return deleteResult;
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  public getCommentRepository() {
    return this.commentRepo;
  }
}

export const commentService = new CommentService();
