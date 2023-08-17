import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { User } from "@/entities/User";

interface FollowParams {
  followId: User["id"];
  followerId: User["id"];
}

export const UserRepo = appDataSourceManager
  .getDataSource()
  .getRepository(User);

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
   * @param isPassword
   * - password 포함할지 안할지 결정할 boolean
   *
   * @returns Promise<User | null | undefined>
   *  - User 를 반환 혹은 null or undefined 반환
   *
   */

  public async findByEmail(email: User["email"], isPassword: boolean = false) {
    try {
      if (isPassword) {
        const result = await UserRepo.createQueryBuilder("user")
          .where("user.email = :email", { email })
          .getOne();

        return result;
      } else {
        const result = await UserRepo.createQueryBuilder("user")
          .select([
            "user.id",
            "user.email",
            "user.nick",
            "user.createdAt",
            "user.updatedAt",
            "user.deletedAt",
          ])
          .where("user.email = :email", { email })
          .getOne();

        return result;
      }
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
   * @param isPassword
   * - password 포함할지 안할지 결정할 boolean
   *
   * @returns Promise<User | null | undefined>
   *  - User 를 반환 혹은 null or undefined 반환
   *
   */

  public async findById(id: User["id"], isPassword: boolean = false) {
    try {
      if (isPassword) {
        const result = await UserRepo.createQueryBuilder("user")
          .where("user.id = :id", { id })
          .getOne();

        return result;
      } else {
        const result = await UserRepo.createQueryBuilder("user")
          .select([
            "user.id",
            "user.email",
            "user.nick",
            "user.createdAt",
            "user.updatedAt",
            "user.deletedAt",
          ])
          .where("user.id = :id", { id })
          .getOne();

        return result;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  /***
   *
   * @remarks
   * - kakao id 로 user 를 찾는 서비스
   * @param snsId
   * - User 의 kakao snsId
   * @param provider
   * - User 의 provider 종류
   * @param isPassword
   * - password 포함할지 안할지 결정할 boolean
   * @example
   * - kakao, google, facebook, twitter, naver...
   *
   * @returns Promise<User | null | undefined>
   *  - User 를 반환 혹은 null or undefined 반환
   *
   */

  public async findKakao(
    snsId: User["snsId"],
    provider: User["provider"],
    isPassword = false
  ) {
    try {
      if (isPassword) {
        const result = await UserRepo.createQueryBuilder("user")
          .where("user.snsId = :snsId", { snsId })
          .andWhere("user.provider = :provider", { provider })
          .getOne();

        return result;
      } else {
        const result = await UserRepo.createQueryBuilder("user")
          .select([
            "user.id",
            "user.email",
            "user.nick",
            "user.createdAt",
            "user.updatedAt",
            "user.deletedAt",
          ])
          .where("user.snsId = :snsId", { snsId })
          .andWhere("user.provider = :provider", { provider })
          .getOne();

        return result;
      }
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
   * @param Pick<User, "email" | "password" | "nick">[]
   * - email, passowrd, nick 을 가진 객체 배열
   * @param Pick<User, "email" | "password" | "nick">
   * - email, passowrd, nick 을 가진 객체
   *
   * @returns Promise<InsertResult | null | undefined>
   *  - Promise 인 InsertResult 및 null, undeffined 반환
   *
   */
  public async create(
    parmas:
      | Pick<User, "email" | "password" | "nick">[]
      | Pick<User, "email" | "password" | "nick">
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
   * @param - Pick\<User, "snsId" | "provider"\>
   * - Pick<User, "snsId" | "provider"> 혹은 Pick<User, "snsId" | "provider">[]
   * @param - Pick\<User, "snsId" | "provider"\>[]
   * - Pick<User, "snsId" | "provider"> 혹은 Pick<User, "snsId" | "provider">[]
   *
   * @returns Promise<InsertResult | null | undefined>
   *  - Promise 인 InsertResult 및 null, undeffined 반환
   *
   */
  public async createKakao(
    parmas:
      | Pick<User, "snsId" | "provider" | "email" | "nick">[]
      | Pick<User, "snsId" | "provider" | "email" | "nick">
  ) {
    try {
      const result = await UserRepo.createQueryBuilder("user")
        .insert()
        .into(User)
        .values(parmas)
        .execute();

      return result;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
  /***
   *
   * @remarks
   * Follow 에 등록하는 서비스
   *
   * @param params
   * - parmas: { followId: User['id'], followerId['id']}
   * - followId: 팔로우 아이디
   * - followerId: 팔로워 아이디
   *
   * @returns Promise\<void\>
   */
  public async follow(params: FollowParams) {
    try {
      // User 에 relation 된 follows 등록
      // 결과값이 Promise<void> 이므로 결과값을 받아서 반환하지 않음
      await UserRepo.createQueryBuilder()
        .relation(User, "follows")
        .of(params.followId)
        .add(params.followerId);
    } catch (error) {
      // 예기치 못한 에러처리
      if (error instanceof Error) throw new Error(error.message);
    }
  }
  /***
   *
   * @remarks
   * Follow 에 취소하는 서비스
   *
   * @param params
   * - parmas: FollowParams
   * - Interface FollowParams {
   *    followId: User['id],
   *    followerId: User['id']
   * }
   * - followId: 팔로우 아이디
   * - followerId: 팔로워 아이디
   *
   * @returns
   * - Promise\<void\>
   */
  public async UnFollow(params: FollowParams) {
    try {
      // User 에 relation 된 follows 제거
      // 결과값이 Promise<void> 이므로 결과값을 받아서 반환하지 않음
      await UserRepo.createQueryBuilder()
        .relation(User, "follows")
        .of(params.followId)
        .remove(params.followerId);
    } catch (error) {
      // 예기치 못한 에러처리
      if (error instanceof Error) throw new Error(error.message);
    }
  }
  public async followedUser(params: FollowParams) {}
}

export const userService = new UserService();
