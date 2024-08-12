const newsletterService = require('./newsletterService');

class NewsletterController {
    async createNewsletter(req, res) {
        try {
            const { title, content } = req.body;
            const creatorUserId = req.user.id; 

            const newsletter = await newsletterService.createNewsletter({ title, content, creatorUserId });
            return res.status(201).json(newsletter);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateNewsletter(req, res) {
        try {
            const { newsletterId } = req.params;
            const { updateData } = req.body;

            const newsletter = await newsletterService.updateNewsletter(newsletterId, updateData, req.user.id);
            return res.status(200).json(newsletter);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    
    async addSubscriber(req, res) {
        try {
            const { newsletterId } = req.params;
            const { subscriberUserId } = req.body;

            const newsletterSubscriber = await newsletterService.addSubscriber(newsletterId, subscriberUserId);
            return res.status(201).json(newsletterSubscriber);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async removeSubscriber(req, res) {
        try {
            const { newsletterId } = req.params;
            const { subscriberUserId } = req.body;

            await newsletterService.removeSubscriber(newsletterId, subscriberUserId);
            return res.status(200).json({ message: 'Subscriber removed successfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getNewsletter(req, res) {
        try {
            const newsletter = await newsletterService.getNewsletter();
            return res.status(200).json(newsletter);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getNewsletterSubscribers(req, res) {
        try {
            const  newsletterId  = req.params;
            const subscriber = await newsletterService.getNewsletterSubscriber(newsletterId);
            return res.status(200).json(subscriber);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new NewsletterController();
