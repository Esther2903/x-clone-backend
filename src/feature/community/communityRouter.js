const express = require('express');
const auth = require('../../middlewares/authMiddleware');
const communityController = require('./communityController');

const communityRouter = express.Router();

communityRouter.post('/', auth, communityController.createCommunity);
communityRouter.post('/add-member', auth, communityController.addMember);
communityRouter.get('/', auth, communityController.getCommunities);
communityRouter.get('/:communityId/members', auth, communityController.getCommunityMembers);
communityRouter.delete('/remove-member', auth, communityController.removeMember); 
communityRouter.put('/:communityId', auth, communityController.updateCommunity); 


module.exports = communityRouter;
