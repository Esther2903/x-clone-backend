const express = require('express');
const MentionController = require('./mentionController');
const auth = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth , MentionController.createMention);

module.exports = router;