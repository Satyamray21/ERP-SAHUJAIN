import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.gmail,
      pass: process.env.app_pass,
    },
  });

  const mailOptions = {
    from: `"SAHUJAIN" <${process.env.gmail}>`,
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
};
