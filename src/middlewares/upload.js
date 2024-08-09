const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const multer  = require('multer')

const Mediastorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'media',
        allowedFormats:['jpg', 'png', 'gif', 'mp4', 'avi', 'mov', 'jpeg'],
        public_id: (req, file) => `media_${Date.now()}`,

    }
});

const Messagestorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'message',
        allowedFormats:['jpg', 'png', 'gif', 'mp4', 'avi', 'mov', 'jpeg'],
        public_id: (req, file) => `message_${Date.now()}`,

    }
});

const uploadMedia = multer({ storage: Mediastorage });
const uploadMessage = multer({ storage: Messagestorage });

module.exports = {
    uploadMedia,
    uploadMessage
};



