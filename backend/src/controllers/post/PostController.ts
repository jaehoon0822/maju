import { Request, Response } from "express";
import _, { difference } from "lodash";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";
import { ConflictError } from "@/errors/Conflict-error";
import { NotFoundError } from "@/errors/Not-found-error";
import { hashTagService } from "@/services/Hashtag";
import { postService } from "@/services/Post";
import { Hashtag } from "@/entities/Hashtag";
import { userService } from "@/services/User";

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
    const files = req.files as Express.Multer.File[];
    const fileNames = files?.map((file: Express.Multer.File) => {
      return `${file.filename}`;
    });
    res.json({ images: fileNames });
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
      const insertResult = await postService.createPost({
        content: req.body.content,
        img: req.body.img,
        user: req.user! as User,
      });

      // post id 를 통해 post 를 find
      const post = await postService.findById({
        // insertResult.identifiers[0].id === post id
        postId: insertResult.identifiers[0].id,
        userId: (req.user as User).id,
      });

      if (!post) {
        throw new NotFoundError("리소스를 찾을수 없습니다.");
      }

      // regexp 를 사용하여 hashtag match
      const regex = /#([^<>"\s]+)/g;
      const matches: string[] = req.body.content.match(regex);

      // hashtag 가 있다면
      if (matches) {
        const tags: string[] = Array.from(matches, (match) =>
          match !== "#3b83f6" ? match : ""
        ).filter((tag) => tag !== "");

        const hashtag = tags.filter((tag, idx) => tags.indexOf(tag) === idx);
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
        post.hashtag = result as Hashtag[];
        // 만든 post 를 db 에 적용
        await postService.getPostRepository().save(post!);
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
   * - id 를 사용하여 post 를 가져오는 controller
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  public async getPostById(req: Request, res: Response) {
    try {
      // postService 를 통해 user 를 찾는 service
      const post = await postService.findById({
        postId: req.params.id,
        userId: (req.user as User).id,
      });
      if (!post) {
        throw new NotFoundError("리소스를 찾을수 없습니다.");
      }
      // 성공해서 posts send
      return res.status(200).send(post);
    } catch (error) {
      // 예기치 못한 error 처리
      if (error instanceof Error) throw Error(error.message);
    }
  }

  /**
   * @remarks
   * - user id 의 모든 posts 가져오는 controller
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  public async getPostsByUserId(req: Request, res: Response) {
    try {
      // postService 를 통해 user 를 찾는 service
      const { id } = req.params;
      const { limit, lastId } = req.query;
      const user = await userService.findById(id);
      if (!user) {
        throw new NotFoundError("사용자를 찾을수 없습니다.");
      }

      const posts = await postService.findByUser({
        id: user.id,
        userId: (req.user as User).id,
        limit: Number(limit),
        lastId: lastId as string | undefined,
      });
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
    const { hashtag, limit, lastId } = req.query;
    // hashtag 가 없다면 Error 발생
    if (!hashtag) {
      throw new ConflictError("유효하지 않은 query 입니다.");
    }

    try {
      // hashtag 를
      const posts = await postService.findByHashtag({
        hashtagTitle: hashtag as string,
        limit: Number(limit),
        lastId: lastId as string,
        userId: (req.user as User).id,
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
  // followerPost 얻는 컨트롤러
  public async getFollowerPosts(req: Request, res: Response) {
    // path query 중 hashtag 를 가져온다
    const { limit, lastId } = req.query;

    try {
      // hashtag 를
      const posts = await postService.getFollowerPostByUser({
        limit: Number(limit),
        lastId: lastId as string,
        userId: (req.user as User).id,
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

  public async updatePost(
    req: Request<
      { id: string },
      null,
      { content: Post["content"]; img: string[] }
    >,
    res: Response
  ) {
    try {
      const { content, img } = req.body;
      const { id } = req.params;

      const post = await postService.findById({
        postId: id,
        userId: (req.user as User).id,
      });

      const regex = /#([^<>"\s]+)/g;
      const matches = req.body.content.match(regex);

      if (!post) {
        throw new ConflictError("존재하지 않은 포스트입니다.");
      }

      // hashtag 가 있다면
      if (matches) {
        const tags: string[] = Array.from(matches, (match) =>
          match !== "#3b83f6" ? match : ""
        ).filter((tag) => tag !== "");

        const newHashtag = _.map(tags, (tag) => tag.slice(1));
        const originalTags = post.hashtag.map((tag) => tag.title);

        if (difference(newHashtag, originalTags)) {
          const promisesPosts = originalTags.map(async (hashtagTitle) => {
            const hashtag = await hashTagService.findOneByTitle({
              title: hashtagTitle,
            });
            if (hashtag) {
              await hashTagService.deleteHashtag({
                hashtagId: hashtag?.id,
                postId: post.id,
              });
            }
          });
          await Promise.all(promisesPosts);
        }

        const hashtags = (
          await Promise.all(
            newHashtag.map(async (title) => {
              const hashtag = await hashTagService.findOrCreate({ title });
              if (hashtag) {
                return hashtag;
              }
              return [];
            })
          )
        ).flat();

        post.hashtag = hashtags;
      }
      post.content = content;
      await postService.getPostRepository().save(post);

      await postService.imageRepo
        .createQueryBuilder()
        .delete()
        .where("postId = :id", { id: post.id })
        .execute();

      if (img) {
        await postService.createPostImage({
          img,
          postId: post.id,
        });
      }

      res.status(201).send({ post });
    } catch (error) {
      // 예기치 못한 Error 발생
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  public async removePost(req: Request<{ id: Post["id"] }>, res: Response) {
    try {
      const { id } = req.params;
      const deletedResult = await postService.removePost({
        postId: id,
        userId: (req.user as User).id,
      });

      res.status(200).send(deletedResult);
    } catch (error) {
      // 예기치 못한 Error 발생
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
