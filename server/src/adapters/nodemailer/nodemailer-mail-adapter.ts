import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

//email
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body}: SendMailData) {
    //enviar email
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Felipe Sineider <sineider@gmail.com>',
      subject,
      html: body,
    });
  }
}