import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from "path";

const uploadOnCloudinary = async (filePath) => {
    const absolutePath = path.resolve(filePath);
    const fallbackImagePath = `/public/${path.basename(absolutePath)}`;
    const hasCloudinaryConfig = Boolean(
        process.env.CLOUD_NAME && process.env.API_KEY && process.env.API_SECRET
    );

    if (!hasCloudinaryConfig) {
        return fallbackImagePath;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

    try {
        const uploadResult = await cloudinary.uploader.upload(absolutePath);
        try {
            fs.unlinkSync(absolutePath);
        } catch (e) {
            console.log("Temp file cleanup error:", e.message);
        }
        return uploadResult.secure_url;
    } catch (error) {
        console.log("Cloudinary upload error:", error.message || error);
        return fallbackImagePath;
    }
};

export default uploadOnCloudinary;
