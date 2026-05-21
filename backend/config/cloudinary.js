import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const removeTempFile = (filePath) => {
    if (!filePath) return;

    const absolutePath = path.resolve(filePath);
    try {
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }
    } catch (error) {
        console.log("Temp file cleanup error:", error.message);
    }
};

const configureCloudinary = () => {
    const hasCloudinaryConfig = Boolean(
        process.env.CLOUD_NAME && process.env.API_KEY && process.env.API_SECRET
    );

    if (!hasCloudinaryConfig) {
        throw new Error("Cloudinary is not configured");
    }

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
};

export const uploadOnCloudinary = async (filePath, folder = "gapsab") => {
    if (!filePath) {
        throw new Error("Image file path is required");
    }

    const absolutePath = path.resolve(filePath);

    try {
        configureCloudinary();

        const uploadResult = await cloudinary.uploader.upload(absolutePath, {
            folder,
            resource_type: "image"
        });

        return {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id
        };
    } catch (error) {
        console.log("Cloudinary upload error:", error.message || error);
        throw error;
    } finally {
        removeTempFile(absolutePath);
    }
};

export const deleteFromCloudinary = async (publicId) => {
    if (!publicId) return null;

    configureCloudinary();

    try {
        return await cloudinary.uploader.destroy(publicId, {
            invalidate: true,
            resource_type: "image"
        });
    } catch (error) {
        console.log("Cloudinary delete error:", error.message || error);
        throw error;
    }
};
