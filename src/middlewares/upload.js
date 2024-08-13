const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const multer  = require('multer')

const Mediastorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        resource_type: 'auto',
        folder: 'media',
        allowedFormats:['jpg', 'png', 'gif', 'mp4', 'avi', 'mov', 'jpeg'],
        public_id: (req, file) => `media_${Date.now()}`,

    }
});

const Messagestorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        resource_type: 'auto',
        folder: 'message',
        allowedFormats:['jpg', 'png', 'gif', 'mp4', 'avi', 'mov', 'jpeg'],
        public_id: (req, file) => `message_${Date.now()}`,

    }
});

try {
    const uploadMedia = multer({ 
        storage: Mediastorage,
        limits: {fileSize: 50 * 1024 * 1024},
        fileFilter: (req, file, cb) => {
            cb(null, true);
        }
     });
    
    const uploadMessage = multer({ 
        storage: Messagestorage,
        limits: {fileSize: 50 * 1024 * 1024},
        fileFilter: (req, file, cb) => {
            cb(null, true);
        }
    });


    module.exports = {
        uploadMedia,
        uploadMessage
    };

} catch(error) {
    console.log(error)
}


