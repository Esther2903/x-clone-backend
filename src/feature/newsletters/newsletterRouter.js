const express = require('express');
const auth = require('../../middlewares/authMiddleware');
const newsletterController = require('./newsletterController');

const newsletterRouter = express.Router();

newsletterRouter.post('/', auth, newsletterController.createNewsletter);
newsletterRouter.post('/add-member', auth, newsletterController.addSubscriber);
newsletterRouter.get('/', auth, newsletterController.getNewsletter);
newsletterRouter.get('/:communityId/members', auth, newsletterController.getNewsletterSubscribers);
newsletterRouter.delete('/remove-member', auth, newsletterController.removeSubscriber); 
newsletterRouter.put('/:communityId', auth, newsletterController.updateNewsletter); 


module.exports = newsletterRouter;
