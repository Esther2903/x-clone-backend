const express = require('express');
const userRoute = require('./feature/users/userRoute');
const authRoutes = require('./feature/auth/authRoutes');
const followershipRoute = require('./feature/followerships/followershipRoute');
const tweetRoute = require('./feature/tweets/tweetRouter');
const mentionRoute = require('./feature/mentions/mentionRoute');
const listRoute = require('./feature/lists/listRoute');
const messageRoute = require('./feature/messages/messageRouter');
const likeRoute = require('./feature/likes/likeRouter');
const communityRoute = require('./feature/community/communityRouter');
const retweetRoute = require('./feature/retweets/retweetRoute');
<<<<<<< HEAD
const blockRoute = require('./feature/block/blockRoute');
const muteRoute = require('./feature/mutes/muteRoute');
//const bookmarkRoute = require('./feature/bookmark/bookmarkController');
const spaceRoute = require('./feature/spaces/spaceRoute');
const space_participantRoute = require('./feature/space_participants/space_participantRoute');
=======
const hashtagRoute = require('./feature/hashtag/hashtagRouter');
>>>>>>> 734e1db1a39121a66b83ac37257bedd9d84821b5

const router = express();

router.use('/users', userRoute); 
router.use('/auth', authRoutes); 
router.use('/followerships', followershipRoute); 
router.use('/tweets', tweetRoute);
router.use('/retweets' , retweetRoute);
router.use('/mentions', mentionRoute);
<<<<<<< HEAD
router.use('/block', blockRoute);
router.use('/lists', listRoute);
router.use('/mutes', muteRoute);
//router.use('/bookmarks', bookmarkRoute);
router.use('/spaces' , spaceRoute);
router.use('/space_participants' , space_participantRoute);

=======
router.use('/lists', listRoute);
>>>>>>> 734e1db1a39121a66b83ac37257bedd9d84821b5
router.use('/messages', messageRoute);
router.use('/likes', likeRoute);
router.use('/community', communityRoute);
router.use('/hashtags', hashtagRoute);

module.exports = router; 




