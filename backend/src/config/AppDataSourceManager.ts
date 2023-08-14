import { DataSource, EntityMetadata } from "typeorm";
import { AppDataSource } from "./AppDatasource";

/**
 *
 * @remarks
 * - TypeORM 의 Singleton class 생성
 * @class
 * - Connection
 * @public
 *
 */
class AppDataSourceManager {
  /**
   * @remarks
   * - AppDataSOurceManager 의 instance
   */
  private static instance: AppDataSourceManager;
  /**
   * @remarks
   * - TypeORM 의 DataSource
   */
  private dataSource: DataSource = AppDataSource;

  /**
   * @remarks
   * - instance 생성이후 instance 반환하는 statinc method
   */
  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new AppDataSourceManager();
    }
    return this.instance;
  }

  getDataSource() {
    return this.dataSource;
  }
  /**
   * @remarks
   * - DB 접속을 끊음
   */
  async close() {
    await this.dataSource.destroy();
  }
  /**
   * @remarks
   * - DB 의 Entity( -- table -- )을 삭제
   * - 주 용도: testing 시 각 test 수행후 table 초기화처리
   * @example
   * // testing 실행이후 모든 table 삭제
   * global.afterEach(async () => {
   *  await connection.clear();
   * })
   */
  async clear() {
    // entity 의 metadata 들을 가져온다.
    const entities = this.dataSource.entityMetadatas;

    // truncate error 로 인해 forign key checks 제약조건을 해제
    await this.dataSource.query("SET FOREIGN_KEY_CHECKS = 0;");

    // entities 에서 각 entity 를 가져옴
    // truncate 전에 연관되어 있는 table 먼저 삭제
    for (const entity of entities) {
      // entity.relations 내부안의 table 간의 relation 객체를 가져온다.
      for (const relation of entity.relations) {
        // relation 의 타입이 many-to-many 인지 확인
        if (relation.relationType === "many-to-many") {
          // relation 의 joinTalbeName 이 있다면,
          if (relation.joinTableName) {
            // 해당 joinTableName 을 truncate
            await this.dataSource.query(
              `truncate table \`${relation.joinTableName}\``
            );
          }
        }
      }
    }

    // 각 entity 를 가져온다.
    for (const entity of entities) {
      // 해당 entity 의 이름을 사용하여 repository 화 시킴
      const repo = this.dataSource.getRepository(entity.name);
      // 해당 repository 를 clear 시켜 truncate 시킨다.
      await repo.clear();
    }

    // foreing key checks 제약조건 활성화
    await this.dataSource.query("SET FOREIGN_KEY_CHECKS = 1;");
  }
}

const appDataSourceManager = AppDataSourceManager.getInstance();

export { appDataSourceManager };
