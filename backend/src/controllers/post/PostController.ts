import { User } from "@/entities/User";
import { hashTagService } from "@/services/Hashtag";
import { postService } from "@/services/Post";
import { Request, Response } from "express";

export class PostController {
  public async createImage(req: Request, res: Response) {
    console.log(req.body);
    res.json({ url: `/img/${(req.file as Express.Multer.File).filename}` });
  }
  public async createPost(req: Request, res: Response) {
    try {
      const insertResult = await postService.create({
        content: req.body.content,
        img: req.body.url,
        user: req.user! as User,
      });

      const post = await postService.findById({
        id: insertResult.identifiers[0].id,
      });

      console.log("----------post------------", post);
      const hashtag = req.body.content.match(/#[^\s]*/g);
      if (hashtag) {
        const result = await Promise.all(
          hashtag.map((tag: string) => {
            return hashTagService.findOrCreate({
              title: tag.slice(1).toLowerCase(),
            });
          })
        );
        post!.hashtag = result;
        await postService.getRepository().save(post!);
      }

      return res.status(200).send(post);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
}
