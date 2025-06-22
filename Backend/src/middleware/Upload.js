import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/Config.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [
            {
                aspect_ratio: '3:2',
                crop: 'fill',
                gravity: 'auto'
            }
        ]
    }
})

export default multer({ storage })