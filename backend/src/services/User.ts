import { AppDataSource } from "@/config/dataSource";
import { User } from "@/entities/User";
import { Repository } from "typeorm";

// TypeORM 의 repository 생성
export const UserRepo: Repository<User> = AppDataSource.getRepository(User);

// User 를 위한 서비스 로직을 가진 Class 생성
/** @public */
class UserService {
  /***
   *
   * @remarks
   * local email 로 user 를 찾는 서비스
   *
   * @param email
   * - User 의 email 티입인 string
   *
   * @returns Promise<User | null | undefined>
   *  - User 를 반환 혹은 null or undefined 반환
   *
   */

  public async findByEmail(email: User["email"]) {
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
   * local id 로 user 를 찾는 서비스
   *
   * @param id
   * - User 의 id 타입인 string
   *
   * @returns Promise<User | null | undefined>
   *  - User 를 반환 혹은 null or undefined 반환
   *
   */

  public async findById(id: User["id"]) {
    try {
      const result = await UserRepo.createQueryBuilder("user")
        .where("user.id = :id", { id })
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
   * kakao id 로 user 를 찾는 서비스
   *
   * @param UserParams
   * - id 를 가진 객체 Pick<UserParmas, 'id'>
   *
   * @returns Promise<User | null | undefined>
   *  - User 를 반환 혹은 null or undefined 반환
   *
   */

  public async findKakao(snsId: User["snsId"], provider: User["provider"]) {
    try {
      const result = await UserRepo.createQueryBuilder("user")
        .where("user.snsId = :snsId", { snsId })
        .andWhere("user.provider = :provider", { provider })
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
   * local user 를 생성하는 서비스
   *
   * @param Omit<User, "id" | "snsId" | "provider">[]
   * - UserParams 혹은 UserParams[] 중 하나
   * @param Omit<User, "id" | "snsId" | "provider">
   * - UserParams 혹은 UserParams[] 중 하나
   *
   * @returns Promise<InsertResult | null | undefined>
   *  - Promise 인 InsertResult 및 null, undeffined 반환
   *
   */
  public async create(
    parmas:
      | Omit<User, "id" | "snsId" | "provider">[]
      | Omit<User, "id" | "snsId" | "provider">
  ) {
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

  /***
   *
   * @remarks
   * kakao user 를 생성하는 서비스
   *
   * @param Omit<User, "id" | "snsId" | "provider">[]
   * - UserParams 혹은 UserParams[] 중 하나
   * @param Omit<User, "id" | "snsId" | "provider">
   * - UserParams 혹은 UserParams[] 중 하나
   *
   * @returns Promise<InsertResult | null | undefined>
   *  - Promise 인 InsertResult 및 null, undeffined 반환
   *
   */
  public async createKakao(
    parmas:
      | Pick<User, "snsId" | "provider">[]
      | Pick<User, "snsId" | "provider">
  ) {
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
