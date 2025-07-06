import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.gmail,
      pass: process.env.app_pass,
    },
  });

  const mailOptions = {
    from: `"SKJAIN" <${process.env.gmail}>`,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
