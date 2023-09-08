import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { AppDataSource } from "@/config/AppDatasource";
import { Image } from "@/entities/Image";
import { Likes } from "@/entities/Likes";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";
import { raw } from "express";

/***
 * @remarks PostService class 생성
 */

class PostService {
  // postRepo 생성
  postRepo = appDataSourceManager.getDataSource().getRepository(Post);
  // likeRepo 생성
  likesRepo = appDataSourceManager.getDataSource().getRepository(Likes);
  // imageRepo 생성
  imageRepo = appDataSourceManager.getDataSource().getRepository(Image);
  // post 생성 service

  public async createPostImage(params: {
    img: Image["img"][];
    postId: Post["id"];
  }) {
    if (params.img && params.img.length !== 0) {
      const imagePromises = params.img.map(async (url) => {
        return await this.imageRepo
          .createQueryBuilder()
          .insert()
          .values({ img: url, post: { id: params.postId } })
          .execute();
      });
      return await Promise.all(imagePromises);
    }
  }

  public async createPost(
    params: Pick<Post, "content" | "user"> & { img: Image["img"][] }
  ) {
    // insert 한 posts 의 InsertResult 반환
    const result = await this.postRepo
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values({
        content: params.content,
        user: params.user,
      })
      .execute();

    this.createPostImage({ img: params.img, postId: result.identifiers[0].id });

    return result;
  }

  // remove post
  public async removePost(params: { postId: Post["id"]; userId: User["id"] }) {
    try {
      const deletedResult = await this.postRepo
        .createQueryBuilder("post")
        .softDelete()
        .where("post.id = :postId", { postId: params.postId })
        .andWhere("post.userId = :userId", { userId: params.userId })
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
      .innerJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("post.img", "image")
      .leftJoinAndSelect("post.likes", "likes")
      .leftJoinAndSelect("post.hashtag", "hashtag")
      // 개인적으로 params만 사용해도 될것 같지만..
      // 어떤 이유인지 id 를 읽지 못해서 명시적으로 id 선언
      .where("post.id = :id", { id: params.id })
      .orderBy("post.createdAt", "DESC")
      .getOne();

    // 찾은 post 반환
    return post;
  }

  // // post update service
  // public async updateById(params: Pick<Post, "id" | "content" | "img">) {
  //   const post = await this.findById({ id: params.id });
  // }

  // user 로 post 를 찾는 service
  public async findByUser(params: {
    userId: User["id"];
    limit: number;
    lastId: Post["id"] | undefined;
  }) {
    const postBuilder = this.postRepo
      .createQueryBuilder("post")
      .innerJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("post.img", "image")
      .leftJoinAndSelect("post.hashtag", "hashtag")
      .addSelect((qb) => {
        return qb
          .subQuery()
          .select("COUNT(likes.id)", "count")
          .from(Likes, "likes")
          .where("likes.postId = post.id");
      }, "likeCount")
      // db 상에서는 userId 이지만, entity 상에서 user 를 받아서
      // 처리하므로, user 값을 할당
      .where("post.user = :user", { user: params.userId });

    // lastId 가 있다면,
    if (params.lastId) {
      // lastId 의 createdAt 을 쿼리한후
      // 해당 createdAt 보다 작은 post 를 조건식으로 지정
      postBuilder.andWhere((qb) => {
        const sq = qb
          .subQuery()
          .select("sub_post.createdAt")
          .from("post", "sub_post")
          .where("sub_post.id = :lastId", { lastId: params.lastId });
        return `post.createdAt < ${sq.getQuery()}`;
      });
    }

    // 기존의 queryBuilder 에서 take 를 사용하여 limit 갯수를 지정
    // 이후 createdAt 을 사용하여 desc 로 내림차순으로 쿼리
    const rawPosts = await postBuilder
      .take(params.limit)
      .orderBy("post.createdAt", "DESC")
      .getRawAndEntities();

    const posts: (Post & { likeCount: number })[] = rawPosts.entities.map(
      (entity, idx) => {
        const post: any = entity;
        post.likeCount = rawPosts.raw[idx].likeCount;

        return post;
      }
    );

    console.log(posts);
    // 찾은 post 반환
    return posts;
  }

  // hashtag 로 post 를 찾는 service
  public async findByHashtag({
    hashtagTitle,
    limit,
    lastId,
  }: {
    hashtagTitle: string;
    limit: number;
    lastId?: User["id"];
  }) {
    const postBuilder = this.postRepo
      .createQueryBuilder("post")
      .select()
      .leftJoinAndSelect("post.img", "img")
      .innerJoinAndSelect("post.hashtag", "hashtag")
      .innerJoinAndSelect("post.user", "user")
      // db 상에서는 userId 이지만, entity 상에서 hashtag 를 받아서
      // 처리하므로, hashtag 값을 할당
      .where("hashtag.title = :hashtag", { hashtag: hashtagTitle });

    if (lastId) {
      postBuilder.andWhere((qb) => {
        const sq = qb
          .subQuery()
          .from("post", "sub_post")
          .select("createdAt")
          .where("sub_post.id = :lastId", { lastId: lastId });

        return `createdAt < ${sq.getQuery()}`;
      });
    }

    const posts = await postBuilder
      .take(limit)
      .orderBy("post.createdAt", "DESC")
      // 여러개의 값이 있을수 있으므로 getMany()
      .getRawMany();

    // 찾은 post 반환
    return posts;
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
