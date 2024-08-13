const express = require('express');
const userRoute = require('./feature/users/userRoute');
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
const bookmarkRoute = require('./feature/bookmark/bookmarkRoute');
const spaceRoute = require('./feature/spaces/spaceRoute');
const space_participantRoute = require('./feature/space_participants/space_participantRoute');
const hashtagRoute = require('./feature/hashtag/hashtagRouter');

const list_membreRoute = require('./feature/list_members/list_membreRoute');
//const authRoute = require('./feature/auth/authRoute');
const newsletterRoute = require('./feature/newsletters/newsletterRouter');

const router = express();

router.use('/users', userRoute); 
//router.use('/auth', authRoute); 
router.use('/followerships', followershipRoute); 
router.use('/tweets', tweetRoute);
router.use('/retweets' , retweetRoute);
router.use('/mentions', mentionRoute);

router.use('/block', blockRoute);
router.use('/lists', listRoute);
router.use('list_membres' , list_membreRoute)
router.use('/mutes', muteRoute);
router.use('/bookmark', bookmarkRoute);
router.use('/spaces' , spaceRoute);
router.use('/space_participants' , space_participantRoute);


router.use('/lists', listRoute);
router.use('/messages', messageRoute);
router.use('/likes', likeRoute);
router.use('/community', communityRoute);
router.use('/hashtags', hashtagRoute);
router.use('/newsletters', newsletterRoute);

module.exports = router; 




