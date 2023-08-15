import { DataSource, QueryRunner } from "typeorm";
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
  private queryRunner: QueryRunner = this.dataSource.createQueryRunner();

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
    if (this.queryRunner?.isTransactionActive) {
      await this.queryRunner.commitTransaction();
    }
    if (this.queryRunner) {
      await this.queryRunner.release();
    }
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }
  /**
   * @remarks
   * - DB 의 Entity( -- table -- )을 삭제
   * - 주 용도: testing 시 각 test 수행후 table 초기화처리
   * - transactionEntityManger 를 사용하려고 했으나
   *   모종의 이유로 처리가 안됨..
   * - 이보다 더 저수준으로 작동하는 queryRunner 로 수행
   *
   */

  async clear() {
    const queryRunner = appDataSourceManager
      .getDataSource()
      .createQueryRunner();
    try {
      await queryRunner.connect();
      const entities = appDataSourceManager.getDataSource().entityMetadatas;

      await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0;`);

      for (const entity of entities) {
        await queryRunner.startTransaction();
        await queryRunner.query(`TRUNCATE TABLE \`${entity.tableName}\`;`);
        await queryRunner.commitTransaction();
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await appDataSourceManager
        .getDataSource()
        .query(`SET FOREIGN_KEY_CHECKS=1;`);
      await queryRunner.release();
    }
  }
}

const appDataSourceManager = AppDataSourceManager.getInstance();

export { appDataSourceManager };
