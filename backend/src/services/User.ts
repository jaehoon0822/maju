import { AppDataSource } from "@/index";
import { User } from "@/entities/User";

// TypeORM 의 repository 생성
export const UserRepo = AppDataSource.getRepository(User);

// User 를 위한 서비스 로직을 가진 Class 생성
class UserService {
  /***
   *
   * @remarks
   * user 를 찾는 서비스
   *
   * @param email
   * - 첫번째 input 은 email
   *
   * @returns Promise<User | null | undefined>
   *  - User 를 반환 혹은 null or undefined 반환
   *
   */

  public async find(email: string) {
    try {
      const result = await UserRepo.createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne();

      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) throw new Error(error.message);
    }
  }
  /***
   *
   * @remarks
   * user 를 생성하는 서비스
   *
   * @param email
   * - 첫번째 input 은 string
   * @param password
   * - 두번째 input 은 string
   *
   * @returns Promise<InsertResult | null | undefined>
   *  - Promise 인 InsertResult 및 null, undeffined 반환
   *
   */
  public async create(email: string, password: string) {
    try {
      const result = await UserRepo.createQueryBuilder("user")
        .insert()
        .into(User)
        .values([{ email, password }])
        .execute();

      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) throw new Error(error.message);
    }
  }
}

export const userService = new UserService();
