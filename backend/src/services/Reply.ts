import { AppDataSource } from "@/config/AppDatasource";
import { Comment } from "@/entities/Comment";
import { Reply } from "@/entities/Reply";
import { ConflictError } from "@/errors/Conflict-error";

export class ReplyService {
  private replyRepo = AppDataSource.getRepository(Reply);

  // Reply 를 생성하는 서비스
  public async createReply(params: {
    content: Reply["content"];
    commentId: Comment["id"];
  }) {
    const { content, commentId } = params;

    // reply 생성
    const inserteResult = await this.replyRepo
      .createQueryBuilder("reply")
      .insert()
      .into(Reply)
      .values({ content, comment: { id: commentId } })
      .execute();

    // 생성된 reply id 를 사용하여, 해당 reply 쿼리
    const reply = await this.replyRepo
      .createQueryBuilder("reply")
      .where("replay.id = :replyId", {
        replyId: inserteResult.generatedMaps[0].id,
      })
      .getOne();

    // reply 가 없다면, 409 에러 발새아
    if (!reply) {
      throw new ConflictError("reply 가 생성되지 않았어요.");
    }

    // reply 반환
    return reply;
  }

  // replyId 로 reply 를 찾는 서비스
  public async findByReply(parmas: { replyId: Reply["id"] }) {
    try {
      const { replyId } = parmas;

      // replyId 를 가진 reply 쿼리
      const reply = await this.replyRepo
        .createQueryBuilder("reply")
        .where("reply.id = :replyId", { replyId })
        .getOne();

      // 없다면 , 409 에러 발생
      if (!reply) {
        throw new ConflictError("해당하는 reply 가 존재하지 않아요.");
      }

      // 해당하는 reply 반환
      return reply;
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  // replyId 로 삭제된 reply 를 찾는 서비스
  public async findByDeletedReply(parmas: { replyId: Reply["id"] }) {
    try {
      const { replyId } = parmas;

      // 삭제된 reply 쿼리
      const reply = await this.replyRepo
        .createQueryBuilder("reply")
        .where("reply.id = :replyId", { replyId })
        .andWhere("deletedAt IS NOT NULL")
        .getOne();

      // 없다면 , 409 에러 발생
      if (!reply) {
        throw new ConflictError("해당하는 reply 가 존재하지 않아요.");
      }

      // 해당하는 reply 반환
      return reply;
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  // commentId 로 reply 를 찾는 서비스
  public async findByCommentId(parmas: {
    commentId: Comment["id"];
    limit: number;
    lastId?: Reply["id"];
  }) {
    try {
      const { commentId, limit, lastId } = parmas;

      // commentId 를 사용하여 모든 reply 들을 찾음
      const replyBuiler = await this.replyRepo
        .createQueryBuilder("reply")
        .where("reply.commentId = :commentId", { commentId });
      // lastId 가 있다면, lastId 이후의 reply 를 검색하도록
      // 쿼리
      if (lastId) {
        replyBuiler.andWhere((qb) => {
          const sq = qb
            .subQuery()
            .from(Reply, "sub_reply")
            .select("sub_reply.createdAt")
            .where("sub_reply.id = :lastId", { lastId });

          return `createdAt < ${sq.getQuery()}`;
        });
      }

      // limit 의 수만큼 replys 를 받음
      const replys = await replyBuiler
        .take(limit)
        .orderBy("createdAt", "DESC")
        .getMany();

      // replys 가 없다면, 409 에러 발생
      if (!replys) {
        throw new ConflictError("replys 가 없습니다.");
      }

      // comment 의 reply 들 반환
      return replys;
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  // reply 를 업데이트 하는 서비스
  public async updateReply(params: {
    replyId: Reply["id"];
    content: Reply["content"];
  }) {
    try {
      const { replyId, content } = params;

      // 업데이트 로직
      const updateResult = await this.replyRepo
        .createQueryBuilder("reply")
        .update(Reply)
        .set({ content })
        .where("reply.id = :replyId", { replyId })
        .execute();

      // affected 되지 않았다면, 409 에러 발생
      if (updateResult.affected == 0) {
        throw new ConflictError("업데이트 되지 않았어요.");
      }

      // updated 된 replyId 를 사용하여 reply 를 찾는 로직
      const reply = this.findByReply({
        replyId: updateResult.generatedMaps[0].id,
      });

      // 업데이트된 reply 반환
      return reply;
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  // reply 를 삭제 하는 서비스
  public async deleteReply(params: { replyId: Reply["id"] }) {
    try {
      const { replyId } = params;

      // result 를 삭제
      const deleteResult = await this.replyRepo
        .createQueryBuilder("reply")
        .softDelete()
        .where("reply.id = :replyId", { replyId })
        .execute();

      // affected 되지 않았다면, 409 에러 발생
      if (deleteResult.affected == 0) {
        throw new ConflictError("reply 삭제가 되지 않았어요.");
      }

      // 삭제된 reply 를 가져오는 로직
      const deletedReply = await this.findByDeletedReply({ replyId });

      // 삭제된 reply 리턴
      return deletedReply;
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  public getReplyRepository() {
    return this.replyRepo;
  }
}

export const replyService = new ReplyService();
