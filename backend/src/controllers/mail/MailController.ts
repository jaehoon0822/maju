import { NotFoundError } from "@/errors/Not-found-error";
import { userService } from "@/services/User";
import { getRandCode } from "@/utilities/getRandCode";
import { mailSender } from "@/utilities/mailSander";
import { Request, Response } from "express";

class MailController {
  /**
   * @remarks
   * - mail 을 받아 인증코드를 전달해주는 로직
   * @param req
   * - Express.Request
   * @param res
   * - Express.Request
   */
  async postMail(req: Request, res: Response) {
    try {
      // 받은 email 확인
      const { email } = req.body;
      // email 이 가입된 회원에 있는지 확인
      const user = await userService.findByEmail(email);
      // user 가 존재하지 않는다면, error
      if (!user) {
        console.log("hi?");
        throw new NotFoundError("존재하지 않은 이메일입니다.");
      }

      // 인증코드 생성
      const token = getRandCode(111111, 999999);

      // NodeMailer 메일 보내기
      await mailSender.sendMail({
        to: user.email,
        subject: `안녕하세요 회원님. Maju 에서 검증코드를 보냈어요.`,
        html: `
        <div
          style="
            display: block;
            width: 50%;
            margin: 0 auto;
          " 
        >
          <div 
            style="
              text-align: center;
            "
          >
            <h1>${user.nick}님의 검증코드</h1>
          </div>
          <div>
            <h2>검증코드</h2>
            <div>${token}</div>
            <div><a href="http://localhost:3000/?modal=verifyCode">코드 검증하러 가기</a></div>
          </div>
        </div> 
      `,
      });

      res.send({
        data: { code: token, user_id: user.id },
        message: "메시지가 전송되었습니다.",
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export const mailController = new MailController();
