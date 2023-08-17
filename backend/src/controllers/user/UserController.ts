import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { User } from "@/entities/User";
import { userService } from "@/services/User";
import { Request, Response } from "express";

class UserController {
  private userRepository = appDataSourceManager
    .getDataSource()
    .getRepository(User);

  public async follow(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await userService.follow({
        followId: id,
        followerId: (req.user! as User).id,
      });

      console.log("--------params.id---------", id);
      console.log("--------user.id---------", (req.user as User).id);

      res.status(201).send("follow 되었습니다.");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  public async getRepository() {
    return this.userRepository;
  }
}

export const userController = new UserController();
