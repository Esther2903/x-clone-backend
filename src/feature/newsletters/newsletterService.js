const { Newsletter, NewsletterSubscriber, User } = require('../../utils/index');


class NewsletterService {
    async createNewsletter({title, content, creatorUserId}) {
        const newsletter = await Newsletter.create({title, content, creatorUserId});
        return newsletter;
    }

    async updateNewsletter(newsletterId, updateData, userId) {
        const newsletter = await Newsletter.findOne({ where: { id: newsletterId, creatorUserId: userId } });
        if (!newsletter) {
            throw new Error('Newsletter not found or user is not the creator');
        }

        await newsletter.update(updateData);
        return newsletter;
    }


    async addSubscriber(newsletterId, subscriberUserId) {
        const newsletter = await Newsletter.findByPk(newsletterId);
        if (!newsletter) {
            throw new Error('Newsletter not found');
        }
        const newsletterSubscriber = await NewsletterSubscriber.create({ newsletterId, subscriberUserId });
        return newsletterSubscriber; 
    }

    async removeSubscriber(newsletterId, subscriberUserId, userId) {
        const newsletter = await Newsletter.findOne({ where: { id: newsletterId, creatorUserId: userId } });
        if (!newsletter) {
            throw new Error('Newsletter not found or user is not the creator');
        }
        await NewsletterSubscriber.destroy({
            where: { newsletterId, subscriberUserId }
        });
        return { message: 'Subscriber removed successfully' };
    }

    async getNewsletter() {
        return await Newsletter.findAll();
    }

    async getNewsletterSubscriber(newsletterId) {
        return await NewsletterSubscriber.findAll({
            where: { newsletterId },
            include: [{ model: User, attributes: ['id', 'username'] }] 
        });
    }
}

module.exports = new NewsletterService();
