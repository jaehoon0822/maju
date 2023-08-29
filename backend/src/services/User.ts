import { v4 as uuidv4 } from "uuid";
import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { Follow } from "@/entities/Follow";
import { User } from "@/entities/User";
import { ConflictError } from "@/errors/Conflict-error";
import { param } from "express-validator";

interface FollowParams {
  followId: User["id"];
  followerId: User["id"];
}

// User 를 위한 서비스 로직을 가진 Class 생성 /** @public */
class UserService {
  private userRepo = appDataSourceManager.getDataSource().getRepository(User);
  private followRepo = appDataSourceManager
    .getDataSource()
    .getRepository(Follow);

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
        const result = await this.userRepo
          .createQueryBuilder("user")
          .where("user.email = :email", { email })
          .getOne();

        return result;
      } else {
        const result = await this.userRepo
          .createQueryBuilder("user")
          .select([
            "user.id",
            "user.email",
            "user.nick",
            "user.img",
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
   * local nick 로 user 를 찾는 서비스
   *
   * @param nick
   * - User 의 nick 티입인 string
   * @param isPassword
   * - password 포함할지 안할지 결정할 boolean
   *
   * @returns Promise<User | null | undefined>
   *  - User 를 반환 혹은 null or undefined 반환
   *
   */

  public async findByNick(nick: User["nick"], isPassword: boolean = false) {
    try {
      if (isPassword) {
        const result = await this.userRepo
          .createQueryBuilder("user")
          .where("user.nick = :nick", { nick })
          .getOne();

        return result;
      } else {
        const result = await this.userRepo
          .createQueryBuilder("user")
          .select([
            "user.id",
            "user.email",
            "user.nick",
            "user.img",
            "user.createdAt",
            "user.updatedAt",
            "user.deletedAt",
          ])
          .where("user.nick = :nick", { nick })
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
        const result = await this.userRepo
          .createQueryBuilder("user")
          .where("user.id = :id", { id })
          .getOne();

        return result;
      } else {
        const result = await this.userRepo
          .createQueryBuilder("user")
          .select([
            "user.id",
            "user.email",
            "user.nick",
            "user.img",
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

  public async findByIdWithFollow(id: User["id"]) {
    try {
      const result = await this.userRepo
        .createQueryBuilder("user")
        .select([
          "user.id",
          "user.email",
          "user.nick",
          "user.img",
          "user.createdAt",
          "user.updatedAt",
          "user.deletedAt",
          "follower.follower",
          "following.following",
        ])
        .where("user.id = :id", { id })
        .leftJoinAndSelect("user.followers", "follower")
        .leftJoinAndSelect("user.followings", "following")
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
        const result = await this.userRepo
          .createQueryBuilder("user")
          .where("user.snsId = :snsId", { snsId })
          .andWhere("user.provider = :provider", { provider })
          .getOne();

        return result;
      } else {
        const result = await this.userRepo
          .createQueryBuilder("user")
          .select([
            "user.id",
            "user.email",
            "user.nick",
            "user.img",
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
      const result = await this.userRepo
        .createQueryBuilder("user")
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
      const result = await this.userRepo
        .createQueryBuilder("user")
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
      if (params.followId === params.followerId) {
        throw new ConflictError("유효한 유저가 아닙니다.");
      }

      const query = `
        INSERT INTO follow (id, following_id, follower_id, deletedAt) 
        VALUES (?, ?, ?, null)
        ON DUPLICATE KEY UPDATE deletedAt = NULL
      `;

      // follow 테이블에 follwer, follwing insert
      const insertResult = await this.followRepo.query(query, [
        uuidv4(),
        params.followId,
        params.followerId,
      ]);

      // insertResult 반환
      return insertResult;
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
  public async unFollow(params: FollowParams) {
    try {
      // unfollow 서비스 호출
      const deletedResult = await this.followRepo
        .createQueryBuilder("follow")
        .softDelete()
        .where("following = :following_id", { following_id: params.followId })
        .andWhere("follower = :follower_id", { follower_id: params.followerId })
        .execute();

      // console.log(deletedResult);

      return deletedResult;
    } catch (error) {
      // 예기치 못한 에러처리
      if (error instanceof Error) throw new Error(error.message);
    }
  }
  /***
   *
   * @remarks
   * Follower 를 query 하는 서비스
   *
   * @param params
   * - parmas: Pick<FollowParams, "followId">
   * - followId: 팔로우 아이디
   *
   * @returns
   * - Promise\<User[]\>
   */
  public async getFollowers(params: Pick<FollowParams, "followId">) {
    try {
      // following 유저에서 follower 유저를 쿼리
      const followers = await this.getFollowRepository()
        .createQueryBuilder("fw")
        .select([
          "fw.follower_id",
          "followerUser.email as follower_email",
          "followerUser.nick as follower_nick",
          "fw.createdAt as createdAt",
          "fw.updatedAt as updatedAt",
          "fw.deletedAt as deletedAt",
        ])
        .innerJoin(User, "followingUser", "followingUser.id = fw.following_id")
        .innerJoin(User, "followerUser", "followerUser.id = fw.follower_id")
        .where("fw.following_id = :followingId", {
          followingId: params.followId,
        })
        .getRawMany();

      return followers;
    } catch (error) {
      // 예기치 못한 에러처리
      if (error instanceof Error) throw new Error(error.message);
    }
  }
  /***
   *
   * @remarks
   * Follower 를 query 하는 서비스
   *
   * @param params
   * - parmas: Pick<FollowParams, "followId">
   * - followId: 팔로우 아이디
   *
   * @returns
   * - Promise\<User[]\>
   */
  public async getFollowings(params: Pick<FollowParams, "followerId">) {
    try {
      // User 에 relation 된 follower 를 쿼리
      const followings = await this.followRepo
        .createQueryBuilder("fw")
        .select([
          "fw.following_id",
          "followingUser.email as following_email",
          "followingUser.nick as following_nick",
          "fw.createdAt as createdAt",
          "fw.updatedAt as updatedAt",
          "fw.deletedAt as deletedAt",
        ])
        .innerJoin(User, "followingUser", "followingUser.id = fw.following_id")
        .innerJoin(User, "followerUser", "followerUser.id = fw.follower_id")
        .where("fw.follower_id = :id", { id: params.followerId })
        .getRawMany();

      return followings;
    } catch (error) {
      // 예기치 못한 에러처리
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  public async changePassword(params: Pick<User, "password" | "id">) {
    try {
      const result = await this.userRepo
        .createQueryBuilder()
        .update()
        .set({
          password: params.password,
        })
        .where({
          id: params.id,
        })
        .execute();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  public getUserRepository() {
    return this.userRepo;
  }

  public getFollowRepository() {
    return this.followRepo;
  }
}

export const userService = new UserService();
