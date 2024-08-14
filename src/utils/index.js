const sequelize = require('../config/db_config');
const User = require('../feature/users/userModel');
const Auth = require('../feature/auth/authModel');
const Followership = require('../feature/followerships/followershipModel');
const Tweet = require('../feature/tweets/tweetModel');
const Media = require('../feature/medias/mediaModel');
const Retweet = require('../feature/retweets/retweetModel');
const Moment = require('../feature/moments/momentModel');
const MomentTweet = require('../feature/moment_tweets/moment_tweetModel');
const Mention = require('../feature/mentions/mentionModel');
const Message = require('../feature/messages/messageModel');
const Notification = require('../feature/notifications/notificationModel');
const Hashtag = require('../feature/hashtag/hashtagModel');
const TweetHashtag = require('../feature/tweet_Hashtags/tweetHashtagsModel');
const List = require('../feature/lists/listModel');
const Like = require('../feature/likes/likeModel');
const Bookmark = require('../feature/bookmark/bookmarkModel');
const ListMember = require('../feature/list_members/listMemberModel');
const Community = require('../feature/community/communityModel');
const CommunityMember = require('../feature/community_members/communityMemberModel');
const Block = require('../feature/block/blockModel');
const Mute = require('../feature/mutes/muteModel');
//const Space = require('../feature/spaces/spaceModel');
//const SpaceParticipant = require('../feature/space_participants/spaceParticipantModel');
const Newsletter = require('../feature/newsletters/newsletterModel');
const NewsletterSubscriber = require('../feature/newsletter_suscribers/newsletterSuscriberModel');


User.hasMany(Auth, { foreignKey: 'userId' });
Auth.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(User, { through: Followership, as: 'Followers', foreignKey: 'followedId' });
User.belongsToMany(User, { through: Followership, as: 'Following', foreignKey: 'followerId' });

User.hasMany(Tweet, { foreignKey: 'userId' });
Tweet.belongsTo(User, { foreignKey: 'userId' });

Tweet.hasMany(Media, { foreignKey: 'tweetId' });
Media.belongsTo(Tweet, { foreignKey: 'tweetId' });

User.hasMany(Retweet, { foreignKey: 'userId' });
Retweet.belongsTo(User, { foreignKey: 'userId' });

Tweet.hasMany(Retweet, { foreignKey: 'tweetId' });
Retweet.belongsTo(Tweet, { foreignKey: 'tweetId' });

User.hasMany(Moment, { foreignKey: 'userId' });
Moment.belongsTo(User, { foreignKey: 'userId' });

Moment.belongsToMany(Tweet, { through: MomentTweet, foreignKey: 'momentId' });
Tweet.belongsToMany(Moment, { through: MomentTweet, foreignKey: 'tweetId' });

Tweet.hasMany(Mention, { foreignKey: 'tweetId' });
Mention.belongsTo(Tweet, { foreignKey: 'tweetId' });

User.hasMany(Mention, { foreignKey: 'mentionedUserId' });
Mention.belongsTo(User, { foreignKey: 'mentionedUserId' });

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId' });

User.hasMany(Message, { foreignKey: 'receiverId' });
Message.belongsTo(User, { foreignKey: 'receiverId' });

User.hasMany(List, { foreignKey: 'userId' });
List.belongsTo(User, { foreignKey: 'userId' });

List.hasMany(ListMember, { foreignKey: 'listId' });
ListMember.belongsTo(List, { foreignKey: 'listId' });

User.hasMany(ListMember, { foreignKey: 'memberUserId' });
ListMember.belongsTo(User, { foreignKey: 'memberUserId' });

User.hasMany(Community, { foreignKey: 'userId' });
Community.belongsTo(User, { foreignKey: 'userId' });

Community.hasMany(CommunityMember, { foreignKey: 'communityId' });
CommunityMember.belongsTo(Community, { foreignKey: 'communityId' });

User.hasMany(CommunityMember, { foreignKey: 'memberUserId' });
CommunityMember.belongsTo(User, { foreignKey: 'memberUserId' });

User.hasMany(Block, { foreignKey: 'blockerUserId' });
Block.belongsTo(User, { foreignKey: 'blockerUserId' });

User.hasMany(Mute, { foreignKey: 'muterUserId' });
Mute.belongsTo(User, { foreignKey: 'muterUserId' });

/*User.hasMany(Space, { foreignKey: 'creatorUserId' });
Space.belongsTo(User, { foreignKey: 'creatorUserId' });

Space.hasMany(SpaceParticipant, { foreignKey: 'spaceId' });
SpaceParticipant.belongsTo(Space, { foreignKey: 'spaceId' });

User.hasMany(SpaceParticipant, { foreignKey: 'userId' });
SpaceParticipant.belongsTo(User, { foreignKey: 'userId' });
*/
User.hasMany(Newsletter, { foreignKey: 'creatorUserId' });
Newsletter.belongsTo(User, { foreignKey: 'creatorUserId' });

Newsletter.hasMany(NewsletterSubscriber, { foreignKey: 'newsletterId' });
NewsletterSubscriber.belongsTo(Newsletter, { foreignKey: 'newsletterId' });

User.hasMany(NewsletterSubscriber, { foreignKey: 'subscriberUserId' });
NewsletterSubscriber.belongsTo(User, { foreignKey: 'subscriberUserId' });

User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });

Tweet.hasMany(Like, { foreignKey: 'tweetId' });
Like.belongsTo(Tweet, { foreignKey: 'tweetId' });

User.hasMany(Bookmark, { foreignKey: 'userId' });
Bookmark.belongsTo(User, { foreignKey: 'userId' });

Tweet.hasMany(Bookmark, { foreignKey: 'tweetId' });
Bookmark.belongsTo(Tweet, { foreignKey: 'tweetId' });

Tweet.hasMany(TweetHashtag, { foreignKey: 'tweetId' });
TweetHashtag.belongsTo(Tweet, { foreignKey: 'tweetId' });

Hashtag.hasMany(TweetHashtag, { foreignKey: 'hashtagId' });
TweetHashtag.belongsTo(Hashtag, { foreignKey: 'hashtagId' });

User.hasMany(Notification, { foreignKey: 'notificationUserId' });
Notification.belongsTo(User, { foreignKey: 'notificationUserId' });

Notification.belongsTo(Mention, { foreignKey: 'mentionId' });
Notification.belongsTo(Tweet, { foreignKey: 'tweetId' });
Notification.belongsTo(Retweet, { foreignKey: 'retweetId' });
Notification.belongsTo(Message, { foreignKey: 'messageId' });
Notification.belongsTo(User, { foreignKey: 'userId' });
Notification.belongsTo(Like, { foreignKey: 'likeId' });
Notification.belongsTo(Bookmark, { foreignKey: 'bookmarkId' });

sequelize.sync({ alter: true }).then(() => {
    console.log('Database & tables created!');
}).catch(err => {
    console.error('Error creating database tables:', err);
});

module.exports = {
    User,
    Auth,
    Followership,
    Tweet,
    Media,
    Retweet,
    Moment,
    MomentTweet,
    Mention,
    Message,
    Hashtag,
    TweetHashtag,
    Like,
    Bookmark,
    Notification,
    List,
    ListMember,
    Community,
    CommunityMember,
    Block,
    Mute,
  //  Space,
    //SpaceParticipant,
    Newsletter,
    NewsletterSubscriber
};
