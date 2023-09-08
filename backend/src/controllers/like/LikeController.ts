import { User } from "@/entities/User";
import { likeService } from "@/services/Like";
import { Request, Response } from "express";
export class LikeController {
  /**
   * @remarks
   * - postId 를 받아 likes 의 user 를 전달해주는 로직
   * @param req
   * - Express.Request
   * @param res
   * - Express.Request
   */

  async getLikeUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const likeUsers = await likeService.findUserIdByPostId(id);
      return res.status(200).send(likeUsers || null);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }
  }
  /**
   * @remarks
   * - 좋아요 컨트롤러 로직
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  async addLike(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await likeService.addLike({
        postId: id,
        userId: (req.user as User).id,
      });

      res.status(201).send(result);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }
  /**
   * @remarks
   * - unlike 컨트롤러 로직
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  async unLike(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await likeService.unLike({
        postId: id,
        userId: (req.user as User).id,
      });

      res.status(201).send(result);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }
  /**
   * @remarks
   * - unlike 컨트롤러 로직
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  async getLikeCount(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await likeService.getLikeCount({
        id,
      });

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }
}

export const likeController = new LikeController();
