import nodemailer from "nodemailer";
import { transporter } from "../../../../config/nodeMailer";

interface EmailData {
  from: string;
  body: string;
}

export async function sendEmail(email: EmailData) {
  const result = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email.from, // list of receivers
    subject: "Hello ✔", // Subject line
    text: email.body, // plain text body
    html: email.body, // html body
  });

  console.log(result.messageId);
}
