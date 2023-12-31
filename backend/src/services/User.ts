import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { Follow } from "@/entities/Follow";
import { User } from "@/entities/User";
import { ConflictError } from "@/errors/Conflict-error";
import { Profile } from "@/entities/Profile";

interface FollowParams {
  followId: User["id"];
  followerId: User["id"];
}

// User 를 위한 서비스 로직을 가진 Class 생성 /** @public */
class UserService {
  private profileRepo = appDataSourceManager
    .getDataSource()
    .getRepository(Profile);
  private userRepo = appDataSourceManager.getDataSource().getRepository(User);
  private followRepo = appDataSourceManager
    .getDataSource()
    .getRepository(Follow);

  /***
   *
   * @remarks
   * local email 로 user 를 찾는 서비스
   *      const insertProfileRestul =
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
          .leftJoinAndSelect("user.profile", "profile")
          .leftJoinAndSelect("user.likes", "likes")
          .where("user.email = :email", { email })
          .addSelect("user.password")
          .getOne();

        return result;
      } else {
        const result = await this.userRepo
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.profile", "profile")
          .leftJoinAndSelect("user.likes", "likes")
          .where("user.email = :email", { email })
          .getOne();

        return result;
      }
    } catch (error) {
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
          .leftJoinAndSelect("user.profile", "profile")
          .leftJoinAndSelect("user.likes", "likes")
          .where("user.nick = :nick", { nick })
          .addSelect("user.password")
          .getOne();

        return result;
      } else {
        const result = await this.userRepo
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.profile", "profile")
          .leftJoinAndSelect("user.likes", "likes")
          .where("user.nick = :nick", { nick })
          .getOne();

        return result;
      }
    } catch (error) {
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
          .leftJoinAndSelect("user.profile", "profile")
          .leftJoinAndSelect("user.likes", "likes")
          .where("user.id = :id", { id })
          .addSelect("user.password")
          .getOne();

        return result;
      } else {
        const user = await this.userRepo
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.profile", "profile")
          .leftJoinAndSelect("user.likes", "likes")
          .where("user.id = :id", { id })
          .getOne();

        return user;
      }
    } catch (error) {
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

  public async findByProfileId(params: Pick<Profile, "id">) {
    try {
      const result = await this.userRepo
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.profile", "profile")
        .leftJoinAndSelect("user.likes", "likes")
        .where("user.profile = :id", params)
        .getOne();

      return result;
    } catch (error) {
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
          .leftJoinAndSelect("user.profile", "profile")
          .leftJoinAndSelect("user.likes", "likes")
          .where("user.snsId = :snsId", { snsId })
          .andWhere("user.provider = :provider", { provider })
          .addSelect("user.password")
          .getOne();

        return result;
      } else {
        const result = await this.userRepo
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.likes", "likes")
          .where("user.snsId = :snsId", { snsId })
          .andWhere("user.provider = :provider", { provider })
          .getOne();

        return result;
      }
    } catch (error) {
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
      const insertUserResult = await this.userRepo
        .createQueryBuilder("user")
        .insert()
        .into(User)
        .values(parmas)
        .execute();

      const user = await this.createProfile({
        userId: insertUserResult.generatedMaps[0].id,
      });

      return user;
    } catch (error) {
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
      const profileInsertResult = await this.profileRepo
        .createQueryBuilder("profile")
        .insert()
        .into(Profile)
        .values({})
        .execute();
      const result = await this.userRepo
        .createQueryBuilder("user")
        .insert()
        .into(User)
        .values({
          ...parmas,
          profile: { id: profileInsertResult.generatedMaps[0].id },
        })
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
      const { followId, followerId } = params;
      if (followId === followerId) {
        throw new ConflictError("유효한 유저가 아닙니다.");
      }

      // insert 쿼리 실행
      const insertResult = await this.followRepo
        .createQueryBuilder()
        .insert()
        .into(Follow)
        .values({ follower: { id: followerId }, following: { id: followId } })
        .orUpdate(["deletedAt"], ["null"])
        .execute();

      // 만약 생성된 id 가 없다면, error
      if (!insertResult.generatedMaps[0].id) {
        throw new ConflictError("follow 생성 실패");
      }

      const follower = this.findById;

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
        .where("following = :followingId", { followingId: params.followId })
        .andWhere("follower = :followerId", { followerId: params.followerId })
        .execute();

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
          "fw.followerId",
          "followerUser.email as followerEmail",
          "followerUser.nick as followerNick",
          "fw.createdAt as createdAt",
          "fw.updatedAt as updatedAt",
          "fw.deletedAt as deletedAt",
        ])
        .innerJoin(User, "followingUser", "followingUser.id = fw.followingId")
        .innerJoin(User, "followerUser", "followerUser.id = fw.followerId")
        .where("fw.followingId = :followingId", {
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
          "fw.followingId",
          "followingUser.email as followingEmail",
          "followingUser.nick as followingNick",
          "fw.createdAt as createdAt",
          "fw.updatedAt as updatedAt",
          "fw.deletedAt as deletedAt",
        ])
        .innerJoin(User, "followingUser", "followingUser.id = fw.followingId")
        .innerJoin(User, "followerUser", "followerUser.id = fw.followerId")
        .where("fw.followerId = :id", { id: params.followerId })
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
  public async putUserNick(params: Pick<User, "id" | "nick">) {
    try {
      const updateResult = await this.userRepo
        .createQueryBuilder()
        .update()
        .set({ nick: params.nick })
        .where("id = :id", { id: params.id })
        .execute();

      if (updateResult.affected === 0) {
        throw new ConflictError("업데이트에 실패했습니다.");
      }

      const user = await this.findById(params.id);

      if (!user) {
        throw new ConflictError("존재하지 않은 user 입니다.");
      }

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  public async createProfile(
    params: Partial<Omit<Profile, "id">> & { userId: User["id"] }
  ) {
    try {
      // insert
      const insertResult = await this.profileRepo
        .createQueryBuilder()
        .insert()
        .into(Profile)
        .values({
          avatar: params.avatar,
          coverImage: params.coverImage,
          coverLetter: params.coverLetter,
        })
        .execute();

      // user 에 profile 없데이트
      const updateResult = await this.userRepo
        .createQueryBuilder("user")
        .update()
        .set({
          profile: { id: insertResult.identifiers[0].id },
        })
        .where("user.id = :userId", { userId: params.userId })
        .execute();

      // update 되었는지 확인, 적용안되면 error
      if (updateResult.affected === 0) {
        throw new ConflictError("프로필 업데이트에 실패했습니다.");
      }

      // userid 를 사용하여 user 검색
      const user = await this.findById(params.userId);

      // user 반환
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  public async updateProfile(
    params: Partial<Omit<Profile, "id">> & {
      userId: User["id"];
      nick?: User["nick"];
    }
  ) {
    try {
      // updateData 와 id 를 분리
      const { userId, nick, ...updateData } = params;
      // user query
      const user = await this.findById(userId);
      // profile 업데이트
      const updateProfileResult = await this.profileRepo
        .createQueryBuilder()
        .update()
        .set(updateData)
        .where("id = :id ", { id: user?.profile.id })
        .execute();

      // updateResult 에 적용되지 않았을때,
      if (updateProfileResult.affected === 0) {
        throw new ConflictError("프로필 업데이트에 실패했습니다.");
      }

      // user 가 없다면, 에러
      if (!user) {
        throw new ConflictError("존재하지 않은 user 입니다.");
      }

      // user 반환
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  public getUserRepository() {
    return this.userRepo;
  }

  public getFollowRepository() {
    return this.followRepo;
  }

  public getProfileRepository() {
    return this.profileRepo;
  }
}

export const userService = new UserService();
