import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from "path";

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

/**
 * Uploads a file to Cloudinary from local path
 * @param {string} localFilePath - Absolute or relative path to file
 * @returns Cloudinary response or null
 */
const uploadOnCloudinary = async (localFilePath) => {
  try {
    const absolutePath = path.resolve(localFilePath); // 🔹 Resolve to absolute path
    if (!fs.existsSync(absolutePath)) {
      console.log("❌ File not found at:", absolutePath);
      return null;
    }

    console.log("🚀 Uploading to Cloudinary:", absolutePath);
    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto"
    });

    // Delete file after upload
    fs.unlinkSync(absolutePath);
    console.log("🧹 Local file deleted:", absolutePath);
    
    return response;

  } catch (error) {
    console.error("⚠️ Upload error:", error.message);

    // Clean up if file still exists
    try {
      const absolutePath = path.resolve(localFilePath);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
        console.log("🧹 Local file cleaned up after failure:", absolutePath);
      }
    } catch (cleanupError) {
      console.error("❌ Cleanup error:", cleanupError.message);
    }

    return null;
  }
};

export { uploadOnCloudinary };
