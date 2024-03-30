import { registerAs } from "@nestjs/config";
import { MailerOptions } from "@nestjs-modules/mailer";

export default registerAs("mailer",():MailerOptions=>({
  transport:{
    host:process.env.MAIL_HOST,
    port:465,
    auth:{
      user:process.env.MAIL_USER,
      pass:process.env.MAIL_PASS
    }
  }
}))