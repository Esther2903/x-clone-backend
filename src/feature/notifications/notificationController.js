const NotificationService = require('./notificationService');

class NotificationController {
       async createMentionNotification(mentionId , userId){
        await NotificationService.createNotification({
            notificationUserId: userId,
            type: 'mention',
            mentionId,
            userId
        });
       }

       async createLikeNotification(likeId , userId , tweetId) {
        await NotificationService.createNotification({
            notificationUserId : userId,
            type: 'like' ,
            likeId,
            tweetId,
            userId
        });
       }

       async createRetweetNotification(retweetId , userIdId) {
           await NotificationService.createNotification({
               notificationUserId : userId,
               type:'retweet',
               retweetId,
               userId
           });
       }

       async createFollowNotification(followId , tweetId) {
        await NotificationService.createNotification({
            notificationUserId : userId,
            type:'follow',
            userId : followId
        });
       }

       async createDirectMessageNotification(messageId , receiverId) {
        await NotificationService.createNotification({
            notificationUserId : receiverId,
            type:'direct_message',
            messageId,
            userId : receiverId
        });
       }


       async createBookmarkNotification(bookmarkId ,userId) {
        await NotificationService.createNotification({
            notificationUserId : userId,
            type:'bookmark',
            bookmarkId,
            userId
        });
       }

}

module.exports = new NotificationController();