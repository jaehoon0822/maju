import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { Likes } from "@/entities/Likes";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";

class LikeService {
  private likeRepo = appDataSourceManager.getDataSource().getRepository(Likes);

  /***
   *
   * @remarks
   * postId 로 likes 의 user 들을 찾는 서비스
   *
   * @param postId
   *
   * @returns Promise<Likes | null | undefined>
   *  - likes 를 반환 혹은 null or undefined 반환
   *
   */

  public async findUserIdByPostId(postId: Post["id"]) {
    try {
      const result = await this.likeRepo
        .createQueryBuilder("likes")
        .select("likes.user")
        .addSelect("likes.post")
        .where("likes.post = :postId", { postId })
        .getRawMany();

      return result;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  /***
   *
   * @remarks
   * likes 를 add 서비스
   *
   * @param postId
   *
   * @returns Promise<Likes | null | undefined>
   *  - likes 를 반환 혹은 null or undefined 반환
   *
   */

  public async addLike(params: { postId: Post["id"]; userId: User["id"] }) {
    try {
      // User 의 인스턴스 생성 과 userId 할당
      const user = new User();
      user.id = params.userId;

      // Post 의 인스턴스 생성 과 postId 할당
      const post = new Post();
      post.id = params.postId;

      // like 에 userId, postId 생성
      await this.likeRepo
        .createQueryBuilder("likes")
        .insert()
        .into(Likes)
        .values({ post: post, user: user })
        .orUpdate(["deletedAt"], ["null"])
        .execute();

      // like count
      const count = await this.getLikeCount({ id: params.postId });

      return count;
    } catch (error) {
      // 예기치 못한 error
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  /***
   *
   * @remarks
   * unlike 서비스
   *
   * @param postId
   *
   * @returns Promise<Likes | null | undefined>
   *  - likes 를 반환 혹은 null or undefined 반환
   *
   */

  public async unLike(params: { postId: Post["id"]; userId: User["id"] }) {
    try {
      // like 에서 해당 post 삭제
      await this.likeRepo
        .createQueryBuilder("likes")
        .softDelete()
        .where("likes.postId = :postId", { postId: params.postId })
        .andWhere("likes.userId = :userId", { userId: params.userId })
        .execute();

      // like 의 count
      const count = this.getLikeCount({ id: params.postId });
      return count;
    } catch (error) {
      // 예기치 못한 error
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  /***
   *
   * @remarks
   * like count 를 전달해주는 서비스
   *
   * @param postId
   *
   * @returns Promise<{ count: number }>
   *  - likes 를 반환 혹은 null or undefined 반환
   *
   */

  // like count
  public async getLikeCount(params: Pick<Post, "id">) {
    try {
      // 해당 post 의 count
      const count = await this.likeRepo
        .createQueryBuilder("likes")
        .select("COUNT(likes.post)", "count")
        .where("likes.post = :postId", { postId: params.id })
        .groupBy("likes.post")
        .getRawOne<{ count: number }>();

      return count || { count: 0 };
    } catch (error) {
      // 예기치 못한 error
      if (error instanceof Error) throw new Error(error.message);
    }
  }
}

export const likeService = new LikeService();
