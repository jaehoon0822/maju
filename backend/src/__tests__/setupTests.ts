// Test 에서 사용될 connection 이행 객체

import { appDataSourceManager } from "@/config/AppDataSourceManager";

global.beforeAll(async () => {
  await appDataSourceManager.getDataSource().initialize();
});

global.afterEach(async () => {
  await appDataSourceManager.clear();
});

global.afterAll(async () => {
  await appDataSourceManager.close();
});
