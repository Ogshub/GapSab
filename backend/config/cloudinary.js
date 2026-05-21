import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from "path";

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

    // Resolve to absolute path for Windows/Linux cross-compatibility
    const absolutePath = path.resolve(filePath);

    try {
        const uploadResult = await cloudinary.uploader.upload(absolutePath);
        // Delete temp file after successful upload
        try { fs.unlinkSync(absolutePath); } catch (e) { console.log("Temp file cleanup error:", e.message); }
        return uploadResult.secure_url;
    } catch (error) {
        // Delete temp file even on failure
        try { fs.unlinkSync(absolutePath); } catch (e) { }
        console.log("Cloudinary upload error:", error.message || error);
        return null;
    }
};

export default uploadOnCloudinary;