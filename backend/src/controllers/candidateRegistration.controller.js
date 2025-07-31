import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CandidateRegistration } from "../models/candidateRegistration.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Top of file or above sendVerificationCode
function generateOTP(length = 6) {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}
const otpStore = new Map(); // email => { code, expiry }

export const registration = asyncHandler(async (req, res) => {
  try {
    const { email, password, dob, verificationCode } = req.body;

    if (!email || !password || !dob || !verificationCode) {
      throw new ApiError(400, "All fields including OTP are required");
    }

    const existingUser = await CandidateRegistration.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email already registered");
    }

    const stored = otpStore.get(email);
    
    if (
      !stored ||
      stored.code !== verificationCode ||
      stored.expiry < new Date()
    ) {
      console.log("❌ Invalid or expired OTP");
      throw new ApiError(400, "Invalid or expired OTP");
    }

    otpStore.delete(email); // Clean up

   
    const candidate = await CandidateRegistration.create({
      email,
      password,
      dob,
      verificationCode,
    });

     await sendEmail({
      to: email,
      subject: "🎉 Registration Successful - Your Application ID Inside!",
      text: `Thank you for registering. Your Application ID is: ${candidate.applicationId}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f0f4f8; border-radius: 10px; border: 1px solid #ccc;">
          <h2 style="color: #1a237e; text-align: center;">🎓 Welcome to Sahu Jain College ERP Portal</h2>
          <p style="font-size: 16px; color: #2c3e50;">Dear Candidate,</p>
          <p style="font-size: 16px; color: #2c3e50;">
            We are thrilled to inform you that your registration has been <strong>successfully completed</strong> on the 
            <strong>Sahu Jain College ERP Portal</strong>.
          </p>
          <div style="margin: 20px 0; padding: 15px; background-color: #e8f0fe; border-left: 5px solid #1a73e8; border-radius: 8px;">
            <p style="font-size: 16px; color: #1a237e; font-weight: bold;">
              🎫 Your Application ID:
              <span style="font-size: 18px; color: #d32f2f;">${candidate.applicationId}</span>
            </p>
          </div>
          <p style="font-size: 15px; color: #444;">
            Please use this Application ID along with your password to login to your dashboard, where you can complete your profile, upload documents, and monitor your application status.
          </p>
          <br/>
          <p style="font-size: 14px; color: #999;">
            Best Regards,<br/>
            <strong>Sahu Jain College ERP Team</strong><br/>
            <em>Empowering Education Through Technology</em>
          </p>
        </div>
      `
    });

    res.status(201).json(new ApiResponse(201, {
      applicationId: candidate.applicationId,
      candidate,
    }, "Candidate Registered Successfully"));
  } catch (err) {
    console.error("Registration Error:", err.message);
    throw new ApiError(500, "Error occurred during registration");
  }
});



export const sendVerificationCode = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const existing = await CandidateRegistration.findOne({ email });
  if (existing) {
    throw new ApiError(400, "Email already registered");
  }

  const otp = generateOTP();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  // Store OTP in memory
  otpStore.set(email, { code: otp, expiry });
 
  await sendEmail({
    to: email,
    subject: "Your SKJAIN Registration OTP",
    html: `
      <div style="font-family:Arial,sans-serif; padding:20px; border:1px solid #ddd;">
        <h2>🛡️ Email Verification</h2>
        <p>Use the following OTP to verify your email:</p>
        <h3 style="color:#e74c3c;">${otp}</h3>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `
  });

  res.status(200).json(new ApiResponse(200, null, "OTP sent successfully"));
});


export const loginCandidate = asyncHandler(async (req, res) => {
  const { applicationId, password } = req.body;

  if (!applicationId || !password) {
    throw new ApiError(400, "Application ID and password are required");
  }

  const candidate = await CandidateRegistration.findOne({ applicationId });
  if (!candidate) {
    throw new ApiError(404, "Candidate not found with this application");
  }


  const isPasswordValid = await bcrypt.compare(password, candidate.password);

  if (!isPasswordValid) {

    throw new ApiError(401, "Invalid Application ID or Password");

  }

  const token = jwt.sign(
    {
      id: candidate._id,
      applicationId: candidate.applicationId,
      email: candidate.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 12 * 60 * 60 * 1000
    })
    .status(200)
    .json(new ApiResponse(201, {
      token,
      user: {
        userId: candidate._id,
        applicationId: candidate.applicationId,
        email: candidate.email,
      },
    },
      "Login Successful"));

})
