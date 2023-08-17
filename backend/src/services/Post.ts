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

    return post;
  }

  // repository 를 반환하는 service
  public getRepository() {
    return postRepo;
  }
}

export const postService = new PostService();
