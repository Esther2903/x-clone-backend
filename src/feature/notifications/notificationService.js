const { Notification } = require('../../utils/index');

class NotificationService{
         async createNotification(data){
             return await Notification.create(data);
         }   
         
         async markAsRead(notificationId){
            return await Notification.update({ read : true } , {
                where : {
                    id: notificationId
                }
            });
         }

         async getUserNotifications(userId){
            return await Notification.findAll({
                where: {
                    notificationUserId: userId
                }
            })
         }
}

module.exports = new NotificationService();