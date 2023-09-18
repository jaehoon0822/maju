import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { Hashtag } from "@/entities/Hashtag";
import { Post } from "@/entities/Post";
import { InsertResult } from "typeorm";

// hashtag 서비스 클래스
class HashTagService {
  // hashtag repository
  private hashtagRepo = appDataSourceManager
    .getDataSource()
    .getRepository(Hashtag);

  // id 로 찾는 service
  public async findOneById(
    params: Pick<Hashtag, "id">
  ): Promise<null | Hashtag> {
    const hashtag = await this.getRepository()
      .createQueryBuilder("hashtag")
      .select("hashtag")
      .where("hashtag.id = :id", { id: params.id })
      .getOne();

    return hashtag;
  }

  // title 로 찾는 service
  public async findOneByTitle(params: Pick<Hashtag, "title">) {
    try {
      const hashtag = await this.getRepository()
        .createQueryBuilder("hashtag")
        .select("hashtag")
        .where("hashtag.title = :title", { title: params.title })
        .getOne();

      return hashtag;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  // hashatag 생성 service
  public async create(params: Pick<Hashtag, "title">): Promise<InsertResult> {
    const insertResult = await this.getRepository()
      .createQueryBuilder()
      .insert()
      .into("hashtag")
      .values(params)
      .execute();

    return insertResult;
  }

  // hashtag 를 find 하고 없으면 create 하는 service
  public async findOrCreate(params: Pick<Hashtag, "title">) {
    const hashtag = await this.findOneByTitle(params);
    if (!hashtag) {
      const insertResult = await this.create(params);
      const hashtag = await this.findOneById({
        id: insertResult.identifiers[0].id,
      });
      return hashtag;
    }
    return hashtag;
  }

  // post 에서 hashtag 제거
  public async deleteHashtag(params: {
    postId: Post["id"];
    hashtagId: Hashtag["id"];
  }) {
    try {
      await this.hashtagRepo
        .createQueryBuilder()
        .relation(Hashtag, "post")
        .of({ id: params.hashtagId })
        .remove({ id: params.postId });
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  // repository 를 반환하는 service
  public getRepository() {
    return this.hashtagRepo;
  }
}

export const hashTagService = new HashTagService();
