import nodemailer from "nodemailer";

interface SendMailParmas {
  to: string;
  subject: string;
  html: string;
}

class MailSender {
  private transporter = nodemailer.createTransport({
    service: "Naver",
    host: "smtp.naver.com",
    port: 587,
    requireTLS: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  public async sendMail({ to, subject, html }: SendMailParmas) {
    try {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export const mailSender = new MailSender();
