import { app } from "@/app";
import request from "supertest";

describe("[POST] /auth/signup/", () => {
  it("Signup 시 데이터 없이 Request", async () => {
    await request(app).post("/auth/signup").send({}).expect(400);
  });
});
