const express = require('express');
const MuteController = require('./muteController');


const router = express.Router();


router.post('/mute', MuteController.muteUser);
router.get('/muted', MuteController.getMutedUsers);

module.exports = router;