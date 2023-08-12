import { AppDataSource } from "@/config/dataSource";
import { User } from "@/entities/User";

/**
 *  @remarks
 *  - 공통적으로 사용될 UserParams Interface
 */
interface UserParams {
  email: string;
  password: string;
  nick: string;
}

// TypeORM 의 repository 생성
export const UserRepo = AppDataSource.getRepository(User);

// User 를 위한 서비스 로직을 가진 Class 생성
/** @public */
class UserService {
  /***
   *
   * @remarks
   * user 를 찾는 서비스
   *
   * @param params
   * - email 을 가진 객체 Pick<UserParmas, 'email'>
   * @example
   * - params = { email: string }
   *
   * @returns Promise<User | null | undefined>
   *  - User 를 반환 혹은 null or undefined 반환
   *
   */

  public async find({ email }: Pick<UserParams, "email">) {
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
   * @param Params[]
   * - Params 혹은 Params[] 중 하나
   * @param Params
   * - Params 혹은 Params[] 중 하나
   *
   * @returns Promise<InsertResult | null | undefined>
   *  - Promise 인 InsertResult 및 null, undeffined 반환
   *
   */
  public async create(parmas: UserParams[] | UserParams) {
    try {
      const result = await UserRepo.createQueryBuilder("user")
        .insert()
        .into(User)
        .values(parmas)
        .execute();

      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) throw new Error(error.message);
    }
  }
}

export const userService = new UserService();
