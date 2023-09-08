import { User } from "@/entities/User";
import { ConflictError } from "@/errors/Conflict-error";
import { commentService } from "@/services/Comment";
import { Request, Response } from "express";

export class CommentController {
  // commnet 를 생성하는 service 로직
  public async createComment(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const comment = await commentService.createComment({
        content,
        postId,
        userId: (req.user as User).id,
      });

      res.status(201).send(comment);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  // commnet 를 commentId 로 찾는 service 로직
  public async findByCommentId(req: Request, res: Response) {
    try {
      const { commentId } = req.params;

      const comment = await commentService.findByCommentId({ commentId });

      if (!comment) {
        throw new ConflictError("댓글 를 찾을수 없어요.");
      }

      res.status(200).send(comment);
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  // commnet 를 userId 로 찾는 service 로직
  public async findByUserId(req: Request, res: Response) {
    try {
      const comments = await commentService.findByUserId({
        userId: (req.user as User).id,
      });

      if (!comments) {
        throw new ConflictError("댓글을 찾을수 없어요.");
      }

      res.status(200).send(comments);
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  // commnet 를 postId 로 찾는 service 로직
  public async findByPostId(req: Request, res: Response) {
    try {
      const { postId, limit, lastId } = req.params;
      const comments = await commentService.findByPostId({
        postId,
        limit: Number(limit),
        lastId,
      });

      if (!comments) {
        throw new ConflictError("댓글을 찾을수 없어요.");
      }

      res.status(200).send(comments);
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  // commnet 를 업데이트 service 로직
  public async updateComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const comment = await commentService.updateComment({
        commentId,
        content,
        userId: (req.user as User).id,
      });

      if (!comment) {
        throw new ConflictError("댓글을 업데이트되지 않았어요.");
      }

      res.status(200).send(comment);
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  // commnet 를 삭제하는 service 로직
  public async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;

      await commentService.deleteComment({
        commentId,
      });

      res.status(201).send("삭제되었습니다.");
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }
}

export const commentController = new CommentController();
