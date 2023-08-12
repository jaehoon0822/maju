// express app
import { app } from "./app";
import { AppDataSource } from "./config/dataSource";

// startUp 을 사용하여 app 과 분리
const startUp = () => {
  // DataSource 를 초기화하며, 성공하면
  // app.listen 활성화
  AppDataSource.initialize()
    .then(() => {
      console.log("Data source has been initialized");
      app.listen(app.get("PORT"), () =>
        console.log(`Server is running port ${app.get("PORT")}`)
      );
    })
    .catch((err: Error) => {
      console.log("Error during Data Source initialization", err);
    });
};

// server 실행
startUp();
