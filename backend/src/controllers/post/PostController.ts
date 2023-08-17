import { User } from "@/entities/User";
import { ConflictError } from "@/errors/conflict-error";
import { NotFoundError } from "@/errors/not-found-error";
import { hashTagService } from "@/services/Hashtag";
import { postService } from "@/services/Post";
import { Request, Response } from "express";

/** @remarks post controller 클래스 */
export class PostController {
  /**
   * @remarks
   * - 이미지 생성 서비스
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  public async createImage(req: Request, res: Response) {
    console.log(req.body);
    res.json({ url: `/img/${(req.file as Express.Multer.File).filename}` });
  }
  /**
   * @remarks
   * - Post 생성 서비스
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  public async createPost(req: Request, res: Response) {
    try {
      // post insert 하여 insertResult 를 받음
      const insertResult = await postService.create({
        content: req.body.content,
        img: req.body.url,
        user: req.user! as User,
      });
      // post id 를 통해 post 를 find
      const post = await postService.findById({
        // insertResult.identifiers[0].id === post id
        id: insertResult.identifiers[0].id,
      });

      if (!post) {
        throw new NotFoundError("리소스를 찾을수 없습니다.");
      }

      // regexp 를 사용하여 hashtag match
      const hashtag = req.body.content.match(/#[^\s]*/g);

      // hashtag 가 있다면
      if (hashtag) {
        // hashtag 를 가진 배열
        const result = await Promise.all(
          // hashtag 문자열에서 # 을 제외한 문자를 찾고, 없으면 생성
          hashtag.map((tag: string) => {
            return hashTagService.findOrCreate({
              title: tag.slice(1).toLowerCase(),
            });
          })
        );

        // post.hashtag 에서 만든 hashtag 할당
        // typeorm 특성상 hashtag 배열을 넣으면,
        // 알아서 hashtag.id, post.id 를 사용하여
        // 다대다 테이블 자동 생성
        post!.hashtag = result;
        // 만든 post 를 db 에 적용
        await postService.getRepository().save(post!);
      }
      // 성공해서 posts send
      return res.status(200).send(post);
    } catch (error) {
      // 예기치 못한 error 처리
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  /**
   * @remarks
   * - 현재 user 의 posts 가져오는 controller
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  public async getPosts(req: Request, res: Response) {
    try {
      // postService 를 통해 user 를 찾는 service
      const posts = await postService.findByUser({ user: req.user! as User });
      if (!posts) {
        throw new NotFoundError("리소스를 찾을수 없습니다.");
      }
      // 성공해서 posts send
      return res.status(200).send(posts);
    } catch (error) {
      // 예기치 못한 error 처리
      if (error instanceof Error) throw Error(error.message);
    }
  }

  /**
   * @rmarks
   * - Hashtags 를 찾는 Service
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  public async getHashtagPosts(req: Request, res: Response) {
    // path query 중 hashtag 를 가져온다
    const { hashtag } = req.query;
    // hashtag 가 없다면 Error 발생
    if (!hashtag) {
      throw new ConflictError("유효하지 않은 query 입니다.");
    }
    try {
      // hashtag 를
      const posts = await postService.findByHashtag({
        hashtagTitle: hashtag as string,
      });
      // hashtags 반환
      res.status(200).send(posts ?? []);
    } catch (error) {
      // 예기치 못한 Error 발생
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
