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

export async function sendTop5ClubsEmail(clubs) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const clubList = clubs.map(club => `<li>${club.name} - ${club.votes} votes</li>`).join('');

  const mailOptions = {
    from: '"Netlight" <no-reply@yourapp.com>',
    to: toEmail,
    subject: 'Top 5 Clubs of the Week',
    html: `<h1>Top 5 Clubs of the Week</h1>
    <p>A quest son els clubs mes votats de la setmana!<p>
    <ul>${clubList}</ul>
    <p>Ens veiem la setmana queve!</p>`,
    
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('An error occurred while sending email:', error);
    throw error;
  }
}