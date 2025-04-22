const nodemailer = require('nodemailer');

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send verification email
const sendVerificationEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your ExpenseWise Account',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <!-- Header -->
              <div style="text-align: center; padding: 20px 0; background: linear-gradient(to right, #3b82f6, #8b5cf6); border-radius: 10px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">ExpenseWise</h1>
                <p style="color: #e5e7eb; margin: 5px 0 0 0; font-size: 16px;">Smart Finance Management</p>
              </div>

              <!-- Main Content -->
              <div style="background-color: #ffffff; padding: 30px; margin-top: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #1f2937; margin-top: 0; font-size: 24px;">Verify Your Email Address</h2>
                
                <p style="color: #4b5563; font-size: 16px;">Thank you for choosing ExpenseWise! To ensure the security of your account, please verify your email address using the verification code below:</p>
                
                <!-- OTP Display -->
                <div style="background: linear-gradient(to right, #3b82f6, #8b5cf6); padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
                  <h2 style="color: #ffffff; letter-spacing: 8px; margin: 0; font-size: 32px; font-weight: bold;">${otp}</h2>
                </div>

                <p style="color: #4b5563; font-size: 14px; margin-bottom: 30px;">This verification code will expire in <span style="color: #ef4444; font-weight: bold;">10 minutes</span>.</p>

                <div style="border-left: 4px solid #3b82f6; padding-left: 15px; margin: 20px 0; background-color: #f3f4f6; padding: 15px;">
                  <p style="color: #6b7280; margin: 0; font-size: 14px;">If you didn't request this verification, please ignore this email or contact our support team if you have concerns.</p>
                </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  © ${new Date().getFullYear()} ExpenseWise. All rights reserved.
                </p>
                <div style="margin-top: 10px;">
                  <a href="#" style="color: #3b82f6; text-decoration: none; font-size: 14px; margin: 0 10px;">Privacy Policy</a>
                  <a href="#" style="color: #3b82f6; text-decoration: none; font-size: 14px; margin: 0 10px;">Terms of Service</a>
                  <a href="#" style="color: #3b82f6; text-decoration: none; font-size: 14px; margin: 0 10px;">Contact Support</a>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

module.exports = {
  generateOTP,
  sendVerificationEmail
}; 