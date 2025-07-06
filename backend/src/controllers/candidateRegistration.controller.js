import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {CandidateRegistration} from "../models/candidateRegistration.model.js";
import {sendEmail} from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registration = asyncHandler(async(req,res)=>{
    try{
        const{email,password,dob,verificationCode} = req.body;
        if(!email || !password || !dob || !verificationCode )
        {
            throw new ApiError(500,"All fields are required");
        }

        const existingUser = await CandidateRegistration.findOne({ email });
        if (existingUser) {
        throw new ApiError(400, "Email already registered");
        }
  

        const candidate = await CandidateRegistration.create(
            {
                email,
                password,
                dob,
                verificationCode,
                verificationExpiryTime: new Date(Date.now() + 10 * 60 * 1000),
            }
        )
        await sendEmail({
  to: email,
  subject: "🎉 Your Application ID - Registration Successful!",
  text: `Thank you for registering. Your Application ID is: ${candidate.applicationId}`, // fallback

  html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #ddd;">
      <h2 style="color: #2c3e50;">🎓 Registration Successful</h2>
      <p style="font-size: 16px; color: #34495e;">
        Dear Candidate,
      </p>
      <p style="font-size: 16px; color: #2c3e50;">
        Thank you for registering on <strong>SKJAIN ERP Portal</strong>. We're excited to have you onboard!
      </p>
      <p style="font-size: 16px; color: #2980b9; font-weight: bold;">
        🎫 Your Application ID: <span style="font-size: 18px; color: #e74c3c;">${candidate.applicationId}</span>
      </p>
      <p style="font-size: 15px; color: #555;">
        Please use this Application ID and your password to login to your dashboard and complete your profile.
      </p>
      <br />
      <p style="font-size: 14px; color: #999;">
        Best Regards,<br/>
        <strong>SKJAIN ERP Team</strong>
      </p>
    </div>
  `
});

            res.status(201)
            .json(new ApiResponse(201,{
                applicationId:candidate.applicationId,
                candidate,
            },"Candidate Registered Successfully"));

        
    }
    catch (err)
    {
        console.log("error",err.message);
        throw new ApiError(500,"Error occurred during registration");
    }



})

export const loginCandidate = asyncHandler(async(req,res)=>{
    const {applicationId,password} = req.body;

    if (!applicationId || !password) {
    throw new ApiError(400, "Application ID and password are required");
  }

    const candidate = await CandidateRegistration.findOne({ applicationId });
        if(!candidate)
        {
            throw new ApiError(404,"Candidate not found with this application");
        }

    
        const isPasswordValid = await bcrypt.compare(password, candidate.password);
        
        if (!isPasswordValid) {

        throw new ApiError(401, "Invalid Application ID or Password");

  }

  const token = jwt.sign(
    {
        id:candidate._id,
        applicationId:candidate.applicationId,
        email:candidate.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
  { expiresIn:process.env.ACCESS_TOKEN_EXPIRY }
  );

        res
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 12 * 60 * 60 * 1000 
  })
        .status(200)
        .json(new ApiResponse(201,{token,
        user: {
        userId: candidate._id,
        applicationId: candidate.applicationId,
        email: candidate.email,
      },
    },
      "Login Successful"));

})
