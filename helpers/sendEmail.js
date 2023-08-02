const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD: pass } = process.env;

const transporter = nodemailer.createTransport(
  {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "vlasenko_eo@meta.ua",
      pass,
    },
  },
  {
    from: "vlasenko_eo@meta.ua",
  }
);
const sendEmail = async (verifyEmail) => {
  await transporter.sendMail(verifyEmail);
  return true;
};

module.exports = sendEmail;
