import { appDataSourceManager } from "@/config/AppDataSourceManager";
import { User } from "@/entities/User";
import { userService } from "@/services/User";
import { Request, Response } from "express";

class UserController {
  private userRepository = appDataSourceManager
    .getDataSource()
    .getRepository(User);

  public async createAvatarImage(req: Request, res: Response) {
    const file = req.file as Express.Multer.File;
    res.json({ image: file.filename });
  }

  public async createCoverImage(req: Request, res: Response) {
    const file = req.file as Express.Multer.File;
    res.json({ image: file.filename });
  }

  public async getUser(req: Request, res: Response) {
    res.status(200).send(req.user);
  }

  public async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.findById(id);
    res.status(200).send(user);
  }

  public async getUserByNick(req: Request, res: Response) {
    const { nick } = req.params;
    const user = await userService.findByNick(nick);
    res.status(200).send(user);
  }

  public async follow(req: Request, res: Response) {
    try {
      // parmas 에서 follow 할 User Id
      const { id } = req.params;

      // follow service 호출
      await userService.follow({
        followerId: id,
        followId: (req.user! as User).id,
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
        followerId: id,
        followId: (req.user! as User).id,
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

  public async updateProfile(req: Request, res: Response) {
    try {
      const { nick, avatar, coverImage, coverLetter, userId } = req.body;
      // const user = req.user as User;

      const queryUser = await userService.updateProfile({
        userId: userId,
        nick,
        avatar,
        coverImage,
        coverLetter,
      });

      res.status(201).send(queryUser);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  public async getRepository() {
    return this.userRepository;
  }
}

export const userController = new UserController();
