import { AppDataSource } from "@/index";
import { User } from "@/entities/User";
import { UnauthorizedError } from "@/errors/unauthorized-error";

export const UserRepo = AppDataSource.getRepository(User);

class UserService {
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
