import {asyncHandler} from "../utils/asyncHandler.js";
import { personalInfo } from "../models/personalInformation.model.js";
import { AcademicInfo } from "../models/academicInfo.model.js";
import { Subjects } from "../models/subjectInfo.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

export const registerAllInfo = asyncHandler(async (req, res) => {
  console.log("req files",req.files);
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
    Paddress,
    Pcity,
    Pstate,
    Ppin,
    Taddress,
    Tcity,
    Tstate,
    Tpin,
    fathersName,
    mothersName,
    parentsMobile,
    verificationCode,
    majorSubject,
    minorSubject,
  } = req.body;

  // Step 1: Validate image uploads
  if (!req.files?.candidate_photo || !req.files?.candidate_signature) {
    throw new ApiError(400, "Photo and Signature are required");
  }

  // Step 2: Upload images to Cloudinary
  const photoUpload = await uploadOnCloudinary(req.files.candidate_photo[0]?.path);
  const signatureUpload = await uploadOnCloudinary(req.files.candidate_signature[0]?.path);

  if (!photoUpload || !signatureUpload) {
    throw new ApiError(500, "Failed to upload image(s) to Cloudinary");
  }

  // Step 3: Save personal info
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
    permanentAddress: {
      Paddress,
      Pcity,
      Pstate,
      Ppin,
    },
    temporaryAddress: {
      Taddress,
      Tcity,
      Tstate,
      Tpin,
    },
    fathersName,
    mothersName,
    parentsMobile,
    verificationCode,
    candidate_photo: photoUpload.secure_url,
    candidate_signature: signatureUpload.secure_url,
  });

  const userId = personalData._id;

  // Step 4: Parse academicRecords from req.body (must be a JSON string)
  let academicRecords;
  try {
    academicRecords = JSON.parse(req.body.academicRecords);
  } catch (error) {
    throw new ApiError(400, "Invalid academicRecords format. Must be JSON string.");
  }

  if (!Array.isArray(academicRecords) || academicRecords.length === 0) {
    throw new ApiError(400, "Academic records are required");
  }

  // Step 5: Save academic info
const academicData = await AcademicInfo.create({
  userId,
  academicRecords: academicRecords.map((record) => ({
    level: record.level,
    board: record.board,
    subject: record.subject,
    yearOfPassing: record.yearOfPassing,
    scoreType: record.scoreType,
    marksObtained:
      record.scoreType === "Percentage" ? record.marksObtained : undefined,
    maximumMarks:
      record.scoreType === "Percentage" ? record.maximumMarks : undefined,
    percentage:
      record.scoreType === "Percentage" ? record.percentage : undefined,
    cgpa: record.scoreType === "CGPA" ? record.cgpa : undefined,
  })),
});


  // Step 6: Save subject info
  const subjectData = await Subjects.create({
  majorSubject,
  minorSubject,
});

  // Step 7: Response
  res.status(201).json(
    new ApiResponse(201, { userId ,
      personalData,
      academicData,
     subjectData}, "Registration with academic and subject info successful")
  );
});


