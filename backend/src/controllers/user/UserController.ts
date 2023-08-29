import { JoinColumn } from "typeorm";
import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { User } from "@/entities/User";
import { userService } from "@/services/User";
import { Request, Response } from "express";

class UserController {
  private userRepository = appDataSourceManager
    .getDataSource()
    .getRepository(User);

  public async getUser(req: Request, res: Response) {
    res.status(200).send({ user: req.user });
  }

  public async follow(req: Request, res: Response) {
    try {
      // parmas 에서 follow 할 User Id
      const { id } = req.params;

      // follow service 호출
      await userService.follow({
        followId: id,
        followerId: (req.user! as User).id,
      });

      res.status(201).send("follow 되었습니다.");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  public async unfollow(req: Request, res: Response) {
    try {
      // params 에서 unfollow 할 User id
      const { id } = req.params;

      // unfollow service 호출
      const deletedResult = await userService.unFollow({
        followId: id,
        followerId: (req.user! as User).id,
      });

      res.status(201).send(deletedResult);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  public async getFollowers(req: Request, res: Response) {
    try {
      // unfollow service 호출
      const users = await userService.getFollowers({
        followId: (req.user! as User).id,
      });

      res.status(200).send(users);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  public async getFollowings(req: Request, res: Response) {
    try {
      // unfollow service 호출
      const users = await userService.getFollowings({
        followerId: (req.user! as User).id,
      });

      res.status(200).send(users);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  public async getRepository() {
    return this.userRepository;
  }
}

export const userController = new UserController();
