import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { Hashtag } from "@/entities/Hashtag";
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
  public async findOneByTitle(
    params: Pick<Hashtag, "title">
  ): Promise<null | Hashtag> {
    const hashtag = await this.getRepository()
      .createQueryBuilder("hashtag")
      .select("hashtag")
      .where("hashtag.title = :title", { title: params.title })
      .getOne();

    return hashtag;
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
    console.log("--------outer-------", hashtag);
    if (!hashtag) {
      const insertResult = await this.create(params);
      console.log("--------inner-------", insertResult);
      const hashtag = await this.findOneById({
        id: insertResult.identifiers[0].id,
      });
      console.log("--------inner-------", hashtag);
      return hashtag;
    }
    return hashtag;
  }

  // repository 를 반환하는 service
  public getRepository() {
    return this.hashtagRepo;
  }
}

export const hashTagService = new HashTagService();
