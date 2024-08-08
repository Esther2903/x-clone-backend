const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const multer  = require('multer')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'media',
        allowedFormats:['jpg', 'png', 'gif', 'mp4', 'avi', 'mov', 'jpeg'],
        public_id: (req, file) => 'squads',

    },
});

const upload = multer({ storage: storage });

module.exports = upload;