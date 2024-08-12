const express = require('express');
const  SpaceParticipantController = require('./space_participantController');
const auth = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth, SpaceParticipantController.addParticipant);
router.get('/:spaceId' , auth , SpaceParticipantController.getParticipants);

module.exports = router;
