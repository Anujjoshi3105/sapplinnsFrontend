import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SERVER_MAIL,
    pass: process.env.SERVER_PASS,
  },
});

// Email sent to the admin team (Sapplinns)
export const sendToAdmin = (name: string, email: string, msg: string) => {
  const mailOptions = {
    from: process.env.SERVER_MAIL,
    to: process.env.ADMIN_MAIL,
    subject: `New Inquiry - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: auto; color: #333;">
        <h2 style="color: #4CAF50;">New Inquiry from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${msg}</p>
        <hr>
        <a href="${process.env.APP_URL}" style="font-size: 14px; color: #555;">This message was submitted via the Sapplinns website</a>
      </div>
    `,
  };
  return mailOptions;
};

// Thank-you email sent to the user
export const sendToUser = (name: string, email: string) => {
  const mailOptions = {
    from: process.env.SERVER_MAIL,
    to: email,
    subject: `Thank You for Contacting Sapplinns`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: auto; color: #333;">
        <h2 style="color: #4CAF50;">Thank You, ${name}!</h2>
        <p>
          We appreciate your interest in Sapplinns and our agricultural solutions. Our team has received your message 
          and will respond shortly. Whether it's soil health, crop monitoring, or sustainability insights, we're here to help!
        </p>
        <p>
          If you have any urgent questions, feel free to reply to this email or visit our website for more information.
        </p>
        <p style="text-align: center; margin-top: 20px;">
          <a href="${process.env.APP_URL}" style="background-color: #4CAF50; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Visit Sapplinns</a>
        </p>
        <hr>
        <a href="${process.env.APP_URL}" style="font-size: 14px; color: #555;">Sapplinns: Empowering the Future of Farming</a>
        <p style="font-size: 14px; color: #555;">This is an automated message. Please do not reply to this. </p>
      </div>
    `,
  };
  return mailOptions;
};
