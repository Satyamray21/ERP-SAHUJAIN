import asyncHandler from "../utils/asyncHandler.js";
import { personalInfo } from "../models/personalInfo.model.js";
import { AcademicInfo } from "../models/academicInfo.model.js";
import { Subjects } from "../models/subjectsInfo.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const registerAllInfo = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    mobileNumber,
    whatsappNumber,
    dob,
    gender,
    nationality,
    caste,
    specialCategory,
    religion,
    aadharNumber,
    voterId,
    weightageClaimed,
    permanentAddress,
    temporaryAddress,
    fathersName,
    mothersName,
    parentsMobile,
    verificationCode,
    verificationCodeExpiry,

    academicRecords, // should be an array of academic entries
    majorSubject,
    minorSubject,
  } = req.body;

  if (!req.files?.candidate_photo || !req.files?.candidate_signature) {
    throw new ApiError(400, "Photo and Signature are required");
  }

  // Upload images to Cloudinary
  const photoUpload = await uploadOnCloudinary(req.files.candidate_photo[0]?.path);
  const signatureUpload = await uploadOnCloudinary(req.files.candidate_signature[0]?.path);

  if (!photoUpload || !signatureUpload) {
    throw new ApiError(500, "Failed to upload image(s) to Cloudinary");
  }

  // Save personal info
  const personalData = await personalInfo.create({
    firstName,
    middleName,
    lastName,
    email,
    mobileNumber,
    whatsappNumber,
    dob,
    gender,
    nationality,
    caste,
    specialCategory,
    religion,
    aadharNumber,
    voterId,
    weightageClaimed,
    permanentAddress: JSON.parse(permanentAddress),
    temporaryAddress: JSON.parse(temporaryAddress),
    fathersName,
    mothersName,
    parentsMobile,
    verificationCode,
    verificationCodeExpiry,
    candidate_photo: photoUpload.secure_url,
    candidate_signature: signatureUpload.secure_url,
  });

  const userId = personalData._id;

  // Save academic info
  if (!Array.isArray(academicRecords) || academicRecords.length === 0) {
    throw new ApiError(400, "Academic records are required");
  }

  await AcademicInfo.create({
    userId,
    academicRecords: academicRecords.map(record => ({
      ...record,
      percentage: record.scoreType === 'Percentage' ? record.percentage : undefined,
      cgpa: record.scoreType === 'CGPA' ? record.cgpa : undefined,
    })),
  });

  // Save subjects info
  await Subjects.create({
    majorSubject,
    minorSubject,
  });

  res.status(201).json(
    new ApiResponse(201, { userId }, "Registration with academic and subject info successful")
  );
});
