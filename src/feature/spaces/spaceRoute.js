const express = require('express');
const SpaceController = require('./spaceController');
const auth = require('../../middlewares/authMiddleware');

const router = express.Router();


router.post('/create', auth,SpaceController.createSpace);
router.get('/', SpaceController.getSpaces);
router.get('/:spaceId', SpaceController.getSpaceById);

module.exports = router;