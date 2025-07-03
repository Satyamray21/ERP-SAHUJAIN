import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
console.log("CLOUDINARY ENV CHECK:");

console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "✅ Present" : "❌ Missing");

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      console.log("No file found at:", localFilePath);
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    fs.unlinkSync(localFilePath);
    return response;

  } catch (error) {
    console.error("Upload error:", error.message);

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };