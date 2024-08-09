const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db_config');

const TweetHashtag = sequelize.define('TweetHashtag', {
    tweetId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Tweets',
        key: 'id'
      }
    },
    hashtagId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Hashtags',
        key: 'id'
      }
    }
  });

module.exports = TweetHashtag;
