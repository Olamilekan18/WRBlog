import nodemailer from 'nodemailer';

// Configure your email service (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendPasswordChangedEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Password Changed Successfully',
    text: 'Your password has been updated successfully. If this was not you, please secure your account.',
  };

  await transporter.sendMail(mailOptions);
};