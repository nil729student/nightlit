import nodemailer from "nodemailer";

export async function sendResetPasswordEmail(toEmail, resetUrl) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Netlight" <no-reply@yourapp.com>',
    to: toEmail,
    subject: "Restableix la teva contrasenya",
    html: `
      <p>Clika en el seguent linck per poder restaruar la contrasenya:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Si ha revut a quest email per equivocació el podeu ignorar.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}