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
import s3, { bucket, getSignedUrl } from "@/aws";
import {
  Bucket,
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
} from "@aws-sdk/client-s3";

/** @remarks post controller 클래스 */
export class PostController {
  /**
   * @remarks
   * - 이미지 presigned 서비스
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  public async presignedImage(req: Request, res: Response) {
    const { contentTypes } = req.body;
    const presignedData = await Promise.all(
      contentTypes.map(async (contentType: string) => {
        const imageKey = `${Date.valueOf()}.${contentType}`;
        const key = `post/raw/${imageKey}`;
        const presigned = await getSignedUrl({ key });
        return { imageKey, presigned };
      })
    );

    res.send(presignedData);
  }
  /**
   * @remarks
   * - 이미지 생성 서비스
   * @param req
   * - Express.Request
   * @param res
   * - Express.Response
   */
  public async createImage(req: Request, res: Response) {
    const files = req.files as Express.MulterS3.File[];
    const fileNames = files?.map((file: Express.MulterS3.File) => {
      return `${file.key.replace("post/raw/", "")}`;
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

  // post 업데이트
  public async updatePost(
    req: Request<
      { id: string },
      null,
      { content: Post["content"]; img: string[] }
    >,
    res: Response
  ) {
    try {
      // content 와 img 가져오기
      const { content, img } = req.body;
      // request 의 params id
      const { id } = req.params;
      // post 가져오기
      const post = await postService.findById({
        postId: id,
        userId: (req.user as User).id,
      });
      // #으로 시작하며 <,>,",\s(공백)을 제외한 모든 문자 일치
      const regex = /#([^<>"\s]+)/g;
      // match 되는 content 없는지 확인 (해시태그)
      const matches = req.body.content.match(regex);
      // post 가 있는지 확인
      if (!post) {
        throw new ConflictError("존재하지 않은 포스트입니다.");
      }

      // hashtag 가 있다면
      if (matches) {
        // 해시태그와 중복될수 있는 HAX 제거한, 해시태그 만 추출
        const tags: string[] = Array.from(matches, (match) =>
          match !== "#3b83f6" ? match : ""
        ).filter((tag) => tag !== "");
        // 추출된 해시태그에서 # 제거
        const newHashtag = _.map(tags, (tag) => tag.slice(1));
        // 기존 post 의 hashtag 를 가져옴
        const originalTags = post.hashtag.map((tag) => tag.title);
        // 기존 post 의 hashtag 와 새로운 해시태그가 틀리다면, 조건문 실행
        if (difference(newHashtag, originalTags)) {
          // 기존의 해시태그를 제거
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
        // 새로운 해시태그를 생성
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
        // 만들어진 hashtags 를 post 의 hashtag 에 할당
        post.hashtag = hashtags;
      }
      // post 에 변경된 content 할당
      post.content = content;
      // post 적용
      await postService.getPostRepository().save(post);
      // image 삭제를 위한 querybuilder
      const deleteImageQb = postService.imageRepo
        .createQueryBuilder()
        .delete()
        .where("postId = :id", { id: post.id });

      // body.img 의 length 가 0 보다 크면,
      // 해당 img 는 제외하고 삭제처리 하기 윈한 조건문
      if (img.length > 0) {
        deleteImageQb.andWhere("img NOT IN (:...img)", { img });
      }
      // delete 쿼리빌더 실행
      await deleteImageQb.execute();

      // S3 삭제를 위한 DeleteCommend 객체 생성
      const deleteS3ImageCommend = post.img.reduce(
        (input, key) => {
          // img 에 post 의 img 가 포함되면 기존의 input 반환
          if (img.includes(key.img)) return input;
          // 그렇지 않다면, Objects 에 Key 를 생성하여 push
          input.Delete?.Objects?.push({ Key: `post/raw/${key.img}` });
          // 변경된 input return
          return input;
        },
        // DeleteObjectsCommendInput 명령 객체
        {
          Bucket: bucket,
          Delete: {
            Objects: [] as Bucket,
          },
        } as DeleteObjectsCommandInput
      );

      // delteS3ImageCommend 의 Objects 객체의 length 가 0이 아니면,
      if (deleteS3ImageCommend?.Delete?.Objects?.length !== 0) {
        // s3 에 DeleteObjectsCommend 명령실행
        await s3.send(new DeleteObjectsCommand(deleteS3ImageCommend));
      }
      // img 가 있다면,
      if (img) {
        // 해당 img 가 있다면 찾고, 아니면 생성하는 service 실행
        await postService.createAndFindPostImage({
          img,
          postId: post.id,
        });
      }
      // 만들어진 post 반환
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
      const post = await postService.findById({
        postId: id,
        userId: (req.user as User).id,
      });

      if (post.img.length > 0) {
        const commendInput = post.img.reduce(
          (input, key) => {
            input.Delete?.Objects?.push({ Key: `post/raw/${key.img}` });
            input.Delete?.Objects?.push({ Key: `post/w348/${key.img}` });
            input.Delete?.Objects?.push({ Key: `post/w576/${key.img}` });
            input.Delete?.Objects?.push({ Key: `post/w960/${key.img}` });
            return input;
          },
          {
            Bucket: "maju-bucket",
            Delete: {
              Objects: [] as Bucket,
            },
          } as DeleteObjectsCommandInput
        );

        const s3DeletedResult = await s3.send(
          new DeleteObjectsCommand(commendInput)
        );
      }

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
