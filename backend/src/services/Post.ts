import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { Post } from "@/entities/Post";

interface Params extends Post {}

// postRepo 생성
const postRepo = appDataSourceManager.getDataSource().getRepository(Post);

/***
 * @remarks PostService class 생성
 */

class PostService {
  // post 생성 service
  public async create(params: Pick<Params, "content" | "img" | "user">) {
    const result = await postRepo
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values(params)
      .execute();

    // insert 한 posts 의 InsertResult 반환
    return result;
  }

  // id 로 post 를 찾는 service
  public async findById(params: Pick<Params, "id">) {
    const post = await postRepo
      .createQueryBuilder("post")
      .select("post")
      // 개인적으로 params만 사용해도 될것 같지만..
      // 어떤 이유인지 id 를 읽지 못해서 명시적으로 id 선언
      .where("post.id = :id", { id: params.id })
      .getOne();

    // 찾은 post 반환
    return post;
  }

  // user 로 post 를 찾는 service
  public async findByUser(params: Pick<Params, "user">) {
    const posts = await postRepo
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
    hashtagTitle: Pick<Params, "hashtag">["hashtag"][0]["title"];
  }) {
    const posts = await postRepo
      .createQueryBuilder("post")
      .innerJoin("post.hashtag", "hashtag")
      // db 상에서는 user_id 이지만, entity 상에서 hashtag 를 받아서
      // 처리하므로, hashtag 값을 할당
      .where("hashtag.title = :hashtag", { hashtag: params.hashtagTitle })
      // 여러개의 값이 있을수 있으므로 getMany()
      .getMany();

    // 찾은 post 반환
    return posts;
  }

  // repository 를 반환하는 service
  public getRepository() {
    return postRepo;
  }
}

export const postService = new PostService();
