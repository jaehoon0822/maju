// express app
import { app } from "./app";
import { appDataSourceManager } from "./config/AppDataSourceManager";

// startUp 을 사용하여 app 과 분리
const startUp = async () => {
  // DataSource 를 초기화하며, 성공하면
  // app.listen 활성화
  await appDataSourceManager.getDataSource().initialize();
  console.log("DB 초기화 성공!!!!");
  app.listen(app.get("PORT"), () =>
    console.log(`Server is running port ${app.get("PORT")}`)
  );
};

// server 실행
startUp();
