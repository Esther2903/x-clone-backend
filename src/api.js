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
const blockRoute = require('./feature/block/blockRoute');
const muteRoute = require('./feature/mutes/muteRoute');
//const bookmarkRoute = require('./feature/bookmark/bookmarkController');
const spaceRoute = require('./feature/spaces/spaceRoute');

const router = express();

router.use('/users', userRoute); 
router.use('/auth', authRoutes); 
router.use('/followerships', followershipRoute); 
router.use('/tweets', tweetRoute);
router.use('/retweets' , retweetRoute);
router.use('/mentions', mentionRoute);
router.use('/block', blockRoute);
router.use('/lists', listRoute);
router.use('/mutes', muteRoute);
//router.use('/bookmarks', bookmarkRoute);
router.use('/spaces' , spaceRoute);

router.use('/messages', messageRoute);
router.use('/likes', likeRoute);
router.use('/community', communityRoute);


module.exports = router; 




