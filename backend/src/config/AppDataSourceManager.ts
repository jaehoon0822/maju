import { DataSource, QueryRunner } from "typeorm";
import { AppDataSource } from "./AppDatasource";

class AppDataSourceManager {
  private static instance: AppDataSourceManager;
  private dataSource: DataSource = AppDataSource;
  private queryRunner: QueryRunner | null = null; // Initialize as null

  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new AppDataSourceManager();
    }
    return this.instance;
  }

  getDataSource() {
    return this.dataSource;
  }

  async connectQueryRunner() {
    if (!this.queryRunner) {
      this.queryRunner = this.dataSource.createQueryRunner();
      await this.queryRunner.connect();
    }
  }

  async closeQueryRunner() {
    if (this.queryRunner) {
      await this.queryRunner.release();
      this.queryRunner = null;
    }
  }

  async close() {
    await this.closeQueryRunner();
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }

  async clear() {
    try {
      await this.connectQueryRunner();
      const entities = this.dataSource.entityMetadatas;

      await this.queryRunner!.query(`SET FOREIGN_KEY_CHECKS=0;`);
      await this.queryRunner!.startTransaction();

      for (const entity of entities) {
        await this.queryRunner!.query(
          `TRUNCATE TABLE \`${entity.tableName}\`;`
        );
      }

      await this.queryRunner!.commitTransaction();
    } catch (err) {
      await this.queryRunner!.rollbackTransaction();
    } finally {
      await this.queryRunner!.query(`SET FOREIGN_KEY_CHECKS=1;`);
      await this.closeQueryRunner();
    }
  }
}

const appDataSourceManager = AppDataSourceManager.getInstance();

export { appDataSourceManager };
