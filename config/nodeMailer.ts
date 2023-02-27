import "dotenv/config";

import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: 2525,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});
