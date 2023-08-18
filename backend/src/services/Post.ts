import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { Likes } from "@/entities/Likes";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";

/***
 * @remarks PostService class 생성
 */

class PostService {
  // postRepo 생성
  postRepo = appDataSourceManager.getDataSource().getRepository(Post);
  // likeRepo 생성
  likesRepo = appDataSourceManager.getDataSource().getRepository(Likes);
  // post 생성 service
  public async createPost(params: Pick<Post, "content" | "img" | "user">) {
    const result = await this.postRepo
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values(params)
      .execute();

    // insert 한 posts 의 InsertResult 반환
    return result;
  }

  // remove post
  public async removePost(params: { postId: Post["id"]; userId: User["id"] }) {
    try {
      const deletedResult = await this.postRepo
        .createQueryBuilder("post")
        .softDelete()
        .where("post.id = :postId", { postId: params.postId })
        .andWhere("post.user_id = :userId", { userId: params.userId })
        .execute();

      return deletedResult;
    } catch (error) {
      // 예기치 못한 에러
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
  // id 로 post 를 찾는 service
  public async findById(params: Pick<Post, "id">) {
    const post = await this.postRepo
      .createQueryBuilder("post")
      .select("post")
      // 개인적으로 params만 사용해도 될것 같지만..
      // 어떤 이유인지 id 를 읽지 못해서 명시적으로 id 선언
      .where("post.id = :id", { id: params.id })
      .getOne();

    // 찾은 post 반환
    return post;
  }

  // post update service
  public async updateById(params: Pick<Post, "id" | "content" | "img">) {
    const post = await this.findById({ id: params.id });
  }

  // user 로 post 를 찾는 service
  public async findByUser(params: Pick<Post, "user">) {
    const posts = await this.postRepo
      .createQueryBuilder("post")
      .select("post")
      // db 상에서는 user_id 이지만, entity 상에서 user 를 받아서
      // 처리하므로, user 값을 할당
      .where("post.user = :user", { user: params.user.id })
      // 여러개의 값이 있을수 있으므로 getMany()
      .getMany();

    // 찾은 post 반환
    return posts;
  }

  // user 로 post 를 찾는 service
  public async findByHashtag(params: {
    hashtagTitle: Pick<Post, "hashtag">["hashtag"][0]["title"];
  }) {
    const posts = await this.postRepo
      .createQueryBuilder("post")
      .select([
        "post.createdAt as createdAt",
        "post.updatedAt as updatedAt",
        "post.deletedAt as deletedAt",
        "post.id as post_id",
        "post.content as content",
        "post.img as img",
      ])
      .addSelect([
        "user.id as user_id",
        "user.email as user_email",
        "user.nick as user_nick",
      ])
      .addSelect(["hashtag.id as hashtag_id", "hashtag.title as hashtag_title"])
      .innerJoin("post.hashtag", "hashtag")
      .innerJoin("post.user", "user")
      // db 상에서는 user_id 이지만, entity 상에서 hashtag 를 받아서
      // 처리하므로, hashtag 값을 할당
      .where("hashtag.title = :hashtag", { hashtag: params.hashtagTitle })
      // 여러개의 값이 있을수 있으므로 getMany()
      .getRawMany();

    // 찾은 post 반환
    return posts;
  }

  public async addLike(params: { postId: Post["id"]; userId: User["id"] }) {
    try {
      // User 의 인스턴스 생성 과 userId 할당
      const user = new User();
      user.id = params.userId;

      // Post 의 인스턴스 생성 과 postId 할당
      const post = new Post();
      post.id = params.postId;

      // like 에 userId, postId 생성
      await this.likesRepo
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

  public async unLike(params: { postId: Post["id"]; userId: User["id"] }) {
    try {
      // like 에서 해당 post 삭제
      await this.likesRepo
        .createQueryBuilder("likes")
        .softDelete()
        .where("likes.post_id = :postId", { postId: params.postId })
        .andWhere("likes.user_id = :userId", { userId: params.userId })
        .execute();

      // like 의 count
      const count = this.getLikeCount({ id: params.postId });
      return count;
    } catch (error) {
      // 예기치 못한 error
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  // like count
  public async getLikeCount(params: Pick<Post, "id">) {
    try {
      // 해당 post 의 count
      const count = await this.likesRepo
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

  // post repository 를 반환하는 service
  public getPostRepository() {
    return this.postRepo;
  }
  // like respository 를 반환하는 service
  public getLikeRepository() {
    return this.likesRepo;
  }
}

export const postService = new PostService();
